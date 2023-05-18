import React, { useState, useEffect } from 'react'
import { isRangeOverlap } from "range-overlap"
import dateShortcode from 'date-shortcode'
import moment from "moment";
import axios from 'axios';
import Scheduler, { Resource, Editing } from 'devextreme-react/scheduler';

import 'devextreme/dist/css/dx.light.css';
import Query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';

import { Button } from 'devextreme-react/button';

import { 
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Typography,
  Stack,
  
} from '@mui/material';

import { 
  Close
} from '@mui/icons-material';

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import Utils from '../components/content-schedu/utils.js';
import DataCell from '../components/content-schedu/DataCell.js';
import DataCellMonth from '../components/content-schedu/DataCellMonth.js';
import DateCell from '../components/content-schedu/DateCell.js';
import TimeCell from '../components/content-schedu/TimeCell.js';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
      padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
      padding: theme.spacing(1)
  }
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: "0px 0px 4px #6262642f",
    fontSize: 12,
    fontFamily: 'Kanit'
  },
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      // border: "1px solid #ccc",
      boxShadow: "0px 1px 2px #6262642f ",
      backgroundColor: theme.palette.common.white,

    },
    width: 80,
    color: theme.palette.common.white,
    backgroundColor: "none"
  },
}));



const formatTime = (datetime) => {
   
  let str = '{hh:mm a}'    

  return dateShortcode.parse(str, datetime)
} 

const formatDateTime = (datetime, time) => {
  let str;
  if(time) {
      str = '{DD/MM/YY HH:mm}'    

  } else {
      str = '{DD/MM/YY}'    
  }

  return dateShortcode.parse(str, datetime)
}  


export const today = new Date();
// today.setHours(0, 0, 0, 0);
// today.setDate(today.getDate() - today.getDay() + 3);

const currentDate = new Date();
const views = ['timelineDay'];
const groups = ['device_center_id'];

// console.log( new Date(today.getFullYear()	, (today.getMonth()+1), (today.getDay()+9)))

// Sat Nov 12 2022 00:00:00 GMT+0700 (เวลาอินโดจีน)
const showUpdatedToast = (e) => {
  notify(
    {
        message: 'Booking success !!!' + e.appointmentData.borrower_name, 
        width: 400,
        position: {
            at: "top",
            my: "top",
            of: "#container"
        }
    },
    'success', 800
  );
  // console.log( e.appointmentData )

}

const showErrorToast = () => {

  notify(
    {
        message: 'Can not add !!!', 
        width: 400,
        position: {
            at: "top",
            my: "top",
            of: "#container"
        }
    },
    'warning', 800
  );

}

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
          {children}
          {onClose ? (
              <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                      position: "absolute",
                      right: 8,
                      top: 4,
                      color: (theme) => theme.palette.grey[500]
                  }}
              >
                  <Close />
              </IconButton>
          ) : null}
      </DialogTitle>
  );
};

function ConfirmationDialogRaw(props) {
    
  const { funcDeleteDataBooking, modelConfirm, onCloseDialogConfirm, openDialogConfirm, ...other } = props;

  const handleConfDialog = (e) => {
    funcDeleteDataBooking(e);
    onCloseDialogConfirm();


  };

  const handleCancelDialog = () => {
      onCloseDialogConfirm();
  };



  return (
      <BootstrapDialog
        onClose={handleCancelDialog}
        aria-labelledby="customized-dialog-title"
        sx={{ '& .MuiDialog-paper': { borderRadius: "15px", maxHeight: 435, width: 320 } }}

        maxWidth="xs"
        open={openDialogConfirm}
        {...other}
      >
          {/* {modelConfirm.book_id}{modelConfirm.borrower_name}{modelConfirm.time} */}

          <BootstrapDialogTitle
            sx={{ fontSize: 13, p: 1.5 }}
            id="customized-dialog-title"
            onClose={handleCancelDialog}
          >
                Confirm 
          </BootstrapDialogTitle>
          
          <DialogContent dividers>
              <Typography
                  gutterBottom
                  sx={{
                      fontSize: 13,
                      display: "flex",
                      flexDirection:'column',
                      alignItems: "center",
                      justifyContent: "center"
                  }}
              >
              
                <div className='font-family-Kanit'> ยกเลิกการจอง </div>
                <div className='font-family-Kanit'>รอบ {modelConfirm.length !== 0 ? modelConfirm[0].time : ""}</div>
                <div className='font-family-Kanit'>ผู้จอง {modelConfirm.length !==0 ? modelConfirm[0].borrower_name : ""}</div>
                  
              </Typography>
               
          </DialogContent>
          <DialogActions>
              <Stack spacing={1} direction="row" sx={{ p: 0 }}>
          
                
                {/* <Button
                  sx={{ fontSize: 13,paddingX: 1.5 , paddingY: .2 }}
                  variant="contained"
                  autoFocus
                  onClick={()=>handleConfDialog(modelConfirm[0].book_id)}
                >
                  ตกลง
                </Button> */}
                <Button className="device-center-cancel"
                  text="ตกลง"
                  onClick={()=>handleConfDialog(modelConfirm[0].book_id)}
                />
              </Stack>
          </DialogActions>
      </BootstrapDialog>
  );
}


const Scheduler_DeviceCenter = () => {
  const [dataSCH, setdataSCH] = useState([{}]);
  const [DataAccUser, setDataAccUser] = useState([]);
  const [Notebook_center, setNotebook_center] = useState([]);
  
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [dataDialog, setDataDialog] = useState([]);

  const [checkdataSCH, setcheckdataSCH] = useState([]);

  const getDataAccUser = async (e) => {
    try {

        await axios.get('http://localhost:5000/getDataBook', { }).then((res) => {  
          setdataSCH(res.data);
        })

        await axios.get('http://localhost:5000/getDataUserForDeviceCenter', { }).then((res) => {  
          setDataAccUser(res.data);
        })

        await axios.get('http://localhost:5000/getNotebook_center', { }).then((res) => {  
          setNotebook_center(res.data);
        })
        
          
        // await axios.get('http://localhost:5000/getSec', { }).then((res) => {  
        //   setsection(res.data);
        // })
        
    } catch (error) {
        console.log(error);
    }
  }

  const getDataSCH = async (e) => {
    try {

        await axios.get('http://localhost:5000/getDataBook', { }).then((res) => {  
          setdataSCH(res.data);
        })

    } catch (error) {
        console.log(error);
    }
  }

  const getDataBookCheckForAdding = async () => {
    try {

        await axios.post('http://localhost:5000/getDataBookCheckForAdding', { 
          dateSCH: dateShortcode.parse('{YYYY-MM-DD}', new Date())

        }).then((res) => {  
          setcheckdataSCH(res.data);
        })

    } catch (error) {
        console.log(error);
    }
  }
  
  useEffect(() => {
    getDataAccUser();
    getDataBookCheckForAdding()
    
  },[]);

  const funcDeleteDataBooking = async (book_id) => {
    
    try {
        await axios.post('http://localhost:5000/deleteDataBooking', {
          book_id : book_id,

        }).then((res) => {
          getDataSCH()
          getDataBookCheckForAdding()
        })

        
    } catch (error) {
        console.log(error);

    }

    if( dataSCH.filter((item) => item.book_id !== book_id)) {
      let newData = dataSCH.filter((item) => item.book_id !== book_id);
      setdataSCH(newData)

    } else {
      let newData = dataSCH.slice(0,dataSCH.length-1);
      setdataSCH(newData)
    }

    notify(
      {
          message: 'ยกเลิกการจองสำเร็จ', 
          width: 400,
          position: {
              at: "top",
              my: "top",
              of: "#container"
          }
      },
      'success', 800
    );
    
    

  }
  

  const handleDialogConfirm = (e) => {
    setDataDialog(e)
    setOpenDialogConfirm(true);

  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(false);
    setDataDialog([])

  };

  const DialogConfirm = async (e) => {
    // console.log(e);

    handleDialogConfirm([{
      book_id: e.book_id,
      borrower_name: e.borrower_name, 
      time: formatTime(e.displayStartDate) + ' - ' + formatTime(e.displayEndDate)
    }])
  }


  const currentDatenewStartDate = (e) => {
    // getDataSCH()

  };

  const funcUpdataDataBooking = async (e) => {

    // console.log(new Date(e.appointmentData.startDate))
    // console.log(new Date())
    // console.log(new Date(e.appointmentData.startDate))
    if(new Date(e.appointmentData.startDate) < new Date() && new Date(e.appointmentData.endDate) <= new Date() ) {
      showErrorToast()
      return
    }

    showUpdatedToast(e)  


    try {
        await axios.post('http://localhost:5000/updateDataBooking', {
          device_center_id : e.appointmentData.device_center_id, 
          tel : e.appointmentData.tel, 
          borrower_id : e.appointmentData.borrower_id, 
          borrower_name : e.appointmentData.borrower_name, 
          startDate : new Date(e.appointmentData.startDate) < new Date() ? new Date() : e.appointmentData.startDate,
          endDate : e.appointmentData.endDate,
          dateSCH : e.appointmentData.dateSCH

        }).then((res) => {
          getDataSCH()
          getDataBookCheckForAdding()
        })

        
    } catch (error) {
        console.log(error);

    }

    
  }

  const renderAppointment = (model) => {
    const { targetedAppointmentData } = model.data;
  
    const movieData = Query(DataAccUser).filter(['id_user', targetedAppointmentData.borrower_id]).toArray()[0] || {};
    // const section = Query(this.props.section).filter(['id', targetedAppointmentData.section]).toArray()[0] || {};
  
    return (
      <LightTooltip 
          title={
            <div className="device-center-tooltip">
              {formatDateTime(targetedAppointmentData.displayStartDate)}
              <div className="device-center-info">
                  <i className='bx bx-time'></i>&nbsp;
                {formatTime(targetedAppointmentData.displayStartDate)}
                {' - '}
                {formatTime(targetedAppointmentData.displayEndDate)}
              </div>
              <div className="box-btn-cancel">
                {
                 ( targetedAppointmentData.displayEndDate < new Date() || (targetedAppointmentData.displayStartDate < new Date() ) &&  targetedAppointmentData.displayEndDate > new Date()) ?  
            
                    null
                  :
                    
                      targetedAppointmentData.borrower_id === localStorage.getItem('id_user_login') ?  
                        <Button className="device-center-cancel"
                          icon="bx bx-desktop"
                          text="Cancel"
                          onClick={()=>DialogConfirm(targetedAppointmentData)} 
                        />
                      :
                        null
                    
                   
                }
                
              </div>
            </div>
          }
          key={targetedAppointmentData.book_id}
          placement="top-start"
          // disableFocusListener={false} 
          // disableHoverListener={false} 
          // disableTouchListener={false} 
          arrow
      >

        <div className="showtime-preview">
          <div> ID User : {targetedAppointmentData.borrower_id	}</div>
          <div className='font-family-Kanit'> Name : {movieData.name_user}</div>
          <div> Tel. : {targetedAppointmentData.tel ? targetedAppointmentData.tel : " - "}</div>
          {/* <div>
            Ticket Price: <strong>${ targetedAppointmentData.price }</strong>
          </div> */}
          <div>
            <i className='bx bx-time'></i>&nbsp;
            {formatTime(targetedAppointmentData.displayStartDate)}
            {' - '}
            {formatTime(targetedAppointmentData.displayEndDate)}
          </div>
        </div>

      </LightTooltip>
    );
  }

    // function getUserID(id) {
    //   return Q
    // }

  
  const notifyDisableDate = (e) => {
    notify(
      {
          message: e,
          width: 400,
          position: {
              at: "top",
              my: "top",
              of: "#container"
          }
      },
      'warning', 800
    );
  };


  const onAppointmentFormOpening = (e) =>{
    const startDate = new Date(e.appointmentData.startDate);
    
    const startDateArray = [startDate];

    if (!Utils.isValidAppointmentDate(startDate) ) {
      e.cancel = true;
      notifyDisableDate('ช่วงเวลาที่คุณเลือก ไม่ได้อยู่ในช่วงเวลาที่เปิดให้สามารถจองโน๊ตบุ๊คได้');
    }

    if (new Date(e.appointmentData.endDate) < new Date()) {
      e.cancel = true;
      notifyDisableDate('ช่วงเวลาที่คุณเลือก ไม่ได้อยู่ในช่วงเวลาที่เปิดให้สามารถจองโน๊ตบุ๊คได้');
    }
  
    if (checkdataSCH.findIndex(object => { return object.borrower_id === localStorage.getItem('id_user_login') }) !== -1) {
      e.cancel = true;
      notifyDisableDate('วันนี้คุณได้จองโน๊ตบุ๊คไปแล้วหนึ่งครั้ง ( สามารถจองได้วันละครั้งเท่านั้น )');
    }

    // console.log(new Date(new Date(e.appointmentData.startDate).setSeconds(42)))
    // console.log(new Date(e.appointmentData.startDate))

    let checkfilter = checkdataSCH.filter((datetime) => (datetime.device_center_id === e.appointmentData.device_center_id) && isRangeOverlap([new Date(new Date(e.appointmentData.startDate).setSeconds(1)), new Date(e.appointmentData.endDate)],[new Date(new Date(datetime.startDate).setSeconds(1)), new Date(datetime.endDate)]))
    if (checkfilter.length !== 0) {
      e.cancel = true;
      notifyDisableDate('ช่วงเวลาที่คุณเลือก ถูกจองเเล้ว');
    }


    // applyDisableDatesToDateEditors(e.form);

    const { form } = e;
    let userInfo = Query(DataAccUser).filter(['id_user', e.appointmentData.borrower_id]).toArray()[0] || {};

    const dataUser = DataAccUser;


    let Vtel = true

    form.option('items', [
    {
      name: 'borrower_id',
      label: {
        text: 'User Name',
      },
      editorType: 'dxSelectBox',
      dataField: 'borrower_id',
      editorOptions: {
        items: DataAccUser,
        displayExpr: 'name_user',
        valueExpr: 'id_user',
        readOnly: true,
        onValueChanged(args) {
          userInfo = dataUser[dataUser.findIndex(object => { return object.id_user === args.value })]
          if(userInfo) {
            // form.updateData('director', userInfo.director);
            form.updateData('borrower_name', userInfo.name_user);
                         // form.updateData('startDate',  form.getDate('startDate'));
           
          }
        },
      },
    }, 
    {
      name: 'tel',
      label: {
        text: 'Tel.',
      },
      editorType: 'dxNumberBox',
      dataField: 'tel',
      // value : localStorage.getItem('tel') !== null? "-" : localStorage.getItem('tel'),
      
      editorOptions: {
        // mask: "0000000000",
        // maskRules: {
        //   //H: char => char >= 0 && char <= 2,
        //   // h: (char, index, fullStr) => {
        //   //     if (fullStr[0] == '2')
        //   //         return [0,1,2,3].includes(parseInt(char));
        //   //     else
        //   //         return [0,1,2,3,4,5,6,7,8,9].includes(parseInt(char));
        //   // },
        //   // M: char => char >= 0 && char <= 5,
        //   // m: char => char >= 0 && char <= 9
        // },
        // maskChar: " ",
        value:  localStorage.getItem('tel') ,
        maskInvalidMessage: "รูปแบบข้อมูลไม่ถูกต้อง",
        mode:"tel",
        placeholder : "เบอร์ติดต่อ",
        readOnly: true,
        
      },
     
    },
    
    // {
    //   label: {
    //     text: 'Director',
    //   },
    //   name: 'director',
    //   editorType: 'dxTextBox',
    //   editorOptions: {
    //     value: userInfo.director,
    //     readOnly: true,
    //   },
    // }, 
    
    {
      name: 'startDate',
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        readOnly: true,
        // onValueChanged(args) {
        //   startDate = args.value;
        //   // if(startDate.getTime() < Date()) {
        //     if(startDate) {
        //       form.updateData('tel', new Date());

        //     }
        //   // }
        //   // form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000));
        // },
      },
    }, {
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        readOnly: true,
       
        // readOnly: true,
      },
    }, 
    // {
    //   dataField: 'price',
    //   editorType: 'dxRadioGroup',
    //   editorOptions: {
    //     dataSource: [5, 10, 15, 20],
    //     itemTemplate(itemData) {
    //       return `$${itemData}`;
    //     },
    //   },
    // },
    ]);

    form.updateData('borrower_id', localStorage.getItem('id_user_login'));
    form.updateData('dateSCH', startDate);

    form.itemOption("tel", {isRequired: true, }); 


    // console.log(dateShortcode.parse('{YYYY-MM-DD}', new Date()) === dateShortcode.parse('{YYYY-MM-DD}', startDate) )
  
  }

  const onContentReady = (e) => {
    e.component.scrollTo(new Date());
  }

  const onAppointmentClick = (e) => {
    e.cancel = true;
  }

  const [currentView, setCurrentView] = React.useState(views[0]);

  const onAppointmentAdding = (e) => {
    const isValidAppointment = Utils.isValidAppointment(e.component, e.appointmentData);
    if (!isValidAppointment) {
      e.cancel = true;
      notifyDisableDate('');
    }
  };

  const onAppointmentUpdating = (e) => {
    const isValidAppointment = Utils.isValidAppointment(e.component, e.newData);
    if (!isValidAppointment) {
      e.cancel = true;
      notifyDisableDate('');
    }
  };

  const onCurrentViewChange = (value) => (setCurrentView(value));

  const holidays = [
    new Date(today.getFullYear()	, (today.getMonth()), (today.getDay()+9))
  ];
  
  const applyDisableDatesToDateEditors = (form) => {
    const startDateEditor = form.getEditor('startDate');
    startDateEditor.option('disabledDates',holidays);

    const endDateEditor = form.getEditor('endDate');
    endDateEditor.option('disabledDates', holidays);
  };

  const renderDataCell = (itemData) => {
    const CellTemplate = currentView === 'month'
      ? DataCellMonth
      : DataCell;

    return <CellTemplate itemData={itemData} />;
  };

  const renderDateCell = (itemData) => <DateCell itemData={itemData} currentView={currentView} />;

  const renderTimeCell = (itemData) => <TimeCell itemData={itemData} />;


  return (
    <div className="layout-component m_r content-timeline-sh-react">

      <h2 className="page-header">
          { "notebook center".toUpperCase() }
      </h2>

      <div className="row box-scroll">
          <div className="col-12">
              <div className="card-g dataUser-min-h">
                <ConfirmationDialogRaw
                    id="ringtone-menu"
                    keepMounted
                    openDialogConfirm={openDialogConfirm}
                    onCloseDialogConfirm={handleCloseDialogConfirm}
                    modelConfirm={dataDialog}
                    funcDeleteDataBooking={(e)=>funcDeleteDataBooking(e)}
                />
                {
                  Notebook_center.length > 0 ?
                    <React.Fragment>
                      <Scheduler
                          dataSource={dataSCH}
                          views={views}
                          editing={{allowAdding: true,
                            allowDeleting: false,
                            allowResizing: false,
                            allowDragging: false,
                            allowUpdating: false}}
                          defaultCurrentView="Timeline Week"
                          showCurrentTimeIndicator={true}
                          shadeUntilCurrentTime={true}
                          defaultCurrentDate={currentDate}
                          // onCurrentViewChange={onCurrentViewChange}
                          groups={groups}
                          height={495}
                          cellDuration={120}
                          firstDayOfWeek={0}
                          startDayHour={8}
                          endDayHour={21}
                          dataCellRender={renderDataCell}
                          dateCellRender={renderDateCell}
                          timeCellRender={renderTimeCell}
                          appointmentComponent={renderAppointment}
                          // showAllDayPanel={false}
                          // crossScrollingEnabled={true}
                          onAppointmentFormOpening={onAppointmentFormOpening}
                          // appointmentTooltipComponent={AppointmentTooltip}

                          onContentReady={onContentReady}
                          onAppointmentAdded={funcUpdataDataBooking}
                          // onAppointmentUpdated={this.showUpdatedToast}
                          // onAppointmentDeleted={this.showDeletedToast}
                          onAppointmentClick={onAppointmentClick}

                          // onAppointmentDblClick={this.onAppointmentDblClick}
                      >

                          <Editing allowDeleting={true} />

                          <Resource
                            dataSource={DataAccUser}
                            fieldExpr="borrower_id"
                          />

                          <Resource
                            dataSource={Notebook_center}
                            fieldExpr="device_center_id"
                            useColorAsDefault={true}
                          />

                      </Scheduler>
                    
                    </React.Fragment>
                  :
                    null
                }
              
                
              </div>
          </div>
      </div>
    </div> 
  )
}

export default Scheduler_DeviceCenter
import React from 'react';
import dateShortcode from 'date-shortcode'
import axios from 'axios';
import Scheduler, { Resource, Editing } from 'devextreme-react/scheduler';
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { Button } from 'devextreme-react/button';

import 'devextreme/dist/css/dx.light.css';
import Query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';

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

export const today = new Date();
today.setHours(0, 0, 0, 0);
today.setDate(today.getDate() - today.getDay() + 3);


// let DataAccUser = [];
// let Notebook_center = [];

// const getDataAccUser = async (e) => {
//   try {

//       await axios.get('http://localhost:5000/getUserAccount', { }).then((res) => {  
//         DataAccUser = (res.data);
//       })

//       await axios.get('http://localhost:5000/getNotebook_center', { }).then((res) => {  
//         Notebook_center = (res.data);
//       })
      
//   } catch (error) {
//       console.log(error);
//   }
// }

// getDataAccUser();
// console.log(DataAccUser)

export const moviesData = [{
  id_user: 1,
  name_user: 'His Girl Friday',
}, {
  id_user: 2,
  name_user: 'Royal Wedding',
}, {
  id_user: 3,
  name_user: 'A Star Is Born',
}, {
  id_user: 4,
  name_user: 'The Screaming Skull',
}, {
  id_user: 5,
  name_user: 'It\'s a Wonderful Life',
}, {
  id_user: 6,
  name_user: 'City Lights',
}];

// console.log({device_center_id, section, borrower_id, borrower_name, startDate, endDate})

export const data = [
  // {
  //   device_center_id: "CENTER_ITN23423",
  //   tel: 63,
  //   borrower_id: "IT6400009",
  //   borrower_name:"เก็บตะวัน จนัทรสาขา",
  //   startDate: new Date('2022-10-08T03:00:00.000Z'),
  //   endDate: new Date('2022-10-08T04:00:00.000Z'),
  // 
];

// function getUserById(id) {
//   return Query(this.props.dataAccUser).filter(['id_user', id]).toArray()[0];
// }

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


const currentDate = new Date();
const views = ['timelineDay'];
const groups = ['device_center_id'];

class Test_content extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showCurrentTimeIndicator: true,
      shadeUntilCurrentTime: true,
      updateInterval: 10,
      allowAdding: true,
      allowDeleting: false,
      allowResizing: false,
      allowDragging: false,
      allowUpdating: false,
    };

    // this.onAppointmentFormOpening = this.onAppointmentFormOpening.bind(this);
    this.onShowCurrentTimeIndicatorChanged = this.onShowCurrentTimeIndicatorChanged.bind(this);
    this.onShadeUntilCurrentTimeChanged = this.onShadeUntilCurrentTimeChanged.bind(this);
    this.onUpdateIntervalChanged = this.onUpdateIntervalChanged.bind(this);
    this.onContentReady = this.onContentReady.bind(this);

    this.showAddedToast = this.showAddedToast.bind(this);
    this.showUpdatedToast = this.showUpdatedToast.bind(this);
    this.showDeletedToast = this.showDeletedToast.bind(this);
  }
  

  render() {

    const funcUpdataDataBooking = async (e) => {
      this.showUpdatedToast(e)  
      console.log(new Date(e.appointmentData.startDate))
      console.log(new Date())
      console.log(new Date(e.appointmentData.startDate))
    
      try {
          await axios.post('http://localhost:5000/updateDataBooking', {
            device_center_id : e.appointmentData.device_center_id, 
            tel : e.appointmentData.tel, 
            borrower_id : e.appointmentData.borrower_id, 
            borrower_name : e.appointmentData.borrower_name, 
            startDate : new Date(e.appointmentData.startDate) < new Date() ? new Date() : e.appointmentData.startDate,
            endDate : e.appointmentData.endDate

          }).then((res) => {})

          
      } catch (error) {
          console.log(error);

      }

    }

    const DialogConfirm = async (e) => {
      // console.log(e);

      this.props.handleDialogConfirm([{
        book_id: e.book_id,
        borrower_name: e.borrower_name, 
        time: formatTime(e.displayStartDate) + ' - ' + formatTime(e.displayEndDate)
      }])

      // var newData = this.props.dataSCH.filter((item) => item.book_id !== e.book_id);

      // this.props.setdataSCH(newData)
     

      // try {
      //     await axios.post('http://localhost:5000/deleteDataBooking', {
      //       book_id : e.appointmentData.device_center_id,

      //     }).then((res) => {})

          
      // } catch (error) {
      //     console.log(error);

      // }

    }

    // const AppointmentTooltip = (model) => {
    //   const { targetedAppointmentData } = model.data;
    //   // const movieData = Query(this.props.dataAccUser).filter(['id_user', targetedAppointmentData.borrower_id]).toArray()[0] || {};

    //   return (
    //     <div className="device-center-tooltip">
    //      {formatDateTime(targetedAppointmentData.displayStartDate)}
    //       <div className="device-center-info">
    //          <i className='bx bx-time'></i>&nbsp;
    //         {formatTime(targetedAppointmentData.displayStartDate)}
    //         {' - '}
    //         {formatTime(targetedAppointmentData.displayEndDate)}
    //       </div>
    //       <div className="box-btn-cancel">
    //         <Button className="device-center-cancel"
    //             icon="bx bx-desktop"
    //             text="Cancel"
    //             onClick={()=>funcDeleteDataBooking(targetedAppointmentData)} 
    //         />
    //       </div>
         
    //     </div>
    //   );
    // }

    const renderAppointment = (model) => {
      const { targetedAppointmentData } = model.data;
    
      const movieData = Query(this.props.dataAccUser).filter(['id_user', targetedAppointmentData.borrower_id]).toArray()[0] || {};
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
                    targetedAppointmentData.displayEndDate < new Date() || (targetedAppointmentData.displayStartDate < new Date() &&  targetedAppointmentData.displayEndDate > new Date())? 
                      null
                    :
                      <Button className="device-center-cancel"
                        icon="bx bx-desktop"
                        text="Cancel"
                        onClick={()=>DialogConfirm(targetedAppointmentData)} 
                      />
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
            <div> Name : {movieData.name_user}</div>
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

    const onAppointmentFormOpening = (e) =>{

      const { form } = e;
      let userInfo = Query(this.props.dataAccUser).filter(['id_user', e.appointmentData.borrower_id]).toArray()[0] || {};
      let { startDate } = e.appointmentData;
  
      const dataUser = this.props.dataAccUser;

      let Stime ;
  
      form.option('items', [
      {
        name: 'borrower_id',
        label: {
          text: 'User Name',
        },
        editorType: 'dxSelectBox',
        dataField: 'borrower_id',
        editorOptions: {
          items: this.props.dataAccUser,
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
        validationRules :{ type: "required", message: "Type is required" },
        editorType: 'dxTextBox',
        dataField: 'tel',
        defaultValue:'xxxx',
        // displayFormat: "###",
        // editorOptions: {
        //   items: this.props.section,
        //   displayExpr: 'section',
        //   valueExpr: 'section',
         
        // },
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

    }


    // console.log(this.props.dataSCH)

    return (

        <div className="layout-component m_r content-timeline-sh-react">

            <h2 className="page-header">
                { "Test Content".toUpperCase() }
            </h2>

            <div className="row box-scroll">
                <div className="col-12">
                    <div className="card-g dataUser-min-h">
                    
                      <React.Fragment>
                        <Scheduler
                            dataSource={this.props.dataSCH}
                            views={views}
                            editing={this.state}
                            defaultCurrentView="Timeline Week"
                            recurrenceEditMode="occurrence"
                            showCurrentTimeIndicator={this.state.showCurrentTimeIndicator}
                            shadeUntilCurrentTime={this.state.shadeUntilCurrentTime}
                            defaultCurrentD1ate={currentDate}
                            groups={groups}
                            height={495}
                            cellDuration={120}
                            firstDayOfWeek={0}
                            startDayHour={0}
                            endDayHour={22}
                            appointmentComponent={renderAppointment}
                            // showAllDayPanel={false}
                            // crossScrollingEnabled={true}
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            // appointmentTooltipComponent={AppointmentTooltip}
                            onContentReady={this.onContentReady}
                            onAppointmentAdded={funcUpdataDataBooking}
                            onAppointmentUpdated={this.showUpdatedToast}
                            onAppointmentDeleted={this.showDeletedToast}
                            onAppointmentClick={this.onAppointmentClick}
                            // onAppointmentDblClick={this.onAppointmentDblClick}
                        >

                            <Editing allowDeleting={true} />

                            <Resource
                              dataSource={this.props.dataAccUser}
                              fieldExpr="borrower_id"
                            />

                            {/* <Resource
                              dataSource={this.props.section}
                              fieldExpr="section"
                            /> */}

                            <Resource
                              dataSource={this.props.notebook_center}
                              fieldExpr="device_center_id"
                              useColorAsDefault={true}
                            />

                        </Scheduler>
                      
                      </React.Fragment>
                    
                      
                    </div>
                </div>
            </div>
        </div> 
     
    );
  }
  

  

  onContentReady(e) {
    e.component.scrollTo(new Date());
  }


  onAppointmentClick(e) {
    e.cancel = true;
  }

  onAppointmentDblClick(e) {
    e.cancel = true;
  }

  onShowCurrentTimeIndicatorChanged(e) {
    this.setState({ showCurrentTimeIndicator: e.value });
  }

  onShadeUntilCurrentTimeChanged(e) {
    this.setState({ shadeUntilCurrentTime: e.value });
  }

  onUpdateIntervalChanged(args) {
    this.setState({ updateInterval: args.value });
  }

  showToast(event, value, type) {
    notify(
            {
                message: `${event} "${value}"`, 
                width: 400,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            }, 
            type, 800
          );
  }

  showAddedToast(e) {
    this.showToast('Added', e.appointmentData.borrower_name, 'success');
    console.log( e.appointmentData )

  }

  showUpdatedToast(e) {
    this.showToast('Booking success !!!', e.appointmentData.borrower_name, 'success');//info
    console.log( e.appointmentData )

  }

  showDeletedToast(e) {
    this.showToast('Cancel booking !!!', e.appointmentData.borrower_name, 'warning');
    console.log( e.appointmentData )

  }

}



export default Test_content;

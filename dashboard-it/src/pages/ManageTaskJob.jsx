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
import Badge from '../components/badge/Badge'

import UncontrolledTabs from './UncontrolledTabs';
import Nav from './Nav';
import {
    TabPane,
    NavItem,
} from 'reactstrap';

import { 
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Typography,
  Stack,
  Divider,
  Box, 
  Paper, 
  InputBase,
  Skeleton,
  
} from '@mui/material';

import { 
  Close
} from '@mui/icons-material';

// import PopupState,{ bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state';


import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// import Utils from '../components/content-schedu/utils.js';
// import DataCell from '../components/content-schedu/DataCell.js';
// import DataCellMonth from '../components/content-schedu/DataCellMonth.js';
// import DateCell from '../components/content-schedu/DateCell.js';
// import TimeCell from '../components/content-schedu/TimeCell.js';

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

const subName = (name) => {

  let Sname = ""

  if(name !== null && name !== "" && name !== 'undefined') {
    const fullName = name.split(' ')

    if(typeof fullName[1] !== 'undefined') {
      Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1) +"  "+ fullName[1].charAt(0).toUpperCase() + '.'

    } else {
      Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1)

    }
  }
 
  // const Sname = fullName.shift() +"  "+ fullName.pop().charAt(0) + '.'
  return Sname
}  

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

const formatDate = (datetime) => {
  let str  = '{MM/YY}';
  return dateShortcode.parse(str, datetime)
} 

const showUpdatedToast = (e) => {
  notify(
    {
        message: 'Assign to ' + e.appointmentData.borrower_name, 
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

const orderStatus = {
  "inprogress": "primary",
  "pending": "warning",
  "finish": "success",
  "delay": "danger"
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
              
                <div> ยกเลิกการจอง </div>
                <div>รอบ {modelConfirm.length !== 0 ? modelConfirm[0].time : ""}</div>
                <div>ผู้จอง {modelConfirm.length !==0 ? modelConfirm[0].borrower_name : ""}</div>
                  
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

function ConfirmationDialogRemoveJob(props) {
    
  const { CancalJob, detailcanceljob, onCloseRemoveJobDialog, openConfirmationDialogRemoveJob, ...other } = props;

  const handleCancelDialog = () => {
    onCloseRemoveJobDialog();
  };

  const handleConfDialog = async(e) => {
    handleCancelDialog();
    CancalJob({
      tikket_no: detailcanceljob.tikket_no,
      job_no: detailcanceljob.job_no,
      assign: detailcanceljob.assign,
      level_assign: detailcanceljob.level_assign,

    })

  };
  
  // useEffect(() => {

  //   const GetDataJobDetail = async (tikketNo) => {
  //       try {
           
  //           await axios.post('http://localhost:5000/getDataJobCut', {
  //               tikket_no: tikketNo,

  //           }).then((res) => {  
  //               setDataJobDetailJOB(res.data);

  //           })

  //       } catch (error) {
  //           console.log(error);
  //       }
  //   }

  //   if(tikketNo !== "") {
  //       GetDataJobDetail(tikketNo);
  //   }

  // },[tikketNo]);  

  return (
      <BootstrapDialog
        onClose={handleCancelDialog}
        aria-labelledby="customized-dialog-title"
        sx={{ '& .MuiDialog-paper': { borderRadius: "15px", maxHeight: 435, width: 320 } }}

        maxWidth="xs"
        open={openConfirmationDialogRemoveJob}
        {...other}
      >
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
              
                <div> Cancel job no. &nbsp;{detailcanceljob.job_no}</div>
                <div> {detailcanceljob.level_assign === 1? "Assign to" : detailcanceljob.level_assign === 2 ? "Assistant" : "" } &nbsp;{detailcanceljob.assign}</div>
                <div> Assign level : &nbsp;{detailcanceljob.level_assign === 1? "Head" : detailcanceljob.level_assign === 2 ? "Member" : "" }</div>

              </Typography>
               
          </DialogContent>
          <DialogActions>
              <Stack spacing={1} direction="row" sx={{ p: 0 }}>
              
                <Button className="device-center-cancel"
                  text="ตกลง"
                  onClick={()=>handleConfDialog()}
                />
              </Stack>
          </DialogActions>
      </BootstrapDialog>
  );
}

function ConfirmationDialogUpdateJob(props) {
    
  const { getDataScheduGetDataJobForSchedu, UpdateJob, detailUpdatejob, onCloseUpdateJobDialog, openConfirmationDialogUpdateJob, ...other } = props;

  const handleCancelDialog = () => {
    onCloseUpdateJobDialog();
    getDataScheduGetDataJobForSchedu();
  };

  const handleConfDialog = (e) => {
    onCloseUpdateJobDialog();
    UpdateJob(detailUpdatejob)

  };
  
  return (
      <BootstrapDialog
        onClose={handleCancelDialog}
        aria-labelledby="customized-dialog-title"
        sx={{ '& .MuiDialog-paper': { borderRadius: "15px", maxHeight: 435, width: 320 } }}

        maxWidth="xs"
        open={openConfirmationDialogUpdateJob}
        {...other}
      >
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
              
                <div> Update job no. &nbsp;{detailUpdatejob.job_no}</div>

              </Typography>
               
          </DialogContent>
          <DialogActions>
              <Stack spacing={1} direction="row" sx={{ p: 0 }}>
              
                <Button className="device-center-cancel"
                  text="ตกลง"
                  onClick={()=>handleConfDialog()}
                />
              </Stack>
          </DialogActions>
      </BootstrapDialog>
  );
}

const currentDate = new Date();
const views = ['timelineDay'];
const groups = ['assign'];

const data = [
  {
    startDate: new Date('2022-10-22T10:30:00.000Z'),
    endDate: new Date('2022-10-22T12:30:00.000Z'),
    tikket_no: "tk220815-000002",
    assign_by: "IT6400009",
    assign: "IT6400008",
    approve_by: "IT6400009",
    level_assign: "Head",    
    service_options: "ขอติดตั้งโปรแกรม",
    requestor: "Natapat  M.",
    mail : "",
    section_req: "PQC-G",
    tel: "878",
    // assign: "IT6400008",
    
  }
]

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

function JobDetail(props) {
  const { tikketNo, onCloseJobDetailDialog, openJobDetailDialog, ...other } = props;
  const [DataJobDetail, setDataJobDetail] = useState([]);
  const [DataJobDetailJOB, setDataJobDetailJOB] = useState([]);
  const [DataJobMember, setDataJobMember] = useState([]);

  const handleCancelJobDetailDialog = () => {
      onCloseJobDetailDialog();
      setDataJobDetail([])
      setDataJobDetailJOB([])
      setDataJobMember([])

  };

  
  useEffect(() => {
      const GetDataJobDetail = async (tikketNo) => {
          try {
              await axios.post('http://localhost:5000/getDataTikketCut', {
                  tikket_no: tikketNo,
                  status: ["approve","waite","reject"]

               }).then((res) => {  
                  setDataJobDetail(res.data);

              })

              await axios.post('http://localhost:5000/getDataJobCut', {
                  tikket_no: tikketNo,

              }).then((res) => {  
                  setDataJobDetailJOB(res.data);

              })

          } catch (error) {
              console.log(error);
          }
      }

      if(tikketNo !== "") {
          GetDataJobDetail(tikketNo);
      }

  },[tikketNo]);

  useEffect(() => {
    const GetDataJobMember = async () => {
        try {
            
            await axios.post('http://localhost:5000/getDataJobMemberCut', {
                job_no: DataJobDetailJOB[0].job_no,

            }).then((res) => {  
                setDataJobMember(res.data);

            })

        } catch (error) {
            console.log(error);
        }
    }

    if(DataJobDetailJOB.length > 0) {
        GetDataJobMember();
    }

},[DataJobDetailJOB]);
  
  const handleChange = async (event) => {
    // setValueAssign_detail(event.target.value);

    await axios.post('http://localhost:5000/Job_upDateAssignDetail', {
      job_no: DataJobDetailJOB[0].job_no,
      assign_detail: event.target.value,

    }).then((res) => { })
  }; 

  return (
  <BootstrapDialog
      onClose={handleCancelJobDetailDialog}
      aria-labelledby="customized-dialog-title"
      sx={{ '& .MuiDialog-paper': { borderRadius: "15px", minWidth:"fit-content", height: "fit-content"}, overflowY: "overlay" }}
      scroll={'body'}
      open={openJobDetailDialog}
      {...other}
    >
        <BootstrapDialogTitle
          sx={{  p: 1.5 , color:"#1976d2", displa:"flex",alignItems:"center"}}
          id="customized-dialog-title"
          onClose={handleCancelJobDetailDialog}
        >
              <Box sx={{ fontSize: 16, display:"flex", alignItems:"center"}}>JOB TODAY &nbsp; &nbsp; { DataJobDetailJOB.length > 0  ?  <Typography sx={{ fontSize: 13}}> <Badge type={orderStatus[DataJobDetailJOB[0].status]} content={DataJobDetailJOB[0].status} /> </Typography>:  <Skeleton width={70} height={40} sx={{marginTop:-1,marginBottom:-1,borderRadius:"5px"}}/>}  </Box>

        </BootstrapDialogTitle>
        
        {/* <DialogContent dividers sx={{height:"480px"}}> */}
        <div className="Dialog-content-job">
      
          {
              DataJobDetail.length > 0 && DataJobDetailJOB.length > 0 ?
              <>
                  <div className="content_box_medie">                      
                      <Divider sx={{fontSize:10, fontWeight:500, paddingX: 1.5, paddingBottom:1.5 , color:"#1976d2"}} >JOB DATE &nbsp; {formatDateTime(DataJobDetailJOB[0].job_date,false)}</Divider>
                      <div className="content_flex_box">
                          <Box>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px"}}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>JOB NO.</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetailJOB[0].job_no}</Typography>
                                  {/* <InputBase sx={{fontWeight:0 ,fontSize:12,  ml: 1, flex: 1 }} name={"jobNo"}  id={"ID_jobNo" + DataJobDetail[0].tikket_no}  value={DataJobDetailJOB[0].job_no} placeholder="หมายเลข JOB"/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>REQUIRE DATE</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{formatDateTime(DataJobDetail[0].tikket_date,true)}</Typography>
                                  {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"reqDate"} id={"ID_reqDate" + DataJobDetail[0].tikket_no}  value={formatDateTime(DataJobDetail[0].tikket_date,true)} placeholder="วันที่ต้องการให้ปฎิบัติงาน"/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>APPROVE BY</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].review_by })].name_user_eng )}</Typography>
                                  {/* <InputBase sx={{fontSize:12, ml: 1, flex: 1 }} name={"appove_by"} required  id={"ID_approveBy" + DataJobDetail[0].tikket_no} value={subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].review_by })].name_user_eng )} placeholder="ผู้อนุมัติคำร้อง" inputProps={{ 'aria-label': 'ผู้อนุมัติตำร้อง' }}/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>ASSIGN BY</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].review_by })].name_user_eng )}</Typography>
                                  {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"assign_by"}  id={"ID_assign_by" + DataJobDetail[0].tikket_no}  value={ subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].createJob_by })].name_user_eng )} placeholder="วันที่ส่งคำร้องขอ"/> */}
                              </Paper> 
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>ASSIGN TO</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetailJOB.length > 0 ? subName( DataJobDetailJOB[0].schedul_tasks[0].account_users[0].name_user_eng ) : null }</Typography>
                                  {/* <InputBase sx={{fontSize:12, ml: 1, flex: 1 }}  name={"assignTo"}  id={"ID_assignTo" + DataJobDetail[0].tikket_no} value={ DataJobDetailJOB.length > 0 ? subName( DataJobDetailJOB[0].schedul_tasks[0].account_users[0].name_user_eng ) : null } placeholder="ผู้รับมอบหมายงาน" inputProps={{ 'aria-label': 'ผู้รับมอบหมายงาน' }}/> */}
                                  
                              </Paper>
                              {/* <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>ASSIGN DETAIL</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <InputBase sx={{fontSize:12,fontFamily:"kanit",  ml: 1, flex: 1 }}  required multiline minRows={1} maxRows={4} name={"assign_detail"}  id={"ID_assignDetail" + DataJobDetail[0].tikket_no} value={DataJobDetailJOB.length > 0 && DataJobDetailJOB[0].assign_detail !== null ? DataJobDetailJOB[0].assign_detail: "" }  placeholder="รายละเอียดการมอบหมาย" inputProps={{ 'aria-label': 'รายละเอียดการมอบหมาย' }}/>
                              </Paper> */}
                          </Box>
                      
                          <Box>
                              {/* <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:13, p: '2px 4px'}}>JOB DATE</Typography>
                                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                  <InputBase sx={{fontFamily:"kanit",fontSize:13,  ml: 1, flex: 1 }} name={"jobDate"}  id={"ID_jobDate" + DataJobDetail[0].tikket_no}  value={formatDateTime(DataJobDetailJOB[0].jobDate,true)} placeholder="วันที่ส่งคำร้องขอ"/>
                              </Paper>  */}
                              
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>SERVICE TYPE</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontFamily:"kanit",fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].service_types[0].title}</Typography>
                                  {/* <InputBase sx={{fontSize:12,fontFamily:"kanit",  ml: 1, flex: 1 }} name={"serviceType"}   id={"ID_serviceType" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].service_types[0].title} placeholder="ประเภทบริการ" inputProps={{ 'aria-label': 'ประเภทบริการ' }}/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>SERVICE OPTION</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontFamily:"kanit",fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].service_options[0].title}</Typography>
                                  {/* <InputBase sx={{fontSize:12,fontFamily:"kanit",  ml: 1, flex: 1 }} name={"serviceOption"}   id={"ID_serviceOption" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].service_options[0].title} placeholder="หัวข้อบริการ" inputProps={{ 'aria-label': 'หัวข้อบริการ' }}/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>REQUESTOR</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].account_users[0].level === "Maneger" ? "Maneger" + "  " + DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng : DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng }</Typography>
                                  {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"reqtor"}  id={"ID_reqtor" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].account_users[0].level === "Maneger" ? "Maneger" + "  " + DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng : DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng } placeholder="ผู้แจ้งคำร้อง" inputProps={{ 'aria-label': 'ผู้แจ้งคำร้อง' }}/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>SECTION</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].section_req}</Typography>
                                  {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"sec"}  id={"ID_sec" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].section_req}  placeholder="ส่วนงาน" inputProps={{ 'aria-label': 'ส่วนงาน' }}/> */}
                              </Paper>
                              <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>TEL</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{width: 80 ,fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].tel}</Typography>
                                  {/* <InputBase sx={{width: 20, fontSize:12,  ml: 1, flex: 1 }} name={"tel"}  id={"ID_tel" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].tel} placeholder="เบอร์ติดต่อ" inputProps={{ 'aria-label': 'เบอร์ติดต่อ' }}/> */}
                              
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>EMAIL</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{width: 80 ,fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].account_users[0].mail ? DataJobDetail[0].account_users[0].mail : " - "}</Typography>
                                  {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"con_mail"}  id={"ID_email" + DataJobDetail[0].tikket_no} value={DataJobDetail[0].account_users[0].mail ? DataJobDetail[0].account_users[0].mail : ""}  placeholder="อีเมล์พนักงาน" inputProps={{ 'aria-label': 'อีเมล์พนักงาน' }}/> */}

                              </Paper>
                              {/* <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>EMAIL</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"con_mail"}  id={"ID_email" + DataJobDetail[0].tikket_no} value={DataJobDetail[0].account_users[0].mail ? DataJobDetail[0].account_users[0].mail : ""}  placeholder="อีเมล์พนักงาน" inputProps={{ 'aria-label': 'อีเมล์พนักงาน' }}/>
                              </Paper> */}
                          </Box>

                      </div>
                  </div>

                  <div className="Dialog-content-edit">
                    <Typography sx={{fontSize:12, p: '2px 4px'}}>ASSIGN DETAIL</Typography>
                      <InputBase sx={{fontSize:12, fontFamily:"kanit",width: "100%", flex: 1, border:1, borderColor:"#dddddd", padding: 0.5}}  
                        key={DataJobDetail[0].tikket_no} 
                        multiline 
                        minRows={2} 
                        maxRows={4} 
                        name={"assign_detail"}  
                        id={"id_assignDetail"+DataJobDetail[0].tikket_no} 
                        defaultValue={DataJobDetailJOB.length > 0 && DataJobDetailJOB[0].assign_detail !== null ? DataJobDetailJOB[0].assign_detail: "" } 
                        placeholder="รายละเอียดการมอบหมาย" inputProps={{ 'aria-label': 'รายละเอียดการมอบหมาย' }}
                        onChange={handleChange}
                      />

                  </div>
                  
                  <div className="content_box_medie">   
                      <UncontrolledTabs initialActiveTabId="overview" >
                          <div className="box-nav-dialog">
                              <Nav pills className="search-n">
                              </Nav>
                              <Nav pills id="box-dialog">
                                  <NavItem className="nav-tab-dialog">
                                      <UncontrolledTabs.NavLink tabId="overview" className="btn letter active">
                                          JOB DETAIL
                                      </UncontrolledTabs.NavLink>
                                  
                                      <UncontrolledTabs.NavLink tabId="jobaction" className="btn letter"> 
                                          JOB ACTION
                                      </UncontrolledTabs.NavLink>
                                     
                                      {
                                          DataJobMember.length > 1 ?
                                              <UncontrolledTabs.NavLink tabId="jobmember" className="btn letter"> 
                                                  JOB MEMBER
                                              </UncontrolledTabs.NavLink>
                                          :
                                              null
                                      }

                                  </NavItem>
                              </Nav>
                          </div>

                          <UncontrolledTabs.TabContent>

                              <TabPane tabId="overview" id="Overview">
                                  <Box sx={{mx: 1}}> 
                                      {/* <Divider sx={{fontSize:10, fontWeight:500, p:1.5 , color:"#1976d2"}} >ITEM REQ.</Divider> */}
                                      {
                                          DataJobDetail[0].service_item_tikkets.map((item, index) => (
                                              <Paper key={"key" + index + DataJobDetail[0].tikket_no}  sx={{ p: '0.5px 4px', display: 'flex', alignItems: 'center', width: "100%" ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                  <Typography sx={{fontFamily:"kanit",fontSize:12, p: '2px 4px', width: "35%", overflowY: 'overlay',whiteSpace:'nowrap'}}>{item.title}</Typography>
                                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                  <InputBase sx={{fontFamily:"kanit",fontSize:12,  ml: 1, flex: 1 }} name={item.title}   id={"ID_itemReq" + index + DataJobDetail[0].tikket_no}  value={item.value }/>
                                              </Paper>  
                                          ))
                                      }
                                  </Box>
                              </TabPane>

                              <TabPane tabId="jobaction" id="Jobaction">
                                  <div className="content_flex_box">
                                      <Box> 
                                          {/* <Divider sx={{fontSize:10 ,fontWeight:500, p: 1.5, color:"#1976d2"}} >JOB ACTION</Divider> */}
                                          <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                              <Typography sx={{fontSize:12, p: '2px 4px'}}>PLAN START</Typography>
                                              <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                              <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"planStart"}  id={"ID_planStart" + DataJobDetail[0].tikket_no}  value={formatDateTime(DataJobDetailJOB[0].startDate,true)} placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                          </Paper>
                                          <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                              <Typography sx={{fontSize:12, p: '2px 4px'}}>PLAN TARGET</Typography>
                                              <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                              <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"planTarget"}  id={"ID_planTarget" + DataJobDetail[0].tikket_no} value={formatDateTime(DataJobDetailJOB[0].endDate,true)}  placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                          </Paper>
                                      </Box>
                                      <Box> 
                                          <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                              <Typography sx={{fontSize:12, p: '2px 4px'}}>OPEN DATE</Typography>
                                              <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                              <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"opendate"}  id={"ID_planStart" + DataJobDetail[0].tikket_no}  value={ DataJobDetailJOB[0].open_date !== null ? formatDateTime(DataJobDetailJOB[0].open_date,true) : "" } placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                          </Paper>
                                          <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                              <Typography sx={{fontSize:12, p: '2px 4px'}}>CLOSE DATE</Typography>
                                              <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                              <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"closedate"}  id={"ID_planTarget" + DataJobDetail[0].tikket_no} value={ DataJobDetailJOB[0].close_date !== null ? formatDateTime(DataJobDetailJOB[0].close_date,true) : "" }  placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                          </Paper>
                                      </Box>
                                  </div>
                                    {
                                      DataJobDetailJOB.length > 0 &&  DataJobDetailJOB[0].status === "finish"?
                                        <div className="content_flex_box">
                                            <Box> 
                                                <Divider sx={{fontSize:10 ,fontWeight:500, p: 0.7, color:"#1976d2"}} >DETAIL CLOSE JOB</Divider>
                                                <div className="content_flex_box">

                                                    <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                        <Typography sx={{fontSize:12, p: '2px 4px'}}>ROOOT CASE</Typography>
                                                        <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                        <InputBase sx={{fontFamily:"kanit",fontSize:12, px:1 , ml: 1, flex: 1 }} value={DataJobDetailJOB[0].rootcases[0].rootcase_name} name={"rootcase"}  id={"ID_rootcase" + DataJobDetail[0].tikket_no}  placeholder=""/>
                                                    </Paper> 

                                                    <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                        <Typography sx={{fontSize:12, p: '2px 4px'}}>ROOT ITEM</Typography>
                                                        <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                        <InputBase sx={{fontFamily:"kanit",fontSize:12, px:1 , ml: 1, flex: 1 }} value={DataJobDetailJOB[0].rootitems[0].rootitem_name} name={"rootitem"}  id={"ID_rootitem" + DataJobDetail[0].tikket_no}  placeholder=""/>
                                                    </Paper> 

                                                </div>
                                                <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center',borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>SOLUTION NOTE</Typography>
                                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                    <InputBase sx={{fontSize:12,fontFamily:"kanit", px:1 , ml: 1, flex: 1 }}  required multiline minRows={1} maxRows={4} name={"solutionnote"} value={DataJobDetailJOB[0].solutionnote} id={"ID_solutionnote" + DataJobDetail[0].tikket_no} placeholder="รายละเอียดงาน"/>
                                                </Paper>
                                            </Box>
                                        </div>
                                     :
                                        null

                                    }
                                
                              </TabPane>

                              {
                                  DataJobMember.length > 1 ?
                                      <TabPane tabId="jobmember" id="Jobmember">
                                          <Box sx={{mx: 1}}> 
                                          {
                                                  DataJobMember.map((item, index) => (
                                                      <Paper key={"key" + index}  sx={{ p: '0.5px 4px', display: 'flex', alignItems: 'center', width: "100%" ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                          <Typography sx={{fontFamily:"kanit",fontSize:12, p: '2px 4px', width: "10%", overflowY: 'overlay',whiteSpace:'nowrap'}}>{item.level_assign === 1? "Head" : "Member"}</Typography>
                                                          <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                          <Typography sx={{fontFamily:"kanit",fontSize:12,  ml: 1, flex: 1 }}>{item.account_users[0].name_user_eng}</Typography>
                                                      </Paper>  
                                                  ))
                                          }
                                          </Box>
                                      </TabPane>
                                  :
                                      null
                              }

                          </UncontrolledTabs.TabContent>
                      </UncontrolledTabs>                   

                  </div>
              </>
          :
              <>
                  <div className="content_box_medie">                      
                      <Skeleton height={43} sx={{marginX:1,marginTop:-2,marginBottom:0}}/>

                      <div className="content_flex_box">
                          <Skeleton width={350} height={296} sx={{marginTop:-8,marginBottom:-6.5,marginX:1}}/>
                          <Skeleton width={350} height={296} sx={{marginTop:-8,marginBottom:-6.5,marginX:1}}/>
                      </div>

                      <Skeleton  height={296} sx={{marginTop:-3,marginBottom:-2,marginX:1}}/>
                  </div>         
              </>
             }
          {/* </DialogContent> */}
        </div>
       
    </BootstrapDialog>
  )
}

// function JobEditAssignDetail(props) {
//   const { tikketNo, onCloseAssignDetailDialog, openAssignDetailDialog, ...other } = props;
//   const [DataJobDetailJOB, setDataJobDetailJOB] = useState([]);
//   const [valueAssign_detail, setValueAssign_detail] =useState(null);

//   const handleCancelAssignDetailDialog = () => {
//     onCloseAssignDetailDialog();
//     setDataJobDetailJOB([])
//     setValueAssign_detail(null)
//   };

//   useEffect(() => {
//     const GetDataJobDetail = async (tikketNo) => {
//       await axios.post('http://localhost:5000/getDataJobCut', {
//         tikket_no: tikketNo,
  
//       }).then((res) => {  
//         setDataJobDetailJOB(res.data);
  
//       })
//     }
   
//     if(tikketNo !== "") {
//       GetDataJobDetail(tikketNo);
//     }

//   },[tikketNo]);
  
 
//   useEffect(() => {
//     if(DataJobDetailJOB.length > 0) {
//       setValueAssign_detail(DataJobDetailJOB[0].assign_detail)

//     }

//   },[DataJobDetailJOB]);

//   const handleChange = (event) => {
//     setValueAssign_detail(event.target.value);
//   };

//   const handleAssignDetailSave = async() => {

//     await axios.post('http://localhost:5000/Job_upDateAssignDetail', {
//       job_no: DataJobDetailJOB[0].job_no,
//       assign_detail: valueAssign_detail,

//     }).then((res) => { 

//       if( res.data.msg !== null) {
//         notify(
//           {
//               message: res.data.msg, 
//               width: 400,
//               position: {
//                   at: "top",
//                   my: "top",
//                   of: "#container"
//               }
//           },
//           'success', 800
//         );
//       }
      
//     })

//     handleCancelAssignDetailDialog();

//   };


//   return (
//   <BootstrapDialog
//       onClose={handleCancelAssignDetailDialog}
//       aria-labelledby="customized-dialog-title"
//       sx={{ '& .MuiDialog-paper': { borderRadius: "15px", width: 450}, overflowY: "overlay" }}
//       scroll={'body'}
//       open={openAssignDetailDialog}
//       {...other}
//     >
//         <BootstrapDialogTitle
//           sx={{  p: 1.5 , color:"#1976d2", displa:"flex",alignItems:"center"}}
//           id="customized-dialog-title"
//           onClose={handleCancelAssignDetailDialog}
//         >
//               <Box sx={{ fontSize: 16, display:"flex", alignItems:"center"}}>Assign Detail</Box>

//         </BootstrapDialogTitle>
        
//         <div className="Dialog-content-xx">
//             <InputBase sx={{fontSize:12, fontFamily:"kanit",width: "100%", flex: 1, border:1, borderColor:"#dddddd", padding: 0.5}}  
//               key={tikketNo} 
//               multiline 
//               minRows={4} 
//               maxRows={4} 
//               name={"assign_detail"}  
//               id={"id_assignDetail"+tikketNo} 
//               defaultValue={valueAssign_detail} 
//               placeholder="รายละเอียดการมอบหมาย" inputProps={{ 'aria-label': 'รายละเอียดการมอบหมาย' }}
//               onChange={handleChange}
//             />

//         </div>

//         <Box sx={ {padding:1, display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
//           <Button className="assign_detail-save"
//             icon="bx bxs-save"
//             text="save"
//             onClick={()=>handleAssignDetailSave()} 
//           />
//           {/* <Typography sx={{ fontSize: 10, textAlign:'center', marginTop: .5}}>save</Typography> */}
//         </Box>
       
//     </BootstrapDialog>
//   )
// }

const ManageTaskJob = () => {
  const [currentView, setCurrentView] = useState(views[0]);

  const [UserIt, setUserIt] = useState([]);
  const [datatikket, setdatatikket] = useState([]);
  const [dataJob_it, setdataJob_it] = useState([]);

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [dataDialog, setDataDialog] = useState([]);

  const getDataScheduGetUserAccountForSchedu = async (e) => {
    try {

        await axios.get('http://localhost:5000/getUserAccountForSchedu', { }).then((res) => {  
          setUserIt(res.data);
        })
      
    } catch (error) {
        console.log(error);
    }
  }

  const getDataScheduGetDataJobForSchedu = async (e) => {
    try {

        await axios.get('http://localhost:5000/getDataJobForSchedu', {
          
        }).then((res) => {  
          setdataJob_it(res.data);   
          // console.log(res.data)
        })

      
    } catch (error) {
        console.log(error);
    }
  }

  const getDataScheduGetDataTikket = async (e) => {
    try {
        await axios.post('http://localhost:5000/getDataTikket', {
          status: ['approve'],
          createJob_by: null

        }).then((res) => {  
          setdatatikket(res.data);   
        })
      
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getDataScheduGetUserAccountForSchedu();
    getDataScheduGetDataTikket();
    getDataScheduGetDataJobForSchedu();
    
  },[]);

  const onContentReady = (e) => {
    e.component.scrollTo(new Date());
  }

  const onAppointmentClick = (e) => {
    e.cancel = true;
  }
  // const renderDataCell = (itemData) => {
  //   const CellTemplate = currentView === 'month'
  //     ? DataCellMonth
  //     : DataCell;

  //   return <CellTemplate itemData={itemData} />;
  // };

  // const renderDateCell = (itemData) => <DateCell itemData={itemData} currentView={currentView} />;

  // const renderTimeCell = (itemData) => <TimeCell itemData={itemData} />;

  const handleDialogConfirm = (e) => {
    setDataDialog(e)
    setOpenDialogConfirm(true);

  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(false);
    setDataDialog([])

  };

  const DialogConfirm = async (e) => {

    handleDialogConfirm([{
      book_id: e.book_id,
      borrower_name: e.borrower_name, 
      time: formatTime(e.displayStartDate) + ' - ' + formatTime(e.displayEndDate)
    }])
  }

  const onAppointmentFormOpening = (e) =>{
    // const startDate = new Date(e.appointmentData.startDate);

    let userInfo = Query(UserIt).filter(['id', e.appointmentData.assign]).toArray()[0] || {};
    let DetailTikket;
    let checkfilter = dataJob_it.filter((jobtime) => (jobtime.assign === e.appointmentData.assign) && isRangeOverlap([new Date(new Date(e.appointmentData.startDate).setSeconds(1)), new Date(e.appointmentData.endDate)],[new Date(new Date(jobtime.startDate).setSeconds(1)), new Date(jobtime.endDate)]))

    // let toolbarItems = e.popup.option("toolbarItems"); 
    
    // toolbarItems.forEach(item=>{ 
    //    if(item.options && item.options.text === "Done")
    //        item.options.text = "ii";
    // })

    // e.popup.option("toolbarItems",[toolbarItems[1]]);
    
    // if (!Utils.isValidAppointmentDate(startDate) ) {
    //   e.cancel = true;
    //   notifyDisableDate('ช่วงเวลาที่เลือก ไม่ได้อยู่ในช่วงเวลาที่สามารถมอบหมายงานได้');
    // }

    const { form } = e;

    if ((new Date(e.appointmentData.startDate) < new Date() || new Date(e.appointmentData.endDate) < new Date()) || checkfilter.length !== 0 )  {
      // e.cancel = true;
      let txtAlert;

      if (new Date(e.appointmentData.startDate) < new Date() || new Date(e.appointmentData.endDate) < new Date()) {
        txtAlert = 'ช่วงเวลาที่เลือก ไม่ได้อยู่ในช่วงเวลาที่สามารถมอบหมายงานได้'

      } else if (checkfilter.length !== 0) {
        txtAlert = 'ช่วงเวลาที่คุณเลือกชนกับเวลางานอื่น'

      } 
      
      form.option('items', [ 
        {
          label: {
            text: 'ALERT !!!',
          },
          width: '100%',
          colSpan: 2,
  
        },{

          label: {
            text: txtAlert,
          },
          width: '100%',
          colSpan: 2,

        } 
      ])

      if(e.popup.option("toolbarItems").length > 1) {
        e.popup.option("toolbarItems", [e.popup.option("toolbarItems")[1]]);

      }
      
      // notifyDisableDate('ช่วงเวลาที่เลือก ไม่ได้อยู่ในช่วงเวลาที่สามารถมอบหมายงานได้');
      // notifyDisableDate('ช่วงเวลาที่คุณเลือกชนกับเวลางานอื่น');

    } else {
      
        if(datatikket.length > 0) {
          form.updateData('service_options', datatikket[0].service_options[0].title);
          form.updateData('tel', datatikket[0].tel);
          form.updateData('section_req', datatikket[0].section_req);
          form.updateData('approve_by', datatikket[0].review_by);
          form.updateData('requestor', datatikket[0].account_users[datatikket[0].account_users.findIndex(object => { return object.id_user === datatikket[0].requestor })].name_user_eng);

        }

        let ITtimefilter = dataJob_it.filter((jobtime) => (formatDate(e.appointmentData.startDate) === formatDate(jobtime.startDate)) && isRangeOverlap([new Date(new Date(e.appointmentData.startDate).setSeconds(1)), new Date(e.appointmentData.endDate)],[new Date(new Date(jobtime.startDate).setSeconds(1)), new Date(jobtime.endDate)]))
        let newITtimefilter = UserIt.filter((it) => (ITtimefilter.findIndex(object => { return it.id === object.assign } ) === -1) && it.id !== userInfo.id)

        
        form.option('items', [
          {
            label: {
              text: 'ASSIGN JOB',
            },
            width: '100%',
            colSpan: 2,
          },
          {
            name: 'assignDisplay',
            label: {
              text: 'Assign to',
            },
            editorType: 'dxSelectBox',
            dataField: 'assign',
            colSpan: 2,
            width: '100%',
            editorOptions: {
              items: UserIt,
              displayExpr: 'text',
              valueExpr: 'id',
              readOnly: true,
              // onValueChanged(args) {
              //   userInfo = dataJob_it[dataJob_it.findIndex(object => { return object.id === args.value })]
              //   if(userInfo) {
              //     form.updateData('requestor', userInfo.text);
                
              //   }
              // },
            },
          },
          {
            name: 'assign_detail',
            label: {
              text: 'Assign Detail',
            },
            editorType: 'dxTextArea',
            dataField: 'assign_detail',
            colSpan: 2,
            value:"",
            height: 140
          },
          {
            name: 'job_assistant',
            label: {
              text: 'Job Assistant',
            },
            editorType: 'dxTagBox',
            dataField: 'job_assistant',
            allowMultiple: true,
            colSpan: 2,
            width: '100%',
            editorOptions: {
              items: newITtimefilter,
              displayExpr: 'text',
              valueExpr: 'id',
              value: null
              // onValueChanged(args) {
              //   userInfo = dataJob_it[dataJob_it.findIndex(object => { return object.id === args.value })]
              //   if(userInfo) {
              //     form.updateData('requestor', userInfo.text);
                
              //   }
              // },
            },
          },
          {
            label: {
              text: 'Request',
            },
            width: '100%',
            colSpan: 2,
          },
          {
            name: 'request',
            label: {
              text: 'Request No.',
            },
            editorType: 'dxSelectBox',
            dataField: 'tikket_no',
            editorOptions: {
              items: datatikket,
              displayExpr: 'tikket_no',
              valueExpr: 'tikket_no',
              value: datatikket.length > 0 ? datatikket[0].tikket_no : '',
              onValueChanged(args) {
                DetailTikket = datatikket[datatikket.findIndex(object => { return object.tikket_no === args.value })]
                // console.log(DetailTikket);
                if(args.value !== '' && datatikket.length > 0 && DetailTikket) {
                  form.updateData('service_options', DetailTikket.service_options[0].title);
                  form.updateData('tel', DetailTikket.tel);
                  form.updateData('section_req', DetailTikket.section_req);
                  form.updateData('approve_by', DetailTikket.review_by);
                  form.updateData('requestor', DetailTikket.account_users[DetailTikket.account_users.findIndex(object => { return object.id_user === DetailTikket.requestor })].name_user_eng);
                
                }
              },
            },
          },
          {
            name: 'requestor',
            label: {
              text: 'Requestor',
            },
            editorType: 'dxTextBox',
            dataField: 'requestor',
            editorOptions: {
              readOnly: true,
            
            },
          },
          {
            name: 'service_options',
            label: {
              text: 'Service',
            },
            editorType: 'dxTextBox',
            dataField: 'service_options',
            editorOptions: {
              readOnly: true,
            
            },
          }, 
          {
            name: 'section_req',
            label: {
              text: 'Section',
            },
            editorType: 'dxTextBox',
            dataField: 'section_req',
            editorOptions: {
              readOnly: true,
            
            },
          },
          {
            label: {
              text: 'Deadline',
            },
            width: '100%',
            colSpan: 2,
          },
          {
            name: 'startDate',
            dataField: 'startDate',
            editorType: 'dxDateBox',
            editorOptions: {
              width: '100%',
              type: 'datetime',
              readOnly: true,
            
            },
          }, 
          {
            name: 'endDate',
            dataField: 'endDate',
            editorType: 'dxDateBox',
            editorOptions: {
              width: '100%',
              type: 'datetime',
              readOnly: true,
            
              // readOnly: true,
            },
          }

        ]);

        form.updateData('assign_by', localStorage.getItem('id_user_login'));
        form.updateData('assignDisplay', userInfo.id);

        form.itemOption("request", {isRequired: true, });

    }

  }

  const onAppointmentUpdating = (e) =>{
    console.log(e)
  
  }

  const DatecurrentforID = moment().tz("Asia/Bangkok").format("YYMMDD")

  const CreateJOB = async (e) => {

    if(e.tikket_no === null || e.tikket_no === "") {
      return;
    }

    const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")

    try {
       await axios.get('http://localhost:5000/LastJob', {

       }).then(async (res) => {  

        if(res.data.length > 0) {

          let id_index = parseInt((res.data[0].job_no).substring(10,))
          let new_id = ""
          let nameId = "JOB" + DatecurrentforID + "-"
          if ((id_index + 1) < 10) {
            new_id = nameId + "00000"+ ( id_index + 1 ).toString()
  
          } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
            new_id = nameId + "0000"+ ( id_index + 1 ).toString()
  
          } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
            new_id = nameId + "000"+ ( id_index + 1 ).toString()
  
          } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
            new_id = nameId + "00"+ ( id_index + 1 ).toString()
  
          } else if ((id_index + 1) >= 10000) {
            new_id = nameId + "0"+ ( id_index + 1 ).toString()
          } else {
            new_id = nameId + ( id_index + 1 ).toString()
          }

          // let status = false;

          try {
              await axios.post('http://localhost:5000/CreateJob', {
                job_no: new_id,  
                approve_by: e.approve_by,
                assign_detail: e.assign_detail,
                job_date: Datecurrent,
                open_date: null,
                startDate: e.startDate,
                endDate: e.endDate,
                close_date: null,
                rootcase: "-",
                rootitem: "-",
                solutionnote: null,
                status: "pending",
                tikket_no: e.tikket_no,
                createJob_by: e.assign_by,
                assign: e.assign,
                job_assistant: typeof e.job_assistant !== 'undefined' ? e.job_assistant : []

              }).then((res) => {  
                  // console.log(res.data)
                getDataScheduGetDataTikket();
                getDataScheduGetDataJobForSchedu();
                // status = true;

                notify(
                  {
                      message: 'Assign complete', 
                      width: 400,
                      position: {
                          at: "top",
                          my: "top",
                          of: "#container"
                      }
                  },
                  'success', 800
                );
  
              })
  
  
          } catch (error) {
              console.log(error);
  
          }

          // if(status) {
          //   showUpdatedToast()
          // }

        }

      })

    } catch (error) {
      console.log(error);

    }
  }

  const UpdateJob = async (e) => {
    console.log(e)
    let checkfilter = dataJob_it.filter((jobtime) => (jobtime.job_no !== e.job_no) && (jobtime.assign === e.assign) && isRangeOverlap([new Date(new Date(e.startDate).setSeconds(1)), new Date(e.endDate)],[new Date(new Date(jobtime.startDate).setSeconds(1)), new Date(jobtime.endDate)]))
    let checkfilter1 = dataJob_it.filter((jobtime) => (jobtime.job_no !== e.job_no) && isRangeOverlap([new Date(new Date(e.startDate).setSeconds(1)), new Date(e.endDate)],[new Date(new Date(jobtime.startDate).setSeconds(1)), new Date(jobtime.endDate)]) )
    // let checkfilter3 = dataJob_it.filter((jobtime) => (jobtime.assign === checkfilter1.assign) && isRangeOverlap([new Date(new Date(checkfilter1.startDate).setSeconds(1)), new Date(checkfilter1.endDate)],[new Date(new Date(jobtime.startDate).setSeconds(1)), new Date(jobtime.endDate)]))

    // if(new Date(e.startDate) < new Date() && new Date(e.endDate)  new Date() ) {
    //   notify(
    //     {
    //         message: "ช่วงเวลาที่คุณเลือกไม่ได้อยู่ในช่วงเวลาที่สามารถแก้ไขได้", 
    //         width: 400,
    //         position: {
    //             at: "top",
    //             my: "top",
    //             of: "#container"
    //         }
    //     },
    //     'warning', 800
    //   );

    //   getDataScheduGetDataJobForSchedu();

    //   return
    // }

    if(e.status === "finish" ) {
      notify(
        {
            message: "ไม่สามารถแก้ไขได้เนื่องจากงานนี้ถูกดำเนินการเสร็จสิ้นเเล้ว", 
            width: 400,
            position: {
                at: "top",
                my: "top",
                of: "#container"
            }
        },
        'warning', 800
      );

      getDataScheduGetDataJobForSchedu();

      return
    }

    if(e.level_assign !== 1) {
      notify(
        {
            message: "ไม่สามารถแก้ไขได้เนื่องจากบุคคนนี้ไม่ใช้ Head ของงานนี้", 
            width: 400,
            position: {
                at: "top",
                my: "top",
                of: "#container"
            }
        },
        'warning', 800
      );

      getDataScheduGetDataJobForSchedu();

      return
    }

    

    if (checkfilter.length !== 0 || checkfilter1.length !== 0) {
      notify(
        {
            message: "ช่วงเวลาที่คุณเลือกทับซ้อนกับงานอื่น", 
            width: 400,
            position: {
                at: "top",
                my: "top",
                of: "#container"
            }
        },
        'warning', 800
      );

      getDataScheduGetDataJobForSchedu();

      return

    } 


    try {
       await axios.post('http://localhost:5000/UpdateJob', {

          job_no: e.job_no,
          startDate: e.startDate,
          endDate: e.endDate

       }).then((res) => {  

        if( res.data.msg !== null) {
          notify(
            {
                message: res.data.msg, 
                width: 400,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            'success', 800
          );
  
          getDataScheduGetDataTikket();
          getDataScheduGetDataJobForSchedu();
        }

      })

    } catch (error) {
      console.log(error);

    }
  }

  const CancalJob = async (e) => {
    await axios.post('http://localhost:5000/CanceltaskJob', {
      tikket_no: e.tikket_no,
      job_no: e.job_no,
      assign: e.assign,
      level_assign: e.level_assign,

    }).then((res) => {  

      if( res.data.msg !== null) {
        notify(
          {
              message: res.data.msg, 
              width: 400,
              position: {
                  at: "top",
                  my: "top",
                  of: "#container"
              }
          },
          'success', 800
        );

        getDataScheduGetDataTikket();
        getDataScheduGetDataJobForSchedu();
      }

    })
   
  }

  
  const funcUpdataTaskJob = async (e) => {
    // console.log(e)

    // if(new Date(e.appointmentData.startDate) < new Date() && new Date(e.appointmentData.endDate) <= new Date() ) {
    //   showErrorToast()
    //   return
    // }

    CreateJOB(e.appointmentData)

  }

  // const funcUpdated = async (e) => {
  //   console.log(e)

  //   UpdateJob(e.appointmentData)
    
  // }

  const [openJobDetailDialog, setOpenJobDetailDialog] = useState(false);
  const [tikketNo, setTikketNo] = useState("");
  const [detailcanceljob, setdetailcanceljob] = useState([]);
  const [detailUpdatejob, setdetailUpdatejob] = useState([]);

  const handleJobDetailDialog = (e) => {
    setOpenJobDetailDialog(true);
    setTikketNo(e);

  };

  const handleCloseJobDetailDialog = () => {
    setOpenJobDetailDialog(false);
    setTikketNo("")

  };
  ////////////////////////////////////////////////////////////////////////
  // const [openAssignDetailDialog, setOpenAssignDetailDialog] = useState(false);

  // const handleAssignDetailDialog = (e) => {
  //   setOpenAssignDetailDialog(true);
  //   setTikketNo(e);
  // };

  // const handleCloseAssignDetailDialog = () => {
  //   setOpenAssignDetailDialog(false);
  //   setTikketNo("")
  // };
  /////////////////////////////////////////////////////////////////////////
  const [openConfirmationDialogRemoveJob, setConfirmationDialogRemoveJob] = useState(false);

  const handleRemoveJobDialog = (e) => {
    setConfirmationDialogRemoveJob(true);
    setdetailcanceljob(e);
  };

  const handleCloseRemoveJobDialog = () => {
    setConfirmationDialogRemoveJob(false);
    setdetailcanceljob([])
  };
  /////////////////////////////////////////////////////////////////////////
  const [openConfirmationDialogUpdateJob, setConfirmationDialogUpdateJob] = useState(false);

  const handleUpdateJobDialog = (e) => {
    setConfirmationDialogUpdateJob(true);
    setdetailUpdatejob(e.appointmentData);
  };

  const handleCloseUpdateJobDialog = () => {
    setConfirmationDialogUpdateJob(false);
    setdetailUpdatejob([])
  };

  const renderAppointment = (model) => {
    const { targetedAppointmentData } = model.data;
    const userInfo = Query(UserIt).filter(['id', targetedAppointmentData.id]).toArray()[0] || {};

    // const section = Query(this.props.section).filter(['id', targetedAppointmentData.section]).toArray()[0] || {};
  
    // form.updateData('service_options', DetailTikket.service_options[0].title);
    // form.updateData('tel', DetailTikket.tel);
    // form.updateData('section_req', DetailTikket.tel);

    return (
      <LightTooltip 
          title={
            <div className="device-center-tooltip">
              {formatDateTime(targetedAppointmentData.displayStartDate)}
              <div>
                <div><i className='bx bxs-phone'></i>&nbsp; : {targetedAppointmentData.tel}&nbsp;&nbsp;Sec : {targetedAppointmentData.section_req}</div>
              </div>
              
              <div className="device-center-info">
                <i className='bx bx-time'></i>&nbsp;
                {formatTime(targetedAppointmentData.displayStartDate)}
                {' - '}
                {formatTime(targetedAppointmentData.displayEndDate)}
              </div>
              <div className="box-btn-cancel">
                {
                    targetedAppointmentData.status !== "finish" && targetedAppointmentData.assign_by === localStorage.getItem('id_user_login') ?  
                      <Stack spacing={2} direction="row">
                        <Box>
                          <Button className="device-center-Cancel"
                            icon="bx bx-notepad"
                            onClick={()=>handleJobDetailDialog(targetedAppointmentData.tikket_no)} 
                          />
                          <Typography sx={{ fontSize: 10, textAlign:'center', marginTop: .5}}>View</Typography>
                        </Box>

                        {/* <Box>
                          <Button className="device-center-Assign"
                            icon="bx bx-comment-detail"
                            onClick={()=>handleAssignDetailDialog(targetedAppointmentData.tikket_no)} 
                          />
                          <Typography sx={{ fontSize: 10, textAlign:'center', marginTop: .5}}>Assign</Typography>
                        </Box> */}
                        
                        {/* <Box>
                          <Button className="device-center-Edit"
                            icon="bx bx-timer"
                            onClick={()=>handleJobDetailDialog(targetedAppointmentData.tikket_no)} 
                          />
                          <Typography sx={{ fontSize: 10, textAlign:'center', marginTop: .5}}>Edit</Typography>

                        </Box> */}

                        <Box>
                          <Button className="device-center-Cancel"
                            icon="bx bx-task-x"
                            onClick={()=>handleRemoveJobDialog({tikket_no: targetedAppointmentData.tikket_no,job_no: targetedAppointmentData.job_no, assign: targetedAppointmentData.assign, level_assign: targetedAppointmentData.level_assign})} 
                            />
                          <Typography sx={{ fontSize: 10, textAlign:'center', marginTop: .5}}>Cancel</Typography>
                        </Box>
                      </Stack>
                      
                    :
                      <Stack spacing={2} direction="row">
                        <Box>
                          <Button className="device-center-Cancel"
                            icon="bx bx-notepad"
                            onClick={()=>handleJobDetailDialog(targetedAppointmentData.tikket_no)} 
                          />
                          <Typography sx={{ fontSize: 10, textAlign:'center', marginTop: .5}}>View</Typography>
                        </Box>
                      </Stack>
                      
                }
                
              </div>
            </div>
          }
          key={targetedAppointmentData.tikket_no}
          placement="top-start"
          // disableFocusListener={false} 
          // disableHoverListener={false} 
          // disableTouchListener={false} 
          arrow
      >

        {/* <div className= {"showtime-preview font-family-Roboto" + " showtime-preview-header-"+targetedAppointmentData.status} > */}
        <div className= {"showtime-preview font-family-Roboto" + (targetedAppointmentData.level_assign === 1 ?" showtime-preview-header-"+targetedAppointmentData.status : " showtime-preview-member-"+targetedAppointmentData.status) } >
          {
            targetedAppointmentData.level_assign === 1 ?
              <i class='bx bx-heading showtime-icon-preview'></i>
            :
              targetedAppointmentData.level_assign === 2 ?
                <i class='bx bx-run showtime-icon-preview'></i>
              :
                null

          }
          <i className='bx bx-notepad' > {targetedAppointmentData.tikket_no	}</i>
          <div> Requestor : {targetedAppointmentData.requestor}</div>
          <div className='font-family-Kanit' > Service : {targetedAppointmentData.service_options}</div>
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

  return (
    <div className="layout-component m_r content-timeline-sh-react">

      <h2 className="page-header">
          { "Task JOB".toUpperCase() }
      </h2>

      <div className="row box-scroll">
          <div className="col-12">
              <div className="card-g dataUser-min-h">
                <JobDetail
                  id="ringtone-menu"
                  keepMounted
                  openJobDetailDialog={openJobDetailDialog}
                  onCloseJobDetailDialog={handleCloseJobDetailDialog}
                  tikketNo={tikketNo}
                /> 

                {/* <JobEditAssignDetail
                  id="ringtone-menu"
                  keepMounted
                  openAssignDetailDialog={openAssignDetailDialog}
                  onCloseAssignDetailDialog={handleCloseAssignDetailDialog}
                  tikketNo={tikketNo}
                />  */}

                <ConfirmationDialogRemoveJob
                  id="ringtone-menu"
                  keepMounted
                  openConfirmationDialogRemoveJob={openConfirmationDialogRemoveJob}
                  onCloseRemoveJobDialog={handleCloseRemoveJobDialog}
                  detailcanceljob={detailcanceljob}
                  CancalJob={(e) => CancalJob(e)}
                />

                <ConfirmationDialogUpdateJob
                  id="ringtone-menu"
                  keepMounted
                  openConfirmationDialogUpdateJob={openConfirmationDialogUpdateJob}
                  onCloseUpdateJobDialog={handleCloseUpdateJobDialog}
                  detailUpdatejob={detailUpdatejob}
                  UpdateJob={(e) => UpdateJob(e)}
                  getDataScheduGetDataJobForSchedu={getDataScheduGetDataJobForSchedu}
                />    

                    <React.Fragment>
                      <Scheduler
                          dataSource={dataJob_it}
                          views={views}
                          editing={{allowAdding: true,
                            allowDeleting: false,
                            allowResizing: true,
                            allowDragging: false,
                            allowUpdating: true}}
                          defaultCurrentView="Timeline Week"
                          showCurrentTimeIndicator={true}
                          shadeUntilCurrentTime={true}
                          defaultCurrentDate={currentDate}
                          groups={groups}
                          height={495}
                          cellDuration={30}
                          firstDayOfWeek={0}
                          startDayHour={1}
                          endDayHour={24}
                          // dataCellRender={renderDataCell}
                          // dateCellRender={renderDateCell}
                          // timeCellRender={renderTimeCell}
                          onContentReady={onContentReady}
                          appointmentComponent={renderAppointment}
                          onAppointmentFormOpening={onAppointmentFormOpening}
                          onAppointmentAdded={funcUpdataTaskJob}
                          onAppointmentUpdating={onAppointmentUpdating}
                          onAppointmentUpdated={handleUpdateJobDialog}
                          onAppointmentClick={onAppointmentClick}
                      >
                          <Editing allowDeleting={true} />

                          <Resource
                            dataSource={UserIt.length > 0 ? UserIt : []}
                            fieldExpr="assign"
                            allowMultiple={true}
                          />

                          <Resource
                            dataSource={datatikket}
                            fieldExpr="Datatikket"
                            // useColorAsDefault={true}
                          />

                          <Resource
                            dataSource={dataJob_it}
                            fieldExpr="DataJob_it"
                            useColorAsDefault={true}
                          />

                      </Scheduler>
                    
                    </React.Fragment>
       
            </div>
          </div>
      </div>
    </div> 
  )
}

export default ManageTaskJob
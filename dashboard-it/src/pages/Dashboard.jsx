import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import dateShortcode from 'date-shortcode'
import PropTypes from 'prop-types';
import moment from "moment";
import "moment-timezone";

import '../components/status-card/statuscard.css'
import Table from '../components/table/Table'
import Badge from '../components/badge/Badge'
import Chart from 'react-apexcharts'
import UncontrolledTabs from './UncontrolledTabs';
import Nav from './Nav';
import {
    Col,
    TabPane,
    NavItem,
} from 'reactstrap';

import { 
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    IconButton,
    Divider,
    InputBase,
    Typography,
    Paper,
    Box,
    Stack,
    Snackbar,
    Skeleton,
    Menu,
    MenuItem
    
} from '@mui/material';

import { 
    Close,
    VolunteerActivismOutlined,
    MoreVert
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import PopupState,{ bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state';


let dateTime_s;
let dateTime_e;

const orderStatus = {
    "inprogress": "primary",
    "pending": "warning",
    "finish": "success",
    "delay": "danger"
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    }
}));

const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
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

const formatDateTimeJob = (datetime) => {
    let subDatetime = datetime.split(" ")
    let subDate = subDatetime[0].split("/")
    
    // let splitDate = datetime.substring()
    return  subDate[2] + "-" + subDate[1] + "-" + subDate[0] + " " + subDatetime[1]
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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

function getDateTime() {

    var now     = new Date(); 
    var year    = now.getFullYear();
    var year_s    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var month_s   = now.getMonth()+1; 
    var day     = now.getDate();
    var day_s   = now.getDate();

    if(month.toString().length === 1) {
         month = '0'+month;
    }

    if(day.toString().length === 1) {
         day = '0'+(day-1);
    } 

    if( (day-6) <= 0) {

        day_s = (day_s-1+30)-6;

        if(day_s.toString().length === 1) {
            day_s = '0'+day_s;
        }

        if(month_s.toString().length === 1) {
            if (month_s-1 <= 0) {
                month_s = 12; 
                year_s = year_s-1;
            } else {
                month_s = '0'+month_s-1;
            }
        }

    } else {

        day_s = (day_s-1)-6;
        if (day_s.toString().length === 1) {
            day_s = '0'+day_s;
        }
        month_s = month;

    }

    dateTime_s = month_s+'-'+day_s+'-'+year_s; 
    dateTime_e = month+'-'+day+'-'+year;

    return dateTime_e;

}

getDateTime();
const data_s = dateTime_s; // const data_e = dateTime_e;

function ConfirmationDialogRaw(props) {
    
    const { Func, modelConfirm, onCloseDialogConfirm, openDialogConfirm, ...other } = props;

    const handleConfDialog = () => {
        Func();
        onCloseDialogConfirm();

    };

    const handleCancelDialog = () => {
        onCloseDialogConfirm();
    };
  
    return (
        <BootstrapDialog
          onClose={handleCancelDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { borderRadius: "15px", maxHeight: 435 } }}

          maxWidth="xs"
          open={openDialogConfirm}
          {...other}
        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelDialog}
            >
                  Confirm 
            </BootstrapDialogTitle>
            
            <DialogContent dividers>
                <Typography
                     gutterBottom
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13
                    }}
                >
                    {modelConfirm.model}  {modelConfirm.job_no}
                </Typography>


                {/* <DialogContentText
                    id="alert-dialog-slide-description"
                >
                    Confirm 

                </DialogContentText>  */}
              
                 
            </DialogContent>
  
            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    autoFocus
                    onClick={handleConfDialog}
                  >
                    ok
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}

function TaskJob(props) {
    const { resetDataP, resetDataD, resetDataI, setMsg, tikketNo, onCloseTaskJobDialog, openTaskJobDialog, ...other } = props;
    const [DataJobDetail, setDataJobDetail] = useState([]);
    const [DataJobDetailJOB, setDataJobDetailJOB] = useState([]);
    const [DataJobMember, setDataJobMember] = useState([]);

    const [rootcase, setrootcase] = useState({
        id:"",
        name:""
    });

    const [rootitem, setrootitem] = useState({
        id:"",
        name:""
    });

    const [solutionnote, setsolutionnote] = useState("");

    const handleCancelTaskJobDialog = () => {
        onCloseTaskJobDialog();
        setDataJobDetail([])
        setDataJobDetailJOB([])
        setDataJobMember([])

        setrootcase({
            id:"",
            name:""
        })
        setrootitem({
            id:"",
            name:""
        })
        setsolutionnote("")

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
    
    const [List_Rootitem, setList_Rooitem] = useState([]);
    const [List_Rootcase, setList_Rootcase] = useState([]);

    const getRootitem = async () => {

        try {
            await axios.get('http://localhost:5000/getRootitem', {}).then((res) => {  
                setList_Rooitem(res.data);

            })

        } catch (error) {
            console.log(error);

        }
    }

    const getRootcase = async () => {

        try {
            await axios.get('http://localhost:5000/getRootcase', {}).then((res) => {  
                setList_Rootcase(res.data);

            })

        } catch (error) {
            console.log(error);

        }
    }
    
    let Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")

    useEffect(() => {
        Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")
        getRootitem()
        getRootcase()

    },[]);


    const OpenJOB = async () => {
        // console.log(DataJobDetailJOB[0].job_no)
        // console.log("inprogress")
        // console.log(Datecurrent)

        try {
            await axios.post('http://localhost:5000/Job_OpenJOB', {
                job_no: DataJobDetailJOB[0].job_no,
                status: "inprogress",
                open_date: Datecurrent

            }).then((res) => {  
                resetDataP();
                setMsg(res.data.msg);

            })

        } catch (error) {
            console.log(error);

        }

        handleCancelTaskJobDialog()
        
        // pending finish delay inprogress
    }

    const Job_CloseJOB = async (event) => {

        try {
            if(rootcase.id&&rootitem.id)
            {
                await axios.post('http://localhost:5000/Job_CloseJOB', {
                job_no: DataJobDetailJOB[0].job_no,
                status: "finish",
                close_date: Datecurrent,
                rootcase: rootcase.id,
                rootitem: rootitem.id,
                solutionnote: solutionnote,
 
            }).then((res) => {  
                if(  DataJobDetailJOB.length > 0 &&  DataJobDetailJOB[0].status === "inprogress" ) {
                    resetDataI();
    
                } else {
                    resetDataD();
                }

                setrootcase({
                    id:"",
                    name:""
                });

                setrootitem({
                    id:"",
                    name:""
                });

                setsolutionnote("");

                setMsg(res.data.msg);

            })
            }
            else
            {
                setMsg("Selec Root Case and Root Item");
            }
            

        } catch (error) {
            console.log(error);

        }


        handleCancelTaskJobDialog()
    }

    const [openDialogConfirm_OpenJOB, setOpenDialogConfirm_OpenJOB] = useState(false);
    const [openDialogConfirm_CloseJOB, setOpenDialogConfirm_CloseJOB] = useState(false);

    const handleDialogConfirmOpenJOB = () => {
        setOpenDialogConfirm_OpenJOB(true);

    };
    
    const handleCloseDialogConfirmOpenJOB = () => {
        setOpenDialogConfirm_OpenJOB(false);

    };

    const handleDialogConfirmCloseJOB = () => {
        setOpenDialogConfirm_CloseJOB(true);

    };
    
    const handleCloseDialogConfirmCloseJOB = () => {
        setOpenDialogConfirm_CloseJOB(false);

    };

    return (
    <BootstrapDialog
        onClose={handleCancelTaskJobDialog}
        aria-labelledby="customized-dialog-title"
        sx={{ '& .MuiDialog-paper': { borderRadius: "15px", minWidth:"fit-content", height: "fit-content"}, overflowY: "overlay" }}
        scroll={'body'}
        open={openTaskJobDialog}
        {...other}
      >
          <BootstrapDialogTitle
            sx={{  p: 1.5 , color:"#1976d2", displa:"flex",alignItems:"center"}}
            id="customized-dialog-title"
            onClose={handleCancelTaskJobDialog}
          >
                <Box sx={{ fontSize: 16, display:"flex", alignItems:"center"}}>JOB TODAY &nbsp; &nbsp; { DataJobDetailJOB.length > 0  ?  <Typography sx={{ fontSize: 13}}> <Badge type={orderStatus[DataJobDetailJOB[0].status]} content={DataJobDetailJOB[0].status} /> </Typography>:  <Skeleton width={70} height={40} sx={{marginTop:-1,marginBottom:-1,borderRadius:"5px"}}/>}  </Box>

          </BootstrapDialogTitle>
          
          {/* <DialogContent dividers sx={{height:"480px"}}> */}
          <div className="Dialog-content-job">
            <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                openDialogConfirm={openDialogConfirm_OpenJOB}
                onCloseDialogConfirm={handleCloseDialogConfirmOpenJOB}
                Func={() => OpenJOB()}
                handleCancelTaskJobDialog={() => handleCancelTaskJobDialog()}
                modelConfirm={{model:"OPEN JOB. NO. ", job_no: DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].job_no : ""}}
            />

            <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                openDialogConfirm={openDialogConfirm_CloseJOB}
                onCloseDialogConfirm={handleCloseDialogConfirmCloseJOB}
                Func={() => Job_CloseJOB()}
                handleCancelTaskJobDialog={() => handleCancelTaskJobDialog()}
                modelConfirm={{model:"CLOSE JOB. NO. ", job_no: DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].job_no : ""}}
            />

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
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].createJob_by })].name_user_eng )}</Typography>
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
                                    <InputBase sx={{fontSize:12,fontFamily:"kanit",  ml: 1, flex: 1 }}  required multiline minRows={1} maxRows={4} name={"assign_detail"}  id={"ID_assignDetail" + DataJobDetail[0].tikket_no} value={DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].assign_detail: "" }  placeholder="รายละเอียดการมอบหมาย" inputProps={{ 'aria-label': 'รายละเอียดการมอบหมาย' }}/>
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
                                    {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"sec"}  iid={"ID_sec" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].section_req}  placeholder="ส่วนงาน" inputProps={{ 'aria-label': 'ส่วนงาน' }}/> */}
                                </Paper>
                                {/* <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>TEL</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"tel"}  id={"ID_tel" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].tel} placeholder="เบอร์ติดต่อ" inputProps={{ 'aria-label': 'เบอร์ติดต่อ' }}/>
                                </Paper> */}

                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>TEL</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{width: 80 ,fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].tel}</Typography>
                                  {/* <InputBase sx={{width: 20, fontSize:12,  ml: 1, flex: 1 }} name={"tel"}  id={"ID_tel" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].tel} placeholder="เบอร์ติดต่อ" inputProps={{ 'aria-label': 'เบอร์ติดต่อ' }}/> */}
                              
                                  <Typography sx={{fontSize:12, p: '2px 4px'}}>EMAIL</Typography>
                                  <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                  <Typography sx={{width: 80 ,fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].account_users[0].mail ? DataJobDetail[0].account_users[0].mail : " - "}</Typography>

                                  {/* <Typography sx={{fontSize:12,  ml: 1, flex: 1 }} name={"con_mail"}  id={"ID_email" + DataJobDetail[0].tikket_no} value={DataJobDetail[0].account_users[0].mail ? DataJobDetail[0].account_users[0].mail : ""}  placeholder="อีเมล์พนักงาน" inputProps={{ 'aria-label': 'อีเมล์พนักงาน' }}/> */}

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
                            // disabled
                            name={"assign_detail"}  
                            id={"id_assignDetail"+DataJobDetail[0].tikket_no} 
                            value={DataJobDetailJOB.length > 0 && DataJobDetailJOB[0].assign_detail !== null ? DataJobDetailJOB[0].assign_detail: "" } 
                            placeholder="รายละเอียดการมอบหมาย" inputProps={{ 'aria-label': 'รายละเอียดการมอบหมาย' }}
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
                                                <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"opendate"}  id={"ID_planStart" + DataJobDetail[0].tikket_no}  value={ DataJobDetailJOB[0].open_date !== null ? formatDateTime(DataJobDetailJOB[0].open_date,true) : " - " } placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                            </Paper>
                                            <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                <Typography sx={{fontSize:12, p: '2px 4px'}}>CLOSE DATE</Typography>
                                                <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"closedate"}  id={"ID_planTarget" + DataJobDetail[0].tikket_no} value={ DataJobDetailJOB[0].close_date !== null ? formatDateTime(DataJobDetailJOB[0].close_date,true) : " - " }  placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                            </Paper>    
                                        </Box>
                                    </div>
                                    {
                                        DataJobDetailJOB.length > 0 && ( DataJobDetailJOB[0].status === "inprogress" || DataJobDetailJOB[0].status === "delay" ) ?

                                            <div className="content_flex_box">
                                                <Box> 
                                                    <Divider sx={{fontSize:10 ,fontWeight:500, p: 1.5, color:"#1976d2"}} >DETAIL CLOSE JOB</Divider>
                                                    <div className="content_flex_box">

                                                        <Paper sx={{mx: 1,p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                            <Typography sx={{fontSize:12, p: '2px 4px'}}>ROOOT CASE</Typography>
                                                            <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                            <PopupState variant="popover" popupId="demo-popup-popover">
                                                                {
                                                                    (popupState) => (
                                                                        // popupState.close
                                                                        <React.Fragment>
                                                                            <InputBase  {...bindTrigger(popupState)} sx={{fontFamily:"kanit",fontSize:12 ,px:1 , ml: 1, flex: 1 , backgroundColor:"#f5f7fb95" }} value={rootcase.name} name={"rootcase"}  id={"ID_rootcase" + DataJobDetail[0].tikket_no}  placeholder=""/>
                                                                            <Menu {...bindMenu(popupState)} className="MenuEmp">

                                                                                <MenuItem sx={{display: "none"}}></MenuItem>
                                                                                {
                                                                                    List_Rootcase.map((item, index) => (
                                                                                        <MenuItem key={item.rootcase} onClick={ () => {  popupState.close(); setrootcase({id: item.rootcase, name: item.rootcase_name}); } } sx={{fontSize: 13}}>{item.rootcase_name}</MenuItem>

                                                                                    ))
                                                                                }
                                                                            </Menu>

                                                                        </React.Fragment>

                                                                    )
                                                                }
                                                            </PopupState>
                                                            
                                                        </Paper> 

                                                        <Paper sx={{ mx: 1,p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                            <Typography sx={{fontSize:12, p: '2px 4px'}}>ROOT ITEM</Typography>
                                                            <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                            <PopupState variant="popover" popupId="demo-popup-popover">
                                                                {
                                                                    (popupState) => (
                                                                        // rootcase rootitem solutionnote

                                                                        <React.Fragment>
                                                                            <InputBase  {...bindTrigger(popupState)} sx={{fontFamily:"kanit",fontSize:12,px:1 , ml: 1, flex: 1, backgroundColor:"#f5f7fb95"  }} value={rootitem.name} name={"rootitem"}  id={"ID_rootitem" + DataJobDetail[0].tikket_no}  placeholder=""/>
                                                                            <Menu {...bindMenu(popupState)} className="MenuEmp">

                                                                                <MenuItem sx={{display: "none"}}></MenuItem>
                                                                                {
                                                                                    List_Rootitem.map((item, index) => (
                                                                                        <MenuItem key={item.rootitem} onClick={ () => {  popupState.close(); setrootitem({id: item.rootitem, name: item.rootitem_name}); } } sx={{fontSize: 13}}>{item.rootitem_name}</MenuItem>

                                                                                    ))
                                                                                }
                                                                            </Menu>

                                                                        </React.Fragment>

                                                                    )
                                                                }
                                                            </PopupState>
                                                        </Paper> 

                                                    </div>
                                                    <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center',borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                        <Typography sx={{fontSize:12, p: '2px 4px'}}>SOLUTION NOTE</Typography>
                                                        <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                        <InputBase sx={{fontSize:12,fontFamily:"kanit", px:1 , ml: 1, flex: 1 , backgroundColor:"#f5f7fb95" }}  required multiline minRows={1} maxRows={4} name={"solutionnote"} onChange={ (e) => { setsolutionnote(e.target.value) } } id={"ID_solutionnote" + DataJobDetail[0].tikket_no} placeholder="รายละเอียดงาน"/>
                                                    </Paper>
                                                </Box>
                                            </div>
                                        :
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
          {
             DataJobDetailJOB.length > 0 && (DataJobDetailJOB[0].schedul_tasks[0].assign === localStorage.getItem('id_user_login') && DataJobDetailJOB[0].status) === "pending"?
                <DialogActions>
                        <Button 
                            color="success"
                            sx={{
                                "&.MuiButton-text": { fontSize:12, color: "#00e253" },
                            }}
                            onClick={handleDialogConfirmOpenJOB}
                        >
                            Open JOB
                        </Button>
                </DialogActions>
             :  
                DataJobDetailJOB.length > 0 && ( DataJobDetailJOB[0].schedul_tasks[0].assign === localStorage.getItem('id_user_login') && DataJobDetailJOB[0].status === "inprogress" ) ?

                    <DialogActions>
                            <Button  
                                sx={{
                                    "&.MuiButton-text": { fontSize:12 },
                                }}
                                onClick={handleDialogConfirmCloseJOB}
                            >
                                Close JOB
                            </Button>
                    </DialogActions>
                :
                    DataJobDetailJOB.length > 0 && ( DataJobDetailJOB[0].schedul_tasks[0].assign === localStorage.getItem('id_user_login') && DataJobDetailJOB[0].status === "delay" ) ?

                        <DialogActions>
                                <Button 
                                    sx={{
                                        "&.MuiButton-text": { fontSize:12, color: "#fb0b12" }
                                    }}
                                    onClick={handleDialogConfirmCloseJOB}
                                >
                                    Close JOB
                                </Button>
                        </DialogActions>
                    :
                        null

          }
         
              
      </BootstrapDialog>
    )
}

export const Dashboard = () => {

    const [datajob, setdatajob] = useState([]);
    const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);
    const [datajobCount, setdatajobCount] = useState(

        {
            "pending": {
              "count": 0,
            },
            "inprogress": {
              "count": 0,
            },
            "delay": {
              "count": 0,
            },
            "finish": {
              "count": 0,
            }
        }
    );

    const [DataChartDataTikket, setDataChartDataTikket] = useState([]);

    const [series, setseries] = useState([0,0,0,0]);

    const DataJobCount = async () => {
        try {
            await axios.post('http://localhost:5000/getDataJobCountCutOfUser', { 
                assign : localStorage.getItem('id_user_login')
                
            }).then((res) => {  
                setdatajobCount(res.data);   
            })

        } catch (error) {
            console.log(error);
        }
    }

    const CheckJob = async (e) => {
        setStattusLoadDatajob(false);
        try {
            await axios.post('http://localhost:5000/getDataJobCutOfUser', { 
                status : [e],
                assign : localStorage.getItem('id_user_login')
            }).then((res) => { 
                var today = moment().format();
                // console.log(today);
                var now = moment(today.toLocaleString(),"YYYY-MM-DDTHH:mm:ss.SSSSZ");
                res.data.map(data =>{
                    var end_date = moment(data.job_its[0].endDate);
                        // console.log(now.isAfter(end_date));
                        // console.log("now",now);
                        // console.log("ed",end_date);
                    
                    if(now.isAfter(end_date)){
                        // console.log(now.isAfter(end_date));
                        // console.log(end_date);
                        // console.log(now);
                        UpdateJob(data.job_its[0].job_no,'delay');
                    }
                });
            })
        } catch (error) {
            console.log(error);
        }
        DataJob('pending'); 
    }

    const UpdateJob = async (id,status) => {
        try {
            await axios.post('http://localhost:5000/updatejoblate',{
                Job_no : id,
                Status : status
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const DataJob = async (e) => {
        setStattusLoadDatajob(false);

        try {
            await axios.post('http://localhost:5000/getDataJobCutOfUser', { 
                // status : ['pending','open','delay']
                status : [e],
                assign : localStorage.getItem('id_user_login')

            }).then((res) => {  
                setdatajob(res.data);
                setStattusLoadDatajob(true);
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    const GetChartDataTikket = async (e) => {

        try {
            await axios.get('http://localhost:5000/getChartDataTikket', {}).then((res) => {  
                setDataChartDataTikket(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    function funcCallData (e) {
        DataJob(e)
    }

    useEffect(() => {
        DataJobCount()
        GetChartDataTikket()
        CheckJob('pending');  
        CheckJob('inprogress');
    },[]);

    useEffect(() => {
        setseries([ 
                    datajobCount.pending.count,
                    datajobCount.inprogress.count,
                    datajobCount.delay.count,
                    datajobCount.finish.count
                  ])
    },[datajobCount]);

    
const chartOptions = {

    series: [
        {
            name: 'request approve',
            // data: [40,70,20,90,36,80,30,91,60]
            data: DataChartDataTikket.ChartAppr
        }
        , 
        {
            name: 'request reject',
            // data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
            data: DataChartDataTikket.ChartRej
        }
    ],
    options: {
        colors: [ '#4e67f5', '#FF0080'],//4e67f5 9C27B0
        title: {
            text: "Requests",
            align: 'left',
            margin: 0,
            offsetX: 8,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '14px',
              fontWeight:  'bold',
              fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
              //   color:  '#263238'
            },
        },
        chart: {
            id: 'yt',
            group: 'social',
            height: 160,
            type: "line",
            background: 'transparent',
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              },
        },
        dataLabels: {
            enabled: false,
            
        },
        stroke: {
            curve: 'straight',
            // straight smooth  
            width: [0.5,0.5]
        },
        fill: {
            // style: {
            //     colors: [ '#E91E63', '#9C27B0']
            //   },
            gradient: {
              enabled: true,
              opacityFrom: 0.55,
              opacityTo: 0
            }
        },
        markers: {
            size: 5,
            hover: {
                // size: undefined,
                sizeOffset: 2
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '10px',
                    colors: '#969494',
                    fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
                },

                show: true,
                align: 'right',
                minWidth: 10,
                maxWidth: 50,
            },
        },
        xaxis: {
            type: 'datetime',
            min: new Date(data_s).getTime(),
            // max: new Date(data_e).getTime(),
            labels: {
                style: {
                    fontSize: '10px',
                    colors: '#969494',
                }
            },
        },
        legend: {
            show: false,

            position: 'bottom',
            horizontalAlign: 'left', 
            offsetX: 1,
            fontSize: "10px"
        },
        tooltip: {
            theme: "dark",
            //light dark
            // enabled: true,
            // enabledOnSeries: undefined,52
            // shared: true,
            // followCursor: false,
            // intersect: false,
            // inverseOrder: false,
            // custom: undefined,
            // fillSeriesColor: false,
            // theme: false,
            style: {
              fontSize: '12px',
              fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            x: {
                show: false,
                format: 'dd MMM',
                formatter: undefined,
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: (seriesName) => seriesName,
                },
            },
            z: {
                formatter: undefined,
                title: 'Size: '
            },
            marker: {
                show: true,
            },
            // items: {
            //    display: flex,
            // },
            fixed: {
                enabled: true,
                position: 'topRight',
                offsetX: -100,
                offsetY: -15,
            },
        },
        
        grid: {
            show: true,
            borderColor: '#eeeeee',
            strokeDashArray: 0,
            yaxis: {
                lines: {
                    show: true
                }
            },   
            // padding: {
            //     top: 0,
            //     right: 50,
            //     bottom: 0,
            //     left: 0
            // },
        }
    }
}

    const value_pin = (w) => {
        let n = 1
        return w.globals.seriesTotals.reduce((a, b) => {

            if(n !== 4){
                n++
                return a + b
            }else{
                return a
            }
         
          }, 0)
    }

    const donutOptions = {
        series: series,
        options: {
            labels: ['Pendi..', 'Inprog..', 'Delay', 'Finish'],
            colors: [ '#ff7b00', '#1f88e9', '#fc1e4e', '#51ed5b'],

            // colors: [ '#fe9166', '#46c3f9', '#ff3f94', '#51ed5b'],

            // colors: [ '#ffb108', '#1a8af3', '#fd3448', '#00e253'],
        
            title: {
                text: "All JOB",
                align: 'right',
                margin: 0,
                offsetX: -5,
                offsetY: 0,
                floating: false,
                style: {
                fontSize:  '14px',
                fontWeight:  'bold',
                fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
            },
            },
            chart: {
                width: '100%',
                type: 'donut',
            },
            stroke: {
                // show:false,
                width: 2,
                // colors: 'undefined' ,
            },
            plotOptions: {
                pie: {
                    customScale: 1.14,
                    offsetY: 0,
                    startAngle:-180,
                    endAngle: 180,
                    expandOnClick: false,
                    size: 200,
                    donut: {
                        size: '75%',
                        background: 'transparent',
                        labels: {
                        show: true,
                        //   name:{
                        //     show: true,
                        //     fontSize: "0.1rem",

                        //   },
                        total: {
                            label:"TODAY",
                            showAlways: true,
                            show: true,
                            fontSize: "0.55rem",
                            fontWeight: "600",
                            fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
                            color: "#969494",
                            formatter: function (w) {
                                return value_pin(w)
                            }
                        },
                        value: {
                            show: true,
                            fontSize: '1.7rem',
                            fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
                            color: "#403e74",
                            fontWeight: 600,
                            offsetY: 3,
                            
                        }
                        }
                    }
                    
                },

            },
        
            tooltip: {
                theme:'dark',
                //dark light
                fillSeriesColor: false,
                style: {
                    fontSize: '10px',
                    fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
                    
                },
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                marker: {
                    show: true,
                },
                items: {
                    display: "flex",
                },
                fixed: {
                    enabled: false,
                    position: 'topRight',
                    offsetX: 0,
                    offsetY: 0,
                },
            },
            dataLabels: {
                enabled: false,
                donut: {
                    labels: {
                    show: true,
                    total: {
                        showAlways: true,
                        show: true,
                    }
                    }
                }
            },
            fill: {
                //หลอดสี
                type: 'gradient',
                opacity: 1,
                colors: [ '#ff9900', '#4e67f5', '#fd2d42', '#00e253'],

                //colors: [ '#fe9166', '#46c3f9', '#ff3f94', '#00e253'],

                // colors: [ '#fe9166', '#3f55e9', '#fd2d42', '#00e253'],
                gradient: {
                    gradientToColors: ["#ffdc18", "#00d2ff", "#FD2DA2" , '#50ffa5'],

                    //gradientToColors: ["#fed472", "#62edd0", "#fd5fd6" , '#89f0ae'],

                    // gradientToColors: ["#fed472", "#30E9FF", "#FD2DA2" , '#89f0ae'],
                    
                    // shade: "dark",
                    // type: "horizontal",
                    // shadeIntensity: 1,
                    // inverseColors: true,
                    opacityFrom:0.8,
                    opacityTo: 1,
                    stops: [60,100]
                }

            },
            legend: {
                //แถบหัวข้อ
                offsetY: 15,
                fontSize: '10px',
                fontFamily:  ["Roboto","Helvetica","Arial","sans-serif"],
                fontWeight: 500,
                labels: {
                    colors: "#969494",
                    // useSeriesColors: false
                },
                markers: {
                    width: 10,
                    height: 10,
                    radius: 15,
                    onClick: undefined,
                    offsetX: -2,
                    offsetY: 1.4
                },

            },
            // responsive: [{
            //     breakpoint: 200,
            //     options: {
            //         chart: {
            //             width: 510,
            //             background: '#2787AB',
            //         },
            //         legend: {
            //             position: 'bottom'
            //         }
            //     }
            // }],
        
        },
    }

    const latestOrders = {
        header: [
            "requestor",
            "service",
            "start",
            "target",
            "status"
        ],
        databody : [
          
        ]
    }

    const StatusCard = propssCard => {  
        return (
            <div className='status-card' onClick={() => { funcCallData(propssCard.status); }} >
                <div className="status-card__icon">
                    {/* <i className={props.icon}></i> */}
                    <div className={propssCard.count <= 0 ? "box-icon" : "box-icon active-icon-" + propssCard.status}>
                        <svg x="0px" y="0px" width="30px" height="30px" viewBox="-3 -3 30 30" className={propssCard.count <= 0 ? "status_icon" : "status_icon"}>
                            <filter id="dropshadow" x="-2" y="-2" width="200" height="200">
                                <feGaussianBlur  stdDeviation="4"/>
                            </filter>
                            <path className={propssCard.count <= 0 ? "path" : "path blur"} d={propssCard.icon}/>
                            <path className='path' d={propssCard.icon}/>

                        </svg>
                    </div>
                    <div className="status-card__info">
                        <h4>{propssCard.count}</h4>
                    </div>
                </div>
                <div className="title-card">Status {propssCard.title}</div>
            </div>
        )
    }

        
    const StatusCount = [
       
            {
                "id":1,
                "icon": "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z",
                "count": series[0],
                "title": "Pending",
                "status":"pending"
            },
            {
                "id":2,
                "icon": "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
                "count":series[1],
                "title": "inprogress",
                "status":"inprogress"
            },
            {
                "id":3,
                "icon": "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
                "count": series[2],
                "title": "Delay",
                "status":"delay"
            },
            {
                "id":4,
                "icon": "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
                "count": series[3],
                "title": "Finish",
                "status":"finish"
            }

        ] 

    const renderOrderHead = (item, index) => (
        <th key={index}>{item}</th>
    )
    
    const [msg, setMsg] = useState('');
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    const [openTaskJobDialog, setOpenTaskJobDialog] = useState(false);
    const [tikketNo, setTikketNo] = useState("");

    const handleTaskJobDialog = (e) => {
        setOpenTaskJobDialog(true);
        setTikketNo(e);

    };
    
    const handleCloseTaskJobDialog = () => {
        setOpenTaskJobDialog(false);
        setTikketNo("")

    };

    
    const renderOrderBody = (item, index) => (
        <tr key={index} className="cursor_pointer" onClick={() => handleTaskJobDialog(item.job_its[0].tikket_no)}>
            <td className="col_txt">{subName(item.job_its[0].service_tikkets[0].account_users[0].name_user_eng)}</td>
            <td className="col_txt font-family-Kanit">{item.job_its[0].service_tikkets[0].service_options[0].title}</td>
            <td className="col_txt">{formatDateTime(item.job_its[0].startDate, true)}</td>
            <td className="col_txt">{formatDateTime(item.job_its[0].endDate, true)}</td>
            <td className="col_txt">
                <Badge type={orderStatus[item.job_its[0].status]} content={item.job_its[0].status}/>
            </td>
        </tr>
    )

    useEffect(() => {

        const handleSubmit = async() => {
            if(msg !== ''){
                setState(state => ({ state, ...{ open: true,vertical: "top", horizontal: "center"} }));
                await sleep(1e3);
                setState(state => ({ ...state, open: false }));
                setMsg('');
            }
        };

        handleSubmit();

    },[msg]);

    const LoaddataP = async() => {
        DataJobCount()
        DataJob('pending');  

    };

    const LoaddataD = async() => {
        DataJobCount()
        DataJob('delay');  

    };

    const LoaddataI = async() => {
        DataJobCount()
        DataJob('inprogress');  

    };

    return (
        <div className="layout-component m_r">
            <TaskJob
                id="ringtone-menu"
                keepMounted
                openTaskJobDialog={openTaskJobDialog}
                onCloseTaskJobDialog={handleCloseTaskJobDialog}
                tikketNo={tikketNo}
                resetDataP={() => LoaddataP()}
                resetDataD={() => LoaddataD()}
                resetDataI={() => LoaddataI()}
                setMsg={(msg) => setMsg(msg)}
            /> 

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
            />

            {/* <HomeOutlined twoToneColor="#52c41a" style={{ fontSize: '15px' ,color: 'hotpink'}}/>  <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '15px'}} /> */}
            <h2 className="page-header">{ "Manage Job".toUpperCase() }  </h2>
            <div className="row box-scroll">
                <div className="col-3 del-p-r ">
                    <div className="row inside-box">
                        <div className="col-12 del-p">
                            <div className="card-chart full-height">
                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...chartOptions.options,
                                        theme: { mode: 'dark'}
                                    } : {
                                        ...chartOptions.options,
                                        theme: { mode: 'light'}
                                    }}
                                    series={chartOptions.series}
                                    type='area'
                                    height='100%'
                                />
                            </div>
                        </div>
                        <div className="col-12 del-p donut">
                            <div className="card-chart-donut full-height">
                                {/* chart */}
                                <Chart
                                    options={themeReducer === 'theme-mode-dark' ? {
                                        ...donutOptions.options,
                                        theme: { mode: 'dark'}
                                    } : {
                                        ...donutOptions.options,
                                        theme: { mode: 'light'}
                                    }}
                                    series={donutOptions.series}
                                    type='donut'
                                    height='100%'
                                />
                            </div>
                        </div>
                    </div>               
                </div>
               
                <div className="col-8">
                    <div className="card full-h">
                        <div className="card__header">
                            <h3>MY JOB TODAY</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                limit='5'
                                headData={latestOrders.header}
                                renderHead={(item, index) => renderOrderHead(item, index)}
                                bodyData={datajob}
                                // bodyData={latestOrders.databody}
                                renderBody={(item, index) => renderOrderBody(item, index)}
                                // search={false}
                                pageDadb={true}
                                StattusLoadDatajob={StattusLoadDatajob}
                            />
                        </div>
                    </div>
                </div>
      
                <div className="col-12 del-p ">
                    <div className="row inside-box">
                        {
                            StatusCount.map((item, index) => (
                                <div className="col-2-2 " key={item.id}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                        status={item.status}
                                    />
                                </div>
                            ))
                        }
                    </div>               
                </div>
            </div>
        </div>
      )
}

export default Dashboard

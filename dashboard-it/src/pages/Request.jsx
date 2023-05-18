import React, { useState, useEffect } from 'react'

import Table from '../components/table/Table'
import BadgeS from '../components/badge/Badge'
import Badge from '@mui/material/Badge';

import dateShortcode from 'date-shortcode'

import axios from 'axios';

import UncontrolledTabs from './UncontrolledTabs';
import Nav from './Nav';
import PropTypes from 'prop-types';
import moment from "moment";
// import "moment-timezone";
import { Input } from 'antd';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import {th} from 'date-fns/locale';
import RenderDataEmpIT  from '../../src/assets/Field-RenderModel/RenderDataEmpIT';


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
    Skeleton,
    Slide,
    Snackbar,
    InputAdornment
    
} from '@mui/material';

import { 
    Close,
    FolderShared,
    Save
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';

const orderStatusReq = {
    "approve": "success",
    "reject": "danger",
    "wait": "warning",
}


const customerTableHead = {
    header: [
        "tikket date",
        "service",  
        "option",        
        "requestor",
        "section",
        "tikket no"
    ], 
    databody: [
        
        { 
            "job_no": "RQ22021300001", 
            "requestor": "SUPIWAN T.",
            "service_type": "ขอข้อมูล/ติดตั้ง -โปรแกรม",  
            "service_option": "ขอติดตั้งโปรแกรม", 
            "open_date": "2022-02-20 09:10:00", 
            "close_date": "2022-02-20 10:30:00" ,
            "assign_by": "NATCHAI M."
        }
    ]
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


const formatDateTime = (datetime, time) => {
    let str;
    if(time) {
        str = '{DD/MM/YY HH:mm}'    

    } else {
        str = '{DD/MM/YY}'    
    }

    return dateShortcode.parse(str, datetime)
}  

const formatDateTimeJob = (datetime) => {
    let subDatetime = datetime.split(" ")
    let subDate = subDatetime[0].split("/")
    
    // let splitDate = datetime.substring()
    return  subDate[2] + "-" + subDate[1] + "-" + subDate[0] + " " + subDatetime[1]
}  


function ConfirmationDialogRaw(props) {
    
    const { Func, modelConfirm, onCloseDialogConfirm, openDialogConfirm, ...other } = props;
    const [comment, setcomment] = useState("");

    const handleConfDialog = () => {
        Func(comment);
        onCloseDialogConfirm();

    };

    const handleCancelDialog = () => {
        onCloseDialogConfirm();
        setcomment("")
    };
  
    return (
        <BootstrapDialog
          onClose={handleCancelDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': {  borderRadius: "15px", width: 450, maxHeight: 435 } }}
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
                        fontSize:12,
                        fontFamily:"kanit",
                    }}
                >
                    {modelConfirm.model} Req. {modelConfirm.tk_no}
                </Typography>
                <div className="Dialog-content-edit">
                    <Typography sx={{fontSize:12,fontFamily:"kanit", p: '2px 4px'}}>{modelConfirm.model} Comment</Typography>
                    <InputBase sx={{fontSize:12, fontFamily:"kanit",width: "100%", flex: 1, border:1, borderColor:"#dddddd", padding: 0.5}}  
                        key={modelConfirm.tk_no} 
                        multiline 
                        minRows={3} 
                        maxRows={5} 
                        name={"comment"}  
                        id={"comment"+modelConfirm.tk_no} 
                        placeholder="ความเห็น" inputProps={{ 'aria-label': 'ความเห็น' }}
                        onChange={ (e) => { setcomment(e.target.value) } }
                    />

                </div>

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


function ViewAndEditReq(props) {
    // const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")

    const { ViewMode, setMsg, tikketNo, onCloseViewAndEditReqDialog, openViewAndEditReqDialog, ...other } = props;
    const [DataJobDetail, setDataJobDetail] = useState([]);
    const [DataJobDetailJOB, setDataJobDetailJOB] = useState([]);
    const [DataJobMember, setDataJobMember] = useState([]);

    // const [modeEdit, setModeEdit] = useState(true);
    // const [LastJobNo, setLastJobNo] = useState([]);  
    // const [DataCreateJob, setDataCreateJob] = useState(
    //     {
    //         assign_by: localStorage.getItem('id_user_login'),
    //         assign_detail: "",
    //     }
    // );

    // const [valuePlanStart, setValuePlanStart] = useState(null);//new Date()
    // const [valuePlanTarget, setValuePlanTarget] = useState(null);//new Date()

    // console.log('----------------------------------------- tikketNo -----------------------------------------')
    // console.log(tikketNo)
    // console.log(DataJobDetail)
    // console.log(DataJobDetailJOB)
    

    // const handleOnChangeDataCreateJob = (eventName, eventValue) => {   
    //     setDataCreateJob( DataCreateJob => ( {...DataCreateJob, [eventName]: eventValue} ) );

    // };

    // const LastJob = async (e) => {
    //     try {
    //       await axios.get('http://localhost:5000/LastJob', { }).then((res) => {  
    //         setLastJobNo(res.data);
    //       })
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }

    // const DatecurrentforID = moment().tz("Asia/Bangkok").format("YYMMDD")

    // useEffect(() => {
    //     const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")

    //     const CreateJOB = async (newID) => {
    //       // e.preventDefault();
    //         // console.log(DataJobDetail[0].review_by)
    //         // console.log(DataCreateJob.assign_by)
    //         // console.log(document.getElementsByName("assign_to")[0].value)
    //         // console.log(DataCreateJob.assign_detail)
    //         // console.log(moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss"))
    //         // console.log(formatDateTimeJob(document.getElementsByName("start_date")[0].value))
    //         // console.log(formatDateTimeJob(document.getElementsByName("target_date")[0].value))

    //         try {
    //             await axios.post('http://localhost:5000/CreateJob', {
    //                 job_no: newID,  
    //                 appove_by: DataJobDetail[0].review_by,
    //                 assign_by: DataCreateJob.assign_by,
    //                 assign_to: document.getElementsByName("assign_to")[0].value,
    //                 assign_detail: DataCreateJob.assign_detail,
    //                 job_date: Datecurrent,
    //                 open_date: null,
    //                 startDate: formatDateTimeJob(document.getElementsByName("startDate")[0].value),
    //                 endDate: formatDateTimeJob(document.getElementsByName("endDate")[0].value),
    //                 close_date: null,
    //                 rootcase: "-",
    //                 rootitem: "-",
    //                 solutionnote: null,
    //                 status: "pending",
    //                 tikket_no: tikketNo,

    //             }).then((res) => {  
    //                 setMsg(res.data.msg);

    //             })

    //             handleCancelViewAndEditReqDialog()

    //         } catch (error) {
    //             console.log(error);

    //         }
    //     }
  
    //     // CreateJOB();
    //     if(LastJobNo.length > 0) {
    //       let id_index = parseInt((LastJobNo[0].job_no).substring(10,))
    //       let new_id = ""
    //       let nameId = "JOB" + DatecurrentforID + "-"
    //       if ((id_index + 1) < 10) {
    //         new_id = nameId + "00000"+ ( id_index + 1 ).toString()
  
    //       } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
    //         new_id = nameId + "0000"+ ( id_index + 1 ).toString()
  
    //       } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
    //         new_id = nameId + "000"+ ( id_index + 1 ).toString()
  
    //       } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
    //         new_id = nameId + "00"+ ( id_index + 1 ).toString()
  
    //       } else if ((id_index + 1) >= 10000) {
    //         new_id = nameId + "0"+ ( id_index + 1 ).toString()
    //       } else {
    //         new_id = nameId + ( id_index + 1 ).toString()
    //       }
  
    //       // setNewidJOB(new_id)
    //       console.log(new_id)
    //     //   CreateJOB(new_id)
    //     }
    // }, [LastJobNo])

    const handleCancelViewAndEditReqDialog = () => {
        setDataJobDetail([]);
        setDataJobDetailJOB([]);
        setDataJobMember([])

        // setValuePlanStart(null);
        // setValuePlanTarget(null);
        // setDataCreateJob(
        //     {
        //         assign_by: localStorage.getItem('id_user_login'),
        //         assign_detail: "",
        //     }
        // );
        onCloseViewAndEditReqDialog();

    };

    // const UpdateDetailTK = async (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     let arrData = []
    //     for(var value of data.entries()) {
    //         arrData.push({id_item : value[0], value : value[1]})
    //     }
    //     console.log(arrData);

        
    //     try {
    //         await axios.post('http://localhost:5000/UpdateItemTK', {
    //             id_tk: tikketNo,
    //             arr_itemAndV: arrData

    //          }).then((res) => {  
    //             setMsg(res.data.msg);
    //         })

    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // data.get('CreateServiceTitle')

    // }

    const ApproveTikket = async (comment) => {
        try {
            await axios.post('http://localhost:5000/UpdateStatusTk', {
                tikket_no: tikketNo,
                status: "approve",
                review_by: localStorage.getItem('id_user_login'),
                comment: comment

             }).then((res) => {  
                setMsg(res.data.msg);
            })

        } catch (error) {
            console.log(error);
        }

        handleCancelViewAndEditReqDialog()
    }

    const RejectTikket = async (comment) => {
        try {
            await axios.post('http://localhost:5000/UpdateStatusTk', {
                tikket_no: tikketNo,
                status: "reject",
                review_by: localStorage.getItem('id_user_login'),
                comment: comment

             }).then((res) => {  
                setMsg(res.data.msg);

            })

        } catch (error) {
            console.log(error);
        }

        handleCancelViewAndEditReqDialog()
    }

    // const ReviewAgainTikket = async () => {
    //     try {
    //         await axios.post('http://localhost:5000/UpdateStatusTk', {
    //             tikket_no: tikketNo,
    //             status: "wait",
    //             review_by: null

    //          }).then((res) => {  
    //             setMsg(res.data.msg);

    //         })

    //     } catch (error) {
    //         console.log(error);
    //     }

    //     handleCancelViewAndEditReqDialog()
    // }

    useEffect(() => {
        const GetDataJobDetail = async (tikketNo) => {
            try {
                await axios.post('http://localhost:5000/getDataTikketCut', {
                    tikket_no: tikketNo,
                    status: ["approve","wait","reject"]

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

        if(tikketNo !== "" && openViewAndEditReqDialog) {
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

    // DataAllItemchecked.findIndex(object => { return object.id_item === item1 })
    // const [dataAppr, setDataAppr] = useState(false);
    const [openDialogConfirmApprove, setOpenDialogConfirmApprove] = useState(false);
    const [openDialogConfirmReject, setOpenDialogConfirmReject] = useState(false);
    // const [openDialogConfirmReviewAgain, setOpenDialogConfirmReviewAgain] = useState(false);

    const handleDialogConfirmApprove = () => {
        setOpenDialogConfirmApprove(true);

    };
    
    const handleCloseDialogConfirmApprove = () => {
        setOpenDialogConfirmApprove(false);

    };

    const handleDialogConfirmReject = () => {
        setOpenDialogConfirmReject(true);

    };
    
    const handleCloseDialogConfirmReject = () => {
        setOpenDialogConfirmReject(false);

    };

    // const handleDialogConfirmReviewAgain = () => {
    //     setOpenDialogConfirmReviewAgain(true);

    // };
    
    // const handleCloseDialogConfirmReviewAgain = () => {
    //     setOpenDialogConfirmReviewAgain(false);

    // };



    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: "15px", minWidth:"fit-content", height: "fit-content"}, overflowY: "overlay" }}
        aria-labelledby="customized-dialog-title"
        scroll={'body'}
        // onSubmit={UpdateDetailTK}
        open={openViewAndEditReqDialog}
        {...other}
      >
        <BootstrapDialogTitle
            sx={{ fontSize: 16, p: 1.7 , color:"#1976d2", display:"flex",alignItems:"center"}}
            id="customized-dialog-title"
            onClose={handleCancelViewAndEditReqDialog}
        >
                DETAILS REQ
                { 
                    DataJobDetail.length > 0 && openViewAndEditReqDialog?  
                        <Typography sx={{ fontSize: 13, marginLeft:1.2}}> <BadgeS type={orderStatusReq[DataJobDetail[0].status]} content={DataJobDetail[0].status} /> </Typography>
                    : 
                        <Skeleton width={70} height={45} sx={{borderRadius:"5px", marginLeft:1.2}}/>
                   
                }                 

                {/* {
                    ViewMode === "review" ?
                        <IconButton  aria-label="add field"  size="small" sx={{marginLeft:1.2}} disabled={!modeEdit} type="submit">
                            <Save color={ modeEdit ? "primary" : ""} fontSize="inherit"/>
                        </IconButton>
                    :
                        null
                } */}
                
                
        </BootstrapDialogTitle>
        {/* <DialogTitle sx={{ paddingX: "15px", fontSize: 16 }}>EDIT PROFILE</DialogTitle> */}

        <div className="Dialog-content-job">

           <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                openDialogConfirm={openDialogConfirmApprove}
                onCloseDialogConfirm={handleCloseDialogConfirmApprove}
                Func={(e) => ApproveTikket(e)}
                modelConfirm={{model:"Approve", tk_no: tikketNo}}
            />

             <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                openDialogConfirm={openDialogConfirmReject}
                onCloseDialogConfirm={handleCloseDialogConfirmReject}
                Func={(e) => RejectTikket(e)}
                modelConfirm={{model:"Reject", tk_no: tikketNo}}

            />

             {/* <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                openDialogConfirm={openDialogConfirmReviewAgain}
                onCloseDialogConfirm={handleCloseDialogConfirmReviewAgain}
                Func={() => ReviewAgainTikket()}
                modelConfirm={{model:"Review again", tk_no: tikketNo}}
            /> */}
        {
            DataJobDetail.length > 0  && openViewAndEditReqDialog?
                <>
                    <div className="content_box_medie">                      
                        <Divider sx={{fontSize:10, fontWeight:500, paddingX: 1.5, paddingBottom:1.5 , color:"#1976d2"}} >JOB DATE &nbsp; {formatDateTime(DataJobDetail[0].tikket_date,false)}</Divider>
                        <div className="content_flex_box">
                            <Box>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px"}}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>JOB NO.</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontWeight:0 ,fontSize:12,  ml: 1, flex: 1 }} name={"jobNo"}  id={"ID_jobNo" + DataJobDetail[0].tikket_no}  value={DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].job_no : ""} placeholder="หมายเลข JOB"/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].job_no : ""}</Typography>
                                </Paper>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>REQUIRE DATE</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"reqDate"} id={"ID_reqDate" + DataJobDetail[0].tikket_no}  value={formatDateTime(DataJobDetail[0].tikket_date,true)} placeholder="วันที่ต้องการให้ปฎิบัติงาน"/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{formatDateTime(DataJobDetail[0].tikket_date,true)}</Typography>
                                </Paper>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>APPROVE BY</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12, ml: 1, flex: 1 }} name={"appove_by"} required  id={"ID_approveBy" + DataJobDetail[0].tikket_no} value={DataJobDetailJOB.length > 0 ?subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].review_by })].name_user_eng ) : ""} placeholder="ผู้อนุมัติคำร้อง" inputProps={{ 'aria-label': 'ผู้อนุมัติตำร้อง' }}/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].review_by !== null ? subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].review_by })].name_user_eng ) : " - "}</Typography>
                                </Paper>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>ASSIGN BY</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"assign_by"}  id={"ID_assign_by" + DataJobDetail[0].tikket_no}  value={ DataJobDetailJOB.length > 0 ?subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].createJob_by })].name_user_eng ) : ""} placeholder="วันที่ส่งคำร้องขอ"/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].createJob_by !== null ? subName( DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].createJob_by })].name_user_eng ) : " - "}</Typography>
                                </Paper> 
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>ASSIGN TO</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12, ml: 1, flex: 1 }}  name={"assignTo"}  id={"ID_assignTo" + DataJobDetail[0].tikket_no} value={ DataJobDetailJOB.length > 0 ? subName( DataJobDetailJOB[0].schedul_tasks[0].account_users[0].name_user_eng ) : "" } placeholder="ผู้รับมอบหมายงาน" inputProps={{ 'aria-label': 'ผู้รับมอบหมายงาน' }}/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetailJOB.length > 0 ? subName( DataJobDetailJOB[0].schedul_tasks[0].account_users[0].name_user_eng ) : " - " }</Typography>
                                </Paper>
                                
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
                                    {/* <InputBase sx={{fontSize:12,fontFamily:"kanit",  ml: 1, flex: 1 }} name={"serviceType"}   id={"ID_serviceType" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].service_types[0].title} placeholder="ประเภทบริการ" inputProps={{ 'aria-label': 'ประเภทบริการ' }}/> */}
                                    <Typography sx={{fontFamily:"kanit",fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].service_types[0].title}</Typography>
                                </Paper>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>SERVICE OPTION</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12,fontFamily:"kanit",  ml: 1, flex: 1 }} name={"serviceOption"}   id={"ID_serviceOption" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].service_options[0].title} placeholder="หัวข้อบริการ" inputProps={{ 'aria-label': 'หัวข้อบริการ' }}/> */}
                                    <Typography sx={{fontFamily:"kanit",fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].service_options[0].title}</Typography>
                                </Paper>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>REQUESTOR</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"reqtor"}  id={"ID_reqtor" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].account_users[0].level === "Maneger" ? "Maneger" + "  " + DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng : DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng } placeholder="ผู้แจ้งคำร้อง" inputProps={{ 'aria-label': 'ผู้แจ้งคำร้อง' }}/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].account_users[0].level === "Maneger" ? "Maneger" + "  " + DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng : DataJobDetail[0].account_users[DataJobDetail[0].account_users.findIndex(object => { return object.id_user === DataJobDetail[0].requestor })].name_user_eng }</Typography>
                                </Paper>
                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>SECTION</Typography>
                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                    {/* <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"sec"}  iid={"ID_sec" + DataJobDetail[0].tikket_no}  value={DataJobDetail[0].section_req}  placeholder="ส่วนงาน" inputProps={{ 'aria-label': 'ส่วนงาน' }}/> */}
                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>{DataJobDetail[0].section_req}</Typography>
                                </Paper>
                                
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
                                                <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"planStart"}  id={"ID_planStart" + DataJobDetail[0].tikket_no}  value={DataJobDetailJOB.length > 0 ? formatDateTime(DataJobDetailJOB[0].startDate,true): "" } placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                            </Paper>
                                            <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                <Typography sx={{fontSize:12, p: '2px 4px'}}>PLAN TARGET</Typography>
                                                <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"planTarget"}  id={"ID_planTarget" + DataJobDetail[0].tikket_no} value={DataJobDetailJOB.length > 0 ?formatDateTime(DataJobDetailJOB[0].endDate,true): "" }  placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                            </Paper>
                                        </Box>
                                        <Box> 
                                            <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                <Typography sx={{fontSize:12, p: '2px 4px'}}>OPEN DATE</Typography>
                                                <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"opendate"}  id={"ID_planStart" + DataJobDetail[0].tikket_no}  value={ DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].open_date !== null ? formatDateTime(DataJobDetailJOB[0].open_date,true) : "": "" } placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                            </Paper>
                                            <Paper sx={{ mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                <Typography sx={{fontSize:12, p: '2px 4px'}}>CLOSE DATE</Typography>
                                                <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                <InputBase sx={{fontSize:12,  ml: 1, flex: 1 }} name={"closedate"}  id={"ID_planTarget" + DataJobDetail[0].tikket_no} value={ DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].close_date !== null ? formatDateTime(DataJobDetailJOB[0].close_date,true) : "": "" }  placeholder=" -- / -- / -- " inputProps={{ 'aria-label': ' -- / -- / -- ' }}/>
                                            </Paper>
                                        </Box>
                                    </div>
                                
                                    <div className="content_flex_box">
                                        <Box> 
                                            <Divider sx={{fontSize:10 ,fontWeight:500, p: 0.7, color:"#1976d2"}} >DETAIL CLOSE JOB</Divider>
                                            <div className="content_flex_box">

                                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>ROOOT CASE</Typography>
                                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                    <InputBase sx={{fontFamily:"kanit",fontSize:12, px:1 , ml: 1, flex: 1 }} value={DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].rootcases[0].rootcase_name:""} name={"rootcase"}  id={"ID_rootcase" + DataJobDetail[0].tikket_no}  placeholder=""/>
                                                </Paper> 

                                                <Paper sx={{mx: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 350 ,borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                    <Typography sx={{fontSize:12, p: '2px 4px'}}>ROOT ITEM</Typography>
                                                    <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                    <InputBase sx={{fontFamily:"kanit",fontSize:12, px:1 , ml: 1, flex: 1 }} value={DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].rootitems[0].rootitem_name:""} name={"rootitem"}  id={"ID_rootitem" + DataJobDetail[0].tikket_no}  placeholder=""/>
                                                </Paper> 

                                            </div>
                                            <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center',borderRadius:0, boxShadow:"#34333377 0px 0px 2px" }}>
                                                <Typography sx={{fontSize:12, p: '2px 4px'}}>SOLUTION NOTE</Typography>
                                                <Divider sx={{ height: 22, m: 0.5 }} orientation="vertical" />
                                                <InputBase sx={{fontSize:12,fontFamily:"kanit", px:1 , ml: 1, flex: 1 }}  required multiline minRows={1} maxRows={4} name={"solutionnote"} value={DataJobDetailJOB.length > 0 ? DataJobDetailJOB[0].solutionnote:""} id={"ID_solutionnote" + DataJobDetail[0].tikket_no} placeholder="รายละเอียดงาน"/>
                                            </Paper>
                                        </Box>
                                    </div>

                                
                                  
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
            
                    {
                        ViewMode === "view-all" ?
                            <div className="Dialog-content-edit">
                                <Typography sx={{fontSize:12, p: '2px 4px'}}>Comment</Typography>
                                <InputBase sx={{fontSize:12, fontFamily:"kanit",width: "100%", flex: 1, border:1, borderColor:"#dddddd", padding: 0.5}}  
                                    key={DataJobDetail[0].tikket_no} 
                                    multiline 
                                    minRows={2} 
                                    maxRows={4} 
                                    // disabled
                                    name={"comment"}  
                                    id={"comment"+DataJobDetail[0].tikket_no} 
                                    value={DataJobDetail.length > 0 && DataJobDetail[0].comment !== null ? DataJobDetail[0].comment: "" } 
                                    placeholder="ความเห็น" inputProps={{ 'aria-label': 'ความเห็น' }}
                                />
                            </div>
                        :
                            null
                    }
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
            
        </div>
        
        {
            ViewMode === "review" ?
                <DialogActions>
                
                    <Button
                        onClick={() => handleDialogConfirmReject()}
                        color="error"
                    >
                        reject req.
                    </Button>
        
                    <Button autoFocus
                        onClick={() => handleDialogConfirmApprove()}
                        color="success"
                        sx={{
                                "&.MuiButton-text": { color: "#00e253" },
                            }}
                    >
                        approve req.
                    </Button>
                </DialogActions>
            :

                // ViewMode === "review-again" || ( DataJobDetail.length > 0 && DataJobDetail[0].status === "reject" ) ?
                //     <DialogActions>
                //         <Button autoFocus
                //             onClick={() => handleDialogConfirmReviewAgain()}
                //             color="error"
                //         >
                //             Review Again
                //         </Button>
                //     </DialogActions>
                // :
                //     ViewMode === "manage-assign" || ( DataJobDetail.length > 0 && DataJobDetail[0].status === "approve" ) ?
                //         <DialogActions>
                //             <Button autoFocus
                //                 onClick={() => LastJob()}
                //             >
                //                 Create JOB
                //             </Button>
                //         </DialogActions>
                //     :
                        null
        }
       

      </Dialog>
    );
}


// const subName = (name) => {
//     const fullName = name.split(' ')
//     const Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1) +"  "+ fullName[1].charAt(0).toUpperCase() + '.'
//     // const Sname = fullName.shift() +"  "+ fullName.pop().charAt(0) + '.'
//     return Sname
// }  

const renderHead = (item, index) => <th key={index}>{item}</th>


const { Search } = Input;

const Request = () => {
    
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

    

    const [datatikketW, setdatatikketW] = useState([]);
    const [datatikketA, setdatatikketA] = useState([]);
    const [datatikketR, setdatatikketR] = useState([]);
    const [datatikketAll, setdatatikketAll] = useState([]);

    const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);

    const [DataPropJOBDEtail, setDataPropJOBDEtail] = useState("");
    


    const DataTikket = async (e) => {
        try {
            await axios.post('http://localhost:5000/getDataTikket', {
                status: ['wait'],
                createJob_by: null

             }).then((res) => {  
                setdatatikketW(res.data);
            })

            await axios.post('http://localhost:5000/getDataTikket', {
                status: ['approve'],
                createJob_by: null

             }).then((res) => {  
                setdatatikketA(res.data);   
            })

            await axios.post('http://localhost:5000/getDataTikket', {
                status: ['reject'],
                createJob_by: null


             }).then((res) => {  
                setdatatikketR(res.data); 
                setStattusLoadDatajob(true)   
  
            })

            await axios.post('http://localhost:5000/getDataTikketAll', {
                status: ["approve","wait","reject"],

             }).then((res) => {  
                setdatatikketAll(res.data);   
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        DataTikket();
    },[]);

    useEffect(() => {

        const handleSubmit = async() => {
            if(msg !== ''){
                setState(state => ({ state, ...{ open: true,vertical: "top", horizontal: "center"} }));
                await sleep(1e3);
                setState(state => ({ ...state, open: false }));
                setMsg('');
                DataTikket();
            }
        };

        handleSubmit();

    },[msg]);

    const [sh_datatikketW, setSh_datatikketW] = useState(datatikketW);
    const [sh_datatikketA, setSh_datatikketA] = useState(datatikketA);
    const [sh_datatikketR, setSh_datatikketR] = useState(datatikketR);
    const [sh_datatikketAll, setSh_datatikketAll] = useState(datatikketAll);

    const [SwitchSearch, setSwitchSearch] = useState("nav_w");  

    useEffect(() => {
        setSh_datatikketW(datatikketW)
    },[datatikketW]);

    useEffect(() => {
        setSh_datatikketA(datatikketA)
    },[datatikketA]);

    useEffect(() => {
        setSh_datatikketR(datatikketR)
    },[datatikketR]);

    useEffect(() => {
        setSh_datatikketAll(datatikketAll)
    },[datatikketAll]);
    // <i class="fas fa-wifi-1    "></i>

    // useEffect(() => {
    //     onSearch("")

    // },[SwitchSearch]);

    const onSearch = value => {

        if(SwitchSearch === "nav_w") {
            const filteredRowsTikketW= datatikketW.filter((row) => {
                const rowcolummTikketW = row.tikket_no
                return rowcolummTikketW.toLowerCase().includes(value.toLowerCase());
            });
            setSh_datatikketW(filteredRowsTikketW);

        } else if(SwitchSearch === "nav_a")  {
            const filteredRowsTikketA = datatikketA.filter((row) => {
                const rowcolummTikketA = row.tikket_no
                return rowcolummTikketA.toLowerCase().includes(value.toLowerCase());
            });
            setSh_datatikketA(filteredRowsTikketA);

        } else if(SwitchSearch === "nav_r")  {

            const filteredRowsTikketR = datatikketR.filter((row) => {
                const rowcolummTikketR = row.tikket_no
                return rowcolummTikketR.toLowerCase().includes(value.toLowerCase());
            });
            setSh_datatikketR(filteredRowsTikketR);

        } else if(SwitchSearch === "nav_all")  {

            const filteredRowsTikketAll = datatikketAll.filter((row) => {
                const rowcolummTikketAll = row.tikket_no
                return rowcolummTikketAll.toLowerCase().includes(value.toLowerCase());
            });
            setSh_datatikketAll(filteredRowsTikketAll);

        }

    }

    // const FuncSwitchSearch = nav => {
    //     if(nav === "nav_w") {
    //         setSwitchSearch("nav_w");

    //     } else if(nav === "nav_a") {
    //         setSwitchSearch("nav_a");

    //     } else if(nav === "nav_r") {
    //         setSwitchSearch("nav_r");
    //     }
    // }

    useEffect(() => {

        const FuncSwitchSearch = nav => {
            if(nav === "nav_w") {
                setSwitchSearch("nav_w");
    
            } else if(nav === "nav_a") {
                setSwitchSearch("nav_a");
    
            } else if(nav === "nav_r") {
                setSwitchSearch("nav_r");

            } else if(nav === "nav_all") {
                setSwitchSearch("nav_all");

            }
        }

        const letters = Array.from(document.querySelectorAll('.nav-link'))
          letters.forEach((letter) => {
            let timerId;
            letter.addEventListener('mousedown', (e) => {
              FuncSwitchSearch(e.target.name)
              clearTimeout(timerId);
              const ripple = e.target.querySelector('.ripple-nav')
              const size = letter.offsetWidth;
              const pos = letter.getBoundingClientRect();
              const x = e.pageX - pos.left - size;
              const y = e.pageY - pos.top - size;
              ripple.style = 'top:' + y + 'px; left:' + x + 'px; width: ' + size * 2 + 'px; height: ' + size * 2 + 'px; border-radius: 999px;';
              ripple.classList.remove('activer');
              ripple.classList.remove('start');
              setTimeout(() => {
                ripple.classList.add('start')
                setTimeout(() => {
                  ripple.classList.add('activer')
                });
              });
              timerId = setTimeout(() => {
                ripple.classList.remove('activer');
                ripple.classList.remove('start');
              }, 500);
            })
          })
        let btns = document.querySelectorAll(".nav-link")
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                let current = document.getElementById("box1").querySelectorAll(".active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }, []);
    // const orderStatus = {
    //     "shipping": "primary",
    //     "pending": "warning",
    //     "finish": "success",
    //     "refund": "danger"
    // }

    const [openViewAndEditReqDialog, setOpenViewAndEditReqDialog] = useState(false);
    // const [openViewAndEditReqDialogR, setOpenViewAndEditReqDialogR] = useState(false);
    // const [openViewAndEditReqDialogA, setOpenViewAndEditReqDialogA] = useState(false);
    const [openViewDataReqAndJOB, setopenViewDataReqAndJOB] = useState(false);

    const handleViewAndEditReqDialog = (e) => {
        setOpenViewAndEditReqDialog(true);
        setDataPropJOBDEtail(e)

    };
    
    const handleCloseViewAndEditReqDialog = () => {
        setOpenViewAndEditReqDialog(false);
        setDataPropJOBDEtail("")

    };

    // const handleViewAndEditReqDialogR = (e) => {
    //     setOpenViewAndEditReqDialogR(true);
    //     setDataPropJOBDEtail(e)

    // };
    
    // const handleCloseViewAndEditReqDialogR = () => {
    //     setOpenViewAndEditReqDialogR(false);
    //     setDataPropJOBDEtail("")

    // };

    // const handleViewAndEditReqDialogA = (e) => {
    //     setOpenViewAndEditReqDialogA(true);
    //     setDataPropJOBDEtail(e)

    // };
    
    // const handleCloseViewAndEditReqDialogA = () => {
    //     setOpenViewAndEditReqDialogA(false);
    //     setDataPropJOBDEtail("")

    // };

    const handleViewDataReqAndJOB = (e) => {
        setopenViewDataReqAndJOB(true);
        setDataPropJOBDEtail(e)

    };
    
    const handleCloseViewDataReqAndJOB = () => {
        setopenViewDataReqAndJOB(false);
        setDataPropJOBDEtail("")

    };

    const renderBodyW = (item, index) => (
        <tr key={index} onClick={() => {handleViewAndEditReqDialog(item.tikket_no)}} className="cursor_pointer">
            <td className="col_txt">{formatDateTime(item.tikket_date,false)}</td>
            <td className="col_txt font-family-Kanit">{item.service_types[0].title}</td>
            <td className="col_txt font-family-Kanit">{item.service_options[0].title}</td>
            <td className="col_txt">{item.account_users[0].name_user}</td>
            <td className="col_txt">{item.section_req}</td>
            <td className="col_txt">
                <Badge variant="dot" invisible={false}  
                    sx= {
                            {
                                "& .MuiBadge-badge": {
                                    color: "lightgreen",
                                    backgroundColor: "#ffd44b"
                                }
                            }
                        }>

                    {item.tikket_no}
                </Badge>
            </td>    
        </tr>
    )

    // const renderBodyA = (item, index) => (
    //     <tr key={index} onClick={() => {handleViewAndEditReqDialogA(item.tikket_no)}} className="cursor_pointer">
    //         <td className="col_txt">{formatDateTime(item.tikket_date,false)}</td>
    //         <td className="col_txt font-family-Kanit">{item.service_types[0].title}</td>
    //         <td className="col_txt font-family-Kanit">{item.service_options[0].title}</td>
    //         <td className="col_txt">{item.account_users[0].name_user}</td>
    //         <td className="col_txt">{item.section_req}</td>
    //         <td className="col_txt">
    //             <Badge variant="dot" invisible={false}  
    //                 sx= {
    //                         {
    //                             "& .MuiBadge-badge": {
    //                                 color: "lightgreen",
    //                                 backgroundColor: "#00e253"
    //                             }
    //                         }
    //                     }>

    //                 {item.tikket_no}
    //             </Badge>
    //         </td>           
    //     </tr>
    // )

    // const renderBodyR = (item, index) => (
    //     <tr key={index} onClick={() => {handleViewAndEditReqDialogR(item.tikket_no)}} className="cursor_pointer">
    //         <td className="col_txt">{formatDateTime(item.tikket_date,false)}</td>
    //         <td className="col_txt font-family-Kanit">{item.service_types[0].title}</td>
    //         <td className="col_txt font-family-Kanit">{item.service_options[0].title}</td>
    //         <td className="col_txt">{item.account_users[0].name_user}</td>
    //         <td className="col_txt">{item.section_req}</td>
    //         <td className="col_txt">
    //             <Badge variant="dot" invisible={false}  
    //                 sx= {
    //                         {
    //                             "& .MuiBadge-badge": {
    //                                 color: "lightgreen",
    //                                 backgroundColor: "#fb0b12"
    //                             }
    //                         }
    //                     }>

    //                 {item.tikket_no}
    //             </Badge>
    //         </td>    
    //     </tr>
    // )

    const renderBodyAll = (item, index) => (
        <tr key={index} onClick={() => {handleViewDataReqAndJOB(item.tikket_no)}} className="cursor_pointer">
            <td className="col_txt">{formatDateTime(item.tikket_date,false)}</td>
            <td className="col_txt font-family-Kanit">{item.service_types[0].title}</td>
            <td className="col_txt font-family-Kanit">{item.service_options[0].title}</td>
            <td className="col_txt">{item.account_users[0].name_user}</td>
            <td className="col_txt">{item.section_req}</td>
            <td className="col_txt">
                {
                     item.createJob_by !== null && item.status === "approve" ?
                        <>
                            {item.tikket_no}
                            <Badge  badgeContent={"JOB"}
                                sx={
                                        {
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "#00e253",
                                                fontSize: "5px",
                                            }
                                        }
                                }>
                                <Box sx={{marginLeft: 0, padding: 0.9}}></Box>
                            </Badge>
                        </>
                     :
                        <Badge  variant="dot"
                            sx={
                                item.status === "approve" ?
                                    {
                                        "& .MuiBadge-badge": {
                                            color: "white",
                                            backgroundColor: "#00e253"
                                        }
                                    }
        
                                :
                                    item.status === "reject" ?
                                        {
                                            "& .MuiBadge-badge": {
                                                color: "write",
                                                backgroundColor: "#fb0b12"
                                            }
                                        }
                                    : 
                                        item.status === "wait" ?
                                            {
                                                "& .MuiBadge-badge": {
                                                    color: "write",
                                                    backgroundColor: "#ffd44b"
                                                }
                                            }
                                        : null
                            }>
        
                            {item.tikket_no}
                        </Badge>

                }
               
            </td>    
        </tr>
    )

    return (
        <div className="layout-component m_r">
            <ViewAndEditReq
                id="ringtone-menu"
                keepMounted
                openViewAndEditReqDialog={openViewAndEditReqDialog}
                onCloseViewAndEditReqDialog={handleCloseViewAndEditReqDialog}
                tikketNo={DataPropJOBDEtail}
                setMsg = {(Vmsg) => setMsg(Vmsg)}
                ViewMode = {"review"}
            />  

            <ViewAndEditReq
                id="ringtone-menu"
                keepMounted
                openViewAndEditReqDialog={openViewDataReqAndJOB}
                onCloseViewAndEditReqDialog={handleCloseViewDataReqAndJOB}
                tikketNo={DataPropJOBDEtail}
                setMsg = {(Vmsg) => setMsg(Vmsg)}
                ViewMode = {"view-all"}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
            />
            <h2 className="page-header">
                { "Request".toUpperCase() }
            </h2>
            <div className="row box-scroll">
                <div className="col-12">
                    <div className="card-g dataEmp-min-h">
                        
                    {
                        <Col lg={ 8 } className="del-p-g">
                                <UncontrolledTabs initialActiveTabId="overview" >
                                    
                                    <div className="box-nav">
                                        <Nav pills className="search-n">
                                            <Search className="search-table" placeholder="Search here.." allowClear onSearch={onSearch} style={{ width: 200 }} />
                                        </Nav>
                                        {/* <Nav pills id="box1" onClick={() => { FuncSwitchSearch() }}> */}
                                        <Nav pills id="box1">
                                            <NavItem className="nav-tab" onClick={()=> onSearch("")}>
                                                <UncontrolledTabs.NavLink tabId="overview" className="btn letter active-item" name="nav_w">
                                                    wait
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink>

                                                {/* <UncontrolledTabs.NavLink tabId="approve" className="btn letter" name="nav_a">
                                                    approve
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink> */}
                                        
                                                {/* <UncontrolledTabs.NavLink tabId="reject"  className="btn letter" name="nav_r">
                                                    reject
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink> */}

                                                <UncontrolledTabs.NavLink tabId="allreq"  className="btn letter" name="nav_all">
                                                    all req.
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink>
                                                <div className="animation start-home"></div>

                                            </NavItem>
                                        </Nav>
                                    </div>
                                    { /* END Pills Nav */}
                                    <UncontrolledTabs.TabContent>

                                        <TabPane tabId="overview" id="Overview">  
            
                                            

                                            {/* <ViewAndEditReq
                                                id="ringtone-menu"
                                                keepMounted
                                                openViewAndEditReqDialog={openViewAndEditReqDialogR}
                                                onCloseViewAndEditReqDialog={handleCloseViewAndEditReqDialogR}
                                                tikketNo={DataPropJOBDEtail}
                                                setMsg = {(Vmsg) => setMsg(Vmsg)}
                                                ViewMode = {"review-again"}
                                            />   */}

                                            {/* <ViewAndEditReq
                                                id="ringtone-menu"
                                                keepMounted
                                                openViewAndEditReqDialog={openViewAndEditReqDialogA}
                                                onCloseViewAndEditReqDialog={handleCloseViewAndEditReqDialogA}
                                                tikketNo={DataPropJOBDEtail}
                                                setMsg = {(Vmsg) => setMsg(Vmsg)}
                                                ViewMode = {"manage-assign"}
                                            />   */}

                                            
                                            
                                            <Table
                                                limit='10'
                                                headData={customerTableHead.header}
                                                renderHead={(item, index) => renderHead(item, index)}
                                                bodyData={sh_datatikketW}
                                                renderBody={(item, index) => renderBodyW(item, index)}
                                                // search={true}
                                                StattusLoadDatajob={StattusLoadDatajob}
                                            />
                                        </TabPane>

                                        {/* <TabPane tabId="approve" id="Approve">
                                            <Table
                                                limit='7'
                                                headData={customerTableHead.header}
                                                renderHead={(item, index) => renderHead(item, index)}
                                                bodyData={sh_datatikketA}
                                                renderBody={(item, index) => renderBodyA(item, index)}
                                                StattusLoadDatajob={StattusLoadDatajob}

                                                // search={true}
                                            />
                                        </TabPane> */}

                                        {/* <TabPane tabId="reject" id="Reject">
                                            <Table
                                                limit='7'
                                                headData={customerTableHead.header}
                                                renderHead={(item, index) => renderHead(item, index)}
                                                bodyData={sh_datatikketR}
                                                renderBody={(item, index) => renderBodyR(item, index)}
                                                StattusLoadDatajob={StattusLoadDatajob}

                                                // search={true}
                                            />             
                                        </TabPane> */}

                                        <TabPane tabId="allreq" id="Allreq">
                                            <Table
                                                limit='10'
                                                headData={customerTableHead.header}
                                                renderHead={(item, index) => renderHead(item, index)}
                                                bodyData={sh_datatikketAll}
                                                renderBody={(item, index) => renderBodyAll(item, index)}
                                                StattusLoadDatajob={StattusLoadDatajob}

                                                // search={true}
                                            />             
                                        </TabPane>
                                     
                                    </UncontrolledTabs.TabContent>
                                </UncontrolledTabs>
                        </Col>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Request

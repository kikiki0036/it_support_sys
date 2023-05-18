import React, { useState, useEffect } from 'react'
import Axios from "axios";
// import { Button, Popconfirm, notification } from 'antd';
// import 'antd/dist/antd.css';
// import { Row, Col } from 'antd';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Table from '../components/table/Table'

import {
    ButtonGroup,
    Button,
    Popper,
    Fade,
    Paper,
    Typography,
    Stack,
    Divider,
    IconButton

} from '@mui/material';

import {
    ErrorOutline,
} from '@mui/icons-material/';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from "@mui/material/styles";

import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import moment from "moment";
import "moment-timezone";

import Nav from './Nav';
import { Input } from 'antd';

const LightTooltip = styled(({ className, ...props }) => (<Tooltip {...props} classes={{ popper: className }} />)) (({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: { maxWidth: 200, padding:15, backgroundColor: "white",fontFamily:"kanit", boxShadow: theme.shadows[1], fontSize: 11,color:"#969494" },
    [`& .${tooltipClasses.arrow}`]: { "&:before": { boxShadow: theme.shadows[1],  backgroundColor: theme.palette.common.white, }, color: theme.palette.common.white, backgroundColor: "none" },
}));

const NotebookCenterBooking = (props) => {

    const { Search } = Input;

    const  {enqueueSnackbar}  = useSnackbar();

    const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD")

    // const handleClick = () => {
    //   enqueueSnackbar('การจองโน็ตบุค : ไม่สำเร็จเนื้องจากมีคนจองเวลานี้ไปแล้ว');
    // };
  
    const handleClickVariant = (variant) => {
        console.log("handleClickVariant")
      // variant could be success, error, warning, info, or default
      if(variant === "error") {
        enqueueSnackbar('การจองโน็ตบุค : ไม่สำเร็จเนื้องจากวันนี้ได้ทำการจองแล้ว', { variant });

      } else {
        enqueueSnackbar('การจองโน็ตบุค : จองสำเร็จ ', { variant });

      }
    };


    const [id, setId] = useState('');
    // const [nn, setnn] = useState([]);
    // const arr3 = []
    const [DataNCBook, setDataNCBook] = useState([]);
    const [DataHistoryNCBook, setDataHistoryNCBook] = useState([]);
    const [DataHistoryNCBookRow, setDataHistoryNCBookRow] = useState(DataHistoryNCBook);
    const [StattusLoadDataHistoryNC, setStattusLoadDataHistoryNC] = useState(false);

    useEffect(() => {
        setDataHistoryNCBookRow(DataHistoryNCBook)

    },[DataHistoryNCBook]);

    useEffect(() => {
        setId(localStorage.getItem('id_emp_login'));

    }, [localStorage.getItem('id_emp_login')]);

    const HistoryNC = () => {
        if(localStorage.getItem('id_emp_login') !== null && localStorage.getItem('id_emp_login').substring(0,2) === "IT") {
            
            Axios.get('http://localhost:5000/HistoryNC').then((response) => {

                setDataHistoryNCBook(response.data);
              
            })

        } else if(localStorage.getItem('id_emp_login') !== null && localStorage.getItem('id_emp_login').substring(0,2) !== "IT") {

            Axios.post('http://localhost:5000/HistoryNCCUT', {
                id_emp: localStorage.getItem('id_emp_login') 

            }).then((response) => {

                setDataHistoryNCBook(response.data);
              
            })

        }
    
    }

    useEffect(() => {
        nnow();
        HistoryNC();
        
    }, []); 

    // const corecnoti = type => {
    //     notification[type]({
    //         message: 'การจองโน็ตบุค',
    //         description:
    //             'จองสำเร็จ',
    //     });
    // };
    // const incorecnoti = type => {
    //     notification[type]({
    //         message: 'การจองโน็ตบุค',
    //         description:
    //             'ไม่สำเร็จเนื้องจากมีคนจองเวลานี้ไปแล้ว',
    //     });
    // };

    const confirm1a = () => {
        // console.log("HI");
        a("ITNC0001", "09.00-12.00");
        // console.log(a, b);
    }
     
    const confirm1p = () => {
        a("ITNC0001", "13.00-16.00");
    }

    const confirm2a = () => {
        a("ITNC0002", "09.00-12.00");
    }

    const confirm2p = () => {
        a("ITNC0002", "13.00-16.00");
    }

    const confirm3a = () => {
        a("ITNC0003", "09.00-12.00");
    }

    const confirm3p = () => {
        a("ITNC0003", "13.00-16.00");
    }

    const confirm4a = () => {
        a("ITNC0004", "09.00-12.00");
    }

    const confirm4p = () => {
        a("ITNC0004", "13.00-16.00");
    }

    
    const confirm5a = () => {
        a("ITNC0005", "09.00-12.00");
    }

    const confirm5p = () => {
        a("ITNC0005", "13.00-16.00");
    }

    const confirm6a = () => {
        a("ITNC0006", "09.00-12.00");
    }

    const confirm6p = () => {
        a("ITNC0006", "13.00-16.00");
    }

    const onSearch = value => {
        const filteredRowsReserve = DataHistoryNCBook.filter((row) => {
            const rowcolummReserve = row.reserve_by
            return rowcolummReserve.toLowerCase().includes(value.toLowerCase());

        });

        setDataHistoryNCBookRow(filteredRowsReserve);

    }


    const nnow = () => {
        // let today = new Date().toISOString().slice(0, 10)
        // arr3.length = 0;

        Axios.post('http://localhost:5000/checknote', { day: Datecurrent }).then((response) => {
            setDataNCBook(response.data);
            setStattusLoadDataHistoryNC(true);
            // console.log(response);
            // for (let i = 0; i < response.data.length; i++) {
            //     arr3.push(
            //         <Typography sx={{ padding: 1}}>
            //             { "-" + response.data[i].device_id + " " + "-" + response.data[i].round }
            //         </Typography>

            //     )

            // }

            // setnn(
            //     <dTypographyiv>
            //         {arr3}
            //     </dTypographyiv>
            // )

        })

    }


    const a = (did, round) => {
            // let today = new Date().toISOString().slice(0, 10)

            Axios.post('http://localhost:5000/checkNotebook', { device_id: did, round: round, day: Datecurrent, reserve_by: id }).then((response) => {
                // console.log(localStorage);
                // console.log(response);
                if (response.data == "1" ) {
                    // setnn('')
                    handleClickVariant('success');
                    // arr3.push(...
                    //     <div>
                    //         {"-" + did + " " + "-" + round}
                    //     </div>
                    // )
                    // setnn(
                    //     <div>
                    //         {arr3}
                    //     </div>
                    // )
                    nnow();
                    HistoryNC();

                }  else {
                    handleClickVariant('error');
        
                }
                // if(response.data)
                // if (response.data[0].status == "empty") {
                //     Axios.put('http://localhost:3001/updatestatus', { device_id: did, round: round, reserve_by: /*location.state.id*/"6400001", status: "disabled" }).then((response) => {
                //         console.log("ยืมเรียบร้อย");
                //         corecnoti('success');
                //     })
                // }
                // else {
                //     console.log("ไม่ว่าง");
                //     incorecnoti('error');
                // }
            });

        
    } 
        
    const customerTableHead = {
        headerNotebookCenter: [
            "Notebook Center",
            "time",         
            "date",
            "reserve"
        ]

    }

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBodyNotebookCenter = (item, index) => (
        <tr key={index} >
            <td className="col_txt">{item.device_id}</td>
            <td className="col_txt">{item.round}</td>
            <td className="col_txt">{item.day}</td>
            <td className="col_txt">{item.data_emps[0].emp_name}</td>
        </tr>
    )


    return (
        <div className="layout-component m_r">
            <h2 className="page-header">
                {"Notebook Center".toUpperCase()}
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card-g dataEmp-min-h">
                       <div className="nc-book">
                            <Paper sx={{ padding: 2, marginBottom:2, marginX:1}}>
                                <div className="box-nav">
                                    <Typography sx={{ paddingY: 1, fontFamily:"kanit"}}>โน็ตบุคกลาง</Typography>
                                    <LightTooltip title="การจองโน็ตบุคกลางคุณสามารถจองได้วันละหนึ่งเครื่องเท่านั้น"
                                        placement="left-start"
                                        arrow
                                    >
                                        <IconButton >
                                            <ErrorOutline  sx={{ fontSize: 13 }}/>
                                        </IconButton>
                                    </LightTooltip>
                                </div>
                                <Stack spacing={3} sx={{marginBottom:3, padding: "5px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                        sx={{display:"flex", alignItems:"center", justifyContent:"center"}}

                                    >
                                        
                                        <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0001</Typography>
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <>
                                                    <Button variant="contained" sx={{width:250, height:40, fontSize: 13}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0001" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0001" })].round === "09.00-12.00" }
                                                    >
                                                        09.00-12.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0001 - 09.00-12.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time1" >cancle</Button>
                                                                        <Button variant="contained" onClick={() => {popupState.close(); confirm1a();}} id="time1" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </>
                                            )}

                                        </PopupState>

                                        
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" sx={{width:250, height:40, fontSize: 13}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0001" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0001" })].round === "13.00-16.00" }
                                                   >
                                                        13.00-16.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0001 - 13.00-16.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time2" >cancle</Button>
                                                                        <Button variant="contained" onClick={() => {popupState.close(); confirm1p();}} id="time2" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                               
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                    </Stack>

                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                        sx={{display:"flex", alignItems:"center", justifyContent:"center"}}

                                    >
                                        <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0002</Typography>
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" sx={{width:250, height:40, fontSize: 13}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0002" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0002" })].round === "09.00-12.00" }

                                                    >
                                                        09.00-12.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0002 - 09.00-12.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time1" >cancle</Button>
                                                                        <Button variant="contained" onClick={() => {popupState.close(); confirm2a();}}  id="time1" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button  variant="contained" sx={{width:250, height:40, fontSize: 13}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0002" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0002" })].round === "13.00-16.00" }

                                                    >
                                                        13.00-16.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0002 - 13.00-16.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time2" >cancle</Button>
                                                                        <Button variant="contained" onClick={() => {popupState.close(); confirm2p();}} id="time2" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                               
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                    </Stack>

                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                        sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
                                    >
                                        
                                        <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0003</Typography>
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0003" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0003" })].round === "09.00-12.00" }

                                                    >
                                                        09.00-12.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0003 - 09.00-12.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time1" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm3a();}}  id="time1" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button  variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0003" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0003" })].round === "13.00-16.00" }

                                                    >
                                                        13.00-16.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0003 - 13.00-16.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time2" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm3p();}}  id="time2" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>

                                    </Stack>

                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                        sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
                                    >
                                        
                                        <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0004</Typography>
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0004" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0004" })].round === "09.00-12.00" }

                                                    >
                                                        09.00-12.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0004 - 09.00-12.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time1" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm4a();}}  id="time1" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button  variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0004" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0004" })].round === "13.00-16.00" }

                                                    >
                                                        13.00-16.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0004 - 13.00-16.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time2" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm4p();}}  id="time2" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>

                                    </Stack>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                        sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
                                    >
                                        
                                        <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0005</Typography>
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0005" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0005" })].round === "09.00-12.00" }

                                                    >
                                                        09.00-12.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0005 - 09.00-12.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time1" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm5a();}}  id="time1" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button  variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0005" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0005" })].round === "13.00-16.00" }

                                                    >
                                                        13.00-16.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0005 - 13.00-16.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time2" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm5p();}}  id="time2" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>

                                    </Stack>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={2}
                                        sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
                                    >
                                        
                                        <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0006</Typography>
                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0006" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0006" })].round === "09.00-12.00" }

                                                    >
                                                        09.00-12.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0006 - 09.00-12.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time1" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm6a();}}  id="time1" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>


                                        <PopupState variant="popper" popupId="demo-popup-popper">

                                            {(popupState) => (
                                                <div>
                                                    <Button  variant="contained" sx={{width:250, height:40}} {...bindToggle(popupState)}
                                                        disabled={DataNCBook.findIndex(object => { return object.device_id === "ITNC0006" }) !== -1 && DataNCBook[DataNCBook.findIndex(object => { return object.device_id === "ITNC0006" })].round === "13.00-16.00" }

                                                    >
                                                        13.00-16.00
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                        <Fade {...TransitionProps} timeout={350}>
                                                            <Paper sx={{boxShadow:2}}>
                                                                <Stack direction="row" sx={{ padding: "16px", display:"flex",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                                                    <Typography sx={{ padding: 1, fontSize: 13}}>ITNC0006 - 13.00-16.00</Typography>
                                                                    <Stack spacing={1} direction="row" sx={{ padding: "16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                                                        <Button color={"error"} variant="contained" onClick={popupState.close} id="time2" >cancle</Button>
                                                                        <Button variant="contained"  onClick={() => {popupState.close(); confirm6p();}}  id="time2" >confirm</Button>

                                                                    </Stack>
                                                                </Stack>
                                                                
                                                            </Paper>
                                                        </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}

                                        </PopupState>

                                    </Stack>
                                
                                </Stack>
                            </Paper>

                            <Paper sx={{ padding: 2, marginBottom:2, marginX:1}}>
                                <Typography sx={{ paddingY: 1, fontFamily:"kanit"}}>โน็ตบุคที่ถูกยืมในวันนี้</Typography>
                                <Stack spacing={2}>
                                  
                                    <table className="nc-table-css">
                                        <thead>
                                            <tr>
                                                <td>Notebook Center</td>
                                                <td>time</td>
                                                <td>date</td>
                                                <td>reserve</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                DataNCBook.map((item, index) => (
                                                    <tr key={ "key" + index }>
                                                        <td>{item.device_id}</td>
                                                        <td>{item.round}</td>
                                                        <td>{item.day}</td>
                                                        <td>{item.data_emps[0].emp_name}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </Stack>
                            </Paper>
                            <Paper sx={{ padding: 2, marginBottom:2, marginX:1}}>
                                 <div className="box-nav">
                                    <Typography sx={{ paddingY: 1, fontFamily:"kanit"}}>ประวัติการยืม</Typography>

                                    <Nav pills className="search-n">
                                        <Search className="search-table" placeholder="Search ID Emp.." allowClear onSearch={onSearch} style={{ width: 200 }} />
                                    </Nav>


                                </div>
                                <Stack spacing={2}>
                                    <Table
                                        limit='8'
                                        class={"nc-table-css"}
                                        headData={customerTableHead.headerNotebookCenter}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={DataHistoryNCBookRow}
                                        renderBody={(item, index) => renderBodyNotebookCenter(item, index)}
                                        StattusLoadDatajob={StattusLoadDataHistoryNC}

                                    />

                                  

                                </Stack>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NotebookCenterBooking
import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Profilepass from "./Profilepass";
import Profileuser from "./Profileuser";
import MuiAlert from "@mui/material/Alert";
import {
  InputBase,
  FormControlLabel,
  Switch,
  Typography,
  Tab,
  Tabs,
  Box,
  Divider,
  IconButton,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Card,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profie = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [hpt, setHtp] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };
  const onClickAcceptRole = async () => {
    // console.log(temp1,temp2,temp3,temp4);
      try {
        if(localStorage.mail_user_login===temp3)
        {
          axios.post("http://localhost:5000/updateprofiledata", {
            id_user: localStorage.id_user_login,
            name_user: temp1,
            name_user_eng: temp2,
            mail: temp3,
            tel: temp4,
          });
          handleClick();
          localStorage.setItem("tname", temp1);
          localStorage.setItem("username_login", temp2);
          localStorage.setItem("mail_user_login", temp3);
          localStorage.setItem("tel", temp4);
          handleCloseModalSelect();

        }
        else
        {
        await axios.post("http://localhost:5000/checkEmail", { Mail: temp3,}).then((res) => {
          // console.log(res);
          handleClick2();
          handleCloseModalSelect();
       
        });
      }
      }catch(err){
        axios.post("http://localhost:5000/updateprofiledata", {
            id_user: localStorage.id_user_login,
            name_user: temp1,
            name_user_eng: temp2,
            mail: temp3,
            tel: temp4,
          });
          handleClick();
          localStorage.setItem("tname", temp1);
          localStorage.setItem("username_login", temp2);
          localStorage.setItem("mail_user_login", temp3);
          localStorage.setItem("tel", temp4);
          handleCloseModalSelect();
       
      } 

  };
  const handleCloseModalSelect = () => {
    setIsSelect(false);
  };
  const handleCloseModalSelect2 = () => {
    setIsSelect2(false);
  };

  const onClickAcceptRole2 = async () => {
    // console.log(temp1,temp2,temp3,temp4);
    if (temp1 === temp2) {
      axios.post("http://localhost:5000/updatepass", {
        id_user: localStorage.id_user_login,
        password: temp1,
      });
      handleClick();
      document.getElementById("requestf").reset()
    } else {
      setHtp("รหัสผ่านไม่ตรงกัน");
      handleClick2();
    }

    handleCloseModalSelect2();
  };
  const Checkpass = async (e) => {
    e.preventDefault();
    setIsSelect2(true);
    setTemp1(e.target[0].value);
    setTemp2(e.target[2].value);
  };
  const Checkpdata = async (e) => {
    e.preventDefault();
    setIsSelect(true);
    setTemp1(e.target[0].value);
    setTemp2(e.target[2].value);
    setTemp3(e.target[4].value);
    setTemp4(e.target[6].value);
  };

  return (
    <div className="layout-component m_r">
      <h2 className="page-header">{"my profile".toUpperCase()}</h2>
      <div className="row">
        <div className="col-12">
          <div className="card-g  dataEmp-min-h">
            <Dialog
              open={isSelect}
              onClose={handleCloseModalSelect}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"  "}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  คุณต้องการที่จะเปลี่ยนข้อมูลหรือไม่ ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalSelect}>CANCEL</Button>
                <Button onClick={onClickAcceptRole} autoFocus>
                  CONFIRM
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={isSelect2}
              onClose={handleCloseModalSelect2}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"  "}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  คุณต้องการที่จะเปลี่ยนรหัสผ่านหรือไม่ ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalSelect2}>CANCEL</Button>
                <Button onClick={onClickAcceptRole2} autoFocus>
                  CONFIRM
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                บันทึกสำเร็จ
              </Alert>
            </Snackbar>
            <Snackbar
              open={open2}
              autoHideDuration={3000}
              onClose={handleClose2}
            >
              <Alert
                onClose={handleClose2}
                severity="error"
                sx={{ width: "100%" }}
              >
                บันทึกไม่สำเร็จ
              </Alert>
            </Snackbar>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidateautoComplete="off"
            ></Box>
            {<Profileuser checkpdata={Checkpdata} />}
            <br />
            {<Profilepass checkpass={Checkpass} hpt={hpt} id={"requestf"}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profie;

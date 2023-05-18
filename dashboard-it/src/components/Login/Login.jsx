import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function RegisterDialog(props) {
  const {
    register_Check,
    onCloseDialogRegister,
    openDialogRegister,
    ...other
  } = props;

  const handleCancelRegisterDialog = () => {
    onCloseDialogRegister();
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Dialog
      fullScreen
      open={openDialogRegister}
      onClose={onCloseDialogRegister}
      TransitionComponent={Transition}
    >
      {/* <AppBar sx={{ overflowY: "overlay",  position: 'relative',backgroundImage:"linear-gradient(45deg, #f5f7fb 10%, #bbbbbb 70%)"}}> */}
      <AppBar
        sx={{
          overflowY: "overlay",
          position: "relative",
          backgroundColor: "#cacaca",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancelRegisterDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            ลงทะเบียนผู้ใช้ใหม่
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="box-dialog-content-form">
        <form
          onSubmit={register_Check}
          className="box form-content register-content"
        >
          <header>ข้อมูลผู้ใช้</header>

          <div className="field mt-5">
            <label className="label"> ชื่อผู้ใช้ / Username</label>
            <div className="controls validate-input">
              <input
                type="text"
                className="input input100"
                placeholder="ชื่อผู้ใช้"
                id="idemp"
                autoFocus
                minLength={5}
                maxLength={9}
                required
                pattern="^\w[a-zA-Z@#0-9.]*$"
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="field mt-5">
            <label className="label">ชื่อ สกุล ภาษาไทย/Full name Thai</label>
            <div className="controls validate-input">
              <input
                type="text"
                className="input input100"
                placeholder="ชื่อ สกุล"
                name="tname"
                id="tname"
                pattern= "^[ก-๏]([-']?[ก-๏]+)*( [ก-๏]([-']?[ก-๏]+)*)+$"
                required
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="field mt-5">
            <label className="label">ชื่อ สกุล ภาษาอังกฤษ/Full name Eng</label>
            <div className="controls validate-input">
              <input
                type="text"
                className="input input100"
                placeholder="Firstname Lastname"
                name="ename"
                id="ename"
                pattern="^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$"
                required
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="field mt-5">
            <label className="label">เพศ/Gender</label>
            <div className="controls validate-input">
              <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{height:"40px"}}
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="field mt-5">
            <label className="label">อีเมล / Email</label>
            <div className="controls validate-input">
              <input
                type="email"
                className="input input100"
                placeholder="@hotmail.com"
                name="mail"
                id="mail"
                required
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="field mt-5">
            <label className="label">เบอร์โทรศัพท์ / Telephone Number</label>
            <div className="controls validate-input">
              <input
                type="tel"
                className="input input100"
                placeholder="+66"
                name="tel"
                id="tel"
                required
                minLength={10}
                maxLength={10}
                pattern="[0-9]{10}"
              />
              <span className="focus-input100"></span>
            </div>
          </div>

          <div className="field mt-5">
            <label className="label">ตั้งรหัสผ่านเข้าใช้งาน / Password</label>
            <div className="controls validate-input">
              <input
                type="password"
                className="input input100"
                placeholder=""
                name="pass"
                id="pass"
                pattern="^\w[a-zA-Z@#0-9.]*$"
                required
                minLength={10}
                maxLength={15}
              />
              <span className="focus-input100"></span>
            </div>
          </div>

          <div className="field mt-5">
            <div className="button">
              <Button
                type="submit"
                // variant={"text"}
                sx={{ pt: 1, px: 2 }}
                // onClick={regist}
              >
                ขอสิทธ์ใช้งาน
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

function Forgetpass(props) {
  const {
    openDialogforget,
    onCloseDialogforget,
    forgetpasscheck,
    ...other
  } = props;

  return (
    <Dialog
      fullScreen
      open={openDialogforget}
      onClose={onCloseDialogforget}
      TransitionComponent={Transition}
    >
      {/* <AppBar sx={{ overflowY: "overlay",  position: 'relative',backgroundImage:"linear-gradient(45deg, #f5f7fb 10%, #bbbbbb 70%)"}}> */}
      <AppBar
        sx={{
          overflowY: "overlay",
          position: "relative",
          backgroundColor: "#cacaca",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCloseDialogforget}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            ลืมรหัสผ่าน
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="box-dialog-content-form">
        <form
          onSubmit={forgetpasscheck}
          className="box form-content register-content"
        >
          <div className="field mt-5">
            <label className="label">อีเมล / Email</label>
            <div className="controls validate-input">
              <input
                type="email"
                className="input input100"
                placeholder=""
                name="mail"
                id="mail"
                pattern="^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$"
            
                required
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="field mt-5">
            <div className="button">
              <Button
                type="submit"
                // variant={"text"}
                sx={{ pt: 1, px: 2 }}
                // onClick={regist}
              >
                ยืนยัน
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}


const Login = () => {
  const [openDialogRegister, setOpenDialogRegister] = useState(false);
  const [openDialogRegister2, setOpenDialogRegister2] = useState(false);

  const [openA, setOpenA] = React.useState(false);
  const [openA2, setOpenA2] = React.useState(false);
  const [openA3, setOpenA3] = React.useState(false);
  const [openA4, setOpenA4] = React.useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");
  const [temp5, setTemp5] = useState("");
  const [temp6, setTemp6] = useState("");
  const [temp7, setTemp7] = useState("");
  const [temp8, setTemp8] = useState("");
  const handleClick = () => {
    setOpenA(true);
  };

  const handleAClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenA(false);
  };
  const handleClick2 = () => {
    setOpenA2(true);
  };

  const handleAClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenA2(false);
  };
  const handleClick3 = () => {
    setOpenA3(true);
  };

  const handleAClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenA3(false);
  };
  const handleClick4 = () => {
    setOpenA4(true);
  };

  const handleAClose4 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenA4(false);
  };
  

  const handleDialogRegister = () => {
    setOpenDialogRegister(true);
  };

  const handleCloseDialogRegister = () => {
    setOpenDialogRegister(false);
  };
  const handleDialogRegister2 = () => {
    setOpenDialogRegister2(true);
  };

  const handleCloseDialogRegister2 = () => {
    setOpenDialogRegister2(false);
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await axios.get("http://localhost:5000/token").then((res) => {});
        history.push("/it-service/it-support/");
      } catch (error) {
        // if (error.response) {
        //     history.push("/login");
        // }
      }
    };

    refreshToken();
    // getUsers();
  }, []);

  const [msg, setMsg] = useState("");
  const history = useHistory();

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    const handleSubmit = async () => {
      if (msg !== "") {
        setState((state) => ({
          state,
          ...{ open: true, vertical: "top", horizontal: "center" },
        }));
        await sleep(1e3);
        setState((state) => ({ ...state, open: false }));
        setMsg("");
      }
    };

    handleSubmit();
  }, [msg]);

  const Auth = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await axios.post("http://localhost:5000/login", {
        name: data.get("login_name"),
        password: data.get("login_password"),
      });
      // console.log();
      
      history.push("/it-service/it-support/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const handleCloseModalSelect = () => {
    setIsSelect(false);
  };
  const handleCloseModalSelect2 = () => {
    setIsSelect2(false);
  };
  const onClickAcceptRole = async () => {
    // console.log(temp1,temp2,temp3,temp4);
    checkusermail()
   
  };
  const onClickAcceptRole23 = async () => {
    // console.log(temp1,temp2,temp3,temp4);
    checkusermail23()
   
  };
  const checkusermail = async () => {
    try{
      console.log( temp1, temp5);
      await axios.post("http://localhost:5000/checkuseraccout", {Id_user: temp1,Mail: temp5,}).then((res) => {
       
        if (res.status === 200) {
        handleClick2();
        handleCloseModalSelect();

        //   console.log("edd");

          // adduser(temp1, temp2, temp3, temp4, temp5,temp6, temp7);
        } 
      });
    }catch(err){
      adduser(temp1, temp2, temp3, temp4, temp5,temp6, temp7);
    }
  
  };

  const adduser = (userid, tname, ename, gender, email,tel, pass) => {
    // console.log(userid, tname, ename, gender, email,tel, pass);
    axios
      .post("http://localhost:5000/adduseraccout", {
        Id_user: userid,
        Name_user: tname,
        Name_user_eng: ename,
        Gender: gender,
        Mail: email,
        tel:tel,
        Password: pass,
      })
      .then((res) => {});
    handleClick();
    handleCloseDialogRegister();
    handleCloseModalSelect();
  
  };
  const checkusermail23 = async () => {
  
    try{
      await axios.post("http://localhost:5000/checkEmail", { Mail: temp1,}).then((res) => {
        console.log(res);
        if (res.status == 200) {
          axios.post("http://localhost:5000/forgotpwd", { email: temp1,})
   
        handleCloseDialogRegister2();
        handleCloseModalSelect2();
        handleClick3()
        
        } 

      });
    } catch(err){
      console.log(err)
      handleClick4();
      handleCloseModalSelect2();
      // console.log("dddd");
    }
  };

  const Register_Check = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget); 
    // console.log( e.target[7].value );
    setTemp1( e.target[0].value)
    setTemp2( e.target[1].value)
    setTemp3( e.target[2].value)
    setTemp4( e.target[3].value)
    setTemp5( e.target[5].value)
    setTemp6( e.target[6].value)
    setTemp7( e.target[7].value)
    setIsSelect(true)
    
  
    // checkusermail();
  };
  const Forgetcheck = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget); 
    // console.log("dasdasd");
    // console.log(e.target[0].value);
    setTemp1( e.target[0].value)
    // console.log( e.target[7].value );
    setIsSelect2(true)
    
    
    
  
    // checkusermail();
  };

  useEffect(() => {
    const pswrdField = document.querySelector(
        ".form-login input[type='password']"
      ),
      toggleBtn = document.querySelector(".form-login .field i");
    // toggleBtn2 = document.querySelector("header nav .user p");
    // console.log(document.getElementById('login_password'));
    toggleBtn.onclick = () => {
      if (document.getElementById('login_password').type === "password") {
        document.getElementById('login_password').type = "text";
        toggleBtn.classList.add("active");
      } else {
        document.getElementById('login_password').type = "password";
        toggleBtn.classList.remove("active");
      }
    };
  });

  // useEffect(() => {
  //     handleClick({
  //         vertical: "top",
  //         horizontal: "center"
  //     });
  // }, [msg]);

  return (
    <section className="box-content-center">
      <div className="box-s-l">
        {/* <div className="form-login-bg"></div> */}
        <div className="form-login">
          <form onSubmit={Auth} className="box form-content">
            {
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
              />
            }
              <Dialog
              open={isSelect}
              onClose={handleCloseModalSelect}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"  "}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  คุณต้องการที่จะขอสิทธ์การใช้งานใช่หรือไม่ ?
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
                  คุณต้องการที่จะส่งเมลลืมหรัสใช้ใช่หรือไม่ ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalSelect2}>CANCEL</Button>
                <Button onClick={onClickAcceptRole23} autoFocus>
                  CONFIRM
                </Button>
              </DialogActions>
            </Dialog>

            {/* <p className="has-text-centered">{msg}</p> */}
            {/* onChange={(e) => setPassword(e.target.value)} */}

            <header>IT SERVICE</header>

            <div className="field mt-5">
              <label className="label">Username</label>
              <div className="controls validate-input">
                <input
                  type="text"
                  className="input input100"
                  placeholder="Username"
                  name="login_name"
                  autoFocus
                />
                <span className="focus-input100"></span>
              </div>
            </div>

            <div className="field mt-5">
              <label className="label">Password</label>
              <div className="controls validate-input">
                <input
                  type="password"
                  className="input input100"
                  placeholder="∘∘∘∘∘∘∘∘"
                  name="login_password"
                  id="login_password"
                />
                <span className="focus-input100"></span>
                <i className="fas fa-eye"></i>
              </div>
            </div>

            <div className="field mt-5">
              {/* <button className="button">Login</button> */}
              <div className="button">
                <Button
                  // onClick={Auth}
                  type="submit"
                  variant={"text"}

                  sx={{ pt: 1, px: 2 }}
                >
                  Log in
                </Button>
              </div>
            </div>
            {/* linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%) */}
          </form>
        </div>
        <Snackbar open={openA} autoHideDuration={6000} onClose={handleAClose}>
          <Alert
            onClose={handleAClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            สมัครสำเร็จโปรดยืนยันตัวตนที่อีเมลที่กรอก
          </Alert>
        </Snackbar>
        <Snackbar open={openA2} autoHideDuration={6000} onClose={handleAClose2}>
          <Alert
            onClose={handleAClose2}
            severity="error"
            sx={{ width: "100%" }}
          >
           ชื่อผู้ใช้งานหรืออีเมลที่ใช้ซ้ำ
          </Alert>
        </Snackbar>
        <Snackbar open={openA3} autoHideDuration={6000} onClose={handleAClose3}>
          <Alert
            onClose={handleAClose3}
            severity="success"
            sx={{ width: "100%" }}
          >
            ส่งข้อความสำเร็จโปรดตรวจสอบรหัสใหม่ได้ที่อีเมล
          </Alert>
        </Snackbar>
        <Snackbar open={openA4} autoHideDuration={6000} onClose={handleAClose4}>
          <Alert
            onClose={handleAClose4}
            severity="error"
            sx={{ width: "100%" }}
          >
           ไม่มีเมลที่กรอกในระบบ
          </Alert>
        </Snackbar>
        <div className="box-register">
          {
            <RegisterDialog
              id="ringtone-menu"
              keepMounted
              openDialogRegister={openDialogRegister}
              onCloseDialogRegister={handleCloseDialogRegister}
              register_Check={Register_Check}
            />
          }
          {
             <Forgetpass
             id="ringtone-menu"
             keepMounted
             openDialogforget={openDialogRegister2}
             onCloseDialogforget={handleCloseDialogRegister2}
             forgetpasscheck={Forgetcheck}
           />
          }
          <div className="button">
            <Button
              onClick={handleDialogRegister}
              variant={"text"}
              sx={{ pt: 1, px: 2 }}
            >
              ลงทะเบียนผู้ใช้ใหม่
            </Button>
            <Button
              onClick={handleDialogRegister2}
              variant={"text"}
              sx={{ pt: 1, px: 2 }}
            >
              ลืมรหัสผ่าน
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

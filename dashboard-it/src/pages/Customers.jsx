import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import axios from "axios";

import UncontrolledTabs from "./UncontrolledTabs";
import Nav from "./Nav";
import { Input } from "antd";

import { Col, TabPane, NavItem } from "reactstrap";

import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Snackbar,
  // Stack,
  // Paper,
  // Typography,
  // InputBase,
  // Skeleton
} from "@mui/material";

import {
  Close,
  // LocalDining,
  MoreVert,
  Visibility,
  VisibilityOff,
  // PlaylistAdd,
  // DesktopWindows
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import PopupState, {
  bindTrigger,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state";

// import RenderDataProfile  from '../../src/assets/Field-RenderModel/RenderDataProfile';
// import RenderDataSection  from '../assets/Field-RenderModel/RenderDataLocation';
// import RenderDataDetailDevice  from '../assets/Field-RenderModel/RenderDataDetailDevice';

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.MuiInputLabel-root ": { fontSize: 14, fontFamily: "Kanit" },
  "& .MuiOutlinedInput-input": { fontSize: 13, fontFamily: "Kanit" },
  "& .MuiInputBase-input": { fontSize: 13, fontFamily: "Kanit" },
}));

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2)
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1)
//     }
// }));

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
            color: (theme) => theme.palette.grey[500],
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
  onClose: PropTypes.func.isRequired,
};

function Progress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={30}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light"
              ? "rgb(201, 201, 201)"
              : "rgb(201, 201, 201)",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={30}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

function EditProfileUser(props) {
  const {
    setMsg,
    IdUser,
    onCloseEditProfileUserDialog,
    openEditProfileUserDialog,
    setIsSubmit,
    ...other
  } = props;
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const GetUsers = async (idUser) => {
      try {
        await axios
          .post("http://localhost:5000/getProfileCut", {
            id_user: [idUser],
          })
          .then((res) => {
            setUserProfile(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    if (IdUser !== "") {
      GetUsers(IdUser);
    }
  }, [IdUser]);

  // useEffect(() => {
  //   console.log(userProfile)

  // },[userProfile]);

  const EditProfile = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (userProfile.length > 0) {
      try {
        await axios
          .post("http://localhost:5000/UpdateProfile", {
            id_user: userProfile[0].id_user,
            name_user: data.get("name_user-" + userProfile[0].id_user),
            name_user_eng: data.get("name_user_eng-" + userProfile[0].id_user),
            mail: data.get("mail-" + userProfile[0].id_user),
          })
          .then((res) => {
            setMsg(res.data.msg);
            setIsSubmit(true);
            onCloseEditProfileUserDialog()
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancelEditProfileUserDialog = () => {
    onCloseEditProfileUserDialog();
    setUserProfile([]);
  };

  // DataAllItemchecked.findIndex(object => { return object.id_item === item1 })
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "320px" } }}
      maxWidth="xs"
      component="form"
      onSubmit={EditProfile}
      open={openEditProfileUserDialog}
      {...other}
    >
      <BootstrapDialogTitle
        sx={{ fontSize: 16, p: 1.5 }}
        id="customized-dialog-title"
        onClose={handleCancelEditProfileUserDialog}
      >
        PROFILE
      </BootstrapDialogTitle>
      {/* <DialogTitle sx={{ paddingX: "15px", fontSize: 16 }}>EDIT PROFILE</DialogTitle> */}

      <DialogContent dividers sx={{ p: 3 }}>
        {userProfile.length > 0 ? (
          <>
            <CssTextField
              id={"name_user-" + userProfile[0].id_user}
              label="Username"
              name={"name_user-" + userProfile[0].id_user}
              defaultValue={userProfile[0].name_user}
              sx={{ width: "100%", marginBottom: "20px" }}
            />

            <CssTextField
              id={"name_user_eng-" + userProfile[0].id_user}
              label="Username"
              name={"name_user_eng-" + userProfile[0].id_user}
              defaultValue={userProfile[0].name_user_eng}
              sx={{ width: "100%", marginBottom: "20px" }}
            />

            <CssTextField
              id={"mail-" + userProfile[0].id_user}
              label="mail"
              name={"mail-" + userProfile[0].id_user}
              defaultValue={userProfile[0].mail}
              sx={{ width: "100%", marginBottom: "20px" }}
            />

          

            {/* <CssTextField
                            id={"profile_password-" + userProfile.id_profile}
                            label="profile password"
                            name={"profile_password-" + userProfile.id_profile}
                            type="password"
                            defaultValue={userProfile[0].password}
                            sx={{width:"100%", marginBottom: "20px"}}
                        /> */}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <Progress />{" "}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button autoFocus type="submit">
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// function CreateProfileUser(props) {

//     const {setMsg, dataUser ,onCloseCreateProfileUserDialog, openCreateProfileUserDialog, ...other } = props;
//     const [password, setPassword] = useState()
//     const [passwordIncorrect, setPasswordIncorrect] = useState(false)

//     const handleCancelCreateProfileUserDialog = () => {
//         onCloseCreateProfileUserDialog();

//     };

//     const onHChange = (event) => {
//         setPassword(event.target.value);

//     };

//     const onSubmitCreateProfile = async (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);

//         if(password !== data.get('confirm_profile_password-' + dataUser[0].id_user)) {
//             setPasswordIncorrect(true);

//         } else {
//             setPasswordIncorrect(false);

//             try {
//                 await axios.post('http://localhost:5000/CreateProfile', {
//                     id_user: dataUser[0].id_user,
//                     name_user: data.get('name_user-' + dataUser[0].id_user),
//                     email: data.get('email-' + dataUser[0].id_user),
//                     password: data.get('password-' + dataUser[0].id_user)

//                 }).then((res) => {
//                     setMsg(res.data.msg);
//                     handleCancelCreateProfileUserDialog()

//                 })

//             } catch (error) {
//                 console.log(error);

//             }

//         }
//     };

//     return (
//       <Dialog
//         sx={{ '& .MuiDialog-paper': { width: '320px', maxHeight: 420,height: 420} }}
//         maxWidth="xs"
//         component="form"
//         onSubmit={onSubmitCreateProfile}
//         open={openCreateProfileUserDialog}
//         {...other}
//       >
//         <BootstrapDialogTitle
//             sx={{ fontSize: 16, p: 1.5 }}
//             id="customized-dialog-title"
//             onClose={handleCancelCreateProfileUserDialog}
//         >
//                 Create Profile
//         </BootstrapDialogTitle>

//         <DialogContent dividers sx={{ p:3.5, overflowY: "overlay" }}>

//             {
//                 dataUser.length > 0 ?
//                     <>
//                         <Divider sx={{ fontSize: 10, marginBottom: "20px" }}>Detail New Profile</Divider>

//                         <CssTextField
//                             id={"profile_name-" + dataUser[0].id_User}
//                             label="profile name"
//                             name={"profile_name-" + dataUser[0].id_User}
//                             required
//                             defaultValue={
//                                             dataUser[0].User_nameEng.split(" ")[0].toUpperCase() +
//                                             " "+
//                                             dataUser[0].User_nameEng.split(" ")[1].charAt(0).toUpperCase()+
//                                             "."
//                                         }
//                             sx={{width:"100%", marginBottom: "20px"}}
//                         />

//                         <CssTextField
//                             id={"profile_Newemail-" + dataUser[0].id_User}
//                             label="profile email"
//                             name={"profile_Newemail-" + dataUser[0].id_User}
//                             required
//                             defaultValue={
//                                             dataUser[0].sections[0].section.toLowerCase().split("-")[0]+
//                                             "_"+
//                                             dataUser[0].User_nameEng.split(" ")[0]+
//                                             "@apexcircuit.com"
//                                         }
//                             sx={{width:"100%", marginBottom: "20px"}}
//                         />

//                         <Divider sx={{ fontSize: 10, marginBottom: "20px" }}>Password</Divider>

//                         <CssTextField
//                             id={"profile_password-" + dataUser[0].id_User}
//                             label="password"
//                             name={"profile_password-" + dataUser[0].id_User}
//                             type="password"
//                             required
//                             onChange={onHChange}
//                             sx={{width:"100%", marginBottom: "20px"}}

//                         />

//                         <CssTextField
//                             id={"confirm_profile_password-" + dataUser[0].id_User}
//                             label="confirm password"
//                             name={"confirm_profile_password-" + dataUser[0].id_User}
//                             type="password"
//                             required
//                             sx={{width:"100%", marginBottom: "20px"}}
//                             error={passwordIncorrect}
//                             helperText={passwordIncorrect? "Password Incorrect." : ""}
//                         />
//                     </>
//                 :
//                     <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent:"center" }}> <Progress /> </Box>

//             }

//         </DialogContent>

//         <DialogActions>
//           <Button autoFocus
//             type="submit"
//           >
//             submit
//           </Button>
//         </DialogActions>

//       </Dialog>
//     );
// }

// function Update_DataDevice(props) {
//     const { reloadData, setMsg, data_id, onCloseUpdate_DataDevice, openUpdate_DataDeviceDialog, ...other } = props;
//     const [dataDeviceCut, setDataDeviceCut] = useState([]);
//     const [profile, setProfile] = useState([]);
//     const [devicetype, setdevicetype] = useState([]);

//     const handleCancelUpdate_DataDevice = () => {
//         onCloseUpdate_DataDevice();
//         setDataDeviceCut([]);
//         setProfile([]);

//     };

//     useEffect(() => {

//         const GetDataDeviceCut = async (e) => {
//             try {
//                 await axios.post('http://localhost:5000/getDataDeviceCut', {
//                     id_profile: e

//                 }).then((res) => {
//                     setDataDeviceCut(res.data);

//                 })

//                 await axios.post('http://localhost:5000/getProfileIDCut', {
//                     id_profile: e,
//                     status_pf: "pf_on"

//                 }).then((res) => {
//                     setProfile(res.data);

//                 })

//                 await axios.get('http://localhost:5000/getDeviceType', {}).then((res) => {
//                     setdevicetype(res.data);

//                 })

//             } catch (error) {
//                 console.log(error);
//             }
//         }

//         if(data_id !== "") {
//             GetDataDeviceCut(data_id);

//         }

//     },[data_id]);

//     const UpdateDetailDevice = async (e) => {
//         e.preventDefault();
//         const data = new FormData(e.currentTarget);

//         // console.log(data.get('device_name'))
//         // console.log(data.get('ipaddress'))
//         // console.log(data.get('macaddress'))
//         // console.log(data.get('location'))
//         // console.log(data.get('type_idUPdate').split("-")[0])
//         // console.log(data.get('detail_id'))
//         // console.log(data.get('des'))
//         // console.log(data.get('id_profile'))

//         try {
//             await axios.post('http://localhost:5000/UpdateDevice', {
//                 device_id: dataDeviceCut[0].device_id,
//                 device_name: data.get('device_name'),
//                 ipaddress: data.get('ipaddress'),
//                 macaddress: data.get('macaddress'),
//                 detail_id: data.get('detail_id'),
//                 type_id: data.get('type_idUPdateId'),
//                 location: data.get('location'),
//                 des: data.get('des'),
//                 id_profile: data.get('id_profile')

//             }).then((res) => {
//                 setMsg(res.data.msg);
//                 reloadData();
//                 handleCancelUpdate_DataDevice()

//             })

//         } catch (error) {
//             console.log(error);

//         }

//        handleCancelUpdate_DataDevice()

//     }

//     return (
//     <BootstrapDialog
//         onClose={handleCancelUpdate_DataDevice}
//         aria-labelledby="customized-dialog-title"
//         sx={{ '& .MuiDialog-paper': { borderRadius: "15px", minWidth:"fit-content", height: "fit-content"}, overflowY: "overlay" }}
//         scroll={'body'}
//         component="form"
//         onSubmit={UpdateDetailDevice}
//         open={openUpdate_DataDeviceDialog}
//         {...other}
//       >
//         <BootstrapDialogTitle
//             sx={{  p: 1.7 , color:"#1976d2", displa:"flex",alignItems:"center"}}
//             id="customized-dialog-title"
//             onClose={handleCancelUpdate_DataDevice}
//         >
//             DATA DEVICE
//         </BootstrapDialogTitle>

//         <DialogContent dividers sx={{ p:1}}>
//             {
//                 dataDeviceCut.length > 0 ?

//                     <div className="content_box_medie">
//                         <Divider sx={{fontSize:14, fontWeight:500, p: 0.7, marginBottom: 2 , color:"#1976d2"}} >DEVICE DETAIL</Divider>
//                         <div className="content_flex_box">
//                             <Box>
//                                 <Typography
//                                     gutterBottom
//                                     sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         marginBottom: 6
//                                     }}
//                                 >
//                                     <DesktopWindows sx={{ fontSize: 120 }} />
//                                 </Typography>
//                                 <Paper sx={{ m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>DEVICE NAME</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }} required  name={"device_name"} id={"device_name"} value={dataDeviceCut[0].device_name}  placeholder="ชื่อเครื่อง"/>
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>IP Address</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13,  ml: 1, flex: 1 }}   name={"ipaddress"} id={"ipaddress"} defaultValue={dataDeviceCut[0].ipaddress} placeholder="xxx.xxx.xxx"/>
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>MAC Address</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <InputBase sx={{width: "100%", fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}   name={"macaddress"} id={"macaddress"} defaultValue={dataDeviceCut[0].macaddress} placeholder="xx-xx-xx-xx-xx-xx" />
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>LOCATION</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     {/* <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13,  ml: 1, flex: 1 }} required  name={"location"} id={"location"} value={dataDeviceCut[0].locations[0].location} placeholder="ตำแหน่งที่ตั้งอุปกรณ์"/> */}
//                                     <RenderDataSection
//                                             renderInput={(props) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{display: 'none', width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='location'
//                                                                             name={'location'}
//                                                                             placeholder="ตำแหน่งที่ตั้งอุปกรณ์"
//                                                                             value={ props.id !== "" ? props.id : dataDeviceCut.length > 0 ? dataDeviceCut[0].locations[0].location_id : "" }
//                                                                         />
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='locationName'
//                                                                             name={'locationName'}
//                                                                             placeholder="ตำแหน่งที่ตั้งอุปกรณ์"
//                                                                             value={ props.name !== "" ? props.name : dataDeviceCut.length > 0 ? dataDeviceCut[0].locations[0].location : "" }
//                                                                         />
//                                                                     </Box>
//                                                                 }
//                                     />
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>USER</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     {/* <InputBase sx={{fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }} required  name={"id_profile"} id={"id_profile"} value={ profile.length > 0 ? profile[0].profile_name : ""} placeholder="ผู้ใช้"/> */}
//                                     <RenderDataProfile
//                                             renderInput={(props) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{display: 'none', width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='id_profile'
//                                                                             name={'id_profile'}
//                                                                             placeholder="ผู้ใช้"
//                                                                             value={ props.id !== "" ? props.id : profile.length > 0 ? profile[0].id_profile : "" }
//                                                                         />
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='profile_name'
//                                                                             name={'profile_name'}
//                                                                             placeholder="ผู้ใช้"
//                                                                             value={ props.name !== "" ? props.name : profile.length > 0 ? profile[0].profile_name : "" }
//                                                                         />
//                                                                     </Box>
//                                                                 }
//                                     />
//                                 </Paper>
//                             </Box>

//                             <Box>
//                                 <Paper sx={{ m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>TYPE</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <PopupState variant="popover" popupId="demo-popup-popover">
//                                         {
//                                             (popupState) => (
//                         // popupState.close
//                                                 <React.Fragment>
//                                                     <InputBase  {...bindTrigger(popupState)} sx={{display: 'none', fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }} required defaultValue={dataDeviceCut[0].device_types[0].type_id} name={"type_idUPdateId"} id={"type_idUPdateId"} placeholder="ประเภทอุปกรณ์"/>
//                                                     <InputBase  {...bindTrigger(popupState)} sx={{fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }} required defaultValue={dataDeviceCut[0].device_types[0].type_id + "-" + dataDeviceCut[0].device_types[0].type_name} name={"type_idUPdateName"} id={"type_idUPdateName"} placeholder="ประเภทอุปกรณ์"/>
//                                                     <Menu {...bindMenu(popupState)} className="MenuUser">

//                                                         <MenuItem sx={{display: "none"}}></MenuItem>
//                                                         {
//                                                             devicetype.map((item, index) => (
//                                                                 <MenuItem key={item.type_id} onClick={ () => {  popupState.close(); document.getElementsByName("type_idUPdateName")[0].value = item.type_id +"-"+ item.type_name; document.getElementsByName("type_idUPdateId")[0].value = item.type_id; } } sx={{fontSize: 13}}>{item.type_name}</MenuItem>

//                                                             ))
//                                                         }
//                                                     </Menu>

//                                                 </React.Fragment>

//                                             )
//                                         }
//                                     </PopupState>
//                                     {/* <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }} required name={"type_id"} id={"type_id"} value={dataDeviceCut[0].device_types[0].type_id + "-" + dataDeviceCut[0].device_types[0].type_name} placeholder="ประเภทอุปกรณ์"/> */}
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '4px 4px'}}>MODEL</Typography>
//                                     <Divider sx={{ marginBottom: 1}} ></Divider>
//                                     <RenderDataDetailDevice
//                                             renderInput={(props) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             multiline
//                                                                             minRows={4}
//                                                                             maxRows={6}
//                                                                             sx={{display: 'none', width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='detail_id'
//                                                                             name={'detail_id'}
//                                                                             placeholder="รายละเอียดเครื่อง"
//                                                                             value={ props.id !== "" ? props.id : dataDeviceCut.length > 0 ? dataDeviceCut[0].detail_id : "" }
//                                                                         />
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             multiline
//                                                                             minRows={4}
//                                                                             maxRows={6}
//                                                                             sx={{width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='detail_device'
//                                                                             name={'detail_device'}
//                                                                             placeholder="รายละเอียดเครื่อง"
//                                                                             value={ props.name !== "" ? props.name : dataDeviceCut.length > 0 ? dataDeviceCut[0].device_details[0].brand  + " - " +  dataDeviceCut[0].device_details[0].model  + " - " + dataDeviceCut[0].device_details[0].os_type  + " - " +  dataDeviceCut[0].device_details[0].system_type : "" }
//                                                                         />
//                                                                     </Box>
//                                                                 }
//                                     />
//                                     {/* <InputBase sx={{width: "100%", fontSize:13, fontFamily:"kanit", paddingX: 1, flex: 1 }} value={dataDeviceCut[0].device_details[0].brand  + "-" +  dataDeviceCut[0].device_details[0].model  + "-" + dataDeviceCut[0].device_details[0].os_type  + "-" +  dataDeviceCut[0].device_details[0].system_type} required multiline minRows={4} maxRows={6} name={"detail_id"} id={"detail_id"}  placeholder="รายละเอียดเครื่อง"/> */}
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '4px 4px'}}>DES.</Typography>
//                                     <Divider sx={{ marginBottom: 1 }} ></Divider>
//                                     <InputBase sx={{width: "100%", fontSize:13,fontFamily:"kanit",  paddingX: 1, flex: 1 }} defaultValue={dataDeviceCut[0].des}   multiline minRows={4} maxRows={6} name={"des"} id={"des"} placeholder="รายละเอียด"/>
//                                 </Paper>
//                             </Box>

//                         </div>
//                     </div>
//                 :
//                     <div className="content_box_medie">
//                         <Divider sx={{fontSize:14, fontWeight:500, p: 0.7}} >DEVICE DETAIL</Divider>
//                         <div className="content_flex_box">
//                             <Box>
//                                 <Typography
//                                     gutterBottom
//                                     sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         marginBottom: 6
//                                     }}
//                                 >
//                                     <DesktopWindows sx={{ fontSize: 120 }} />
//                                 </Typography>
//                                 <Skeleton width={300} height={47} sx={{marginX:1,marginY:0}}/>
//                                 <Skeleton width={300} height={47} sx={{marginX:1,marginY:0}}/>
//                                 <Skeleton width={300} height={47} sx={{marginX:1,marginY:0}}/>
//                                 <Skeleton width={300} height={47} sx={{marginX:1,marginY:0}}/>
//                                 <Skeleton width={300} height={47} sx={{marginX:1,marginY:0}}/>

//                             </Box>

//                             <Box>
//                                 <Skeleton width={300} height={47} sx={{marginX:1,marginY:0}}/>
//                                 <Skeleton variant="rectangular" width={300} height={150} sx={{marginX:1,marginBottom:1}}/>
//                                 <Skeleton variant="rectangular" width={300} height={150} sx={{marginX:1,marginBottom:1}}/>

//                             </Box>

//                         </div>
//                     </div>
//             }
// .
//         </DialogContent>

//         <DialogActions>
//             <Button
//                 type="submit"
//             >
//                 Update Detail
//             </Button>
//         </DialogActions>

//       </BootstrapDialog>
//     )
// }

// function Add_DataDevice(props) {
//     const { reloadData, setMsg, onCloseAdd_DataDevice, openAdd_DataDeviceDialog, ...other } = props;
//     const [devicetype, setdevicetype] = useState([]);

//     const handleCancelAdd_DataDevice = () => {
//         onCloseAdd_DataDevice();
//         setdevicetype([]);

//     };

//     useEffect(() => {

//         const GetDeviceType = async (e) => {
//             try {

//                 await axios.get('http://localhost:5000/getDeviceType', {}).then((res) => {
//                     setdevicetype(res.data);

//                 })

//             } catch (error) {
//                 console.log(error);
//             }
//         }

//         GetDeviceType();

//     },[openAdd_DataDeviceDialog]);

//     const AddDetailDevice = async (e) => {
//         e.preventDefault();
//         const data = new FormData(e.currentTarget);

//         // console.log(data.get('ipaddress'))
//         // console.log(data.get('macaddress'))
//         // console.log(data.get('location'))
//         // console.log(data.get('type_id').split("-")[0])
//         // console.log(data.get('detail_id'))
//         // console.log(data.get('des'))
//         // console.log(data.get('id_profile'))

//         try {
//             await axios.post('http://localhost:5000/CreateDevice', {
//                 ipaddress: data.get('ipaddress'),
//                 macaddress: data.get('macaddress'),
//                 detail_id: data.get('detail_id'),
//                 type_id: data.get('type_id'),
//                 location: data.get('location'),
//                 des: data.get('des'),
//                 id_profile: data.get('id_profile')

//             }).then((res) => {
//                 setMsg(res.data.msg);
//                 reloadData();
//                 handleCancelAdd_DataDevice()

//             })

//         } catch (error) {
//             console.log(error);

//         }

//         handleCancelAdd_DataDevice()

//     }

//     return (
//     <BootstrapDialog
//         onClose={handleCancelAdd_DataDevice}
//         aria-labelledby="customized-dialog-title"
//         sx={{ '& .MuiDialog-paper': { borderRadius: "15px", minWidth:"fit-content", height: "fit-content"}, overflowY: "overlay" }}
//         scroll={'body'}
//         component="form"
//         onSubmit={AddDetailDevice}
//         open={openAdd_DataDeviceDialog}
//         {...other}
//       >
//         <BootstrapDialogTitle
//             sx={{  p: 1.7 , color:"#1976d2", displa:"flex",alignItems:"center"}}
//             id="customized-dialog-title"
//             onClose={handleCancelAdd_DataDevice}
//         >
//             ADD DATA DEVICE
//         </BootstrapDialogTitle>

//         <DialogContent dividers sx={{ p:1}}>

//             <div className="content_box_medie">
//                 <Divider sx={{fontSize:14, fontWeight:500, p: 0.7, marginBottom: 2 , color:"#1976d2"}} >DEVICE DETAIL</Divider>
//                 <div className="content_flex_box">
//                 <Box>
//                                 <Typography
//                                     gutterBottom
//                                     sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         marginBottom: 6
//                                     }}
//                                 >
//                                     <DesktopWindows sx={{ fontSize: 120 }} />
//                                 </Typography>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>IP Address</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13,  ml: 1, flex: 1 }}   name={"ipaddress"} id={"ipaddress"} placeholder="xxx.xxx.xxx"/>
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>MAC Address</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <InputBase sx={{width: "100%", fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}   name={"macaddress"} id={"macaddress"} placeholder="xx-xx-xx-xx-xx-xx" />
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>LOCATION</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     {/* <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13,  ml: 1, flex: 1 }} required  name={"location"} id={"location"} value={dataDeviceCut[0].locations[0].location} placeholder="ตำแหน่งที่ตั้งอุปกรณ์"/> */}
//                                     <RenderDataSection
//                                             renderInput={(props) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{display: 'none', width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='location'
//                                                                             name={'location'}
//                                                                             placeholder="ตำแหน่งที่ตั้งอุปกรณ์"
//                                                                             value={ props.id !== "" ? props.id : "" }
//                                                                         />
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='locationName'
//                                                                             name={'locationName'}
//                                                                             placeholder="ตำแหน่งที่ตั้งอุปกรณ์"
//                                                                             value={ props.name !== "" ? props.name : "" }
//                                                                         />
//                                                                     </Box>
//                                                                 }
//                                     />
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>USER</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     {/* <InputBase sx={{fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }} required  name={"id_profile"} id={"id_profile"} value={ profile.length > 0 ? profile[0].profile_name : ""} placeholder="ผู้ใช้"/> */}
//                                     <RenderDataProfile
//                                             renderInput={(props) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{display: 'none', width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='id_profile'
//                                                                             name={'id_profile'}
//                                                                             placeholder="ผู้ใช้"
//                                                                             value={ props.id !== "" ? props.id : "" }
//                                                                         />
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             sx={{width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='profile_name'
//                                                                             name={'profile_name'}
//                                                                             placeholder="ผู้ใช้"
//                                                                             value={ props.name !== "" ? props.name : "" }
//                                                                         />
//                                                                     </Box>
//                                                                 }
//                                     />
//                                 </Paper>
//                             </Box>

//                             <Box>
//                                 <Paper sx={{ m: 1, p: '0.5px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '2px 4px'}}>TYPE</Typography>
//                                     <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//                                     <PopupState variant="popover" popupId="demo-popup-popover">
//                                         {
//                                             (popupState) => (
//                         // popupState.close
//                                                 <React.Fragment>
//                                                     <InputBase  {...bindTrigger(popupState)} sx={{display: 'none', fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }}  name={"type_id"} id={"type_id"} placeholder="ประเภทอุปกรณ์"/>
//                                                     <InputBase  {...bindTrigger(popupState)} sx={{fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }} required name={"type_Name"} id={"type_Name"} placeholder="ประเภทอุปกรณ์"/>
//                                                     <Menu {...bindMenu(popupState)} className="MenuUser">

//                                                         <MenuItem sx={{display: "none"}}></MenuItem>
//                                                         {
//                                                             devicetype.map((item, index) => (
//                                                                 <MenuItem key={item.type_id} onClick={ () => {  popupState.close(); document.getElementsByName("type_Name")[0].value = item.type_id +"-"+ item.type_name; document.getElementsByName("type_id")[0].value = item.type_id;} } sx={{fontSize: 13}}>{item.type_name}</MenuItem>

//                                                             ))
//                                                         }
//                                                     </Menu>

//                                                 </React.Fragment>

//                                             )
//                                         }
//                                     </PopupState>
//                                     {/* <InputBase sx={{width: "100%", fontFamily:"kanit",fontSize:13, ml: 1, flex: 1 }} required name={"type_id"} id={"type_id"} value={dataDeviceCut[0].device_types[0].type_id + "-" + dataDeviceCut[0].device_types[0].type_name} placeholder="ประเภทอุปกรณ์"/> */}
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '4px 4px'}}>MODEL</Typography>
//                                     <Divider sx={{ marginBottom: 1}} ></Divider>
//                                     <RenderDataDetailDevice
//                                             renderInput={(props) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             multiline
//                                                                             minRows={4}
//                                                                             maxRows={6}
//                                                                             sx={{display: 'none', width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='detail_id'
//                                                                             name={'detail_id'}
//                                                                             placeholder="รายละเอียดเครื่อง"
//                                                                             value={ props.id !== "" ? props.id : "" }
//                                                                         />
//                                                                         <InputBase {...props}
//                                                                             required
//                                                                             multiline
//                                                                             minRows={4}
//                                                                             maxRows={6}
//                                                                             sx={{width: "100%",  fontSize:13,fontFamily:"kanit",  ml: 1, flex: 1 }}
//                                                                             className="field-req"
//                                                                             id='detail_device'
//                                                                             name={'detail_device'}
//                                                                             placeholder="รายละเอียดเครื่อง"
//                                                                             value={ props.name !== "" ? props.name : "" }
//                                                                         />
//                                                                     </Box>
//                                                                 }
//                                     />
//                                     {/* <InputBase sx={{width: "100%", fontSize:13, fontFamily:"kanit", paddingX: 1, flex: 1 }} value={dataDeviceCut[0].device_details[0].brand  + "-" +  dataDeviceCut[0].device_details[0].model  + "-" + dataDeviceCut[0].device_details[0].os_type  + "-" +  dataDeviceCut[0].device_details[0].system_type} required multiline minRows={4} maxRows={6} name={"detail_id"} id={"detail_id"}  placeholder="รายละเอียดเครื่อง"/> */}
//                                 </Paper>

//                                 <Paper sx={{m: 1, p: '0.5px 4px', width: 300 }}>
//                                     <Typography sx={{fontSize:13, p: '4px 4px'}}>DES.</Typography>
//                                     <Divider sx={{ marginBottom: 1 }} ></Divider>
//                                     <InputBase sx={{width: "100%", fontSize:13,fontFamily:"kanit",  paddingX: 1, flex: 1 }}  multiline minRows={4} maxRows={6} name={"des"} id={"des"} placeholder="รายละเอียด"/>
//                                 </Paper>
//                             </Box>

//                 </div>
//             </div>

//         </DialogContent>

//         <DialogActions>
//                 <Button
//                     type="submit"
//                 >
//                     ADD DEVICE
//                 </Button>
//         </DialogActions>

//       </BootstrapDialog>
//     )
// }

const customerTableHead = {
  headerUser: ["", "id", "name", "name eng", "tel", "mail"],
  // headerDevice: [
  //     "device id",
  //     "ip address ",
  //     "mac address",
  //     "brand",
  //     "system",
  //     "model",
  //     "location",
  //     "user"
  // ],
  // databody: [

  //     {
  //         "id": "6400004",
  //         "name": "miss sudarat seanjan",
  //         "dept": "BACK 2",
  //         "section": "DF-G OUTER",
  //         "position": "operator",
  //         "level": "User" ,
  //         "type": "daily"
  //     }
  // ]
};

const renderHead = (item, index) => <th key={index}>{item}</th>;

const Customers = () => {
  const [datauser, setdatauser] = useState([]);
  // const [datadevice, setdatadevice] = useState([]);
  const [UserProfile, setUserProfile] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const { Search } = Input;

  const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);
  // const [StattusLoadDatajob2, setStattusLoadDatajob2] = useState(false);

  const [openEditProfileUserDialog, setOpenEditProfileUserDialog] =
    useState(false);
  const [openCreateProfileUserDialog, setOpenCreateProfileUserDialog] =
    useState(false);
  const [IdUser, setIdUser] = useState("");
  // const [data_id, setdata_id] = useState("");

  const [DataCreateProfileUser, setDataCreateProfileUser] = useState([]);

  // const [openAdd_DataDevice, setOpenAdd_DataDevice] = useState(false);
  // const [openUpdate_DataDevice, setOpenUpdate_DataDevice] = useState(false);

  const [msg, setMsg] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleCreateProfileUserDialog = (e) => {
    setOpenCreateProfileUserDialog(true);
    setDataCreateProfileUser(e);
  };

  const handleCloseCreateProfileUserDialog = () => {
    setOpenCreateProfileUserDialog(false);
    setDataCreateProfileUser([]);
    // GetUserProfile()
  };

  const handleEditProfileUserDialog = (e) => {
    setOpenEditProfileUserDialog(true);
    setIdUser(e);
  };

  const handleCloseEditProfileUserDialog = () => {
    setOpenEditProfileUserDialog(false);
    setIdUser("");
  };

  // const handleAdd_DataDevice = (e) => {
  //     setOpenAdd_DataDevice(true);

  // };

  // const handleCloseAdd_DataDevice = () => {
  //     setOpenAdd_DataDevice(false);

  // };

  // const handleUpdate_DataDevice = (e) => {
  //     setOpenUpdate_DataDevice(true);
  //     setdata_id(e)

  // };

  // const handleCloseUpdate_DataDevice = () => {
  //     setOpenUpdate_DataDevice(false);
  //     setdata_id("")

  // };

  const DataUser = async (e) => {
    try {
      await axios
        .get("http://localhost:5000/getDataAllUser", {})
        .then((res) => {
          setdatauser(res.data);
          setDataUserrow(res.data);

          setStattusLoadDatajob(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const DataJDevice = async (e) => {
  //     try {
  //         await axios.get('http://localhost:5000/getDataDevice', { }).then((res) => {
  //             setdatadevice(res.data);
  //             setStattusLoadDatajob2(true)
  //         })
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // const GetUserProfile = async (e) => {
  //     try {
  //         await axios.get('http://localhost:5000/getUserProfile', { }).then((res) => {
  //             setUserProfile(res.data);
  //         })
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  useEffect(() => {
    DataUser();

    // GetUserProfile();
    // DataJDevice();
  }, []);

  const [DataUserrow, setDataUserrow] = useState(datauser);
  // const [DataDevicerow, setDataDevicerow] = useState(datadevice);
  const [SwitchSearch, setSwitchSearch] = useState("DataUser");

  useEffect(() => {
    // console.log("this is bool : ", datauser !== DataUserrow);
    // console.log("this is dtuser : ", datauser);
    // console.log("this is dtrow : ", DataUserrow);

    if (isSubmit == true) {
      DataUser();
      setIsSubmit(false)
    }

  }, [isSubmit]);

  // useEffect(() => {
  //     setDataDevicerow(datadevice)
  // },[datadevice]);

  const onSearch = (value) => {
    // console.log(value);
    if (SwitchSearch === "DataUser") {
      const filteredRowsUser = datauser.filter((row) => {
        const rowcolummUser = row.id_user;
        return rowcolummUser.toLowerCase().includes(value.toLowerCase());
      });
      setDataUserrow(filteredRowsUser);
    } else if (SwitchSearch === "DataDevice") {
      // let rowcolummDevice
      // const filteredRowsDevice = datadevice.filter((row) => {
      //     if(value.toLowerCase().slice(0,3) === "itu") {
      //         rowcolummDevice = row.device_id
      //     } else {
      //         rowcolummDevice = row.id_profile
      //     }
      //     return rowcolummDevice.toLowerCase().includes(value.toLowerCase());
      // });
      // setDataDevicerow(filteredRowsDevice);
    }
  };

  // const FuncSwitchSearch = () => {
  //     if(SwitchSearch === "DataUser") {
  //         setDataUserrow(dataUser);
  //         setSwitchSearch("DataDevice");

  //     } else if(SwitchSearch === "DataDevice") {
  //         // setDataDevicerow(datadevice);
  //         // setSwitchSearch("DataUser");

  //     }
  // }

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

  const RenderBodyUser = (item, index) => {
    // MoreVertIcon
    return (
      <tr
        key={index}
        className={"cursor_pointer " + (index % 2 !== 0 ? "boxc-b" : "boxc-w")}
      >
        <td className="dropdown_MenuUser">
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              // popupState.close
              <React.Fragment>
                <MoreVert fontSize="10px" {...bindTrigger(popupState)} />
                {/* onClick={ popupState.close  } */}
                <Menu {...bindMenu(popupState)} className="MenuUser">
                  <MenuItem sx={{ display: "none" }}></MenuItem>
                  {
                    // UserProfile.length > 0 && UserProfile.findIndex(object => { return object.id_user === item.id_user }) !== -1 ?
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        handleEditProfileUserDialog(item.id_user);
                      }}
                      sx={{ fontSize: 13 }}
                    >
                      View Profile
                    </MenuItem>
                    //:
                    // <MenuItem onClick={ () => {  popupState.close(); handleCreateProfileUserDialog([item]); } } sx={{fontSize: 13}}>Create Profile</MenuItem>
                  }
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </td>
        <td className="col_txt">{item.id_user}</td>
        <td className="col_txt font-family-Kanit">{item.name_user}</td>
        <td className="col_txt">{item.name_user_eng}</td>
        <td className="col_txt">{item.tel}</td>
        <td className="col_txt">{item.mail}</td>

        {/* <td className="col_txt">{item.type}</td> */}
      </tr>
    );
  };

  // const renderBodyDevice = (item, index) => (
  //     <tr key={index} className="cursor_pointer" onClick={() => { handleUpdate_DataDevice(item.id_profile) }}>
  //         <td className="col_txt">{item.device_name}</td>
  //         <td className="col_txt">{item.ipaddress}</td>
  //         <td className="col_txt">{item.macaddress}</td>
  //         <td className="col_txt">{item.device_details[0].brand}</td>
  //         <td className="col_txt">{item.device_details[0].os_type+" "+item.device_details[0].system_type}</td>
  //         <td className="col_txt">{item.device_details[0].model}</td>
  //         <td className="col_txt">{item.locations[0].location}</td>
  //         <td className="col_txt">{UserProfile.length > 0 ? UserProfile[UserProfile.findIndex(object => { return object.id_profile === item.id_profile })].profile_name : "load..."}</td>
  //     </tr>

  // )

  useEffect(() => {
    const letters = Array.from(document.querySelectorAll(".nav-link"));
    letters.forEach((letter) => {
      let timerId;
      letter.addEventListener("mousedown", (e) => {
        clearTimeout(timerId);
        const ripple = e.target.querySelector(".ripple-nav");
        const size = letter.offsetWidth;
        const pos = letter.getBoundingClientRect();
        const x = e.pageX - pos.left - size;
        const y = e.pageY - pos.top - size;
        ripple.style =
          "top:" +
          y +
          "px; left:" +
          x +
          "px; width: " +
          size * 2 +
          "px; height: " +
          size * 2 +
          "px;";
        ripple.classList.remove("activer");
        ripple.classList.remove("start");
        setTimeout(() => {
          ripple.classList.add("start");
          setTimeout(() => {
            ripple.classList.add("activer");
          });
        });
        timerId = setTimeout(() => {
          ripple.classList.remove("activer");
          ripple.classList.remove("start");
        }, 500);
      });
    });

    let btns = document.querySelectorAll(".nav-link");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        let current = document
          .getElementById("box1")
          .querySelectorAll(".active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }, []);

  return (
    <div className="layout-component m_r">
      {/* <CreateProfileUser
                id="ringtone-menu-CreateProfileUser"
                keepMounted
                openCreateProfileUserDialog={openCreateProfileUserDialog}
                onCloseCreateProfileUserDialog={handleCloseCreateProfileUserDialog}
                dataUser={DataCreateProfileUser}
                setMsg={(msg) => setMsg(msg)}
            /> */}

      <EditProfileUser
        id="ringtone-menu-EditProfileUser"
        keepMounted
        openEditProfileUserDialog={openEditProfileUserDialog}
        onCloseEditProfileUserDialog={handleCloseEditProfileUserDialog}
        IdUser={IdUser}
        setMsg={(msg) => setMsg(msg)}
        setIsSubmit={setIsSubmit}
      />

      {/* <Add_DataDevice
                id="ringtone-menu"
                keepMounted
                openAdd_DataDeviceDialog={openAdd_DataDevice}
                onCloseAdd_DataDevice={handleCloseAdd_DataDevice}
                data_id={data_id}
                setMsg={(msg) => setMsg(msg)}
                reloadData={() => DataJDevice()}

            /> 

            <Update_DataDevice
                id="ringtone-menu"
                keepMounted
                openUpdate_DataDeviceDialog={openUpdate_DataDevice}
                onCloseUpdate_DataDevice={handleCloseUpdate_DataDevice}
                data_id={data_id}
                setMsg={(msg) => setMsg(msg)}
                reloadData={() => DataJDevice()}

            />  */}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={msg}
        key={vertical + horizontal}
      />

      <h2 className="page-header">{"Data User".toUpperCase()}</h2>

      <div className="row box-scroll">
        <div className="col-12">
          <div className="card-g dataUser-min-h">
            {/* <Col lg={ 8 } className="del-p-g">
                                 <UncontrolledTabs initialActiveTabId="overview" >
                                 */}
            <div className="box-nav">
              <Nav pills className="search-n">
                <Search
                  className="search-table"
                  placeholder="Search here.."
                  allowClear
                  onSearch={onSearch}
                  style={{ width: 200 }}
                />
              </Nav>
              <Nav></Nav>
              {/* <Nav pills id="box1" onClick={() => { FuncSwitchSearch() }}>
                                            
                                            <NavItem className="nav-tab">
                                                <UncontrolledTabs.NavLink tabId="overview" className="btn letter active-item">
                                                    Data User
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink>
                                            
                                                <UncontrolledTabs.NavLink tabId="device" className="btn letter"> 
                                                    Device
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink>
                                        
                                                <div className="animation start-home"></div>

                                            </NavItem>
                                            
                                        </Nav> */}
            </div>
            {/* <UncontrolledTabs.TabContent> */}

            <TabPane tabId="overview" id="Overview">
              <Table
                limit="10"
                headData={customerTableHead.headerUser}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={DataUserrow}
                renderBody={(item, index) => RenderBodyUser(item, index)}
                StattusLoadDatajob={StattusLoadDatajob}
                // search={true}
              />
            </TabPane>

            {/* <TabPane tabId="device" id="Device">
                                        //     <Stack spacing={1} direction="row">
                                        //         <Button
                                        //                 variant="outlined"
                                        //                 size="small"
                                        //                 sx={ { fontSize: 10 } }
                                        //                 onClick={handleAdd_DataDevice}
                                        //                 endIcon={<PlaylistAdd  size="small" />}
                                        //             >
                                        //                 ADD DATA DEVICE
                                        //         </Button>
                                        //     </Stack>
                                        //     <Table
                                        //         limit='8'
                                        //         headData={customerTableHead.headerDevice}
                                        //         renderHead={(item, index) => renderHead(item, index)}
                                        //         bodyData={DataDevicerow}
                                        //         renderBody={(item, index) => renderBodyDevice(item, index)}
                                        //         StattusLoadDatajob={StattusLoadDatajob2}
                                        //         // search={true}
                                        //     />
                                        // </TabPane> */}

            {/* </UncontrolledTabs.TabContent>
                                </UncontrolledTabs>
                         </Col> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;

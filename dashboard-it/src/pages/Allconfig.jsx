import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    DataSaverOff,
    Notes,
    Timeline,
    CalendarMonth,
    StickyNote2,
    Edit,
    Save,
    MoreVert,
    DeleteOutline,
    ExpandMore,
    AddCircleOutline,
    ViewList,
    PlaylistAdd,
    Repeat,
    Delete,
    Add,
    Close,
    DeleteForever,
}
from '@mui/icons-material';

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
    
} from '@mui/material';

import Nav from './Nav';
import { styled } from '@mui/material/styles';
import Table from '../components/table/Table'
import PopupState,{ bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 37,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 18,
      height: 18,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
}));

const StatusSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 30,
    height: 15,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 11,
      height: 11,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
}));


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
}));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
}));
  

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

  
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const MenuItemTab = props => {
    return (
        <div className="sidebar__item_config">
            <div className={`sidebar__item-inner config `}>
                <div>
                    <i className={props.icon + props.color}></i>  
                </div>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const profileConfig = {
    basicinfo : [
        {
            title : "Fullname" ,
            name : "name_user" ,
            placeholder : "fullname",
            type:"text",
            value:localStorage.getItem('username_login')
        },
        {
            title : "Fullname eng" ,
            name : "name_user_eng" ,
            placeholder : "fullnameeng",
            type:"text",
            value:localStorage.getItem('usernameEng_login')
            
        },
        {
            title : "Birthday" ,
            name : "birthday" ,
            placeholder : "birthday",
            type:"date",
            value:localStorage.getItem('birthday_login')
        },
        // {
        //     title : "Gender" ,
        //     name : "genderx" ,
        //     placeholder : "gender",
        //     type:"text"
        // }
        
    ],
    contact : [
        {
            title : "Phone" ,
            name : "tel" ,
            placeholder : "+66",
            type:"tel",
            pattern:"[0-9]*",
            value:localStorage.getItem('tel_user_login')
        },
        {
            title : "Mail" ,
            name : "mail" ,
            placeholder : "..@mail",
            type:"email",
            pattern:"",
            value:localStorage.getItem('mail_user_login')
        }
    ],
    gender : [
        {
            value: "Female",
            label: "Female",
        },
        {
            value: "Male",
            label: "Male",
        },
        {
            value: "Other",
            label: "Other",
        }
    ]

}

const ConfigTableHead = {
    HeaderDeviceConfig: [
        "device",
        "no",         
        // "device id",
        "device name",  
        "status"
    ],
    HeaderSeviceConfig: [
        "",
        // "no", 
        // "id",
        "title", 
        // "who.appr",
        // "team.sup", 
        "status"
    ],
    HeaderTeamConfig: [
        "id", 
        "name",
        "level", 
    ],
    HeaderEmpConfig: [
        "id", 
        "name",
        "role", 
    ],
}

const renderHead = (item, index) => <th className={item === "status" ? 'text-center' : ''} key={index}>{item}</th>

function EditProfile(e) {

    e.preventDefault();
    const data = new FormData(e.currentTarget);

    for(let value of data.entries()) {
        console.log(value[0]+ ', '+ value[1]);
    }


};

function EditProfileRadio(keyname,value) {

    console.log(keyname+ ', '+ value);
    
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    }
}));

const CssTextField = styled(TextField)(({ theme }) => ({
    "& label.MuiInputLabel-root ": { fontSize: 14, fontFamily: 'Kanit'},
    "& .MuiOutlinedInput-input": { fontSize: 13, fontFamily: 'Kanit' },
    "& .MuiInputBase-input": { fontSize: 13, fontFamily: 'Kanit' }
}));


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

function ConfirmationDialogRaw(props) {
    
    const { RemoveDeviceCenter, RemoveServiceType, funcOn, RemoveOption, DataDialog, onCloseDialog, openDialog, ...other } = props;
  
    const handleConfDialog = () => {
        //   console.log(DataDialog.id, DataDialog.title)
        if(funcOn === "del-option") {
            RemoveOption(DataDialog.id_option, DataDialog.title);
            onCloseDialog();

        } else  if(funcOn === "del-service") { 
            RemoveServiceType(DataDialog.id_type, DataDialog.title);
            onCloseDialog();

        } else  if(funcOn === "del-device") { 
            RemoveDeviceCenter(DataDialog.id_device, DataDialog.name);
            onCloseDialog();

        } else {
            return
        }

    };

    const handleCancelDialog = () => {
          onCloseDialog();
    };
  
    return (
        <BootstrapDialog
          onClose={handleCancelDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { borderRadius: "15px", width: 400, maxHeight: 435 } }}
          maxWidth="xs"
          open={openDialog}
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
                        justifyContent: "center"
                    }}
                >
                    <DeleteForever sx={{ fontSize: 90 }} color="disabled" />
                </Typography>
  
                {
                    funcOn === "del-option" || funcOn === "del-service" || funcOn === "del-device"?  

                        <DialogContentText
                            id="alert-dialog-slide-description"
                            sx={{ textAlign: "center", color: "black" }}
                        >
                            {
                                funcOn === "del-service"? 
                                    <p>Remove Service : { DataDialog.title } </p> 
                                : 
                                    funcOn === "del-option"? 
                                        <p>Remove Option : { DataDialog.title } </p>
                                    :
                                        funcOn === "del-device"? 
                                            <p>Remove device id : { DataDialog.name } </p>
                                        :
                                            null

                            } 
                        
                        </DialogContentText>

                    :  

                        <DialogContentText
                            id="alert-dialog-slide-description"
                            sx={{ textAlign: DataDialog.length > 1 ? "left" : "center", color: "black" }}
                        >
                            {
                                DataDialog.length > 0 ? 

                                    <p>Remove Option : { DataDialog[0].title } </p>
                                : 
                                    null
                            }
                            

                        </DialogContentText> 
                                    
                }
                 
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

function AddDeviceDialog(props) {
    const { setMsg, onCloseAddDeviceDialog, openAddDeviceDialog, ...other } = props;
    const handleConfDialog = () => {
        onCloseAddDeviceDialog()

    };

    const handleCancelDialog = () => {
        onCloseAddDeviceDialog();
    };

    const AddDeviceCenter = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        try {
            await axios.post('http://localhost:5000/CreateDeviceCenter', { 
                // device_center_id :data.get('IdDeviceCenter') ,
                device_name : data.get('NameDeviceCenter')
                
            }).then((res) => {  
                setMsg(res.data.msg);
                handleCancelDialog()

            })

        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <BootstrapDialog
          onClose={handleCancelDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { borderRadius: "15px", width: 400, maxHeight: 435 } }}
          maxWidth="xs"
          component="form"
          onSubmit={AddDeviceCenter}
          open={openAddDeviceDialog}
          {...other}
        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelDialog}
            >
                  ADD DEVICE
            </BootstrapDialogTitle>
            
            <DialogContent dividers>
                
                <Stack
                    sx={{
                        width: '100%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <CssTextField
                        required
                        key={"NameDeviceCenter"+new Date()}
                        id={"outlined-required-title"+new Date()}
                        label="Device Name"
                        name="NameDeviceCenter"
                    />

                </Stack>
              
            </DialogContent>
  
            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    autoFocus
                    type='submit'
                  >
                    ok
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}

function AddServiceTypeDialog(props) {
    
    const { setMsg, onCloseAddServiceTypeDialog, openAddServiceTypeDialog, ...other } = props;
    const [Oldid, setOldid] = useState("");
    const [newdata, setnewdata] = useState();

    const handleConfDialog = () => {
        onCloseAddServiceTypeDialog()

    };

    const handleCancelDialog = () => {
        onCloseAddServiceTypeDialog();
        setOldid("")
    };

    // const handleOnChange = (event) => {   
    //     setnewServiceType(event.target.value)

    // };

    const NewID = (e) => {
        console.log(e);
        let id_index = parseInt(e.split("-")[1])
        let new_id = ""
        let CreateId = localStorage.getItem('id_user_login') + "-"
        if ((id_index + 1) < 10) {
          new_id = CreateId + "00000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
          new_id = CreateId + "0000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
          new_id = CreateId + "000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
          new_id = CreateId + "00"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10000) {
          new_id = CreateId + "0"+ ( id_index + 1 ).toString()
        } else {
          new_id = CreateId + ( id_index + 1 ).toString()
        }

        return new_id
      
    }

    const LastS_type = async (e) => {
        try {
          await axios.get('http://localhost:5000/LastS_type', { }).then((res) => {  
            console.log("0",res);
            setOldid(res.data[0].id_type); 

          })
        } catch (error) {
          console.log(error);
        }
    }

    const UpdateDetailTypeMain = async (data) => {
        try {
            await axios.post('http://localhost:5000/CreateNewServiceType', { 
                // id_type : NewID(Oldid) ,
                title : data.get('title')
                
            }).then((res) => {  
                setMsg(res.data.msg);
                handleCancelDialog()

            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if( Oldid !== "" ) {
            console.log(Oldid)
            UpdateDetailTypeMain(newdata)

        }

    }, [Oldid]);

    const UpdateDetailType = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setnewdata(data)
        LastS_type()
        
    }
  
    return (
        <BootstrapDialog
          onClose={handleCancelDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { borderRadius: "15px", width: 400, maxHeight: 435 } }}
          maxWidth="xs"
          component="form"
          onSubmit={UpdateDetailType}
          open={openAddServiceTypeDialog}
          {...other}
        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelDialog}
            >
                  CREATE NEW SERVICE TYPE
            </BootstrapDialogTitle>
            
            <DialogContent dividers>
                
                <Stack
                    sx={{
                        width: '100%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <CssTextField
                        required
                        key={"title"+new Date()}
                        id={"outlined-required-title"+new Date()}
                        label="Title"
                        name="title"
                        
                    />

                </Stack>
              
            </DialogContent>
  
            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    autoFocus
                    type='submit'
                  >
                    ok
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}

function AddServiceOptionDialog(props) {
    
    const { setMsg,DataAllServiceDetail, DataAddServiceOptionDialog, onCloseAddServiceOptionDialog, openAddServiceOptionDialog, ...other } = props;
    // const [newServiceoption, setnewServiceoption] = useState("");

    const handleConfDialog = () => {
        onCloseAddServiceOptionDialog()
    };

    const handleCancelDialog = () => {
        onCloseAddServiceOptionDialog();
    };
  
    // const handleOnChange = (event) => {   
    //     setnewServiceoption(event.target.value)

    // };

    const NewID = (e) => {
        let id_index = parseInt(e.split("-")[1])
        let new_id = ""
        let CreateId = localStorage.getItem('id_user_login') + "-"
        if ((id_index + 1) < 10) {
          new_id = CreateId + "00000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
          new_id = CreateId + "0000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
          new_id = CreateId + "000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
          new_id = CreateId + "00"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10000) {
          new_id = CreateId + "0"+ ( id_index + 1 ).toString()
        } else {
          new_id = CreateId + ( id_index + 1 ).toString()
        }

        return new_id
      
    }

    const [Oldid, setOldid] = useState("");

    const LastOption = async (e) => {
        try {
          await axios.get('http://localhost:5000/LastOption', { }).then((res) => {  
            setOldid(res.data[0].id_option); 

          })
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        LastOption()

    }, []);

    const UpdateDetailOption = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        try {
            await axios.post('http://localhost:5000/CreateServiceOption', { 
                id_option : NewID(Oldid) ,
                title : data.get('title') ,
                status : 1,	
                id_type	: DataAddServiceOptionDialog[0].id_type
                
            }).then((res) => {  
                setMsg(res.data.msg);
                handleCancelDialog()

            })

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <BootstrapDialog
          onClose={handleCancelDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { borderRadius: "15px", width: 400, maxHeight: 435 } }}
          maxWidth="xs"
          component="form"
          onSubmit={UpdateDetailOption}
          open={openAddServiceOptionDialog}
          {...other}
        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelDialog}
            >
                  ADD SERVICE OPTION
            </BootstrapDialogTitle>
            
            <DialogContent dividers>
                {
                    DataAddServiceOptionDialog.length > 0 ?
                        <Stack
                            sx={{
                                width: '100%',
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
                            <CssTextField
                                required
                                key={"title"+DataAddServiceOptionDialog[0].id_type}
                                id={"outlined-required-title"+DataAddServiceOptionDialog[0].id_type}
                                label="Title"
                                name="title"
                                // value={newServiceoption}
                                // onChange={handleOnChange}
                            />

                            <CssTextField
                                required
                                key={"type"+DataAddServiceOptionDialog[0].id_type}
                                id={"outlined-required-type"+DataAddServiceOptionDialog[0].id_type}
                                label="Type"
                                name="type"
                                value={DataAddServiceOptionDialog.length > 0 ? DataAddServiceOptionDialog[0].title :""}
                            />      

                        </Stack>
                    :
                        null
                }
               
            </DialogContent>
  
            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    autoFocus
                    type='submit'
                    // onClick={handleConfDialog}
                  >
                    ok
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}

function UpdateAndCreateDetailServiceOption(props) {
    
    const { GetServiceOption, UpdateAllDetailServiceOption, DataAllItem, DataAllServiceDetail, DataEditDialog, onCloseEditDialog, openEditDialog, ...other } = props;
    const [objEdit, setObjEdit] = useState(DataEditDialog);

    const [DataAllItemchecked, setDataAllItemChecked] = useState([]);
    const [DataAllItemcheck, setDataAllItemcheck] = useState([]);

    const [ShowAddItem, setShowAddItem] = useState(false);
    const [ShowSwitchItem, setShowSwitchItem] = useState(false);
    const [SwitchItem, setSwitchItem] = useState("");

    const handleToggleShowAddItem = (value) => {
        if(!value) {
            setSwitchItem([])
        }
        
        setShowAddItem(!value)
        setShowSwitchItem(false)
     
    }

    const handleToggleShow_And_setSwitchItem = (value, item) => {
        if(!value) {
            setSwitchItem([])

        }

        setShowSwitchItem(!value)
        setShowAddItem(false)

        if(item !== "") {
            setSwitchItem(item)

        }

    }

    const handleToggleSwitchItem = (item1, item2) => {
        setShowSwitchItem(false)

        const currentIndex = DataAllItemchecked.findIndex(object => { return object.id_item === item1 })
        const newChecked = [...DataAllItemchecked];

        newChecked.push({ id_item: item2.id_item, title: item2.title, description: item2.description, input_type: item2.input_type })  
        newChecked.splice(currentIndex, 1);
        
        setDataAllItemChecked(newChecked);
    }

    const handleToggleItem = (value) => {
        const currentIndex = DataAllItemchecked.findIndex(object => { return object.id_item === value.id_item })
        const newChecked = [...DataAllItemchecked];

        if (currentIndex === -1) {
            newChecked.push({ id_item: value.id_item, title: value.title, description: value.description, input_type: value.input_type })  
        
        } else {
            newChecked.splice(currentIndex, 1);

        }
        // console.log(newChecked)
        setDataAllItemChecked(newChecked);
    };

    useEffect(() => {
        let newDataAllItemchecked = [];
        setShowAddItem(false)
        setShowSwitchItem(false)
        
        if( DataEditDialog.length > 0 ) {
            for( let i=0; i < DataEditDialog[0].service_option_items.length; i++ ) {
                if( newDataAllItemchecked.findIndex(object => { return object.id_item ===DataEditDialog[0].service_option_items[i].id_item }) === -1)  { 
                    newDataAllItemchecked.push({id_item:  DataEditDialog[0].service_option_items[i].id_item, title: DataEditDialog[0].service_option_items[i].service_items[0].title, description: DataEditDialog[0].service_option_items[i].service_items[0].description, input_type: DataEditDialog[0].service_option_items[i].service_items[0].input_type})
                }  
            } 

            setDataAllItemChecked(newDataAllItemchecked)

            let shallow = JSON.parse(JSON.stringify(DataEditDialog))        

            setObjEdit(shallow);

        }

    }, [DataEditDialog]);

    useEffect(() => {
        if( DataAllItemchecked.length > 0 ) {
            console.log(DataAllItemchecked)
        }

    }, [DataAllItemchecked]);

    const [servicetypechange, setservicetypechange] = useState(false);

    const handleOnChange = (event) => {   
        let newobjEdit = [...objEdit];
        if(event.target.name === "id_type") {
            setservicetypechange(true)
        }

        if(event.target.name === "status") {
            newobjEdit[0][event.target.name] = event.target.checked

        } else {
            newobjEdit[0][event.target.name] = event.target.value

        }
        setObjEdit(newobjEdit)

    };

    const handleEditDialog = () => {   
        
        if(DataAllItemchecked.length > 0) {

            onCloseEditDialog();
            let objItems = []
            let delItems = []
    
            for( let i=0; i < DataAllItemchecked.length; i++ ) {
    
                if( objEdit[0].service_option_items.findIndex(object => { return object.id_item === DataAllItemchecked[i].id_item }) === -1 ) {
                    objItems.push(DataAllItemchecked[i].id_item)
    
                }
            
            }
    
            for( let i=0; i < objEdit[0].service_option_items.length; i++ ) {
                if( DataAllItemchecked.findIndex(object => { return object.id_item === objEdit[0].service_option_items[i].id_item }) === -1 ) {
                    delItems.push(objEdit[0].service_option_items[i].id_item)
    
                }
            
            }
    
            // console.log(objEdit)
    
            // console.log(delItems)
            // console.log(objItems)
            UpdateAllDetailServiceOption({objEdit: objEdit, delItems: delItems, objItems: objItems })
            
            if(servicetypechange) {
                GetServiceOption()
                setservicetypechange(false)
            }

            
        }

    };

    const handleCancelEditDialog = () => {
        onCloseEditDialog();
        setservicetypechange(false)


    };

    useEffect(() => {
        if( DataAllItem.length > 0 ) {
            setDataAllItemcheck(DataAllItem);
        }

    }, [DataAllItem]);
    return (
        <BootstrapDialog
          onClose={handleCancelEditDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { borderRadius: "15px", width: 350, maxHeight: 450 } }}
          maxWidth="xs"
          open={openEditDialog}
          {...other}
        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelEditDialog}
            >
                  Edit
            </BootstrapDialogTitle>
            
            <DialogContent dividers sx={{ overflowY: "overlay" }}>
                {/* Edit Option <br /> */}
                <Stack
                    component="form"
                    sx={{
                        width: '100%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                   {
                       objEdit.length > 0 ?
                            <>
                              
                                        {/* <Box sx={{ display:"flex", alignItems:"center", justifyContent:"right", fontSize: 13}}>
                                            option status : 
                                            <CSSSwitch 
                                                checked={ objEdit.length > 0 ? objEdit[0].status : false }
                                                // defaultChecked={objEdit[0].status}
                                                name="status" 
                                                onChange={handleOnChange}
                                                inputProps={{ 'aria-label': 'controlled' }}

                                            />
                            
                                        </Box> */}
                  
                            
                                <CssTextField
                                    required
                                    id="outlined-required"
                                    label="Title"
                                    name="title"
                                    value={objEdit.length > 0 ? objEdit[0].title : ""}
                                    onChange={handleOnChange}
                                    // InputLabelProps={DataEditDialog.length > 0 ? { shrink: true } : { shrink: false } }

                                />

                                    {/*                                
                                        <FormControl fullWidth>
                                            <InputLabel required id="demo-simple-select-label" sx={{ fontSize: 13, textTransform: 'capitalize'}}>Who appr</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="whoAppr"
                                                sx={{ fontSize: 13, textTransform: 'capitalize'}}
                                                value={objEdit.length > 0 ? objEdit[0].whoAppr : ""}
                                                onChange={handleOnChange}
                                                label="Mis.Appr"
                                                // InputLabelProps={DataEditDialog.length > 0 ? { shrink: true } : { shrink: false } }
                                            >
                                                <MenuItem value=""> <em> </em> </MenuItem>
                                                <MenuItem value={'manager'}  sx={{ fontSize: 13, textTransform: 'capitalize'}}>Meneger</MenuItem>
                                                <MenuItem value={'sr.manager'}  sx={{ fontSize: 13, textTransform: 'capitalize'}}>Sr.Menager</MenuItem>
                                            </Select>
                                        </FormControl> */}
                        

                                <FormControl fullWidth>
                                    <InputLabel required id="demo-simple-select-label" sx={{ fontSize: 13, textTransform: 'capitalize'}}>Service type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="id_type"
                                        sx={{ fontFamily: 'Kanit', fontSize: 13, textTransform: 'capitalize'}}
                                        value={objEdit.length > 0 ? objEdit[0].id_type : ""}
                                        onChange={handleOnChange}
                                        label="Service type"
                                        // InputLabelProps={DataEditDialog.length > 0 ? { shrink: true } : { shrink: false } }
                                    >
                                        <MenuItem value=""> <em> </em> </MenuItem>

                                        {
                                            DataAllServiceDetail.map((item, index) => (
                                                <MenuItem key={item.id_type} value={item.id_type}  sx={{ fontFamily: 'Kanit', fontSize: 13, textTransform: 'capitalize'}}>{item.title}</MenuItem>
                                           
                                            ))
                                            
                                        }

                                    </Select>
                                </FormControl>

                                <Card>
                                    <Card sx={{borderRadius: 0, p: 0, boxShadow: 0}}>
                                        <div className="head-config-option txt-cap">
                                            <DialogContentText sx={{fontSize: 13, color: "black"}}>Fields</DialogContentText>
                                            <div>
                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                    disabled={ShowSwitchItem}
                                                    onClick={ () => handleToggleShowAddItem(ShowAddItem)}
                                                >
                                                    <PlaylistAdd color={ ShowAddItem ? "primary" : ""} fontSize="inherit"/>
                                                </IconButton>
                                            </div>
                                        </div>
                                        
                                    </Card>
                                    {
                                        DataAllItemcheck.map((item, index) => (

                                            <Card key={ item.id_item }
                                                    sx={{
                                                            borderRadius: 0,
                                                            display: DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 || (ShowAddItem || ShowSwitchItem)? "block":"none",
                                                            backgroundColor:( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowAddItem ) || ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1  && ShowSwitchItem )? "#dddddd19":"",
                                                            boxShadow: ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowAddItem ) || ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowSwitchItem ) ? 0 : 1
                                                    }}
                                                >
                                                <div className="head-config-option txt-cap">
                                                    <DialogContentText  sx={{fontFamily: 'Kanit', fontSize: 13}}>{ item.title }</DialogContentText> 
                                                    <div>

                                                        {
                                                            DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && !ShowSwitchItem?
                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                    disabled={ ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowAddItem ) || ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowSwitchItem) }
                                                                    onClick={ () => handleToggleShow_And_setSwitchItem(ShowSwitchItem, item.id_item) }
                                                                >
                                                                    <Repeat fontSize="inherit"/>
                                                                </IconButton>
                                                            :
                                                                DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1?
                                                                    <IconButton  aria-label="add field" component="span"  size="small"
                                                                        disabled={ !(item.id_item === SwitchItem) }
                                                                        onClick={ () => handleToggleShow_And_setSwitchItem(ShowSwitchItem, "") }
                                                                    >
                                                                        <Repeat color={ item.id_item === SwitchItem ? "primary" : ""} fontSize="inherit"/>
                                                                    </IconButton>
                                                                :
                                                                    null
                                                        }

                                                        {
                                                            DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) === -1 && ShowSwitchItem?
                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                    disabled={ (DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowAddItem ) || ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowSwitchItem ) }
                                                                    onClick={ () => handleToggleSwitchItem( SwitchItem,  { id_item: item.id_item, title: item.title, description: item.description, input_type: item.input_type } ) }
                                                                >
                                                                    <Repeat fontSize="inherit"/>
                                                                </IconButton>
                                                            :
                                                               null
                                                        }


                                                        {
                                                            DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 ?
                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                    disabled={ ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowAddItem ) || ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowSwitchItem )}                                                                
                                                                    onClick={ () => handleToggleItem({ id_item: item.id_item, title: item.title, description: item.description, input_type: item.input_type }) }
                                                                >
                                                                    <Delete fontSize="inherit"/>
                                                                </IconButton>
                                                            :

                                                                !ShowSwitchItem ?
                                                                    <IconButton  aria-label="add field" component="span"  size="small"
                                                                        disabled={ ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowAddItem ) || ( DataAllItemchecked.findIndex(object => { return object.id_item === item.id_item }) !== -1 && ShowSwitchItem)}                                                                       
                                                                        onClick={ () => handleToggleItem({ id_item: item.id_item, title: item.title, description: item.description, input_type: item.input_type }) }
                                                                    >
                                                                        <Add fontSize="inherit"/>
                                                                    </IconButton>
                                                                :
                                                                    null
                                                                
                                                        }

                                                    </div>
                                                </div>
                                            </Card>


                                            // <Card key={"item"+ index} sx={{ borderRadius: 0 }}>
                                            //     <div className="head-config-option txt-cap">
                                            //         <DialogContentText  sx={{fontFamily: 'Kanit', fontSize: 13}}>{ item.service_items[0].title }</DialogContentText> 
                                            //         <div>
                                            //             <IconButton  aria-label="add field" component="span"  size="small">
                                            //                 <RepeatIcon fontSize="inherit"/>
                                            //             </IconButton>

                                            //             <IconButton  aria-label="add field" component="span"  size="small">
                                            //                 <DeleteIcon fontSize="inherit"/>
                                            //             </IconButton>
                                            //         </div>
                                            //     </div>
                                            // </Card>
                                        ))
                                    }
                                </Card>

                            </>
                        :   
                            null
                                
                    }

                </Stack>
               
            </DialogContent>
  
            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    disabled={DataAllItemchecked.length > 0? false : true}
                    autoFocus
                    onClick={handleEditDialog}
                  >
                    ok
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}

const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
}

const Allconfig = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [datadevice, setdatadevice] = useState([]);
    const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);

    const [DataServiceDetail, setDataServiceDetail] = useState([]);
    const [DataOptions, setDataOptions] = useState([]);

    const DataDevice = async (e) => {
        try {
            await axios.get('http://localhost:5000/getnotebookall', { }).then((res) => {  
                setdatadevice(res.data);
                setStattusLoadDatajob(true)
            })

        } catch (error) {
            console.log(error);
        }
    }
    const GetServiceType = async() => {
        try {
  
            await axios.get('http://localhost:5000/getservicetypeall').then((res) => {  
                setDataServiceDetail(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }
    const GetServiceOption = async() => {
        try {
  
            await axios.get('http://localhost:5000/getserviceoptionall').then((res) => {  
                setDataOptions(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        DataDevice();
        GetServiceType();
        GetServiceOption();
        getAllEmpRole();
    },[]);
    
    const UpdateNameNotebook_center = async(id,name) => {

        try {

            await axios.post('http://localhost:5000/UpdateNameNotebook_center', { 
                device_center_id : id ,
                device_name : name ,
                
            }).then((res) => {  
                setMsg(res.data.msg);

            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const UpdateNameServiceType = async(id,name) => {
        try {
  
            await axios.post('http://localhost:5000/UpdateNameServiceType', { 
                id_type : id ,
                title : name ,
                
            }).then((res) => {  
                setMsg(res.data.msg);

            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const UpdateNameOption = async(id,name) => {
        try { 
            await axios.post('http://localhost:5000/UpdateNameOption', { 
                id_option : id ,
                title : name ,
                
            }).then((res) => {  
                setMsg(res.data.msg);

            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditTextDialog = (e) => {
        setMsg("")

        let fieldEdit = document.querySelectorAll(e + ' .input-config-text')
        let checkmodeEdit = document.querySelectorAll(".input-config-text.active")

        if(checkmodeEdit.length > 0) {
            checkmodeEdit[0].classList.remove('active')
            checkmodeEdit[0].value = checkmodeEdit[0].previousvalue
            checkmodeEdit[0].readOnly = true
        }

        fieldEdit[0].readOnly = false
        fieldEdit[0].previousvalue = fieldEdit[0].value;
        fieldEdit[0].classList.toggle('active')

        fieldEdit[0].addEventListener("keypress", function(event) {
            if (event.key === "Enter") {

                if(fieldEdit[0].name) {
                    console.log(fieldEdit[0].value);
                    
                    if(fieldEdit[0].name.split('&')[0] === "devicename") {
                        UpdateNameNotebook_center(fieldEdit[0].name.split('&')[1],fieldEdit[0].value)

                    } else if(fieldEdit[0].name.split('&')[0] === "typename") {
                        UpdateNameServiceType(fieldEdit[0].name.split('&')[1],fieldEdit[0].value)

                    } else if(fieldEdit[0].name.split('&')[0] === "optionname") {
                        
                        UpdateNameOption(fieldEdit[0].name.split('&')[1],fieldEdit[0].value)
                    }
                }

                fieldEdit[0].value = fieldEdit[0].value;
                fieldEdit[0].previousvalue = fieldEdit[0].value;
                fieldEdit[0].classList.remove('active')
                fieldEdit[0].readOnly = true
            }
        });

        /////////////////////////////////////////////////////////////////////////////////////////

        // let checkmodeEdit = document.querySelectorAll(".input-config-devicename")

        // if(checkmodeEdit.length > 0) {
        //     let parent = checkmodeEdit[0].offsetParent
        //     parent.innerHTML = checkmodeEdit[0].defaultValue
        // }

        // let fieldEdit = document.querySelectorAll(e)
        // let input = document.createElement("input");
        // input.classList.add('input-config-devicename');
        // input.accessKey = e;
        // input.defaultValue = fieldEdit[0].innerHTML;
        // input.maxLength = 20;
        // input.minLength = 6;

        // fieldEdit[0].innerHTML="";
        // fieldEdit[0].appendChild(input);
        // input.focus();

        // input.addEventListener("keypress", function(event) {
        //     if (event.key === "Enter") {
        //         fieldEdit[0].innerHTML=input.value;

        //     }
        // });

    };

    const handleRemoveDeviceCenterDialog = (e) => {
        setdatadevice(datadevice.filter((data) => (data.id_device !== e)))

    };

    const handleRemoveServiceOptionDialog = (e) => {
        setDataOptions(DataOptions.filter((data) => (data.id_option !== e)))
    };

    const handleRemoveServiceTypeDialog = (e) => {
       
        setDataServiceDetail(DataServiceDetail.filter((data) => (data.id_type == e)))
   

    };

    useEffect(() => {
        const inputEdit = Array.from(document.querySelectorAll('.tab-config'))

        inputEdit.forEach((iteminputEdit) => {
            iteminputEdit.addEventListener('dblclick', (e) => {
                setMsg("")
                let checkmodeEdit = document.querySelectorAll(".input-config-text.active")
                if(checkmodeEdit.length > 0) {
                    checkmodeEdit[0].classList.remove('active')
                    checkmodeEdit[0].value = checkmodeEdit[0].previousvalue
                    checkmodeEdit[0].readOnly = true

                    // let parent = checkmodeEdit[0].offsetParent
                    // parent.innerHTML = checkmodeEdit[0].defaultValue
                    // return
                }

                e.target.readOnly = false
                e.target.previousvalue = e.target.value;
                e.target.classList.toggle('active')

                e.target.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        if(e.target.name) {
                            if(e.target.name.split('&')[0] === "devicename") {
                                UpdateNameNotebook_center(e.target.name.split('&')[1],e.target.value)
            
                            } else if(e.target.name.split('&')[0] === "typename") {
                                UpdateNameServiceType(e.target.name.split('&')[1],e.target.value)
            
                            } else if(e.target.name.split('&')[0] === "optionname") {
                                UpdateNameOption(e.target.name.split('&')[1],e.target.value)
                            }
                        }
                       

                        e.target.value = e.target.value;
                        e.target.previousvalue = e.target.value;
                        e.target.classList.remove('active')
                        e.target.readOnly = true
                    }
                });
            })
        })

        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // const inputEdit = Array.from(document.querySelectorAll('.tab-config'))
        // inputEdit.forEach((iteminputEdit) => {

        //     iteminputEdit.addEventListener('dblclick', (e) => {

        //         let fieldEdit = document.querySelectorAll(".text_edit_ck .input-config-devicename")
        //         if(fieldEdit.length > 0) {
        //             let parent = fieldEdit[0].offsetParent
        //             parent.innerHTML = fieldEdit[0].defaultValue
        //         }

        //         let v = e.target.innerHTML
        //         if( e.target.className.split(' ').findIndex(classname => { return classname.slice(0, -1) === 'text-edit-content-config' }) !== -1) {
        //             let input = document.createElement("input");
        //             input.classList.add('input-config-devicename');
        //             input.accessKey = e.target.className[e.target.className.split(' ').findIndex(classname => { return classname.slice(0, -1) === 'text-edit-content-config' })]; 
        //             input.defaultValue = v;
        //             input.maxLength = 20;
        //             input.minLength = 6;
        //             input.readOnly = true
        //             e.target.innerHTML="";
        //             e.target.appendChild(input);
        //             input.focus(); 

        //             input.addEventListener("keypress", function(event) {
        //                 if (event.key === "Enter") {
        //                     e.target.innerHTML=input.value;

        //                 }
        //             });
        //         }
               
        //     })
        // })
    
    
    }, []);

    const RenderBodyDeviceConfig = (item, index) => {
        
        return (
    
            <tr key={index}  className={"content-configtable cursor_pointer " + ( index % 2 !== 0 ? "boxc-b": "boxc-w")} >
                <td className="dropdown_MenuUser">
                    <PopupState variant="popover" popupId="demo-popup-popover">
                        {
                            (popupState) => (
                                <React.Fragment>
    
                                    <MoreVert fontSize="10px" {...bindTrigger(popupState)}  />
                                    <Menu {...bindMenu(popupState)} className="MenuUser">   
    
                                        <MenuItem sx={{display: "none"}}></MenuItem>
                                        <MenuItem onClick={ () => {  popupState.close(); handleEditTextDialog('.text-edit-content-config'+ index);  } } sx={{fontSize: 13}}> <Edit sx={{ fontSize: 13 }} />&nbsp; Edit</MenuItem>
                                        <MenuItem onClick={ () => {  popupState.close(); handleConfirmDialog( {id_device: item.id_device, name: item.name}, "del-device");  } } sx={{fontSize: 13}}> <DeleteOutline sx={{ fontSize: 13 }} />&nbsp; Remove</MenuItem>

                                    </Menu>
    
                                </React.Fragment>
    
                            )
                        }
                    </PopupState>
                    &nbsp;<i className="bx bx-desktop"></i>
                </td>
                <td className="col_txt">{index+1}</td>
                {/* <td className="col_txt">{item.id_device}</td> */}
                <td className={"col_txt text_edit_ck text-edit-content-config"+ index}>
                    {/* {item.name} */}
                    <input key={item.id_device}  className='input-config-text' readOnly={true} type="text" placeholder="device name" previousValue={item.name} defaultValue={item.name} name={"devicename&"+ item.id_device} required/>
                </td>
                <td className="col_txt text-center">
                    <FormControlLabel
                        control={<StatusSwitch sx={{ mr: -3 }} defaultChecked={item.status} />}
                        onChange={ (e) => { handleChangeStatusDevice(item.id_device,item.name,item.status) } }
                        label=""
                    />
                </td>

            </tr>
         )
    }

    ////////////////////////////////////////////

    const [expanded, setExpanded] = useState('panel1');

    const handleChangeExpanded = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    ////////////////////////////////////////////
    const [openDialog, setOpenDialog] = useState(false);
    const [DialogFuncOn, setDialogFuncOn] = useState("");
    const [DataDialog, setDataDialog] = useState([]);

    const handleConfirmDialog = (e, func) => {
        setOpenDialog(true);
        setDialogFuncOn(func)
        setDataDialog(e)
        
      };
  
      const handleCloseDialog = (newValue) => {
          setOpenDialog(false);
          setMsg("");
      };

    const [DataAllItem, setDataAllItem] = useState([]);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [DataEditDialog, setDataEditDialog] = useState([]);

    const [openAddServiceOptionDialog, setopenAddServiceOptionDialog] = useState(false);
    const [DataAddServiceOptionDialog, setDataAddServiceOptionDialog] = useState([]);
    
    const handleAddServiceOptionDialog = (e) => {
        setDataAddServiceOptionDialog(e);
    };

    useEffect(() => {
        
        if(DataAddServiceOptionDialog.length > 0) {
            setopenAddServiceOptionDialog(true);
            setMsg("")
        }
        
    }, [DataAddServiceOptionDialog]);
    
    const handleCloseAddServiceOptionDialog = () => {
        setopenAddServiceOptionDialog(false);
        setDataAddServiceOptionDialog([])
        GetServiceOption()
    };

    const [openAddServiceTypeDialog, setopenAddServiceTypeDialog] = useState(false);

    const handleAddServiceTypeDialog = () => {
        setopenAddServiceTypeDialog(true);
    }

    const handleCloseAddServiceTypeDialog = () => {
        setopenAddServiceTypeDialog(false);
        GetServiceType()
    };

    const [openAddDeviceDialog, setopenAddDeviceDialog] = useState(false);

    const handleAddDeviceDialog = () => {
        setopenAddDeviceDialog(true);
    }

    const handleCloseAddDeviceDialog = () => {
        setopenAddDeviceDialog(false);
        DataDevice()
    };

    const [openCreateTeamDialog, setopenCreateTeameDialog] = useState(false);

    const handleCreateTeamDialog = () => {
        setopenCreateTeameDialog(true);
    }

    const handleCloseCreateTeamDialog = () => {
        setopenCreateTeameDialog(false);
    };

    const [msg, setMsg] = useState("");

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    useEffect(() => {
        const handleSubmit = async() => {
            setState(state => ({ state, ...{ open: true,vertical: "top", horizontal: "center"} }));
            await sleep(1e4);
            setState(state => ({ ...state, open: false }));

        };

        if(msg !== "") {
            handleSubmit();

        }
        
    }, [msg]);

    const handleEditDialog = async (e) => {

        try {
            await axios.post('http://localhost:5000/getDataOptionDetail', {
                id_option: e

            }).then(res => {  
                setDataEditDialog(res.data);
                
            })
    
            
        } catch (error) {
            console.log(error);
        }
        
        setMsg("");

    };
  
    const handleCloseEditDialog = (newValue) => {
        setOpenEditDialog(false);
    };

    useEffect(() => {
        if( DataEditDialog.length > 0 ) {
            setOpenEditDialog(true);
        } 

    }, [DataEditDialog]);
    const RemoveServiceType = async (eID, eTitle) => {

        try {
          await axios.post('http://localhost:5000/RemoveServiceType', {
            id_type :eID,
            title : eTitle

          }).then(res => {  
            setMsg(res.data.msg);
            handleRemoveServiceTypeDialog(eID); 
            GetServiceType();
          })

        } catch (error) {
          console.log(error);
        }

    }

    const RemoveOption = async (eID, eTitle) => {

        try {

            await axios.post('http://localhost:5000/RemoveServiceOption', {
                id_option: eID,
                title: eTitle

            }).then(res => {  
                setMsg(res.data.msg);
                handleRemoveServiceOptionDialog(eID); 
            })

        } catch (error) {
            console.log(error);
        }

    }

    const RemoveDeviceCenter = async (eID,eName) => {

        try {
          await axios.post('http://localhost:5000/DelDeviceCenter', {
            device_center_id :eID,
            device_name :eName
            

          }).then(res => {  
            setMsg(res.data.msg);
            handleRemoveDeviceCenterDialog(eID); 
          })

        } catch (error) {
          console.log(error);
        }

    }

    const GetAllItem = async (e) => {
        try {
          await axios.get('http://localhost:5000/getAllItem', { }).then((res) => {  
            setDataAllItem(res.data); 

          })
        } catch (error) {
          console.log(error);
        }
    }

    const handleChangeRole = async (user_id,role_id) => {
        try {
            await axios.post('http://localhost:5000/upDateRole', {
                id_User : user_id,
                role_Id : role_id
            }).then((res) => {  
                setMsg(res.data.msg);
                GetAllEmp();
            });

        } catch (error) {
            console.log(error);
        }
    }

    const onClickAcceptRole = async () => {
        handleChangeRole(selectEmpID,selectRoleID);
        handleCloseModalSelect();
    }

    const UpdateAllDetailServiceOption = async(e) => {

        // console.log(e.objEdit[0])
        // console.log(e.objItems)
        // console.log(e.delItems)

        try {
            await axios.post('http://localhost:5000/UpdateAllDetailServiceOption', {
                id_option: e.objEdit[0].id_option,  
                title: e.objEdit[0].title, 
                status: e.objEdit[0].status, 
                id_type: e.objEdit[0].id_type, 

                objItems: e.objItems,
                delItems: e.delItems, 

            }).then((res) => {  
                setMsg(res.data.msg);
                GetAllItem();
                GetServiceType();
                GetServiceOption();
            });

        } catch (error) {
            console.log(error);
        }
    }
    
    const handleChangeStatus = async (status,title,id) => {
        setMsg("")

        try {
            await axios.post('http://localhost:5000/UpdateStatusServiceOption', {
                id_option: id,  
                status: !status,
                title: title
             

            }).then((res) => {  
                setMsg(res.data.msg);
                GetServiceOption()

            });

        } catch (error) {
            console.log(error);
        }
        
    };

    const handleChangeStatusDevice = async (device_center_id,device_name,status) => {
        setMsg("")
        // console.log(status,"d");

        try {
            await axios.post('http://localhost:5000/UpdateStatusNotebook_center', {
                device_center_id: device_center_id,  
                status: !status,
                device_name: device_name
             

            }).then((res) => {  
                setMsg(res.data.msg);
                DataDevice()

            });

        } catch (error) {
            console.log(error);
        }
        
    };

    const [Team_support, setTeam_support] = useState([]);
    const [TeamMember, setTeamMember] = useState([]);
    const [ProfileCut, setProfileCut] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [allRole, setAllRole] = useState([]);
    const [isSelect, setIsSelect] = useState(false);
    const [selectEmpID, setSelectEmpId] = useState("");
    const [selectRoleID, setSelectRoleID] = useState(false);

    const GetTeam_support = async (e) => {
        try {
          await axios.get('http://localhost:5000/getTeam_support', { }).then((res) => {  
            setTeam_support(res.data);   

          })
        } catch (error) {
          console.log(error);
        }
    }

    const GetTeamMember = async (e) => {
        try {
          await axios.get('http://localhost:5000/getTeamMember', { }).then((res) => {  
            setTeamMember(res.data);   

          })
        } catch (error) {
          console.log(error);
        }
    }

    const GetProfileCut = async (e) => {
        try {
          await axios.get('http://localhost:5000/getProfileCut', {
             id_user : e

           }).then((res) => {  
            setProfileCut(res.data);   

          })
        } catch (error) {
          console.log(error);
        }
    }

    
    const GetAllEmp = async (e) => {
        try {
          await axios.get('http://localhost:5000/getuserall', {

           }).then((res) => {  
            setAllUser(res.data);   
            
          })
        } catch (error) {
          console.log(error);
        }
    }

        
    const getAllEmpRole = async (e) => {
        try {
          await axios.get('http://localhost:5000/getrollall', {

           }).then((res) => {  
                setAllRole(res.data);   
            
           })
        } catch (error) {
          console.log(error);
        }
    }
    const handleChangeRoleSelect =(userId,event)=>{
        console.log("test : "+userId)
        console.log("resr : "+event.target.value)
        setSelectEmpId(userId)
        setIsSelect(true)
        setSelectRoleID(event.target.value)
    }
    const handleUpdateWhoApprOption = async (id_option, who_approve) => {
        setMsg("")

        try {
            await axios.post('http://localhost:5000/UpdateWhoApprOption', {
                id_option: id_option,  
                who_approve: who_approve

            }).then((res) => {  
                setMsg(res.data.msg);

            });

        } catch (error) {
            console.log(error);
        }
        
    };

    const handleUpdateTeamSupOption = async (id_option, team_support) => {
        // console.log(id_option+" "+who_approve)
        setMsg("")

        try {
            await axios.post('http://localhost:5000/UpdateTeamSupOption', {
                id_option: id_option,  
                team_support: team_support

            }).then((res) => {  
                setMsg(res.data.msg);

            });

        } catch (error) {
            console.log(error);
        }
        
    };

    const handleCloseModalSelect =()=>{
        console.log("hello")
        setSelectEmpId("")
        setIsSelect(false)
        setSelectRoleID("")
        setMsg("");
    }
    const RenderBodyServiceConfig = (item, index) => {
        
        return (
    
            <tr key={index}  className={"content-configtable cursor_pointer " + ( index % 2 !== 0 ? "boxc-b": "boxc-w")} >
                <td className="dropdown_MenuUser">
                    <PopupState variant="popover" popupId="demo-popup-popover">
                        {
                            (popupState) => (
                                <React.Fragment>
    
                                    <MoreVert fontSize="10px" {...bindTrigger(popupState)}  />
                                    <Menu {...bindMenu(popupState)} className="MenuUser">
    
                                        <MenuItem sx={{display: "none"}}></MenuItem>
                                        <MenuItem onClick={ () => {  popupState.close(); handleEditTextDialog('.text-edit-content-config'+ item.id_option);  } } sx={{fontSize: 13}}> <Edit sx={{ fontSize: 13 }} />&nbsp; Edit title</MenuItem>
                                        <MenuItem onClick={ () => {  popupState.close(); handleEditDialog(item.id_option); } } sx={{fontSize: 13}}> <ViewList sx={{ fontSize: 13 }} />&nbsp; Option item</MenuItem>
                                        <MenuItem onClick={ () => {  popupState.close(); handleConfirmDialog( {id_option: item.id_option, title: item.title}, "del-option")  } } sx={{fontSize: 13}}> <DeleteOutline sx={{ fontSize: 13 }} />&nbsp; Remove</MenuItem>

                                    </Menu>
    
                                </React.Fragment>
    
                            )
                        }
                    </PopupState>
                    {/* &nbsp;<i className="bx bx-desktop"></i> */}
                </td>
                {/* <td className="col_txt">{index+1}</td> */}
                {/* <td className="col_txt">{item.id_option}</td> */}
                <td className={"col_txt text_edit_ck text-edit-content-config"+ item.id_option}>
                    {/* {item.name} */}
                    <input key={item.id_option}  className='input-config-text' readOnly={true} type="text" placeholder="device name" previousValue={item.title}  defaultValue={item.title} name={"optionname&"+ item.id_option} required/>
                </td>
                {/* <td className="col_txt">
                    <FormControl variant="standard" id="demo-simple-select-label" sx={{ minWidth: 100, fontSize: 10 }}>
                        <Select
                            labelId="demo-simple-select-label-who_approve"
                            id={"demo-simple-select-who_approve"+item.id_option}
                            name={"whoAppr"+item.id_option}
                            defaultValue={item.who_approve}
                            label="Mis.Appr"
                            //handleUpdateWhoApprOption handleUpdateTeamSupOption
                            // onChange={(e)=>console.log(e)}
                            onChange={(e)=>handleUpdateWhoApprOption(item.id_option, e.target.value)}
                            sx={{fontSize: 10, textTransform: 'capitalize' }}
                        >
                            <MenuItem value=""> <em> </em> </MenuItem>
                            <MenuItem value={'Manager'}  sx={{ fontSize: 13, textTransform: 'capitalize'}}>Meneger</MenuItem>
                            <MenuItem value={'Team header'}  sx={{ fontSize: 13, textTransform: 'capitalize'}}>Team Header</MenuItem>
                        </Select>
                    </FormControl>
                </td>
                <td className="col_txt">
                    <FormControl variant="standard" id="demo-simple-select-label" sx={{ minWidth: 100, fontSize: 10 }}>
                        <Select
                            labelId="demo-simple-select-label-team_support"
                            id={"demo-simple-select-team_support"+item.id_option}
                            name={"team_support"+item.id_option}
                            defaultValue={item.team_support === null ? "" : item.team_support}  
                            label="team support"
                            //handleUpdateWhoApprOption handleUpdateTeamSupOption
                            onChange={(e)=>handleUpdateTeamSupOption(item.id_option, e.target.value)}
                            sx={{fontSize: 10, textTransform: 'capitalize' }}
                        >
                            <MenuItem value=""> <em> </em> </MenuItem>
                             {
                                Team_support.map((item, index) => (
                                    <MenuItem key={item.team_id} value={item.team_id}  sx={{ fontFamily: 'Kanit', fontSize: 13, textTransform: 'capitalize'}}>{item.team_name}</MenuItem>
                                
                                ))
                                
                            }
                        </Select>
                    </FormControl>
                    
                </td> */}
                <td className="col_txt text-center">
                    <FormControlLabel
                        control={<StatusSwitch sx={{ mr: -3 }} defaultChecked={item.status} />}
                        onChange={ (e) => { handleChangeStatus(item.status,item.title,item.id_option) } }
                        label=""
                    />
                </td>

            </tr>
         )
    }

    ////////////////////////////////////////////////////////
    const RenderBodyTeamConfig = (item, index) => {
        
        return (
    
            <tr key={index}  className={"content-configtable cursor_pointer "} >
                <td className="col_txt">{item.id_user}</td>
                <td className="col_txt">{item.username}</td>
                <td className="col_txt">{item.access_level}</td>

            </tr>
         )
    }
    ////////////////////////////////////////////////////////
    const RenderBodyUser = (item, index) => {
        
        return (
    
            <tr key={index}  className={"content-configtable cursor_pointer "} >
                <td className="col_txt">{item.id_user}</td>
                <td className="col_txt">{item.name_user}</td>
                <td className="col_txt" >
                    {
                         allRole.length!==0&&allRole?
                         <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         variant="standard"
                         value={item.role_id}
                         onChange={(event)=>handleChangeRoleSelect(item.id_user,event)}
                         disableUnderline
                         style={{minWidth: "120px",height:"30px"}}
                        >
                         {
                             allRole.length!==0&&allRole?allRole.map((item,index)=>(
                                 <MenuItem value={item.role_id}>{item.role_name}</MenuItem>
     
                             )):''
                         }
     
                     </Select>:""
                    }

                </td>

            </tr>
         )
    }
    useEffect(() => {
        if(value === 0) {
            GetAllItem()
            GetTeam_support()
            GetTeamMember()
        } else if (value === 1) { 
            GetAllItem() 
            GetTeam_support()
            GetTeamMember()
            
        } else if (value === 2) {
            GetAllEmp();
        }
        DataDevice();
        GetServiceType();
        GetServiceOption();
        
    },[value]);
    return (
        <div className="layout-component m_r">
            {
                <Dialog
                    open={isSelect}
                    onClose={handleCloseModalSelect}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                      <DialogTitle id="alert-dialog-title">
                        {"  "}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            คุณต้องการที่จะเปลี่ยนตำแหน่งของพนักงานคนนี้หรือไม่ ?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseModalSelect}>CANCEL</Button>
                        <Button onClick={onClickAcceptRole} autoFocus>
                          CONFIRM
                        </Button>
                      </DialogActions>
                    </Dialog>
            }
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
            />

            <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                funcOn={DialogFuncOn}
                openDialog={openDialog}
                onCloseDialog={handleCloseDialog}
                DataDialog={DataDialog}
                RemoveOption={(eID, eTitle) => RemoveOption(eID, eTitle)}
                RemoveServiceType={(eID, eTitle) => RemoveServiceType(eID, eTitle)}
                RemoveDeviceCenter={(eID, eTitle) => RemoveDeviceCenter(eID, eTitle)}

            />

            <h2 className="page-header">
                {"configurar".toUpperCase()}
            </h2>
            <div className="row box-scroll">
                <div className="col-12">
                    <div className="card-g dataEmp-min-h">
                        <Box
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab 
                                    sx={{alignItems:'flex-start'}}
                                    label={
                                        <MenuItemTab
                                            title={"Device Center"}
                                            icon={"bx bx-desktop"}
                                            color={" system"}
                                        />
                                    } 
                                    {...a11yProps(0)} 
                                />
                                <Tab 
                                    sx={{alignItems:'flex-start'}}
                                    label={
                                        <MenuItemTab
                                            title={"Service"}
                                            icon={"bx bxs-donate-heart"}
                                            color={" system"}
                                        />
                                    } 
                                    {...a11yProps(1)} 
                                />
                                {/* <Tab 
                                    sx={{alignItems:'flex-start'}}
                                    label={
                                        <MenuItemTab
                                            title={"Team Support"}
                                            icon={"bx bx-group"}
                                            color={" system"}
                                        />
                                    } 
                                    {...a11yProps(4)} 
                                /> */}
                                {/* <Tab 
                                    sx={{alignItems:'flex-start'}}
                                    label={
                                        <MenuItemTab
                                            title={"Data Item"}
                                            icon={"bx bxs-file"}
                                            color={" system"}
                                        />
                                    } 
                                    {...a11yProps(5)} 
                                /> */}
                                <Tab 
                                    sx={{alignItems:'flex-start'}}
                                    label={
                                        <MenuItemTab
                                            title={"permission admin"}
                                            icon={"bx bxs-check-shield"}
                                            color={" admin"}
                                        />
                                    } 
                                    {...a11yProps(2)} 
                                />
                                {/* <Tab 
                                    sx={{alignItems:'flex-start'}}
                                    label={
                                        <MenuItemTab
                                            title={"Data user admin"}
                                            icon={"bx bxs-contact"}
                                            color={" admin"}
                                        />
                                    } 
                                    {...a11yProps(7)} 
                                /> */}
                            </Tabs>

                            {/* <TabPanel className="tab-config" value={value} index={0}  >
                                <Box sx={{width:'100%'}}>
                                    <h5>{"General".toUpperCase()}</h5>
                                    <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                    <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                                        <Box className="box-content-config-genaral" 
                                            sx={{display:'flex',marginY:1}}
                                        >
                                            <Box className="icon-content" 
                                                sx={{paddingX:1,paddingTop:1.5,paddingBottom:.5,boxShadow:1,borderRadius:3,marginX:2,width:50,height:40}}
                                            >
                                                <Timeline sx={{ fontSize: 16 }} />
                                                <Notes sx={{ fontSize: 15 }} />
                                            </Box>
                                            <Box className="detail-content"
                                                sx={{width:280,paddingY:.5}}
                                                >
                                                <Typography sx={{width: 225 ,fontSize:12, p: '2px 4px',fontFamily:"kanit"}}>
                                                    กราฟแสดงข้อมูลต่อวันของข้อมูลคำร้องที่ได้รับการอนุมัติและถูกปฏิเสธ 
                                                </Typography>
                                            </Box>
                                            <Box className="switch-content"
                                                sx={{marginX:2}}
                                            >
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                    label=""
                                                />
                                            </Box>
                                        </Box>

                                        <Box className="box-content-config-genaral" 
                                            sx={{display:'flex',marginY:1}}
                                            >
                                            <Box className="icon-content" 
                                                sx={{paddingX:1,paddingTop:1.5,paddingBottom:.5,boxShadow:1,borderRadius:3,marginX:2,width:50,height:40}}
                                            >
                                                <DataSaverOff sx={{ fontSize: 16 }} />
                                                <Notes sx={{ fontSize: 15 }} />
                                            </Box>
                                            <Box className="detail-content"
                                                sx={{width:280,paddingY:.5}}
                                                >
                                                <Typography sx={{width: 225 ,fontSize:12, p: '2px 4px',fontFamily:"kanit"}}>
                                                    กราฟ Donut แสดงจำนวนงานในแต่ละวัน
                                                </Typography>
                                            </Box>
                                            <Box className="switch-content"
                                                sx={{marginX:2}}
                                            >
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                    label=""
                                                />
                                            </Box>
                                        </Box>

                                        <Box className="box-content-config-genaral" 
                                            sx={{display:'flex',marginY:1}}
                                            >
                                            <Box className="icon-content" 
                                                sx={{paddingX:1,paddingTop:1.5,paddingBottom:.5,boxShadow:1,borderRadius:3,marginX:2,width:50,height:40}}
                                            >
                                                <CalendarMonth sx={{ fontSize: 16 }} />
                                                <Notes sx={{ fontSize: 15 }} />
                                            </Box>
                                            <Box className="detail-content"
                                                sx={{width:280,paddingY:.5}}
                                                >
                                                <Typography sx={{width: 225 ,fontSize:12, p: '2px 4px',fontFamily:"kanit"}}>
                                                    ปฏิทิน แสดง วัน เดือน ปี
                                                </Typography>
                                            </Box>
                                            <Box className="switch-content"
                                                sx={{marginX:2}}
                                            >
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                    label=""
                                                />
                                            </Box>
                                        </Box>

                                        <Box className="box-content-config-genaral" 
                                            sx={{display:'flex',marginY:1}}
                                            >
                                            <Box className="icon-content" 
                                                sx={{paddingX:1,paddingTop:1.5,paddingBottom:.5,boxShadow:1,borderRadius:3,marginX:2,width:50,height:40}}
                                            >
                                                <StickyNote2 sx={{ fontSize: 16 }} />
                                                <Notes sx={{ fontSize: 15 }} />
                                            </Box>
                                            <Box className="detail-content"
                                                sx={{width:280,paddingY:.5}}
                                            >
                                                <Typography sx={{width: 225 ,fontSize:12, p: '2px 4px',fontFamily:"kanit"}}>
                                                    โน้ตสำหรับบันทึกรายละเอียดงานในแต่ละวัน
                                                </Typography>
                                            </Box>
                                            <Box className="switch-content"
                                                sx={{marginX:2}}
                                            >
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                    label=""
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </TabPanel> */}
                            
                            <TabPanel className="tab-config" value={value} index={0}>
                                {
                                    value === 0 ?
                                        <Box sx={{width:'100%'}}>
                                            
                                            <AddDeviceDialog
                                                id="ringtone-menu"
                                                keepMounted
                                                openAddDeviceDialog={openAddDeviceDialog}
                                                onCloseAddDeviceDialog={handleCloseAddDeviceDialog}
                                                setMsg={(e)=>setMsg(e)}
                                            />

                                            <div className="box-head">
                                                <Nav>
                                                    <h5>{"Device Center".toUpperCase()}</h5>
                                                </Nav>
                                                <Nav>
                                                    <Button sx={{ fontSize: 10 }} variant="text" size="small"  startIcon={<AddCircleOutline  sx={{ fontSize: 10 }}/>}
                                                        onClick={()=>handleAddDeviceDialog()}
                                                    >
                                                        Add device
                                                    </Button>
                                                </Nav>
                                            </div>
                                            <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                            {/* <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}> */}
                                                <Table
                                                    limit='15'
                                                    headData={ConfigTableHead.HeaderDeviceConfig}
                                                    renderHead={(item, index) => renderHead(item, index)}
                                                    bodyData={datadevice}
                                                    renderBody={(item, index) => RenderBodyDeviceConfig(item, index)}
                                                    StattusLoadDatajob={StattusLoadDatajob}
                                                />
                                            {/* </Box> */}
                                        </Box>
                                    :
                                        null
                                }
                                
                            </TabPanel>
                            <TabPanel className="tab-config" value={value} index={1}>
                                {
                                    value === 1 ?
                                        <Box sx={{width:'100%'}}>

                                            <UpdateAndCreateDetailServiceOption
                                                id="ringtone-menu"
                                                keepMounted
                                                openEditDialog={openEditDialog}
                                                onCloseEditDialog={handleCloseEditDialog}
                                                DataEditDialog={DataEditDialog}
                                                DataAllServiceDetail={DataServiceDetail}
                                                DataAllItem={DataAllItem}
                                                GetServiceOption={GetServiceOption}
                                                UpdateAllDetailServiceOption={(e) => UpdateAllDetailServiceOption(e)}
                                            />   

                                            <AddServiceOptionDialog
                                                id="ringtone-menu"
                                                keepMounted
                                                openAddServiceOptionDialog={openAddServiceOptionDialog}
                                                onCloseAddServiceOptionDialog={handleCloseAddServiceOptionDialog}
                                                DataAddServiceOptionDialog={DataAddServiceOptionDialog}
                                                DataAllServiceDetail={DataServiceDetail}
                                                setMsg={(e)=>setMsg(e)}
                                            />

                                            <AddServiceTypeDialog
                                                id="ringtone-menu"
                                                keepMounted
                                                openAddServiceTypeDialog={openAddServiceTypeDialog}
                                                onCloseAddServiceTypeDialog={handleCloseAddServiceTypeDialog}
                                                setMsg={(e)=>setMsg(e)}
                                            />

                                            <div className="box-head">
                                                <Nav>
                                                    <h5>{"IT Service".toUpperCase()}</h5>
                                                </Nav>
                                                <Nav>
                                                    <Button sx={{ fontSize: 10 }} variant="text" size="small"  startIcon={<AddCircleOutline  sx={{ fontSize: 10 }}/>}
                                                        onClick={()=>handleAddServiceTypeDialog()}
                                                    >
                                                        Add Service
                                                    </Button>
                                                </Nav>
                                            </div>
                                            <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                                {
                                                    DataServiceDetail.map((item, index) => (
                                                        <Accordion sx={{width:'100%'}} key={"Accordion" + index+1} expanded={expanded === 'panel'+index+1} onChange={handleChangeExpanded('panel'+index+1)}>
                                                            <AccordionSummary aria-controls={'panel'+index+1+"-content"} id={'panel'+index+1+"-header"}>
                                                                {/* <Typography sx={{ fontSize: 12 }}>{item.title}</Typography> */}
                                                                <div className="box_Accord" key={"service"+index} id={'panel'+index+1+"-header"}>
                                                                    <Typography sx={{ fontSize: 12 }} className={"col_txt text_edit_ck text-edit-content-config"+ 'panel'+index+1+"-header"}>
                                                                        <input key={'panel'+index+1+"-header"}  className='input-config-text' readOnly={true} type="text" placeholder="device name" previousValue={item.title} defaultValue={item.title} name={"typename&"+ item.id_type} required/>
                                                                    </Typography>
                                                                    <div>
                                                                        <IconButton  aria-label="add field" component="span"  size="small"
                                                                            onClick={()=>{handleConfirmDialog( {id_type: item.id_type, title: item.title}, "del-service");}}
                                                                        >
                                                                                <Delete sx={{ fontSize: 15 }} fontSize="inherit"/>
                                                                        </IconButton>
                                                                        <IconButton  aria-label="add field" component="span"  size="small"
                                                                            onClick={()=>handleEditTextDialog('.text-edit-content-config'+ 'panel'+index+1+"-header")}
                                                                        >
                                                                                <Edit sx={{ fontSize: 15 }} fontSize="inherit"/>
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="box-head">
                                                                    <Nav>
                                                                        <h5>{"Service Options".toUpperCase()}</h5>
                                                                    </Nav>
                                                                    <Nav>
                                                                        <Button sx={{ fontSize: 10 }} variant="text" size="small"  startIcon={<AddCircleOutline  sx={{ fontSize: 10 }}/>}
                                                                            onClick={()=>handleAddServiceOptionDialog([{id_type:item.id_type, title:item.title}])}
                                                                        >
                                                                            Add option
                                                                        </Button>
                                                                    </Nav>
                                                                </div>
                                                                <Table
                                                                    limit='15'
                                                                    headData={ConfigTableHead.HeaderSeviceConfig}
                                                                    renderHead={(item, index) => renderHead(item, index)}
                                                                    bodyData={DataOptions.filter((data) => (data.id_type === item.id_type))}
                                                                    renderBody={(item, index) => RenderBodyServiceConfig(item, index)}
                                                                    StattusLoadDatajob={StattusLoadDatajob}
                                                                />
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    ))
                                                }
                                                   
                                            </Box>
                                        </Box>
                                    :
                                        null
                                }
                                
                            </TabPanel>
                            {/* <TabPanel className="tab-config" value={value} index={4}>
                                {
                                    value === 4 ?
                                        <Box sx={{width:'100%'}}>
                                            <div className="box-head">
                                                <Nav>
                                                    <h5>{"Team Support".toUpperCase()}</h5>
                                                </Nav>
                                                <Nav>
                                                    <Button sx={{ fontSize: 10 }} variant="text" size="small"  startIcon={<AddCircleOutline  sx={{ fontSize: 10 }}/>}
                                                        onClick={()=>{}}
                                                    >
                                                        Create Team
                                                    </Button>
                                                </Nav>
                                            </div>
                                            <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                                
                                                { 
                                                    Team_support.map((item, index) => (
                                                        <>               
                                                            <Accordion sx={{width:'100%'}} key={"Accordion" + index+1} expanded={expanded === 'Team_support'+index+1} onChange={handleChangeExpanded('Team_support'+index+1)}>
                                                                <AccordionSummary aria-controls={'Team_support'+index+1+"-content"} id={'Team_support'+index+1+"-header"}>
                                                                    <div className="box_Accord" key={"box_team"+index} id={'Team_support'+index+1+"-header"}>
                                                                        <Typography className={"col_txt text_edit_ck text-edit-content-config"+ index + "_" + item.team_id}>
                                                                            <input key={item.team_id+ "team_name"}  className='input-config-text' readOnly={true} type="text" placeholder="team name" previousValue={item.team_name} defaultValue={item.team_name} name={"teamname&"+ item.team_id} required/>
                                                                        </Typography>
                                                                        <Typography className={"col_txt text_edit_ck text-edit-content-config"+ index + "_" + item.team_id}>
                                                                            <input key={item.team_id+ "objectives"}  className='input-config-text input-config-text-detail' readOnly={true} type="text" placeholder="team objectives" previousValue={item.team_objectives} defaultValue={item.team_objectives} name={"team_objectives&"+ item.team_id} required/>
                                                                        </Typography>
                                                                        <PopupState variant="popover" popupId="demo-popup-popover">
                                                                            {
                                                                                (popupState) => (
                                                                                    <React.Fragment>
                                                        
                                                                                        <MoreVert fontSize="10px" {...bindTrigger(popupState)}  />
                                                                                        <Menu {...bindMenu(popupState)} className="MenuUser">
                                                        
                                                                                            <MenuItem sx={{display: "none"}}></MenuItem>
                                                                                            <MenuItem onClick={ () => {  popupState.close(); handleEditTextDialog('.text-edit-content-config'+ index + "_" + item.team_id);  } } sx={{fontSize: 13}}> <Edit sx={{ fontSize: 13 }} />&nbsp; Edit</MenuItem>
                                                                                            <MenuItem onClick={ () => {  popupState.close();  } } sx={{fontSize: 13}}> <DeleteOutline sx={{ fontSize: 13 }} />&nbsp; Remove</MenuItem>

                                                                                        </Menu>
                                                        
                                                                                    </React.Fragment>
                                                        
                                                                                )
                                                                            }
                                                                        </PopupState>
                                                                    </div>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="box-head">
                                                                        <Nav>
                                                                            <h5>{"Member".toUpperCase()}</h5>
                                                                        </Nav>
                                                                        <Nav>
                                                                            <Button sx={{ fontSize: 10 }} variant="text" size="small"  startIcon={<AddCircleOutline  sx={{ fontSize: 10 }}/>}
                                                                                onClick={()=>{}}
                                                                            >
                                                                                Add Member
                                                                            </Button>
                                                                        </Nav>
                                                                    </div>
                                                                    <Table
                                                                        limit='15'
                                                                        headData={ConfigTableHead.HeaderTeamConfig}
                                                                        renderHead={(item, index) => renderHead(item, index)}
                                                                        bodyData={TeamMember.filter((data) => (data.team_id === item.team_id))}
                                                                        renderBody={(item, index) => RenderBodyTeamConfig(item, index)}
                                                                        StattusLoadDatajob={StattusLoadDatajob}
                                                                    />
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </>
                                                        
                                                    ))
                                                }
                                               
                                            </Box>
                                        </Box>
                                    :
                                        null
                                }   
                               
                            </TabPanel> */}
                            {/* <TabPanel className="tab-config" value={value} index={5}>
                                {
                                    value === 5 ?
                                        <Box sx={{width:'100%'}}>
                                            <h5>{"Data Item".toUpperCase()}</h5>
                                            <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>

                                            </Box>
                                        </Box>
                                    :
                                        null
                                }
                            </TabPanel> */}
                            <TabPanel className="tab-config" value={value} index={2}>
                                {
                                    value === 2 ?
                                        <Box sx={{width:'100%'}}>
                                            <h5>{"permission admin".toUpperCase()}</h5>
                                            <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                                {
                                                    allUser.length!==0?
                                                         <Table
                                                            limit='15'
                                                            headData={ConfigTableHead.HeaderEmpConfig}
                                                            renderHead={(item, index) => renderHead(item, index)}
                                                            bodyData={allUser}
                                                            renderBody={(item, index) => RenderBodyUser(item, index)}
                                                            StattusLoadDatajob={StattusLoadDatajob}
                                                        />
                                                    :''
                                                }
                                            </Box>
                                        </Box>
                                    :
                                        null
                                }
                            </TabPanel>
                            {/* <TabPanel className="tab-config" value={value} index={7}>
                                {
                                    value === 7 ?
                                        <Box sx={{width:'100%'}}>
                                            <h5>{"Data user admin".toUpperCase()}</h5>
                                            <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>

                                            </Box>
                                        </Box>
                                    :
                                        null
                                }
                            </TabPanel> */}
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Allconfig

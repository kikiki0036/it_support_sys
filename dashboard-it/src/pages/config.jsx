import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios';

import UncontrolledTabs from './UncontrolledTabs';
import Nav from './Nav';

import {
    Col,
    TabPane,
    NavItem,
} from 'reactstrap';

import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    List,
    Card,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Button,
    Divider,
    IconButton,
    Switch,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Stack,
    Snackbar,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    DialogContentText,
    TextField,
    Paper,
    InputBase,
 } from '@mui/material';

 import { 
    ExpandMore, 
    Delete,
    Create,
    DeleteSweepSharp,
    Save,
    Check,
    Close,
    DeleteForever,
    FormatListBulleted,
    Repeat,
    PlaylistAdd,
    Add,
    Search,
} from '@mui/icons-material';


// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';

// import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';


import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

// import List from '@mui/material/List';
// import Card from '@mui/material/Card';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';


// import Switch from '@mui/material/Switch';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Stack from '@mui/material/Stack';

// import Snackbar from '@mui/material/Snackbar';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Dialog from '@mui/material/Dialog';
// import DialogContentText from "@mui/material/DialogContentText";
// import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';

// import CheckIcon from "@mui/icons-material/Check";
// import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
// import CreateIcon from '@mui/icons-material/Create';
// import SaveIcon from '@mui/icons-material/Save';
// import {ExpandMoreIcon} from '@mui/icons-material/ExpandMore';
// import CloseIcon from "@mui/icons-material/Close";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';


// import MenuIcon from '@mui/icons-material/Menu';

// const CSSSwitch = styled(Switch)(({ theme }) => ({
//     '& .MuiSwitch-switchBase': {
//         color: "#00e253",
//         '&:hover': {
//         backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//         },
//     },
//     '& .MuiSwitch-switchBase+ .MuiSwitch-track': {
//         backgroundColor: "#00e253",
//     },
//     '& .MuiSwitch-switchBase.Mui-checked': {
//         color: "#fc1e4e",
//         '&:hover': {
//         backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//         },
//     },
//     '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//         backgroundColor: "#fc1e4e",
//     },
// }));
const Root = styled('div')`

  .dialog-search-data {
    border-radius: 5px;
    border: 1px solid #ececec;
    padding: 5px 7px;
    margin:5px 7px;
  }

  .dialogContent {
    padding: 0 5px 0 5px;
    // border-bottom: 1px solid #ececec;
    // border-top: 1px solid #ececec;
  }

  tbody.dialog-table-body-h {

  }

  tbody tr:hover {
    background-color: #f5f5f84d;
  }

  tr {
    padding: 0;
  }

  td,
  th {
    padding: 11.42px 5px;
    border: 0;
    font-size: 0.65rem;
    white-space: nowrap;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }

    // background-color: #f5f5f84d;

  .transform-none-txt {
    text-transform: none;
  }
  
  .font-kanit {
    font-family: 'Kanit', sans-serif;
  }

  .dialog-box-input  thead td { 
    background-color: #fff; position: sticky; top: 0; z-index: 1; 
  }
`;

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
  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1)
    }
}));


function ConfirmationDialogRaw(props) {
    
    const { RemoveNewServiceType, funcOn, RemoveOption, DataDialog, onCloseDialog, openDialog, ...other } = props;
    const radioGroupRef = useRef(null);
  
    const handleConfDialog = () => {
        //   console.log(DataDialog.id, DataDialog.title)
        if(funcOn === "del-one") {
            RemoveOption(DataDialog.id, DataDialog.title, "del-one");
            onCloseDialog();

        } else  if(funcOn === "del-all") { 
            RemoveOption("", "", "del-all");
            onCloseDialog();

        } else  if(funcOn === "del-Service") { 
            RemoveNewServiceType(DataDialog);
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
          sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 435 } }}
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
                    <DeleteForever sx={{ fontSize: 120 }} color="disabled" />
                </Typography>
  
                {
                    funcOn === "del-one" || funcOn === "del-Service"?  

                        <DialogContentText
                            id="alert-dialog-slide-description"
                            sx={{ textAlign: "center", color: "black" }}
                        >
                            {funcOn === "del-Service"? <p>Remove Service : { DataDialog.title } </p> : <p>Remove Option : { DataDialog.title } </p>} 
                        
                        </DialogContentText>

                    :  

                        <DialogContentText
                            id="alert-dialog-slide-description"
                            sx={{ textAlign: DataDialog.length > 1 ? "left" : "center", color: "black" }}
                        >
                            {
                                DataDialog.length > 1 ? 
                                    <>
                                        <DialogContentText
                                            id="alert-dialog-slide-description"
                                            sx={{ textAlign: "center", color: "black" }}
                                        >                                 
                                            Remove Option <br/> 
                                        </DialogContentText> 
                                        <ul>
                                        {
                                            DataDialog.map((item, index) => (
                                                <li key={"item"+index}>&nbsp;&nbsp; {index+1}.&nbsp;{ item.title }</li>
                                            ))
                                        }
                                        </ul> 
                                    </>
                                    
                                :
                                    DataDialog.length === 1 ? 
                                        <p>Remove Option : { DataDialog[0].title } </p>
                                    : null
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


function UpdateDetailServiceOption(props) {
    
    const { UpdateAllDetailServiceOption, DataAllItem, DataAllServiceDetail, DataEditDialog, onCloseEditDialog, openEditDialog, ...other } = props;
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

    const handleOnChange = (event) => {   
        let newobjEdit = [...objEdit];
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
            
        }

    };

    const handleCancelEditDialog = () => {
        onCloseEditDialog();


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
          sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 450 } }}
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
                                        // objEdit[0].service_option_items.map((item, index) => (
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
//const { UpdateAllDetailServiceOption, DataAllItem, DataAllServiceDetail, DataEditDialog, onCloseEditDialog, openEditDialog, ...other } = props;


function CreateService(props) {
    
    const { CreateNewService, onCloseCreateServiceDialog, openCreateServiceDialog, ...other } = props;

    const handleCancelCreateServiceDialog = () => {
        onCloseCreateServiceDialog();

    };

    const CreateDataService = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        CreateNewService({ 
            title : data.get('CreateServiceTitle')
        })

        handleCancelCreateServiceDialog()

    }

    return (
        <BootstrapDialog
          onClose={handleCancelCreateServiceDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 450 } }}
          maxWidth="xs"
          open={openCreateServiceDialog}
          {...other}
          component="form"
          onSubmit={CreateDataService}

        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelCreateServiceDialog}
            >
                  Create Sevice
            </BootstrapDialogTitle>
            
            <DialogContent dividers sx={{ overflowY: "overlay" }}>
                <Stack
                    sx={{
                        width: '100%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <>
                        <CssTextField
                            id="CreateServiceTitle"
                            label="Service title"
                            name={"CreateServiceTitle"}
                            sx={{width:"100%", marginBottom: "15px"}}
                        />
                    </>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    autoFocus
                    size={"small"}
                    type="submit"
                    // onClick={handleCancelCreateDialog}
                  >
                    Submit
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}

function AddProfileIT(props) {
    const { DataErp, AddErp_prom, onCloseAddProfileITDialog, openAddProfileITDialog, ...other } = props;

    const handleCancelAddProfileITDialog = () => {
        onCloseAddProfileITDialog();

    };

    const AddDataProfileIT = (e) => {
        AddErp_prom(e)
        handleCancelAddProfileITDialog()
    }


    const [DataEmp, setDataEmp] = useState([]);
    const [filterDataEmp, setfilterDataEmp] = useState([]);

    const [rowsProfileIT, setRowsProfileIT] = useState(DataEmp);

    const getDataEmp = async () => {
        try {
            await axios.get('http://localhost:5000/getDataAllEmp', {  }).then((res) => {  
              setDataEmp(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }
  
    useEffect(() => {
      getDataEmp()
    }, []);
  
    
    useEffect(() => {
        if(DataEmp.length > 0 && DataErp.length > 0) {
            const filteredDataEmp = DataEmp.filter((row) => {
                const rowcolummDataEmp = row.sections[0].section
                return rowcolummDataEmp.toLowerCase().includes("MIS-G".toLowerCase());
            });

            console.log(filteredDataEmp)
    
            let arr = []
            
            for(let i=0; i < filteredDataEmp.length ; i++) {
                if((DataErp.findIndex(object => { return object.id_profile === filteredDataEmp[i].user_profiles[0].id_profile }) === -1) && (arr.findIndex(object => { return object.id_profile === filteredDataEmp[i].user_profiles[0].id_profile }) === -1)) {
                    // filteredDataEmp.splice(currentIndex, 1);
                    arr.push(filteredDataEmp[i])
                }
                
    
            }

            console.log(arr)

            setfilterDataEmp(arr)
        }

    }, [DataEmp,DataErp]);

    useEffect(() => {
        if(filterDataEmp.length > 0) {
            setRowsProfileIT(filterDataEmp)

        }

    }, [filterDataEmp]);
  
    const onSearch = value => {
      const filteredRows = filterDataEmp.filter((row) => {
        const rowcolumm = row.id_emp
        return rowcolumm.toLowerCase().includes(value.toLowerCase());
      });

      setRowsProfileIT(filteredRows);
    } 
    
  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 550,height: 550} }}
        maxWidth="xs"
        open={openAddProfileITDialog}
        {...other}
      >
        <DialogTitle sx={{pb:0, paddingX: "10px"}}>DATA EMP</DialogTitle>
          <Paper component="form" sx={{ boxShadow: 0, mb:1, p: '1px 4px', display: 'flex', alignItems: 'center', width: "100%" }}>
              {/* <IconButton sx={{ p: '5px' }} aria-label="menu"> <MenuIcon sx={{ fontSize: '1.3rem' }} /> </IconButton> */}
              <InputBase sx={{ ml: 1, flex: 1,px:0,fontSize: '0.75rem' }} onChange={ (e) => { onSearch(e.target.value) } } placeholder="Search Emp ID" inputProps={{ 'aria-label': 'search google maps' }} />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton sx={{ p: '10px' }} aria-label="search"> <Search sx={{ fontSize: '1.3rem' }} /> </IconButton>
          </Paper>
          <DialogContent dividers  sx={{p:0}}> 
          <Root>
            {/* <input className="dialog-search-data" type="text" onChange={(event) => {setValue(event.target.value)}}/> */}
           
  
            <div className="dialog-box-input dialogContent">
            
                  <table>
                    <thead>
                      <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>email</td>
                        <td>section</td>
  
                      </tr>
                    </thead>
                    <tbody className="dialog-table-body-h">
                        {
                          rowsProfileIT.map((row) => (
                              <tr key={row.id_emp} onClick={() => {AddDataProfileIT({id_profile: row.user_profiles[0].id_profile, id_it: row.id_emp, it_name: row.emp_nameEng})}}>
                                <td>{row.id_emp}</td>
                                <td className="font-kanit">{row.emp_name}</td>
                                <td className="transform-none-txt">{row.user_profiles[0].email}</td>
                                <td>{row.sections[0].section}</td>
                              </tr>
                          ))
                        }
                     
                    </tbody>
                  </table>
            </div>
            </Root>
          </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelAddProfileITDialog}>
            Close
          </Button>
          {/* <Button onClick={handleOk}>Ok</Button> */}
        </DialogActions>
      </Dialog>
    );
}

function CreateServiceOption(props) {
    
    const { DataTypeCreateDialog, CreateNewOption, DataAllItem, DataAllServiceDetail, onCloseCreateDialog, openCreateDialog, ...other } = props;
  
    const [DataAllItemchecked, setDataAllItemChecked] = useState([]);
    const [DataAllItemcheck, setDataAllItemcheck] = useState([]);

    const [ShowAddItem, setShowAddItem] = useState(false);
    const [ShowSwitchItem, setShowSwitchItem] = useState(false);
    const [SwitchItem, setSwitchItem] = useState("");

    const [DataCreate, setDataCreate] = useState({
        CreateTitle : "",
        CreateWhoAppr :"",
        CreateStatus : false,	
        CreateId_type : ""
    });


    const handleCancelCreateDialog = () => {
        onCloseCreateDialog();
        setShowAddItem(false);
        setShowSwitchItem(false);
        setDataAllItemChecked([]);
        setDataCreate( DataCreate => ( {...DataCreate, ...{
            CreateTitle : "",
            CreateWhoAppr :"",
            CreateStatus : false,	
            CreateId_type : ""
        }} ) );

    };

    const CreateOption = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        CreateNewOption({ 
                            title : data.get('CreateTitle'),
                            whoAppr : data.get('CreateWhoAppr'),
                            status : data.get('CreateStatus') === "on" ? true :false,	
                            id_type : data.get('CreateId_type'),
                            objItems : DataAllItemchecked
                        })

        handleCancelCreateDialog()

    }

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
        setDataAllItemChecked(newChecked);
    };

    // useEffect(() => {
    //     if( DataAllItemchecked.length > 0 ) {
    //         console.log(DataAllItemchecked)
    //     }

    // }, [DataAllItemchecked]);

    const handleOnChangeVC = (event) => {   
        if(event.target.name === "CreateStatus") {
            setDataCreate( DataCreate => ( {...DataCreate, [event.target.name]: event.target.checked} ) );

        } else {
            setDataCreate( DataCreate => ( {...DataCreate, [event.target.name]: event.target.value} ) );

        }

    };

    // useEffect(() => {
    //     console.log(DataCreate)

    // }, [DataCreate]);

    useEffect(() => {
        if( DataTypeCreateDialog.length > 0 ) {
            setDataCreate( DataCreate => ( {...DataCreate, CreateId_type: DataTypeCreateDialog} ) );
        }

    }, [DataTypeCreateDialog]);

    useEffect(() => {
        if( DataAllItem.length > 0 ) {
            setDataAllItemcheck(DataAllItem);
        }

    }, [DataAllItem]);

    return (
        <BootstrapDialog
          onClose={handleCancelCreateDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 450 } }}
          maxWidth="xs"
          open={openCreateDialog}
          {...other}
          component="form"
          onSubmit={CreateOption}

        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelCreateDialog}
            >
                  Create Option
            </BootstrapDialogTitle>
            
            <DialogContent dividers sx={{ overflowY: "overlay" }}>
                <Stack
                    sx={{
                        width: '100%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <>
                        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"right", fontSize: 13}}>
                            option status : 
                            <CSSSwitch 
                                name="CreateStatus" 
                                id="CreateStatus"
                                checked={DataCreate.CreateStatus}
                                onChange={handleOnChangeVC}
                                defaultChecked={false}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                    
                        <CssTextField
                            required
                            id="CreateTitle"
                            label="Title"
                            name="CreateTitle"
                            value={DataCreate.CreateTitle}
                            onChange={handleOnChangeVC}
                            // InputLabelProps={DataEditDialog.length > 0 ? { shrink: true } : { shrink: false } }
                        />

                                                    
                        <FormControl fullWidth>
                            <InputLabel required id="demo-simple-select-label" sx={{ fontSize: 13, textTransform: 'capitalize'}}>Who appr</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="CreateWhoAppr"
                                name="CreateWhoAppr"
                                sx={{ fontSize: 13, textTransform: 'capitalize'}}
                                value={DataCreate.CreateWhoAppr}
                                defaultValue={"manager"}
                                onChange={handleOnChangeVC}
                                label="Mis.Appr"
                                // InputLabelProps={DataEditDialog.length > 0 ? { shrink: true } : { shrink: false } }
                            >
                                <MenuItem value={'manager'}  sx={{ fontSize: 13, textTransform: 'capitalize'}}>Meneger</MenuItem>
                                <MenuItem value={'sr.manager'}  sx={{ fontSize: 13, textTransform: 'capitalize'}}>Sr.Menager</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel required id="demo-simple-select-label" sx={{ fontSize: 13, textTransform: 'capitalize'}}>Service type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="CreateId_type"
                                sx={{ fontFamily: 'Kanit', fontSize: 13, textTransform: 'capitalize'}}
                                onChange={handleOnChangeVC}
                                value={DataCreate.CreateId_type}
                                defaultValue={""}
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
                                // objEdit[0].service_option_items.map((item, index) => (
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
                </Stack>
            </DialogContent>

            <DialogActions>
                <Stack spacing={2} direction="row" sx={{ p: 0.5 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    variant="contained"
                    disabled={DataAllItemchecked.length > 0? false : true}
                    autoFocus
                    type="submit"
                    // onClick={handleCancelCreateDialog}
                  >
                    Submit
                  </Button>
                </Stack>
            </DialogActions>
        </BootstrapDialog>
    );
}


function ManageItems(props) {
    
    const {ItemOption, DelDataItem, UpdateDetailItem, CreateItem, DataAllItem, onCloseManageItemsDialog, openManageItemsDialog, ...other } = props;

    const handleCancelCreateDialog = () => {
        onCloseManageItemsDialog();

    };

    const UpdateItem = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let databuf = [
            {
                id_item:"",
                title:"",
                description:"",
            }
        ];

        for(var value of data.entries()) {

            if(value[0] === "description") {
                databuf.description = value[1]

            } else {
                databuf.id_item = value[0].split("&")[1]
                databuf.title = value[1]
            }

        }

        UpdateDetailItem(databuf);

    }

    const CreateNewItem = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let databuf = [
            {
                title:"",
                description:"",
            }
        ];

        for(var value of data.entries()) {

            if(value[0] === "CreateDescription") {
                databuf.description = value[1]

            } else {
                databuf.title = value[1]
            }

        }

        CreateItem(databuf);
    }

    return (
        <BootstrapDialog
          onClose={handleCancelCreateDialog}
          aria-labelledby="customized-dialog-title"
          sx={{ '& .MuiDialog-paper': { width: '25%', maxHeight: 450 } }}
          maxWidth="xs"
          open={openManageItemsDialog}
          {...other}
        >
            <BootstrapDialogTitle
              sx={{ fontSize: 16, p: 1.5 }}
              id="customized-dialog-title"
              onClose={handleCancelCreateDialog}
            >
                  MANAGE ITEMS
            </BootstrapDialogTitle>
            
            <DialogContent dividers sx={{ overflowY: "overlay" }}>
                <Stack
                    sx={{
                        width: '100%',
                    }}
                    spacing={2}
                    noValidate
                    autoComplete="off"
                >
                    <>
                        <Card>
                            <Accordion  
                                sx={{borderRadius: 0, boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}
                                component="form"
                                onSubmit={CreateNewItem}
                            >
                                <AccordionSummary
                                    expandIcon={<PlaylistAdd fontSize={"13px"} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                        <DialogContentText  sx={{fontFamily: 'Kanit', fontSize: 13, margin:0, textTransform: "capitalize", color:"black"}}>create new item</DialogContentText> 
                                </AccordionSummary>

                                <AccordionDetails>
                                    
                                    <CssTextField
                                        id="CreateTitle"
                                        label="title"
                                        name={"CreateTitle"}
                                        sx={{width:"100%", marginBottom: "15px"}}
                                    />

                                    <CssTextField
                                        id="CreateDescription"
                                        label="Description"
                                        name="CreateDescription"
                                        multiline
                                        sx={{width:"100%"}}
                                        minRows={1}
                                        maxRows={4}
                                    />

                                    {/* <DialogContentText >
                                        
                                    </DialogContentText> */}

                                </AccordionDetails>
                                <Stack direction="row" sx={{ paddingX: "16px", paddingBottom: "16px", display:"flex", alignItems:"center", justifyContent:"right"}}>
                                    <Button
                                        sx={{ fontSize:10 }}
                                        size={"small"}
                                        variant="outlined"
                                        autoFocus
                                        type="submit"
                                    >
                                        create
                                    </Button>
                                </Stack>
                            </Accordion>
                        </Card>

                        <Card>
                            <Card sx={{borderRadius: 0, p: 0, boxShadow: 0}}>
                                <div className="head-config-option txt-cap">
                                    <DialogContentText sx={{fontSize: 13, color: "black"}}>Items</DialogContentText>
                                   
                                </div>
                            </Card>

                            {
                                DataAllItem.map((item, index) => (
                                    <Accordion  
                                        key={ item.id_item }
                                        sx={{borderRadius: 0, boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}
                                        component="form"
                                        onSubmit={UpdateItem}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant="inherit" noWrap sx={{width: "250px", fontFamily: 'Kanit', fontSize: 13, margin:0, textTransform: "capitalize"}}>{ item.title } </Typography>
                                            {/* <DialogContentText  sx={{fontFamily: 'Kanit', fontSize: 13, margin:0, textTransform: "capitalize", color:"black"}}></DialogContentText>  */}
                                        </AccordionSummary>
        
                                        <AccordionDetails>
                                            
                                            <CssTextField
                                                id="outlined-multiline-static"
                                                label="title"
                                                name={"title&" + item.id_item}
                                                sx={{width:"100%", marginBottom: "15px"}}
                                                defaultValue={ item.title !== "" ? item.title : "" }
                                            />

                                            <CssTextField
                                                id="outlined-multiline-static"
                                                label="Description"
                                                name="description"
                                                multiline
                                                sx={{width:"100%"}}
                                                minRows={1}
                                                maxRows={4}
                                                defaultValue={ item.description !== "" ? item.description : "" }
                                            />

                                            {/* <DialogContentText >
                                                
                                            </DialogContentText> */}
        
                                        </AccordionDetails>
                                        <Stack spacing={1} direction="row" sx={{ paddingX: "16px", paddingBottom: "16px", display:"flex", alignItems:"center", justifyContent:"right"}}>
                                           
                                            <IconButton  aria-label="add field" component="span"  size="small"
                                                disabled={ ItemOption.findIndex(object => { return object.id_item === item.id_item }) !== -1 }
                                                onClick={ () => DelDataItem( { id_item: item.id_item, title: item.title} )}
                                            >
                                                <Delete fontSize="inherit"/>
                                            </IconButton>

                                            <Button
                                                sx={{ fontSize:10 }}
                                                size={"small"}
                                                variant="outlined"
                                                autoFocus
                                                type="submit"
                                            >
                                                save
                                            </Button>
                                        </Stack>
                                    </Accordion>
                                ))
                            }
                        </Card>
                    </>
                </Stack>
            </DialogContent>

            {/* <DialogActions 
                sx={{ p: 0.5 }}
            >
                <Stack spacing={2} direction="row" sx={{ p: 0.5, }}>
                  <Button
                    sx={{ p: 0.5, fontSize: 13 }}
                    variant="contained"
                    autoFocus
                    onClick={handleCancelCreateDialog}
                  >
                    save
                  </Button>
                </Stack>
            </DialogActions> */}

        </BootstrapDialog>
    );
}

const CSSSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-switchBase': {
        color: "#fc1e4e",
        '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase+ .MuiSwitch-track': {
        backgroundColor: "#fc1e4e",
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: "#00e253",
        '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: "#00e253",
    },
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
}));

// function not(a, b) {
//     return a.filter((value) => b.indexOf(value) === -1);
// }

// function intersection(a, b) {
//     return a.filter((value) => b.indexOf(value) !== -1);
// }

function Progress(props) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
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
                    color: (theme) => (theme.palette.mode === 'light' ? 'rgb(201, 201, 201)' : 'rgb(201, 201, 201)'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                    },
                }}
                size={30}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
}

const Generate = () => {

    const [msg, setMsg] = useState("");

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    // const [expanded, setExpanded] = useState(false);

    // const handleChange = (panel) => (event, isExpanded) => {
    //   setExpanded(isExpanded ? panel : false);
    // };

    // const [Appr, setAppr] = useState('');

    const [DataAllServiceDetail, setDataAllServiceDetail] = useState([]);
    const [DataServiceDetail, setDataServiceDetail] = useState([]);

    const [DataOptions, setDataOptions] = useState([]);
    const [DataServiceNOOption, setDataServiceNOOption] = useState([]);

    const [DataAllItem, setDataAllItem] = useState([]);
    const [Oldid, setOldid] = useState("x-0");
    const [OldidItem, setOldidItem] = useState("x-0");
    const [OldidSType, setOldidSType] = useState("x-0");

    const [ItemOption, setItemOption] = useState([]);

    let CurrentID = Oldid;
    let CurrentIDItem = OldidItem;
    let CurrentIDSType = OldidSType;

    ////////////////////////////////////////////////////

    const [Erp_prom, setErp_prom] = useState([]);



    useEffect(() => {
        if(DataServiceDetail.length > 0 && DataOptions.length > 0) {
            const newService = [...DataServiceNOOption];   

            for(let i=0; i < DataServiceDetail.length; i++) {
                if( (DataOptions.findIndex(object => { return object.id_type === DataServiceDetail[i].id_type }) === -1) && (DataServiceNOOption.findIndex(object => { return object.id_type === DataServiceDetail[i].id_type }) === -1 ) ) {
                    newService.push({id_type: DataServiceDetail[i].id_type, title: DataServiceDetail[i].title})

                } else if( ( DataOptions.findIndex(object => { return object.id_type === DataServiceDetail[i].id_type }) !== -1 ) && ( DataServiceNOOption.findIndex(object => { return object.id_type === DataServiceDetail[i].id_type }) !== -1 ) ) {
                    newService.splice( DataServiceNOOption.findIndex(object => { return object.id_type === DataServiceDetail[i].id_type }), 1 );
                
                } else {
                    for(let u=0; u < DataServiceNOOption.length; u++) {
                        if(DataServiceDetail.findIndex(object => { return object.id_type === DataServiceNOOption[u].id_type }) === -1) {
                            newService.splice( u , 1 );

                        }
                    }
                
                } 
            }

            setDataServiceNOOption(newService);
        }

    }, [DataServiceDetail, DataOptions]);

    const getOptionItems = async() => {
        try {
            await axios.get('http://localhost:5000/getOptionItems').then((res) => {  
                setItemOption(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const GetServiceType = async() => {
        
        try {
  
            await axios.get('http://localhost:5000/getServiceType').then((res) => {  
                setDataServiceDetail(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const GetServiceOption = async() => {
        try {
  
            await axios.get('http://localhost:5000/getServiceOption').then((res) => {  
                setDataOptions(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const GetDataAllServiceDetail = async() => {
        try {
  
            await axios.get('http://localhost:5000/getDataAllServiceDetail').then((res) => {  
                setDataAllServiceDetail(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }

    const LastOption = async (e) => {
        try {
          await axios.get('http://localhost:5000/LastOption', { }).then((res) => {  
            setOldid(res.data[0].id_option); 

          })
        } catch (error) {
          console.log(error);
        }
    }

    const LastItem = async (e) => {
        try {
          await axios.get('http://localhost:5000/LastItem', { }).then((res) => {  
            setOldidItem(res.data[0].id_item); 

          })
        } catch (error) {
          console.log(error);
        }
    }

    const LastServiceType = async (e) => {
        try {
          await axios.get('http://localhost:5000/LastS_type', { }).then((res) => {  
            setOldidSType(res.data[0].id_type); 

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

    /////////////////////////////////////////////////////////////////

    const GetAllerp_prom = async() => {
        try {
            await axios.get('http://localhost:5000/getAllerp_prom').then((res) => {  
                setErp_prom(res.data);
            })
  
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        GetDataAllServiceDetail();
        GetServiceType();
        GetAllerp_prom();
        GetServiceOption();
        getOptionItems();
        GetAllItem();
        LastServiceType();
        LastOption();
        LastItem();
    }, []);

    useEffect(() => {
        const letters = Array.from(document.querySelectorAll('.nav-link'))
        letters.forEach((letter) => {
            let timerId;
            letter.addEventListener('mousedown', (e) => {
            clearTimeout(timerId);
            const ripple = e.target.querySelector('.ripple-nav')
            const size = letter.offsetWidth;
            const pos = letter.getBoundingClientRect();
            const x = e.pageX - pos.left - size;
            const y = e.pageY - pos.top - size;
            ripple.style = 'top:' + y + 'px; left:' + x + 'px; width: ' + size * 2 + 'px; height: ' + size * 2 + 'px;';
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


    const [openDialog, setOpenDialog] = useState(false);
    const [DialogFuncOn, setDialogFuncOn] = useState("");
    const [DataDialog, setDataDialog] = useState([]);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [DataEditDialog, setDataEditDialog] = useState([]);

    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [DataTypeCreateDialog, setDataTypeCreateDialog] = useState([]);

    const [openManageItemsDialog, setOpenManageItemsDialog] = useState(false);

    const [openCreateServiceDialog, setOpenCreateServiceDialog] = useState(false);

    const [openAddProfileITDialog, setOpenAddProfileITDialog] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////
    const handleClickListItemDialog = (e, func) => {
      setOpenDialog(true);
      setDialogFuncOn(func)
      setDataDialog(e)
    };

    const handleCloseDialog = (newValue) => {
        setOpenDialog(false);
    };
    /////////////////////////////////////////////////////////////////////////////////
    
    /////////////////////////////////////////////////////////////////////////////////
    const handleEditDialog = (e) => {
        setDataEditDialog(e);
        setMsg('');
        // setOpenEditDialog(true);
    };
  
    const handleCloseEditDialog = (newValue) => {
        setOpenEditDialog(false);
    };

    useEffect(() => {
        if( DataEditDialog.length > 0 ) {
            // console.log(DataEditDialog)
            setOpenEditDialog(true);
        }

    }, [DataEditDialog]);
    /////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////
    const handleCreateDialog = (e) => {
        setOpenCreateDialog(true);
        setDataTypeCreateDialog(e);
        setMsg('');

    };
  
    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };
    /////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////
    const handleManageItemsDialog = (e) => {
        setOpenManageItemsDialog(true);
        setMsg('');

    };
    
    const handleCloseManageItemsDialog = () => {
        setOpenManageItemsDialog(false);
    };
    /////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////
    const handleCreateServiceDialog = () => {
        
        setOpenCreateServiceDialog(true);
        setMsg('');
    };
    
    const handleCloseCreateServiceDialog = () => {
        setOpenCreateServiceDialog(false);
    };
    /////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////
    const handleAddProfileITDDialog = () => {
        setOpenAddProfileITDialog(true);
        setMsg('');

    };
    
    const handleCloseAddProfileITDialog = () => {
        setOpenAddProfileITDialog(false);
    };
    /////////////////////////////////////////////////////////////////////////////////

    const [checked, setChecked] = useState([]);
    const [OptionCheck, setOptionCheck] = useState([]);

    const [StatusCheckOBJ, setStatusCheckOBJ] = useState([]);
    const [checkedSwitchOBJ, setCheckedSwitchOBJ] = useState([]);

    const [WhoApprCheckOBJ, setWhoApprCheckOBJ] = useState([]);
    const [checkedWhoApprOBJ, setCheckedWhoApprOBJ] = useState([]);

    if(false) {
        setOptionCheck([])
    }

    useEffect(() => {
        if( DataAllServiceDetail.length > 0 ) {
            console.log("save !!!!")
            setCheckedSwitchOBJ([])
            setCheckedWhoApprOBJ([])
        }

    }, [DataAllServiceDetail]);
    // const optionChecked = intersection(checked, OptionCheck);
    // let statusCheck = intersection(checkedSwitch, StatusCheck);
    // let whoApprCheck = intersection(checkedWhoAppr, WhoApprCheck);

    const handleToggle = (value) => () => {
        const currentIndex = checked.findIndex(object => { return object.id_option === value.id_option })
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push({id_option: value.id_option, title: value.title})
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleToggleWhoApprOBJ = (value) => () => {
        if(WhoApprCheckOBJ.findIndex(object => { return object.id_option === value.id_option })  === -1) {
            const newValue = [...WhoApprCheckOBJ]; 
            newValue.push({id_option: value.id_option, whoAppr: value.whoAppr})
            setWhoApprCheckOBJ(newValue);
        }
        const currentIndex = checkedWhoApprOBJ.findIndex(object => { return object.id_option === value.id_option })
        const newChecked = [...checkedWhoApprOBJ];

        if (currentIndex === -1) {
            newChecked.push({id_option: value.id_option, whoAppr: value.whoAppr})
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedWhoApprOBJ(newChecked);
    };
  
    const handleToggleStatusOBJ = (value) => () => {
        if(StatusCheckOBJ.findIndex(object => { return object.id_option === value.id_option })  === -1) {
            const newValue = [...StatusCheckOBJ]; 
            newValue.push({id_option: value.id_option, status: value.status})
            setStatusCheckOBJ(newValue);
        }
        const currentIndex = checkedSwitchOBJ.findIndex(object => { return object.id_option === value.id_option }) 
        const newChecked = [...checkedSwitchOBJ];

        if (currentIndex === -1) {
            newChecked.push({id_option: value.id_option, status: value.status})
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedSwitchOBJ(newChecked);
    };

    // const handleToggleAll = (items) => () => {
    //   if (numberOfChecked(items) === items.length) {
    //     setChecked(not(checked, items));
    //   } else {
    //     setChecked(union(checked, items));
    //   }
    // };

    
    const NewID = (e, mode) => {
        let id_index = parseInt(e.split("-")[1])
        let new_id = ""
        let CreateId = localStorage.getItem('id_emp_login') + "-"
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

        if(mode === "option") {
            CurrentID = new_id;

        } else if(mode === "item") {
            CurrentIDItem = new_id;

        } else {
            CurrentIDSType = new_id;

        }

        return new_id
      
    }
    
    const CreateNewOption = async (e) => {

        try {
          await axios.post('http://localhost:5000/CreateServiceOption', {
            id_option : NewID(CurrentID, "option"),
            title : e.title,
            whoAppr : e.whoAppr,
            status : e.status,	
            id_type : e.id_type,
            objItems : e.objItems

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

    const UpdateDetailItem = async (e) => {

        try {
          await axios.post('http://localhost:5000/UpdateDetailItem', {
            id_item : e.id_item,
            title : e.title,
            description : e.description,

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

    const DelDataItem = async (e) => {

        try {
          await axios.post('http://localhost:5000/DelDataItem', {
            id_item : e.id_item,
            title : e.title

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

        
    const CreateNewService = async (e) => {

        try {
          await axios.post('http://localhost:5000/CreateNewServiceType', {
            id_type : NewID(CurrentIDSType, "service"),
            title : e.title

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

    
    const AddErp_prom = async (e) => {

        try {
          await axios.post('http://localhost:5000/AddErp_prom', {
            id_profile : e.id_profile,
            id_it : "IT"+e.id_it,
            it_name : e.it_name

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

    const CreateItem = async (e) => {

        try {
          await axios.post('http://localhost:5000/CreateItem', {
            id_item : NewID(CurrentIDItem, "item"),
            title : e.title,
            description : e.description,
            input_type : "text"

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

    const RemoveNewServiceType = async (e) => {

        try {
          await axios.post('http://localhost:5000/RemoveNewServiceType', {
            id_type :e.id_type,
            title : e.title

          }).then(res => {  
            setMsg(res.data.msg);
            
          })

        } catch (error) {
          console.log(error);
        }

    }

    const RemoveOption = async (eID, eTitle, FuncOn) => {

        if ( FuncOn === "del-one" ) {

            const newChecked = [...checked];

            if (checked.findIndex(object => { return object.id_option === eID }) !== -1) {
                newChecked.splice( checked.findIndex(object => { return object.id_option === eID }), 1 );
            }
    
            setChecked(newChecked);
            
            try {
    
              await axios.post('http://localhost:5000/RemoveServiceOption', {
                id_option: eID,
                title: eTitle
    
              }).then(res => {  
                setMsg(res.data.msg);
                
              })
    
            } catch (error) {
              console.log(error);
            }

        } else {
            
            for( let i=0; i < checked.length; i++ ) {

                try {
    
                    await axios.post('http://localhost:5000/RemoveServiceOption', {
                      id_option: checked[i].id_option,
                      title: checked[i].title
          
                    }).then(res => {  
                      setMsg(res.data.msg);
                      
                    })
                    
                  } catch (error) {
                    console.log(error);
                  }
            }
    
            setChecked([]);

        }

        
    }


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();
  
    const buttonSx = {
        fontSize: 10,

      ...(success && {
        // bgcolor: "#04e356",
        color: "#04e356",
        // borderColor: "#04e356",
        // "&:hover": {
        //   color: "white",
        //   bgcolor: "#04d852",
        //   borderColor: "#04d852",
        // }
      })
    };

    useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    
    // const handleSubmit = async() => {
    //     setState({ state, ...{ open: true,vertical: "top", horizontal: "center"} });
    //     await sleep(1e4);
    //     handleClose();
    // };

    useEffect(() => {
        const handleSubmit = async() => {
            setState(state => ({ state, ...{ open: true,vertical: "top", horizontal: "center"} }));
            await sleep(1e4);
            setState(state => ({ ...state, open: false }));

        };

        if( msg === "Edit sucsess" ) {
            handleSubmit();
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);     
            }, 1000);
    
            timer.current = window.setTimeout(() => {
                setSuccess(false);
                setLoading(false);
                GetDataAllServiceDetail();
 
            }, 2000);
            //}, 3500);

        } else if(msg.split(" ")[0] === "Add") {
            handleSubmit();
            GetAllerp_prom();

        } else if( ( msg.split(" ")[0] === "Remove" ) &&  ( msg.split(" ")[1] === "item" ) ) {
            handleSubmit();
            
            GetAllItem();
            GetServiceType();
            GetServiceOption();

        } else if( ( msg.split(" ")[0] === "Create" ) &&  ( msg.split(" ")[1] === "service" ) ) {
            handleSubmit();

            GetServiceType();
            GetServiceOption();
            GetDataAllServiceDetail();

        } else if( msg.split(" ")[0] === "Create" || msg.split(" ")[0] === "Remove" ||  msg.split(" ")[0] === "Update") {
            handleSubmit();
            console.log("5555555555555555")
            GetServiceType();
            GetServiceOption();
            GetDataAllServiceDetail();

        } else {
            return
        }
        
    }, [msg]);

    const UpdateDataService = async (e) => {
        // e.preventDefault();  

        // console.log(e.status)
        // console.log(e.whoAppr)

        try {
            await axios.post('http://localhost:5000/UpdateDataServiceDetail', {
                status: e.status , 
                whoAppr: e.whoAppr
            }).then((res) => {  
                setMsg(res.data.msg);

            })
        } catch (error) {
          console.log(error);
        }
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
                whoAppr: e.objEdit[0].whoAppr, 
                id_type: e.objEdit[0].id_type, 

                objItems: e.objItems,
                delItems: e.delItems, 

            }).then((res) => {  
                setMsg(res.data.msg);

            });

        } catch (error) {
            console.log(error);
        }
    }


    const handleCheckedSend = () => {
        setMsg('');

        if(checkedSwitchOBJ.length <= 0 && checkedWhoApprOBJ.length <= 0) {
            console.log("config not Change !!")

        } else {

            UpdateDataService({ status:checkedSwitchOBJ, whoAppr:checkedWhoApprOBJ });

            if (!loading) {
                setSuccess(false);
                setLoading(true);
            }
        }
        // setLeft(not(left, leftChecked));
        
    };   

    
    // const handleCheckedSend2 = () => {
    //     if (!loading2) {
    //         setSuccess2(false);
    //         setLoading2(true);

    //         timer.current = window.setTimeout(() => {
    //             setSuccess2(true);
    //             setLoading2(false);     
    //         }, 2000);

    //         timer.current = window.setTimeout(() => {
    //             setSuccess2(false);
    //             setLoading2(false);
 
    //         }, 4000);
    //     }
        
    // };   

    const UpdateErp_prom = async (e) => {
        try {
            await axios.post('http://localhost:5000/UpdateErp_prom', {
                id_it: e.target.name.split("&")[0] , 
                value: e.target.checked,
                update: e.target.name.split("&")[1]
            })
            
        } catch (error) {
          console.log(error);
        }
    }

    const [rows, setRows] = useState(Erp_prom);

    useEffect(() => {
        setRows(Erp_prom)
    }, [Erp_prom]);

    const onSearch = value => {
        const filteredRows = Erp_prom.filter((row) => {
            const rowcolumm = row.id_it
            return rowcolumm.toLowerCase().includes(value.toLowerCase());
        });

        setRows(filteredRows);
    } 

    return (
        <div className="layout-component m_r">
            <ConfirmationDialogRaw
                id="ringtone-menu"
                keepMounted
                funcOn={DialogFuncOn}
                openDialog={openDialog}
                onCloseDialog={handleCloseDialog}
                DataDialog={DataDialog}
                RemoveOption={(eID, eTitle, FuncOn) => RemoveOption(eID, eTitle, FuncOn)}
                RemoveNewServiceType={(e) => RemoveNewServiceType(e)}

            />

            <UpdateDetailServiceOption
                id="ringtone-menu"
                keepMounted
                openEditDialog={openEditDialog}
                onCloseEditDialog={handleCloseEditDialog}
                DataEditDialog={DataEditDialog}
                DataAllServiceDetail={DataServiceDetail}
                DataAllItem={DataAllItem}
                UpdateAllDetailServiceOption={(e) => UpdateAllDetailServiceOption(e)}
            />

            <CreateServiceOption
                id="ringtone-menu"
                keepMounted
                openCreateDialog={openCreateDialog}
                onCloseCreateDialog={handleCloseCreateDialog}
                DataAllServiceDetail={DataServiceDetail}
                DataAllItem={DataAllItem}
                DataTypeCreateDialog={DataTypeCreateDialog}
                CreateNewOption={(e) => CreateNewOption(e)}
            />

            <ManageItems
                id="ringtone-menu"
                keepMounted
                openManageItemsDialog={openManageItemsDialog}
                onCloseManageItemsDialog={handleCloseManageItemsDialog}
                DataAllItem={DataAllItem}
                ItemOption={ItemOption}
                UpdateDetailItem={(e) => UpdateDetailItem(e)}
                CreateItem={(e) => CreateItem(e)}
                DelDataItem={(e) => DelDataItem(e)}
            />

            <AddProfileIT
                id="ringtone-menu"
                keepMounted
                openAddProfileITDialog={openAddProfileITDialog}
                onCloseAddProfileITDialog={handleCloseAddProfileITDialog}
                AddErp_prom={(e) => AddErp_prom(e)}
                DataErp={Erp_prom}

            />

            <CreateService
                id="ringtone-menu"
                keepMounted
                openCreateServiceDialog={openCreateServiceDialog}
                onCloseCreateServiceDialog={handleCloseCreateServiceDialog}
                CreateNewService={(e) => CreateNewService(e)}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={msg}
                key={vertical + horizontal}
            />

            <h2 className="page-header">
                { "service & config".toUpperCase() }
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card-g  dataEmp-min-h">
                    {
                        <Col lg={ 8 } className="del-p-g">
                                <UncontrolledTabs initialActiveTabId="overview" >
                                    <div className="box-nav">
                                        <Nav pills className="search-n"></Nav>
                                        <Nav pills id="box1">
                                            <NavItem className="nav-tab">
                                                <UncontrolledTabs.NavLink tabId="overview" className="btn letter active-item">
                                                   service
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink>
                                            
                                                <UncontrolledTabs.NavLink tabId="promission" className="btn letter"> 
                                                    permission
                                                    <div className="ripple-nav"></div>
                                                </UncontrolledTabs.NavLink>

                                                <div className="animation start-home"></div>

                                            </NavItem>
                                        </Nav>
                                    </div>
                                    { /* END Pills Nav */}
                                    <UncontrolledTabs.TabContent>

                                        <TabPane tabId="overview" id="Overview" className="content-config-box">  
                                            <div className="btn-save-config">
                                                {/* <Button variant="outlined"  size="small"  onClick={handleCheckedSend} startIcon={<SaveIcon />}>
                                                    save
                                                </Button> */}
                                                <Stack spacing={1} direction="row">
                                                    <Button
                                                            variant="outlined"
                                                            size="small"
                                                            sx={ { fontSize: 10 } }
                                                            onClick={handleManageItemsDialog}
                                                            endIcon={<FormatListBulleted  size="small" />}
                                                        >
                                                            manage item 
                                                    </Button>
                                                    <Button
                                                            variant="outlined"
                                                            size="small"
                                                            sx={ { fontSize: 10 } }
                                                            onClick={handleCreateServiceDialog}
                                                            endIcon={<PlaylistAdd  size="small" />}
                                                        >
                                                            create service
                                                    </Button>
                                                </Stack>
                                                
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                  
                                                    <Box sx={{ position: "relative" }}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            sx={buttonSx}
                                                            disabled={ checkedSwitchOBJ.length <= 0 && checkedWhoApprOBJ.length <= 0 ? true : loading }
                                                            onClick={handleCheckedSend}
                                                            startIcon={success ? <Check  size="medium"/> : <Save  size="small" />}
                                                        >
                                                            save
                                                        </Button>
                                                        {
                                                             loading && (
                                                                <CircularProgress
                                                                    size={18}
                                                                    sx={{
                                                                        color:"#04d852",
                                                                        position: "absolute",
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        marginTop: "-9px",
                                                                        marginLeft: "-9px"
                                                                    }}
                                                                />
                                                            )
                                                        }
                                                    </Box>
                                                </Box>
                                            </div>                              
                                            <div className="content-config">
                                                {
                                                    DataAllServiceDetail.length === 0 ?  <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent:"center" }}> <Progress /> </Box> :  
                                                    DataAllServiceDetail.map((item, index) => (
                                                        // <Accordion expanded={expanded === "panel"+index} key={"panel"+index} onChange={ handleChange("panel"+index) } sx={{boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}>
                                                        <Accordion key={"panel"+index} sx={{boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMore />}
                                                                aria-controls={"panel"+index+"bh-content"}
                                                                id={"panel"+index+"bh-header"}
                                                            >
                                                         
                                                            <Typography sx={{ flexShrink: 0, }} className="txt-cap">
                                                                service title : &nbsp; &nbsp; {item.title}
                                                            </Typography>
                    
                                                            {/* <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography> */}
                                                    
                                                            </AccordionSummary>
                                                            
                                                            <AccordionDetails>
                                                                <Typography>
                                                                    <Card>
                                                                        <div className="head-config-option txt-cap">
                                                                            <div>service option</div> 
                                                                            <div>
                                                                                {/* // color="primary" */}
                                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                                    onClick={ () => handleCreateDialog(item.id_type) }
                                                                                >
                                                                                    <PlaylistAdd color={ "primary" } fontSize="inherit"/>
                                                                                </IconButton>
                                                                                
                                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                                        onClick = { () => handleClickListItemDialog(checked, "del-all") }
                                                                                        disabled = { checked.length <= 0 }
                                                                                    >
                                                                                        <DeleteSweepSharp fontSize="inherit"/>
                                                                                </IconButton>
                                                                            </div>
                                                                        </div>
                                                                        <Divider />
                                                                        <List
                                                                            sx={{
                                                                                // width: 200,
                                                                                // height: 230,
                                                                                bgcolor: 'background.paper',
                                                                                overflow: 'auto',
                                                                            }}
                                                                            dense
                                                                            component="div"
                                                                            role="list"
                                                                        >
                                                                            {/* {
                                                                                true ?
                                                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                                        <form className="FormCreateOption" onSubmit={handleSubmitCreateOption}    >
                                                                                            <div className="btn-FormCreateOption">
                                                                                                <Button
                                                                                                    type="submit" 
                                                                                                    sx={{ mr: 1 }}
                                                                                                >
                                                                                                    Submit
                                                                                                </Button>
                                                                                            </div>
                                                                                        </form>
                                                                                         <CssTextField
                                                                                            required
                                                                                            id="outlined-required"
                                                                                            label="Title"
                                                                                            name="title"
                                                                                        />
                                                                                    </Box>
                                                                                :
                                                                                    null

                                                                            } */}

                                                                            <table className="table-non-style">
                                                                                <thead> <tr> <td></td> <td></td> </tr> </thead>
                                                                                <tbody>
                                                                                    {
                                                                                            item.service_options.map((item_option) => {
                                                                                                const labelId = `transfer-list-all-item-${item_option.id_option}-label`;
                                                                                                // checkedWhoApprOBJ[item_option.id_option] = false
                                                                                                if( OptionCheck.indexOf(item_option.id_option) === -1 )  
                                                                                                {  
                                                                                                    OptionCheck.push(item_option.id_option) 
                                                                                                }  

                                                                                                // if( WhoApprCheckOBJ.findIndex(object => { return object.id_option === item_option.id_option }) === -1  )  
                                                                                                // {  
                                                                                                //     WhoApprCheckOBJ.push({id_option: item_option.id_option, whoAppr: item_option.whoAppr})
                                                                                                // }  
                                                                                                

                                                                                                if( StatusCheckOBJ.findIndex(object => { return object.id_option === item_option.id_option }) === -1 && item_option.status === true )  
                                                                                                {  
                                                                                                    StatusCheckOBJ.push({id_option: item_option.id_option, status: item_option.status})
                                                                                                }  

                                                                                                if( WhoApprCheckOBJ.findIndex(object => { return object.id_option === item_option.id_option })  === -1 && item_option.whoAppr === "manager" )  
                                                                                                {  
                                                                                                    WhoApprCheckOBJ.push({id_option: item_option.id_option, whoAppr: item_option.whoAppr})
                                                                                                }  

                                                                                                const label = { inputProps: { 'aria-label': 'Switch demo' } };

                                                                                                return (
                                                                                                    <tr role="listitem" key={item_option.id_option} >
                                                                                                        {/* <ListItem
                                                                                                            key={item_option.id_option}
                                                                                                            role="listitem"
                                                                                                            button
                                                                                                            // onClick={handleToggle(item_option.id_option)}
                                                                                                            disableRipple
                                                                                                        > */}
                                                                                                        <td className="col_txt title-td">
                                                                                                            <ListItemIcon>   
                                                                                                                <Checkbox
                                                                                                                    // checked={checked.findIndex(object => { return object.id_option === item_option.id_option }) !== -1}
                                                                                                                    onClick={handleToggle({id_option:item_option.id_option, title:item_option.title})}
                                                                                                                    tabIndex={-1}
                                                                                                                    disableRipple
                                                                                                                    size={'small'}
                                                                                                                    inputProps={{
                                                                                                                        'aria-labelledby': labelId,
                                                                                                                    }}
                                                                                                                />
                                                                                                            </ListItemIcon>
                                                                                                            <ListItemText  id={labelId} primary={item_option.title} />
                                                                                                        </td>
                                                                                                
                                                                                                        <td className="col_txt title-td-edit newStyle-td">
                                                                                                            {/* <Stack  direction="row" alignItems="center" spacing={2}> */}
                                                                                                                <FormControl variant="standard" sx={{ minWidth: 100, fontSize: 10 }}>
                                                                                                                    {/* <InputLabel id="demo-simple-select-standard-label" sx={{fontSize: 10 }}>Mis.Appr</InputLabel> */}
                                                                                                                    <Select
                                                                                                                        labelId="demo-simple-select-standard-label"
                                                                                                                        id="demo-simple-select-standard"
                                                                                                                        // value={WhoApprCheckOBJ.findIndex(object => { return object.id_option === item_option.id_option }) !== -1? item_option.whoAppr === "manager"? checkedWhoApprOBJ.findIndex(object => { return object.id_option === item_option.id_option }) === -1? "manager" : "sr.manager" :  checkedWhoApprOBJ.findIndex(object => { return object.id_option === item_option.id_option }) !== -1? "manager" : "sr.manager" : item_option.whoAppr}
                                                                                                                        defaultValue={item_option.whoAppr}
                                                                                                                        onChange={handleToggleWhoApprOBJ({id_option: item_option.id_option, whoAppr: item_option.whoAppr})}
                                                                                                                        label="Mis.Appr"
                                                                                                                        sx={{fontSize: 10, textTransform: 'capitalize' }}
                                                                                                                    >
                                                                                                                        <MenuItem value=""> <em> </em> </MenuItem>
                                                                                                                        <MenuItem value={'manager'}  sx={{fontSize: 10, textTransform: 'capitalize' }}>Meneger</MenuItem>
                                                                                                                        <MenuItem value={'sr.manager'} sx={{fontSize: 10, textTransform: 'capitalize' }}>Sr.Menager</MenuItem>
                                                                                                                    </Select>
                                                                                                                </FormControl>
                                                                                                        </td>

                                                                                                        <td className="col_txt newStyle-td">
                                                                                                            <CSSSwitch {...label} 
                                                                                                                defaultChecked={item_option.status}
                                                                                                                // checked={StatusCheckOBJ.findIndex(object => { return object.id_option === item_option.id_option }) !== -1? item_option.status? checkedSwitchOBJ.findIndex(object => { return object.id_option === item_option.id_option }) === -1 : checkedSwitchOBJ.findIndex(object => { return object.id_option === item_option.id_option }) !== -1 : item_option.status} 
                                                                                                                onClick={handleToggleStatusOBJ({id_option: item_option.id_option, status: item_option.status})}
                                                                                                            />
                                                                                                        </td>

                                                                                                        {/* <td className="col_txt newStyle-td">
                                                                                                            <CSSSwitch {...label} checked={StatusCheck.indexOf(item_option.id_option) !== -1? item_option.status? checkedSwitch.indexOf(item_option.id_option) === -1 :  checkedSwitch.indexOf(item_option.id_option) !== -1 : item_option.status} onClick={handleToggleSwitch(item_option.id_option)} />
                                                                                                        </td>   */}

                                                                                                        <td className="col_txt newStyle-td">

                                                                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                                                                    onClick={ () => handleEditDialog([item_option]) }
                                                                                                                >
                                                                                                                        <Create fontSize="inherit"/>
                                                                                                                </IconButton>
                                                                                                        </td> 
                                                                                                        <td className="col_txt newStyle-td">

                                                                                                                <IconButton  aria-label="add field" component="span"  size="small"
                                                                                                                    // onClick = { () => RemoveOption(item_option.id_option, item_option.title) }
                                                                                                                    onClick={ () => handleClickListItemDialog( { id:item_option.id_option, title:item_option.title }, "del-one" )}
                                                                                                                >
                                                                                                                        <Delete fontSize="inherit"/>
                                                                                                                </IconButton>
                                                                                                            {/* </Stack> */}
                                                                                                        </td>
                                                                                                        {/* </ListItem> */}
                                                                                                    </tr>
                                                                                                );
                                                                                            })
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                            <ListItem />
                                                                        </List>
                                                                    </Card>

                                                                </Typography>
                                                            </AccordionDetails> 
                                                        </Accordion>
                                                    ))
                                                }

                                                {
                                                    DataServiceNOOption.map((item, index) => (
                                                              // <Accordion expanded={expanded === "panel"+index} key={"panel"+index} onChange={ handleChange("panel"+index) } sx={{boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}>
                                                              <Accordion key={"panel"+index} sx={{boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}>
                                                              <AccordionSummary
                                                                  expandIcon={<ExpandMore />}
                                                                  aria-controls={"panel"+index+"bh-content"}
                                                                  id={"panel"+index+"bh-header"}
                                                              >
                                                           
                                                              <Typography sx={{ flexShrink: 0, }} className="txt-cap">
                                                                  service title : &nbsp; &nbsp; {item.title}
                                                              </Typography>
                      
                                                              {/* <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography> */}
                                                      
                                                              </AccordionSummary>
                                                              
                                                              <AccordionDetails>
                                                                  <Typography>
                                                                      <Card>
                                                                            <div className="head-config-option txt-cap">
                                                                              <div>service option</div> 
                                                                              <div>
                                                                                  {/* // color="primary" */}
                                                                                  <IconButton  aria-label="add field" component="span"  size="small"
                                                                                      onClick={ () => handleCreateDialog(item.id_type) }
                                                                                  >
                                                                                      <PlaylistAdd color={ "primary" } fontSize="inherit"/>
                                                                                  </IconButton>
                                                                                  
                                                                                  <IconButton  aria-label="add field" component="span"  size="small"
                                                                                          onClick = { () => handleClickListItemDialog(checked, "del-all") }
                                                                                          disabled = { checked.length <= 0 }
                                                                                      >
                                                                                          <DeleteSweepSharp fontSize="inherit"/>
                                                                                  </IconButton>
                                                                              </div>
                                                                            </div>

                                                                            <Divider />

                                                                            <List
                                                                              sx={{
                                                                                  // width: 200,
                                                                                  // height: 230,
                                                                                  bgcolor: 'background.paper',
                                                                                  overflow: 'auto',
                                                                              }}
                                                                              dense
                                                                              component="div"
                                                                              role="list"
                                                                            >
                                                                             
                                                                            
                                                                           </List>
                                                                      </Card>

                                                                      <Stack spacing={1} direction="row" sx={{ paddingY: "16px", display:"flex", alignItems:"center", justifyContent:"right"}}>
                                                                            <Button
                                                                                sx={{ fontSize:10 }}
                                                                                size={"small"}
                                                                                variant="outlined"
                                                                                autoFocus
                                                                                onClick={() => handleClickListItemDialog( {id_type: item.id_type, title: item.title}, "del-Service" )}
                                                                            >
                                                                                remove
                                                                            </Button>

                                                                        </Stack>

                                                                  </Typography>
                                                              </AccordionDetails> 
                                                          </Accordion>
                                                    ))

                                                }
                                            </div>
                                         
                                        </TabPane>
                                       
                                        <TabPane tabId="promission" id="Promission" className="content-config-box">
                                            
                                            {/* <div className="btn-save-config">
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <Box sx={{ position: "relative" }}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            sx={buttonSx2}
                                                            disabled={loading2}
                                                            onClick={handleCheckedSend2}
                                                            startIcon={success2 ? <CheckIcon  size="medium"/> : <SaveIcon  size="small" />}
                                                        >
                                                            save
                                                        </Button>
                                                        {
                                                             loading2 && (
                                                                <CircularProgress
                                                                    size={18}
                                                                    sx={{
                                                                        color:"#04d852",
                                                                        position: "absolute",
                                                                        top: "50%",
                                                                        left: "50%",
                                                                        marginTop: "-9px",
                                                                        marginLeft: "-9px"
                                                                    }}
                                                                />
                                                            )
                                                        }
                                                    </Box>
                                                </Box>
                                            </div>                               */}
                                            <div className="content-config">
                                                <Card
                                                    sx={{margin: "5px", boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}
                                                >
                                                    <div className="head-config-option txt-cap">
                                                        <div>manage promission</div> 
                                                        <div>
                                                            {/* // color="primary" */}
                                                            <IconButton  aria-label="add field" component="span"  size="small"
                                                                onClick={() => handleAddProfileITDDialog()}
                                                            >
                                                                <PlaylistAdd color={ "primary" } fontSize="inherit"/>
                                                            </IconButton>
                                                        </div>
                                                    </div>

                                                    <Divider />
                                                    
                                                    <Paper component="form" sx={{ boxShadow: 0, mb:1, p: '1px 4px', display: 'flex', alignItems: 'center', width: "100%" }}>
                                                        {/* <IconButton sx={{ p: '5px' }} aria-label="menu"> <MenuIcon sx={{ fontSize: '1.3rem' }} /> </IconButton> */}
                                                        <InputBase sx={{ ml: 1, flex: 1,px:0,fontSize: '0.75rem' }} onChange={ (e) => { onSearch(e.target.value) } } placeholder="Search IT ID" inputProps={{ 'aria-label': 'search google maps' }} />
                                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                                        <IconButton sx={{ p: '10px' }} aria-label="search"> <Search sx={{ fontSize: '1.3rem' }} /> </IconButton>
                                                    </Paper>

                                                    <Divider />

                                                    <List
                                                        sx={{
                                                            bgcolor: 'background.paper',
                                                            overflow: 'auto',
                                                            padding: 0
                                                        }}
                                                        dense
                                                        component="div"
                                                    >
                
                                                                {
                                                                    Erp_prom.length < 0 ?
                                                                       <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent:"center" }}> <Progress /> </Box> 
                                                                    :
                                                                        rows.map((item, index) => {
                                                                            const label = { inputProps: { 'aria-label': 'Switch demo' } };

                                                                            return (
                                                                                    <Accordion key={"panel"+index} 
                                                                                    sx={{boxShadow:"rgb(20 20 20 / 10%) 0rem 0.05rem 0.1rem 0.07rem"}}
                                                                                    >

                                                                                        <AccordionSummary
                                                                                            expandIcon={<ExpandMore />}
                                                                                            aria-controls={"panel"+index+"bh-content"}
                                                                                            id={"panel"+index+"bh-header"}
                                                                                        >
                                                                                            <Typography sx={{ fontSize: 13, flexShrink: 0, width: "90px" }} className="txt-cap">
                                                                                                {item.id_it}
                                                                                            </Typography>
                                                                                            
                                                                                            <Typography sx={{ fontSize: 13, flexShrink: 0, width: "200px" }} className="txt-cap">
                                                                                                {item.it_name}
                                                                                            </Typography>
                                                                                                                        
                                                                                        </AccordionSummary>

                                                                                        <AccordionDetails>
                                                                                            <Typography>
                                                                                                <Card
                                                                                                    sx={{ width: "450px" }}
                                                                                                >
                                                                                                    <Card sx={{borderRadius: 0, p: 0, boxShadow: 0}}>
                                                                                                        <div className="head-config-option txt-cap">
                                                                                                            <DialogContentText sx={{fontSize: 13, color: "black"}}>List promission</DialogContentText>
                                                                                                        
                                                                                                        </div>
                                                                                                    </Card>
                                                                                                    <Divider/>
                                                                                                    <table className="cssTable-prom">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                <td className="col_txt">system</td>
                                                                                                                <td className="col_txt">promission</td>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>

                                                                                                            <tr>
                                                                                                                <td>ระบบจัดการงาน</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.manage_job}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "manage_job"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>ระบบสร้างคำร้อง</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.create_job}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "create_job"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr> 
                                                                                                                <td>ระบบมอบหมายงาน</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.asst_job}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "asst_job"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>ระบบจัดการคำร้อง</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.approve_job}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "approve_job"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>จัดการระบบบริการ</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.service_config}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "service_config"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>จัดการโปรไฟล์พนักงาน</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.manageProfile}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "manageProfile"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                            <tr>
                                                                                                                <td>จัดการระบบยืม Notebook</td>
                                                                                                                <td className="col_txt-confix-prom"> 
                                                                                                                    <CSSSwitch {...label}
                                                                                                                        defaultChecked={item.notebook_center}
                                                                                                                        name={
                                                                                                                            item.id_it+
                                                                                                                            "&"+
                                                                                                                            "notebook_center"
                                                                                                                        }
                                                                                                                        onChange={UpdateErp_prom}
                                                                                                                    />
                                                                                                                </td>
                                                                                                            </tr>

                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                    
                                                                                                </Card>

                                                                                            </Typography>
                                                                                        </AccordionDetails> 

                                                                                    </Accordion>                                                                     
                                                                            );
                                                                        })
                                                                }
                                                            {/* </tbody>
                                                        </table> */}
                                                    </List>
                                                </Card>
                                            </div>
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

export default Generate

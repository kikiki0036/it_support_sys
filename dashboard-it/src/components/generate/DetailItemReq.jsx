import React, { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ReactDOM from 'react-dom'
import axios from 'axios';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

import './style.css'
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": { },
  "& label.MuiInputLabel-root ": { fontSize: 15, fontFamily: 'Kanit' },
  "& .MuiInput-underline:after": { },
  "& .MuiInputLabel-root" : {
    "& fieldset": { 
      borderColor: theme.palette.mode === "light" ? "red" : "red", 
    },
    "&:hover fieldset": { borderColor: theme.palette.mode === "light" ? "red" : "red", },
    "&.Mui-focused fieldset": { borderColor: theme.palette.mode === "light" ? "red" : "red", }
  },
  "& .MuiOutlinedInput-input": { fontSize: 12, fontFamily: 'Kanit' },
  "& .MuiInputBase-input": { fontSize: 12, fontFamily: 'Kanit' }
}));

const FormControlLabelStyle = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": { 
    fontSize: 14, 
    fontFamily: 'Kanit'
  },
}));


const CustomWidthTooltip = styled(({ className, ...props }) => (<Tooltip {...props} classes={{ popper: className }} />)) (({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: { maxWidth: 200, textAlign: "center", padding: 10,fontFamily:"kanit",  backgroundColor: "white", color: 'rgba(0, 0, 0, 0.87)', boxShadow: theme.shadows[1], fontSize: 11, },
    [`& .${tooltipClasses.arrow}`]: { "&:before": { boxShadow: theme.shadows[1],  backgroundColor: theme.palette.common.white, }, color: theme.palette.common.white, backgroundColor: "none" },
}));

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

const ConfirmationDialogRaw = (props) => {
          
          const { items,handleAdd, onClose, open, ...other } = props;
          // const { handleAdd, onClose, value: valueProp, open, ...other } = props;
          // const [value, setValue] = useState([]);
          const [itemlistfilter, setItemlistfilter] = useState([]);

          const [state, setState] = useState({});
          const [statebuf, setStateBuf] = useState({});

          // const [stateselect, setStateSelect] = useState({});
          const [stateselectbuf, setStateSelectBuf] = useState({});


          const radioGroupRef = useRef(null);
          // useEffect(() => { if (!open) { setValue(valueProp); } }, [valueProp, open]);

          const handleEntering = () => { if (radioGroupRef.current !== null) { radioGroupRef.current.focus(); } };
          const handleCancel = () => {setStateBuf(state); onClose(); };
          // const handleOk = () => { setStateSelect(stateselectbuf); setState(statebuf); handleAdd(stateselectbuf); onClose(stateselectbuf); };
          const handleOk = () => { setState(statebuf); handleAdd(stateselectbuf); setStateSelectBuf({}); onClose(stateselectbuf); };
          const handleClose = () => {setStateBuf(state); onClose(); };
          
          
          const AddKeyStateData = () => {
            // console.log( "***********************************AddKeyStateData*****************************************" );
            let keyData ="";
            for(var v of itemlistfilter ) {
                keyData = "item"+v.id_item.split('-')[1]
                state[keyData] = false;
                // console.log( keyData ); 
            } 
            setStateBuf(state)
          }

          const handleReset = () => { 
            AddKeyStateData();
            for(let obj in stateselectbuf) {
              // console.log(stateselectbuf[obj])
              stateselectbuf[obj].status = false;
            }
          };

          // const handleChange = (event) => { setValue(event.target.value); };

          ////////////////////////////////////
          // const [emps,setEmps]=useState([
          //     {name:"Raja",experience:"10+ Years"},
          //     {name:"Mano",experience:"2 Years"},
          //     {name:"Tom",experience:"5+ Years"},
          // ])
        
          // const addRow=()=>{
          //     let newEmp="fffff"+":"+"eeee eeee"
          //     setEmps({...emps,newEmp})
          // }


          


          useEffect(() => {
              let key = "";
              for(var v = 0; v <= 60; v++ ) {
                if(v < 10) {
                  key = "item"+
                        "00000"+
                        v;
                } else {
                  key = "item"+
                        "0000"+ 
                        v;
                }
                  state[key] = false;
              } 
              setStateBuf(state);

          },[]);

          useEffect(() => {
              if(props.itemlist.length > 0 && props.allitems.length > 0) {
                const WOdataFiled = () => { 
                  let DataItemListV = props.allitems.filter((row) => !props.itemlist.includes(row.id_item));
                  // console.log(DataItemListV)
                  setItemlistfilter(DataItemListV);
      
                  // const DataItemListV = props.allitems.filter((row) => {
                  //     const rowcolummItems = row.id_item
                  //     return rowcolummItems.toLowerCase().includes(props.itemlist.id_item.toLowerCase());
                  // });
                }
                
                WOdataFiled()
                // console.log(props.itemlist)
              }
          },[props.itemlist,props.allitems]);

          useEffect(() => {
            if(itemlistfilter.length > 0) {
              // AddKeyStateData();
              let keyData ="";
              for(var v of itemlistfilter ) {
                  keyData = "item"+v.id_item.split('-')[1]
                  state[keyData] = false;
                  // console.log( keyData ); 
              } 
              setStateBuf(state);

            }
          },[itemlistfilter]);

        //   useEffect(() => {
        //     console.log( "************************************statebuf start******************************************" );
        //     console.log( statebuf ); 
        //     // for ( var property in state ) {
        //     //   console.log( property ); 
        //     // }
        //     console.log( "************************************statebuf end******************************************" );
        //    },[statebuf]);

        //   useEffect(() => {
        //       console.log( "************************************stateselect start******************************************" );
        //       console.log( stateselect ); 
        //       // for ( var property in state ) {
        //       //   console.log( property ); 
        //       // }
        //       console.log( "************************************stateselect end******************************************" );
        //   },[stateselect]);

        //   useEffect(() => {
        //     console.log( "************************************stateselectbuf start******************************************" );
        //     console.log( stateselectbuf ); 
        //     // for ( var property in state ) {
        //     //   console.log( property ); 
        //     // }
        //     console.log( "************************************stateselectbuf end******************************************" );
        // },[stateselectbuf]);

          // var obj ={parts:{costPart:1000, salesPart: 2000}}; // console.log(Object.keys(obj));
          
          const handleChangeState = (event) => { 
            let ArrFieldSelect = event.target.value.split('&');
            setStateBuf({...statebuf, [event.target.name]: event.target.checked,}); 
            setStateSelectBuf({...stateselectbuf,[event.target.name]:{status:event.target.checked,id_item:ArrFieldSelect[0],title:ArrFieldSelect[1],description:ArrFieldSelect[2] === "-" ? "" : ArrFieldSelect[2]}}); 
            // if( event.target.checked != true) {
            //   delete stateselectbuf[event.target.name];
            // } else {
            //   setStateSelectBuf({...stateselectbuf,[event.target.name]:{status:event.target.checked,id_item:ArrFieldSelect[0],title:ArrFieldSelect[1],description:ArrFieldSelect[2] == "-" ? "" : ArrFieldSelect[2]}}); 
            // }
          };
          // const { gilad, jason, antoine,item000002 } = state;
        /////////////////////////////////////////////
        
          return (
            <Dialog
              sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 500 ,borderRadius:"15px"} }}
              maxWidth="xs"
              TransitionProps={{ onEntering: handleEntering }}
              open={open}
              onClose={handleClose}
              {...other}
            >
                  <h4 className="dialog-title-content">Field Item <Button onClick={handleReset} size="small">Reset</Button></h4>
                  <DialogContent dividers>
                    <div className="select-field-input-req">
                        
                        {itemlistfilter.map((row) => (
                                  
                              items.findIndex(object => { return object.id_item === row.id_item }) === -1 ?
                                <div className="box-field-req" key={"item"+row.id_item.split('-')[1]}>

                                  <FormControlLabelStyle
                                    className="field-title-label"
                                    control={
                                      <Checkbox checked={statebuf["item"+row.id_item.split('-')[1]]} onChange={handleChangeState} name={"item"+row.id_item.split('-')[1]} value={row.id_item+"&"+row.title+"&"+ (row.description === ""? "-":row.description)}/>
                                    }
                                    label={row.title}
                                    />

                                  {
                                    row.description === "" ? null :  <span className="field-des"> { row.description } </span>
                                  }
                                
                                </div>
                              :
                                null
                                  
                        ))}
                  </div>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOk}>Ok</Button>
                  </DialogActions>
            </Dialog>
          );

}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // value: PropTypes.string.isRequired,
};

const DetailItemReq = () => {

        // const [name, setName] = useState('');
        const [items, setItems] = useState([]);  
        const [allitems, setAllItems] = useState([]);  
       
        // console.log(localStorage.getItem('ServiceType'))
        // console.log(localStorage.getItem('ServiceTypeName'))

        // console.log(localStorage.getItem('ServiceOption'))
        // console.log(localStorage.getItem('ServiceOptionName'))

        const [open, setOpen] = useState(false);
        // const [value, setValue] = useState([]);

        const handleClickListItem = () => { setOpen(true); };
        const handleClose = (newValue) => { setOpen(false); };

        const DataItemReq = async (e) => {
            try {
                await axios.post('http://localhost:5000/getItemOption', { 
                  id_option : [localStorage.getItem('ServiceOption')]
                }).then((res) => {  
                  setItems(res.data);
                })
            } catch (error) {
                console.log(error);
            }
        }

        const DataAllItemReq = async () => {
            try {
                await axios.get('http://localhost:5000/getAllItem', {  }).then((res) => {  
                  setAllItems(res.data);
                })
            } catch (error) {
                console.log(error);
            }
        }

        useEffect(() => {
          DataItemReq();
          DataAllItemReq();
        },[]);

        const [itemlist, setItemList] = useState([]);

        useEffect(() => {
          if(items.length > 0 ) {
            setItemList([])
            let array = []
            for(let v in items) {
              array.push(items[v].id_item)
            }
            setItemList(itemlist => ([...itemlist, array]))
          }
        },[items]);
        
        // useEffect(() => {
        //   if(itemlist.length > 0 ) {
        //     console.log(itemlist)
        //   }
        // },[itemlist]);

        // const handleChange = (event) => { setName(event.target.value);};
        // const AddField = () => { return ( `<h1>Hello Button</h1>` ) }
        // const RemoveItem = () => { const getItem = document.getElementById('remove'); getItem.remove(); }
        
        /////////////////////////////////Add field input//////////////////////////////////////////
        const HandleAdd = (item) => {
          console.log(item)
          const fieldsdocument = document.getElementById('box-fields')
          for(let obj in item) {
            if(item[obj].status === true) {

                let getItemAdd = document.createElement('div'); 
                getItemAdd.classList.add('input-req');
                getItemAdd.accessKey = item[obj].id_item; 
                getItemAdd.id = "InputType" + item[obj].id_item; 
                fieldsdocument.appendChild(getItemAdd);
    
                let element = (
                  <CssTextField
                    className="field-req"
                    id={item[obj].id_item}
                    name={item[obj].id_item+"&"+item[obj].title}
                    label={item[obj].title}
                    type="text"
                    variant="standard"
                  />
                );
                ReactDOM.render(element, document.getElementById("InputType" +item[obj].id_item));

            } else if(item[obj].status === false) {

                const getItemRemove = document.getElementById("InputType" +item[obj].id_item);
                if(getItemRemove !== null)
                {
                  getItemRemove.remove();
                } 
                // console.log(getItemRemove)
            }
          }
        }
        /////////////////////////////////Add field input//////////////////////////////////////////

        return (
          <div className="detail-req-step-2">

            <div className="box-fields-input-55">
              <div className="box-fields" id="box-fields">
                  <h5>Detail Request &nbsp;<p className="fontKanit">{localStorage.getItem('ServiceOptionName')}</p></h5>
                  <br />
                  {
                    items.length === 0 ?  <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent:"center" }}> <Progress /> </Box> :  
                    items.map((row, index) => (
                      <div className="input-req" key={row.id_item} id={"InputType"+row.id_item}>
                        <CssTextField
                          className="field-req"
                          id={row.id_item}
                          name={row.id_item+"&"+row.service_items[0].title}
                          label={row.service_items[0].title}
                          type="text"
                          variant="standard"
                          // value={name}
                          // onChange={handleChange}
                        />
                      </div>
                    ))
                  }
              </div>

              <Stack direction="row" className="btn-add-field">
                  <CustomWidthTooltip  placement="top-start" arrow title={"add field input for more detail request"}>
                    <IconButton color="primary" aria-label="add field" component="span" 
                      // onClick={RemoveItem} 
                      onClick={handleClickListItem} >
                          <AddCircleOutlineIcon />
                    </IconButton>
                  </CustomWidthTooltip>
              </Stack>

              
              {/* dialog select field request */}
              <ConfirmationDialogRaw
                  id="ringtone-menu"
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  // value={value}
                  allitems={allitems}
                  itemlist={itemlist}
                  handleAdd={HandleAdd}
                  items={items}
              />
            </div>

            <div className="box-des-content">
                <h5>Recomment</h5> <br/>
                <p> &nbsp; กรอกรายละเอียดลงบนช่อง หากต้องการเพิ่มเติมข้อมูลอื่นๆที่เกี่ยวข้องให้กดที่ปุ่มบวก <AddCircleOutlineIcon sx={{ fontSize: 14 }} color="primary"/> จากนั้นเลือกประเภทข้อมูลที่ต้องการเพิ่มรายละเอียด</p>
            </div>
          </div>
        )
}

export default DetailItemReq
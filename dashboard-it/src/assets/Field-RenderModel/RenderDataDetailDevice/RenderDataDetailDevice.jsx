import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

import { styled } from "@mui/material/styles";
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
  
function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;
  // const [value, setValue] = useState('');
  const handleClose = (e) => { onClose(e); };
  // const handleOk = () => { onClose(); };

  const [Data, setData] = useState([]);
  const [rows, setRows] = useState(Data);

  const getData = async () => {
      try {
          await axios.get('http://localhost:5000/getDeviceDetail', {  }).then((res) => {  
            setData(res.data);
          })
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    setRows(Data)
  }, [Data]);


  const onSearch = value => {
    const filteredRows = Data.filter((row) => {
      const rowcolumm = row.brand
      return rowcolumm.toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  } 
  

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { p: 0.2 ,borderRadius: "15px", width: '50%', maxHeight: 550,height: 550} }}
      // sx={{ '& .MuiDialog-paper': { p: 0.2 , borderRadius: "15px", minWidth:"fit-content", height: 550}}}

      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle sx={{  p: 1.7 , color:"#1976d2", displa:"flex",alignItems:"center"}} >
        DATA DETAIL DEVICE
      </DialogTitle>
      
        <Paper component="form" sx={{ boxShadow: 0, mb:1, p: '1px 4px', display: 'flex', alignItems: 'center', width: "100%" }}>
            <IconButton sx={{ p: '5px' }} aria-label="menu"> <MenuIcon sx={{ fontSize: '1.3rem' }} /> </IconButton>
            <InputBase sx={{ ml: 1, flex: 1,px:0,fontSize: '0.75rem' }} onChange={ (e) => { onSearch(e.target.value) } } placeholder="Search brand" inputProps={{ 'aria-label': 'search google maps' }} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: '10px' }} aria-label="search"> <SearchIcon sx={{ fontSize: '1.3rem' }} /> </IconButton>
        </Paper>
        <DialogContent dividers  sx={{p:0, overflowY: "overlay"}}> 
        <Root>
          {/* <input className="dialog-search-data" type="text" onChange={(event) => {setValue(event.target.value)}}/> */}
         

          <div className="dialog-box-input dialogContent">
          
                <table>
                  <thead>
                    <tr>
                      <td>detail id</td>
                      <td>brand</td>
                      <td>model</td>
                      <td>system type</td>
                    </tr>
                  </thead>
                  <tbody className="dialog-table-body-h">
                      {
                        rows.map((item, index) => (
                            <tr key={index} onClick={() => { handleClose( {id:item.detail_id, name:item.brand+" - "+item.model+" - "+item.os_type+" - "+item.system_type}) }}>
                              <td>{item.detail_id}</td>
                              <td>{item.brand}</td>
                              <td>{item.model}</td>
                              <td>{item.os_type+" "+item.system_type}</td>
                            </tr>
                        ))
                      }
                  </tbody>
                </table>
          </div>
          </Root>
        </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
        {/* <Button onClick={handleOk}>Ok</Button> */}
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // setValue: PropTypes.func.isRequired,
};

const RenderDataDetailDevice = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({id:"", name:""});

  const handleClickListItem = () => { setOpen(true); };

  const handleClose = (newValue) => { 
    setOpen(false); 

    if (newValue) { 
      setValue(newValue);

    }

  };
  
  // useEffect(() => {
  //   if(props.funcx && value.id != "") {
  //     props.setSection(value);
  //     props.setEmail(value);
  //   }
  // }, [value]);

  return (
    <div>
        <div onClick={handleClickListItem}>
          {
            props.renderInput(value)
          }
        </div>
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={(value) => {handleClose(value)}}
          value={value}
        />
    </div>
  );
}

export default RenderDataDetailDevice


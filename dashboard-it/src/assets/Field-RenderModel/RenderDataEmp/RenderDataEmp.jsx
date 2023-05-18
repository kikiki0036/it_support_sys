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

// const dataEmp = [
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
//     {
//       id:"640001",
//       name:"kebtawan buribui",
//       section:"buribuiAA",
//       email:"it_kebtawan@apexcircuit.com",
//     },
// ]

  
function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;
  // const [value, setValue] = useState('');
  const handleClose = (e) => { onClose(e); };
  // const handleOk = () => { onClose(); };

  const [DataEmp, setDataEmp] = useState([]);
  const [rows, setRows] = useState(DataEmp);

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
    setRows(DataEmp)
  }, [DataEmp]);

  const onSearch = value => {
    const filteredRows = DataEmp.filter((row) => {
      const rowcolumm = row.id_emp
      return rowcolumm.toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  } 
  

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 550,height: 550} }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle sx={{pb:0}} >DATA EMP</DialogTitle>
        <Paper component="form" sx={{ boxShadow: 0, mb:1, p: '1px 4px', display: 'flex', alignItems: 'center', width: "100%" }}>
            <IconButton sx={{ p: '5px' }} aria-label="menu"> <MenuIcon sx={{ fontSize: '1.3rem' }} /> </IconButton>
            <InputBase sx={{ ml: 1, flex: 1,px:0,fontSize: '0.75rem' }} onChange={ (e) => { onSearch(e.target.value) } } placeholder="Search Emp ID" inputProps={{ 'aria-label': 'search google maps' }} />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: '10px' }} aria-label="search"> <SearchIcon sx={{ fontSize: '1.3rem' }} /> </IconButton>
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
                        rows.map((row) => (
                            <tr key={row.id_emp} onClick={() => {handleClose({id:row.id_emp, section:row.sections[0].section, email:row.user_profiles[0].email})}}>
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
  // setValue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // value: PropTypes.string.isRequired,
};

const RenderDataEmp = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({id:"", section:"", email:""});
  const handleClickListItem = () => { setOpen(true); };
  const handleClose = (newValue) => { 

    if(props.funcx) {
      props.setSection(newValue);
      props.setEmail(newValue);
    }

    setOpen(false); 
    if (newValue) { setValue(newValue); } 
  };

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
          // setValue={(value) => {setValue(value)}}
          // value={value}
        />
    </div>
  );
}

export default RenderDataEmp


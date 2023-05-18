import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Test_content from './Test_content'
import { 
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Typography,
  Stack,
  
} from '@mui/material';

import { 
  Close
} from '@mui/icons-material';

import { styled } from "@mui/material/styles";
import notify from 'devextreme/ui/notify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
      padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
      padding: theme.spacing(1)
  }
}));

const showToast = (value, type) => {
    notify(
            {
                message: value, 
                width: 400,
                position: {
                    at: "top",
                    my: "top",
                    of: "#container"
                }
            },
            type, 800
          );
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

function ConfirmationDialogRaw(props) {
    
  const { funcDeleteDataBooking, modelConfirm, onCloseDialogConfirm, openDialogConfirm, ...other } = props;

  const handleConfDialog = (e) => {
    funcDeleteDataBooking(e);
    onCloseDialogConfirm();


  };

  const handleCancelDialog = () => {
      onCloseDialogConfirm();
  };



  return (
      <BootstrapDialog
        onClose={handleCancelDialog}
        aria-labelledby="customized-dialog-title"
        sx={{ '& .MuiDialog-paper': { borderRadius: "15px", maxHeight: 435, width: 320 } }}

        maxWidth="xs"
        open={openDialogConfirm}
        {...other}
      >
          {/* {modelConfirm.book_id}{modelConfirm.borrower_name}{modelConfirm.time} */}

          <BootstrapDialogTitle
            sx={{ fontSize: 13, p: 1.5 }}
            id="customized-dialog-title"
            onClose={handleCancelDialog}
          >
                Confirm 
          </BootstrapDialogTitle>
          
          <DialogContent dividers>
              <Typography
                  gutterBottom
                  sx={{
                      fontSize: 13,
                      display: "flex",
                      flexDirection:'column',
                      alignItems: "center",
                      justifyContent: "center"
                  }}
              >
              
                <div> ยกเลิกการจอง </div>
                <div>รอบ {modelConfirm.length !== 0 ? modelConfirm[0].time : ""}</div>
                <div>ผู้จอง {modelConfirm.length !==0 ? modelConfirm[0].borrower_name : ""}</div>
                  
              </Typography>
               
          </DialogContent>
          <DialogActions>
              <Stack spacing={1} direction="row" sx={{ p: 0 }}>
                {/* <Button
                  sx={{ fontSize: 13,paddingX: 1.5 , paddingY: .2}}
                  variant="contained"
                  autoFocus
                  onClick={handleConfDialog}
                >
                  cancel 
                </Button> */}
                
                <Button
                  sx={{ fontSize: 13,paddingX: 1.5 , paddingY: .2 }}
                  variant="contained"
                  autoFocus
                  onClick={()=>handleConfDialog(modelConfirm[0].book_id)}
                >
                  ตกลง
                </Button>
              </Stack>
          </DialogActions>
      </BootstrapDialog>
  );
}

const DeviceCenter = () => {
  const [dataSCH, setdataSCH] = useState([]);
  const [DataAccUser, setDataAccUser] = useState([]);
  const [Notebook_center, setNotebook_center] = useState([]);
  // const [section, setsection] = useState([]);

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [dataDialog, setDataDialog] = useState([]);

  const funcDeleteDataBooking = async (book_id) => {
   
    let newData = dataSCH.filter((item) => item.book_id !== book_id);
    setdataSCH(newData)
   
    try {
        await axios.post('http://localhost:5000/deleteDataBooking', {
          book_id : book_id,

        }).then((res) => {

        })

        
    } catch (error) {
        console.log(error);

    }

    showToast('ยกเลิกการจองสำเร็จ', 'success');
    

  }

  const handleDialogConfirm = (e) => {
    setDataDialog(e)
    setOpenDialogConfirm(true);

  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(false);
    setDataDialog([])

  };


  const getDataAccUser = async (e) => {
    try {
  
        await axios.get('http://localhost:5000/getDataBook', { }).then((res) => {  
          setdataSCH(res.data);
        })

        await axios.get('http://localhost:5000/getDataUserForDeviceCenter', { }).then((res) => {  
          setDataAccUser(res.data);
        })
  
        await axios.get('http://localhost:5000/getNotebook_center', { }).then((res) => {  
          setNotebook_center(res.data);
        })
        
          
        // await axios.get('http://localhost:5000/getSec', { }).then((res) => {  
        //   setsection(res.data);
        // })
        
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getDataAccUser();
    
  },[]);

  
  const currentDatenewStartDate = (e) => {
    
    dataSCH[dataSCH.length -1].startDate = e;

  };

  return (
    <>
     <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          openDialogConfirm={openDialogConfirm}
          onCloseDialogConfirm={handleCloseDialogConfirm}
          modelConfirm={dataDialog}
          funcDeleteDataBooking={(e)=>funcDeleteDataBooking(e)}
      />

      {
        Notebook_center.length !== 0 ?
          <Test_content
            dataAccUser={DataAccUser}
            notebook_center={Notebook_center}
            // section={section}
            dataSCH={dataSCH}
            setdataSCH={(e) => setdataSCH(e)}
            handleDialogConfirm={(e) => handleDialogConfirm(e)}
            currentDatenewStartDate={(e) => currentDatenewStartDate(e)}
          />
        :
          <div className="layout-component m_r content-timeline-sh-react">

            <h2 className="page-header">
                { "Test Content".toUpperCase() }
            </h2>

            <div className="row box-scroll">
                <div className="col-12">
                    <div className="card-g dataUser-min-h">
                    </div>
                </div>
            </div>
            
          </div>
      }
    </>
    
  )
}

export default DeviceCenter
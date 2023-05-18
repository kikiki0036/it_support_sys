import React,{ useState, useEffect, forwardRef } from "react";
import axios from "axios";

import { 
  Button,
  Dialog,
  Typography,
  AppBar,
  Toolbar,
  Slide,
  IconButton
  
} from '@mui/material';

import { 
  Close
} from '@mui/icons-material';

import ManageTeam from './ManageTeam';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
  
});

function TaskJob(props) {
  const { onCloseTaskJobDialog, openTaskJobDialog, ...other } = props;

  const handleCancelTaskJobDialog = () => {
      onCloseTaskJobDialog();

  };


  return (
    <Dialog
      fullScreen
      open={openTaskJobDialog}
      onClose={handleCancelTaskJobDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ overflowY: "overlay",  position: 'relative',backgroundImage:"linear-gradient(45deg, #188ef5 10%, #4e59ebfd 70%)"}}>
        <Toolbar>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancelTaskJobDialog}
            aria-label="close"
          >
              <Close />

          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Manage Team
          </Typography>

        </Toolbar>

        <ManageTeam/>

      </AppBar>

    </Dialog>
  )
}

function Manage_task() {
  const [openTaskJobDialog, setOpenTaskJobDialog] = useState(false);

  const handleTaskJobDialog = () => {
    setOpenTaskJobDialog(true);

  };

  const handleCloseTaskJobDialog = () => {
    setOpenTaskJobDialog(false);

  };

  
  const toggleTaskJobDialog = () => {
    setOpenTaskJobDialog(!openTaskJobDialog);

  };
  

  return (
      <>
          <TaskJob
              id="ringtone-menu"
              keepMounted
              openTaskJobDialog={openTaskJobDialog}
              onCloseTaskJobDialog={handleCloseTaskJobDialog}
          /> 

          {
            true ?
              <div className="manage-task-menu" onClick={toggleTaskJobDialog}>
                  
                  <div>
                      <i className="bx bxl-microsoft-teams"></i>
                       
                  </div>
              </div>
            :
              null
          }
      </>
  );
}
export default Manage_task;
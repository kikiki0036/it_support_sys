import React, { useState, useEffect, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
function Profilepass(props) {
  const { checkpass,hpt,id,...other } = props;



  return (
    <form onSubmit={checkpass} id={id}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography>
          เปลี่ยนรหัสผ่าน
          </Typography>
          <br/>
          
          <TextField
            required
            id="outlined-required"
            label="รหัสผ่านใหม่"
            type="password"
            inputProps={{maxLength: 15 ,minLength:10, pattern:"^\[a-zA-Z@#0-9.]*$"}}
          />
           <br/>
           <br/>
          <TextField
            required
            id="outlined-required"
            label="ยืนยันรหัสผ่าน"
            type="password"
            pattern="^\w[a-zA-Z@#0-9.]*$"
            inputProps={{maxLength: 15 ,minLength:10 ,pattern:"^\[a-zA-Z@#0-9.]*$"}}
            helperText={hpt}
          />
         
      </CardContent>
      <CardActions>
        <Button  type="submit" size="small" 
        // onClick={test}
        >save</Button>
      </CardActions>
    </Card>
     </form>
  );
}

export default Profilepass;

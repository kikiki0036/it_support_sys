import React, { useState, useEffect, forwardRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Profileuser(props) {
  const { checkpdata, ...other } = props;

  return (
    <form onSubmit={checkpdata}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography>ข้อมูลผู้ใช้</Typography>
           <br/>
          <TextField
            required
            id="outlined-required"
            label="ชื่อภาษาไทย"
            defaultValue={localStorage.tname}
            inputProps={{ pattern: "^[ก-๏]([-']?[ก-๏]+)*( [ก-๏]([-']?[ก-๏]+)*)+$"}}
          />
          <br/>
          <br />
          <TextField
            required
            id="outlined-required"
            label="ชื่อภาษาอังกฤษ"
            defaultValue={localStorage.username_login}
            inputProps={{ pattern: "^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$"}}
          />
          <br/>
          <br />
          <TextField
            required
            id="outlined-required"
            label="อีเมลล์"
            defaultValue={localStorage.mail_user_login}
            inputProps={{ type:"email",pattern:"^[a-zA-Z0-9._%+-]+@(hotmail.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$"}}
          />
         
          <br />
         <br/>
          <TextField
            required
            id="outlined-required"
            label="เบอร์โทรศัพท์"
            defaultValue={localStorage.tel}
            inputProps={{ pattern: "[0-9]{10}", maxLength: 10 ,minLength:10}}
          />
         
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            size="small"
            // onClick={test}
          >
            save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Profileuser;


{/* <div className="field mt-5">
<label className="label">ชื่อภาษาไทย</label>
<div>
  <input
    type="text"
    placeholder="ชื่อภาษาไทย"
    name="pass"
    id="pass"
    required
    pattern="^[ก-๏\s]+$"
    value={localStorage.tname}
  />
  <span className="focus-input100"></span>
</div>
</div>
<div className="field mt-5">
<label className="label">ชื่อภาษาอังกฤษ</label>
<div>
  <input
    type="text"
    placeholder="ชื่อภาษาอังกฤษ"
    name="pass"
    id="pass"
    required
    pattern="^[a-zA-Z\s]+$"
  />
  <span className="focus-input100"></span>
</div>
</div>
<div className="field mt-5">
<label className="label">อีเมลล์</label>
<div>
  <input
    type="email"
    placeholder="อีเมลล์"
    name="pass"
    id="pass"
    required
  />
  <span className="focus-input100"></span>
</div>
</div>
<div className="field mt-5">
<label className="label">เบอร์โทรศัพท์</label>
<div>
  <input
    type="number"
    placeholder="เบอร์โทรศัพท์"
    name="pass"
    id="pass"
    pattern="[0-9]{10}"
    required
    minLength={10}
    maxLength={10}
  />
  <span className="focus-input100"></span>
</div>
</div> */}
import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import axios from "axios";
import UncontrolledTabs from "./UncontrolledTabs";
import Nav from "./Nav";
import { Input } from "antd";
import moment from "moment";
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
const customerTableHead = {
  headerUser: ["job_no", "Validator", "title", "option", "status"],
};
const UpdateJob = async (id,status) => {
  try {
      await axios.post('http://localhost:5000/updatejoblate',{
          Job_no : id,
          Status : status
      })
      
  } catch (error) {
      console.log(error);
  }
}
const RenderBodyUser = (item, index) => {
  var today = moment().format();
  var now = moment(today);
  var endnow = moment(item.endDate);
  // console.log(item);
  // console.log(now,endnow);
  // console.log(now.isAfter(endnow));
  if(now.isAfter(endnow)&&item.status!=="finish"){
    UpdateJob(item.job_no,"delay")
    
  }
    return (
      <tr
        key={index}
        className={"cursor_pointer " + (index % 2 !== 0 ? "boxc-b" : "boxc-w")}
      >
        {/* <td className="dropdown_MenuUser">
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <React.Fragment>
                <MoreVert fontSize="10px" {...bindTrigger(popupState)} />
                <Menu {...bindMenu(popupState)} className="MenuUser">
                  <MenuItem sx={{ display: "none" }}></MenuItem>
                  {
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        // handleEditProfileUserDialog(item.id_user);
                      }}
                      sx={{ fontSize: 13 }}
                    >
                      View Profile
                    </MenuItem>
                  }
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </td> */}
            
        <td className="col_txt">{item.job_no}</td>
        <td className="col_txt font-family-Kanit">{item.name_user}</td>
        <td className="col_txt">{item.service_title}</td>
        <td className="col_txt">{item.asservice_option_title}</td>
        <td className="col_txt">{now.isAfter(endnow)&&item.status!=="finish"?"delay":item.status}</td>
        {/* <td className="col_txt">{item.mail}</td> */}
      </tr>
    );
  };


const renderHead = (item, index) => <th key={index}>{item}</th>;
const History = () => {
  const [DataUserrow, setDataUserrow] = useState([]);
  const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/history").then((response) => {
      console.log(response.data);
      setDataUserrow(response.data);
      setStattusLoadDatajob(true);
      // console.log(response.data);

    });
  }, []);
  
  return (
    <div className="layout-component m_r">
      <h2 className="page-header">
        {
        // localStorage.getItem("id_emp_login") !== null &&
        // localStorage.getItem("id_emp_login").substring(0, 2) === "IT"
        //   ? "Job History".toUpperCase()
          "History".toUpperCase()
          }
      </h2>
      <div className="row">
        <div className="col-12">
          <div className="card-g dataEmp-min-h">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

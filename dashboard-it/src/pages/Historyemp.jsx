import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import axios from "axios";

import moment from "moment";
import {  TabPane } from "reactstrap";

const customerTableHead = {
  headerUser: ["req_no", "requestor", "title", "option","comment", "status"],
};
const RenderBodyUser = (item, index) => {
    return (
      <tr
        key={index}
        className={"cursor_pointer " + (index % 2 !== 0 ? "boxc-b" : "boxc-w")}
      >
        <td className="col_txt">{item.tikket_no}</td>
        <td className="col_txt font-family-Kanit">{item.name_user}</td>
        <td className="col_txt">{item.service_type_title}</td>
        <td className="col_txt">{item.service_option_title}</td>
        <td className="col_txt">{item.comment== null ? "-":item.comment}</td>
        <td className="col_txt">{item.status}</td>
        {/* <td className="col_txt">{item.mail}</td> */}
      </tr>
    );
  };


const renderHead = (item, index) => <th key={index}>{item}</th>;
const Historyemp = () => {
  const [DataUserrow, setDataUserrow] = useState([]);
  const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/historyrequest").then((response) => {
      setDataUserrow(response.data);
      setStattusLoadDatajob(true);
      console.log(response.data);

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

export default Historyemp;

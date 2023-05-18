import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Pagination from '@mui/material/Pagination';
import { StyledEngineProvider } from '@mui/material/styles';

import dateShortcode from 'date-shortcode'

import axios from 'axios';

// import { Input } from 'antd';

import '../../assets/css/index.css'

import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

import { styled } from "@mui/material/styles";
const Root = styled('div')`

  td,
  th {
    padding: 11.42px 0px;
  }

  .css-i4bv87-MuiSvgIcon-root {
    width: 0.7rem;
    height: 0.7rem;
  }

  .css-dsuxgy-MuiTableCell-root {
    padding: 5px 10px;
  }

  .detail-arrow {
    padding: 0;
    border: 0;
  }

  .css-9l5vo-MuiCollapse-wrapperInner {
    padding: 5px 10px;
    background-color: rgba(248, 248, 248, 0.227);
  }
  
  .txt-detail:not(.detail-request-plan) thead {
    background-color: #f5f5f8a1;
  }

  .txt-detail:not(.detail-request-plan) tbody {
    // background-color: #f5f5f84d;
  }

  .tikket-detail {
    font-size: 0.6rem;

  }

  .tikket-detail td:not(.hiden-col) ,
  .tikket-detail th:not(.hiden-col) {
    padding: 5px 10px;
    font-size: 0.65rem;

  }

  .detail-request-plan .b-rl td,
  .detail-request-plan .b-rl th  {
    border: 0;
    font-size: 0.65rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;

  }

  .email-txt {
    text-transform: none;
  }
  
  .b-rl {
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;
    width: 49%;
  }

  .b-rl-tk {
    width: 49%;
  }

  .hiden-col {
    border: 0;
    width: 5px;
    padding: 0px 0px;
  }

  .title-row {
    width: 8em;
  }

  .detail-arrow p{
    margin-bottom: 10px;
    font-size: 0.7rem;
    font-weight: 600;

  }

  .txt-detail {
    margin-bottom:20px;
  }

  .service-option {
    margin-bottom: 20px;
  }

  .detail-job-historys {
    display: flex;
  }
  
  .detail-job-historys .assign-detail,
  .detail-job-historys .solution-detail {
    width: 50%;
  }
  
  .detail-job-historys .assign-detail div,
  .detail-job-historys .solution-detail div{
    width: 100%;
    padding: 5px 10px;
    border: 1px solid #ececec;
  }

  .font-kanit {
    font-family: 'Kanit', sans-serif;
  }
`;

const PaginationNewStyle = styled(Pagination)(({ theme }) => ({

  "& button.Mui-selected": {
      border: "1px solid #0099ff",
      background: "#0099ff25",
  },
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

const formatDateTime = (datetime) => {
    var str = '{DD/MM/YY HH:mm}'    
    return dateShortcode.parse(str, datetime)
}  


const subName = (name) => {

    let Sname = ""

    if(name !== null && name !== "" && name !== 'undefined') {
      const fullName = name.split(' ')

      if(typeof fullName[1] !== 'undefined') {
        Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1) +"  "+ fullName[1].charAt(0).toUpperCase() + '.'
  
      } else {
        Sname = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1)
  
      }
    }
   
    // const Sname = fullName.shift() +"  "+ fullName.pop().charAt(0) + '.'
    return Sname
}  

const RowData = (props) => {

  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
  
    <React.Fragment>
      <tr key={row.job_no} sx={{ '& > *': { borderBottom: 'unset' } }} >
        <td className="col_txt">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            className="icon-arrow"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td className="col_txt">{row.job_no}</td>
        <td className="col_txt">{row.service_tikkets[0].user_profiles[0].profile_name}</td>
        <td className="col_txt">{row.service_tikkets[0].user_profiles[0].data_emps[0].sections[0].section}</td>
        <td className="col_txt font-kanit">{row.service_tikkets[0].service_options[0].title}</td>
        <td className="col_txt">{formatDateTime(row.open_date)} - {formatDateTime(row.close_date)}</td>
        <td className="col_txt">{subName( row.erp_rights[ row.erp_rights.findIndex(object => { return object.id_it === row.assign_to }) ].it_name )}</td>
        
      </tr>
      {/*  */}
      <tr>
        <td className="detail-arrow" colSpan="7">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <p>
                details
              </p>
              <div className="tikket-detail">
                  {/* <h5>Requestor</h5> */}
                  <div className="txt-detail detail-request-plan">
                    <table size="small" aria-label="purchases">
                      <thead>
                        
                        <tr>
                          <td className="tableRow-req-plan col_txt">Requestor</td>
                          <td className="hiden-col"></td>
                          <td className="tableRow-req-plan col_txt">plan</td>       
                        </tr>

                      </thead>
                      <tbody>

                          <tr key={row.service_tikkets[0].tikket_no+"1"}>
                            <td className="b-rl"><td className="title-row">id emp</td><td className="">: &nbsp;{row.service_tikkets[0].user_profiles[0].id_emp}</td></td>
                            <td className="hiden-col"></td>
                            <td className="b-rl"><td className="title-row">Job No</td><td className="">: &nbsp;{row.job_no}</td></td>
                          </tr>

                          <tr key={row.service_tikkets[0].tikket_no+"2"}>
                            <td className="b-rl"><td className="title-row">name</td><td className="font-kanit">: &nbsp;{row.service_tikkets[0].user_profiles[0].data_emps[0].level === "maneger"? "maneger ":""}{row.service_tikkets[0].user_profiles[0].data_emps[0].emp_name}</td></td>
                            <td className="hiden-col"></td>
                            <td className="b-rl"><td className="title-row">job date</td><td className="">: &nbsp;{formatDateTime(row.createdAt)}</td></td>
                          </tr>

                          <tr key={row.service_tikkets[0].tikket_no+"3"}>
                            <td className="b-rl"><td className="title-row">section</td><td className="">: &nbsp;{row.service_tikkets[0].user_profiles[0].data_emps[0].sections[0].section}</td></td>
                            <td className="hiden-col"></td>
                            <td className="b-rl"><td className="title-row">appove by</td><td className="">: &nbsp;{row.appove_by !== null ? subName( row.erp_rights[ row.erp_rights.findIndex(object => { return object.id_it === row.appove_by }) ].it_name ) : ""}</td></td>
                          </tr>

                          <tr key={row.service_tikkets[0].tikket_no+"4"}>
                            <td className="b-rl"><td className="title-row">tel</td><td className="">: &nbsp;{row.service_tikkets[0].tel}</td></td>
                            <td className="hiden-col"></td>
                            <td className="b-rl"><td className="title-row">Assign by</td><td className="">: &nbsp;{subName( row.erp_rights[ row.erp_rights.findIndex(object => { return object.id_it === row.assign_by }) ].it_name )}</td></td>
                          </tr>

                          <tr key={row.service_tikkets[0].tikket_no+"5"}>
                            <td className="b-rl"><td className="title-row">email</td><td className="email-txt">: &nbsp;{row.service_tikkets[0].user_profiles[0].email}</td></td>
                            <td className="hiden-col"></td>
                            <td className="b-rl"><td className="title-row">Open - Close</td><td className="">: &nbsp;{formatDateTime(row.open_date)} - {formatDateTime(row.close_date)}</td></td>
                          </tr>

                      </tbody>
                    </table>
                  </div>
                  <p>tikket detail</p>
                  <div className="txt-detail">
                    <table size="small" aria-label="purchases" className="service-option">
                      <thead className="border-rl">
                        <tr>
                          <td className="col_txt">tikket no</td>
                          <td className="col_txt">tikket date</td>
                          <td className="col_txt">Service</td>
                          <td className="col_txt">Option</td>
                          <td className="col_txt">case</td>
                        </tr>
                      </thead>
                      <tbody className="border-rl">
                          <tr key={"service-option"}>
                            <td className="col_txt">{row.service_tikkets[0].tikket_no}</td>
                            <td className="col_txt">{formatDateTime(row.service_tikkets[0].tikket_date)}</td>
                            <td className="col_txt font-kanit">{row.service_tikkets[0].service_types[0].title}</td>
                            <td className="col_txt font-kanit">{row.service_tikkets[0].service_options[0].title}</td>
                            <td className="col_txt font-kanit">{row.rootcases[0].rootcase_name} - {row.rootitems[0].rootitem_name}</td>
                          </tr>
                      </tbody>  
                    </table>
                    <table size="small" aria-label="purchases" className="service-option font-kanit">
                      <thead className="border-rl">
                        <tr>
                          <td className="col_txt">tikket item</td>
                          <td className="col_txt">item detail</td>
                        </tr>
                      </thead>
                      <tbody className="border-rl">

                        {row.service_tikkets[0].item_tks.map((tikketdetailRow, index) => (
                            <tr key={"tikketdetailRow.id_item"+ index}>
                              <td className="col_txt b-rl-tk">{tikketdetailRow.service_items[0].title}</td>
                              <td className="col_txt b-rl-tk">{tikketdetailRow.value}</td>
                            </tr>
                        ))}

                      </tbody>  
                    </table>

                    <div className="detail-job-historys service-option font-kanit">
                      <div className="assign-detail">
                          <p>assign detail</p>
                          <div className="txt-detail col_txt">
                            {row.assign_detail === null ? "-":row.assign_detail}
                          </div>
                      </div>
                      <div className="solution-detail">
                          <p>solution note</p>
                          <div className="txt-detail col_txt">
                            {row.solutionnote === null ? "-":row.solutionnote}
                          </div>
                      </div> 
                    </div>
                  </div>
                </div>
            
            </Box>
          </Collapse>
        </td>
      </tr>
      
    </React.Fragment>
  )
}


// const { Search } = Input;
const Table_C = (props) => {

  const [datajob, setdatajob] = useState([]);
  const [rowss, setRowss] = useState(datajob);  
  // const [searched, setSearched] = useState("");
  const [StattusLoadDatajob, setStattusLoadDatajob] = useState(false);

  const DataJob = async (e) => {
      try {
          await axios.post('http://localhost:5000/getDataJob', {
              status: ['finish']
          }).then((res) => {  
              setdatajob(res.data);  
              setStattusLoadDatajob(true) 
          })
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
      DataJob();
  },[]);

  useEffect(() => {
      setRowss(datajob)
  },[datajob]);

  useEffect(() => {
    onSearch(props.Search);
  },[props.Search]);

  console.log(rowss)

  const onSearch = value => {
    console.log(value);
    const filteredRows = datajob.filter((row) => {
      const rowcolumm = row.job_no
      return rowcolumm.toLowerCase().includes(value.toLowerCase());
    });
    setRowss(filteredRows);
  } 

  let limit = 8
  const initDataShow = limit && rowss ? rowss.slice(0, Number(limit)) :rowss

  const [dataShow, setDataShow] = useState(initDataShow)

  useEffect(() => {
      setDataShow(initDataShow);
  }, [rowss]);

  let pages = 1

  // let range = []

  if (limit !== undefined) {
      let page = Math.floor(rowss.length / Number(limit))
      pages = rowss.length % Number(limit) === 0 ? page : page + 1
      // range = [...Array(pages).keys()]
  }
  const [currPage, setCurrPage] = useState(0)

  const handleChange = (event, value) => {
      const start = Number(limit) * (value-1)
      const end = start + Number(limit)

      setDataShow(rowss.slice(start, end))

      setCurrPage(value-1);
  };

  return (

        <div className="table-wrapper">
          <Root>
              <table aria-label="collapsible table">
                <thead>
                  <tr>
                    <td className="col_txt"/>
                    <td className="col_txt">Job No</td>
                    <td className="col_txt">Requestor</td>
                    <td className="col_txt">section</td>
                    <td className="col_txt">service</td>
                    <td className="col_txt">Open - Close</td>
                    <td className="col_txt">Assign</td>
                  </tr>
                </thead>
                <tbody >
                  {
                    !StattusLoadDatajob ?  <td className="non-style" colSpan="7"><Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent:"center" }}> <Progress /> </Box></td> :
                    dataShow.map((row, index) => (
                      <RowData key={"row.job_no" + index} row={row} />
                    ))
                  }
                </tbody>
              </table>
          </Root>

          {
                pages > 1 ? (
                    <div className="con-pagination">
                        { 
                                <StyledEngineProvider injectFirst>
                                        <PaginationNewStyle
                                            variant="outlined" 
                                            shape="rounded" 
                                            size="small"  
                                            // color="secondary" 
                                            sx={{ marginRight: '0' }} 
                                            count={Math.ceil(rowss.length/limit)} 
                                            page={currPage+1}
                                            onChange={handleChange} 
                                        />
                                </StyledEngineProvider>
                        }
                    </div>
                ) : null
          }
        </div>
  )
}

export default Table_C
import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Pagination from '@mui/material/Pagination';
import { StyledEngineProvider } from '@mui/material/styles';
import { styled } from "@mui/material/styles";

const PaginationNewStyle = styled(Pagination)(({ theme }) => ({
    "& button.Mui-selected": {
        border: "1px solid #0099ff",
        background: "#0099ff25",
      
    },
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: '#403E74',
    fontSize: "0.65rem",
    fontWeight :600,
    // padding
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const TableMui = (props) => {

    const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData

    const [dataShow, setDataShow] = useState(initDataShow)

    useEffect(() => {
        setDataShow(initDataShow);
    }, [props.bodyData]);

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(props.bodyData.length / Number(props.limit))
        pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }
    const [currPage, setCurrPage] = useState(0)
    
    const handleChange = (event, value) => {
        const start = Number(props.limit) * (value-1)
        const end = start + Number(props.limit)

        setDataShow(props.bodyData.slice(start, end))

        setCurrPage(value-1);

        console.log(value)

    };

    return (
        <div className="table-area">
          
          <TableContainer>
          {/* <TableContainer component={Paper}> */}
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

              <TableHead>
                <TableRow>
                  { props.headData.map((row, index) => (
                      <TableCellStyled key={"table"+index}>{row}</TableCellStyled>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {
                   dataShow.map((item, index) => props.renderBody(item, index))
                }
              </TableBody>

            </Table>
          </TableContainer>

          {
              pages > 1 ? (
                  <div className="con-pagination">
                      { 
                              <StyledEngineProvider injectFirst>
                                      <PaginationNewStyle
                                          variant="outlined" 
                                          shape="rounded" 
                                          size="small"  
                                          sx={{ marginRight: '0' }} 
                                          count={Math.ceil(props.bodyData.length/props.limit)} 
                                          page={currPage+1}
                                          onChange={handleChange} 
                                      />
                              </StyledEngineProvider>
                      }
                  </div>
              ) : null
          }

        </div>
      );
}

export default TableMui
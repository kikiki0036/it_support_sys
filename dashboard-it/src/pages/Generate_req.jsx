import React, { useState, useEffect,forwardRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";

// import RenderDataEmp  from '../../assets/Field-RenderModel/RenderDataEmp';
// import RenderDataEmpIT  from '../../assets/Field-RenderModel/RenderDataEmpIT';

import { styled } from "@mui/material/styles";
import axios from "axios";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  InputBase,
  FormControlLabel,
  Switch,
  Typography,
  Tab,
  Tabs,
  Box,
  IconButton,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import "../components/generate/style.css";

import RenderData_Section from "../assets/Field-RenderModel/RenderData_Autocomplete/RenderData_Section";

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CssTextField_STDINPUT = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {},
  "& label.MuiInputLabel-root ": { fontSize: 15, fontFamily: "Kanit" },
  "& .MuiInput-underline:after": {},
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.mode === "light" ? "#969494" : "#2b2b2b",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "light" ? "#969494" : "#2b2b2b",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === "light" ? "#969494" : "#2b2b2b",
    },
  },
  "& .MuiOutlinedInput-input": { fontSize: 12, fontFamily: "Kanit" },
  "& .MuiInputBase-input": { fontSize: 12, fontFamily: "Kanit" },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0px 0px 4px #6262642f",
    fontSize: 12,
    fontFamily: "Kanit",
  },
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      // border: "1px solid #ccc",
      boxShadow: "0px 1px 2px #6262642f ",
      backgroundColor: theme.palette.common.white,
    },
    width: 80,
    color: theme.palette.common.white,
    backgroundColor: "none",
  },
}));

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {},
  "& label.MuiInputLabel-root ": {
    fontSize: 16,
  },
  "& .MuiInput-underline:after": {},
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.mode === "light" ? "#6262642f" : "#6262642f",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "light" ? "#62626467" : "#62626467",
    },
    "&.Mui-focused fieldset": {},
    "&.Mui-disabled fieldset": {
      borderColor: theme.palette.mode === "light" ? "#6262642f" : "#6262642f",
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 14,
    fontFamily: "Kanit",
    // fontFamily: ["Kanit"]
  },
  "& .MuiInputBase-input": {
    // fontSize: 14,
  },
}));

const Generate_req = () => {
  const [services, setServices] = useState([]);
  const [options, setOptions] = useState([]);
  const [allSection, setAllSection] = useState([]);
  const [open, setOpen] = useState(false);

  const [ItemOptions, setItemOptions] = useState([]);

  const [services_of_options, setServices_of_Options] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  const [temp1, setTemp1] = useState("");
  const DataServiceAndOptions = async (e) => {
    try {
      await axios
        .get("http://localhost:5000/getServiceType", {})
        .then((res) => {
          setServices(res.data);
        });

      await axios
        .get("http://localhost:5000/getServiceOption", {})
        .then((res) => {
          setOptions(res.data);
        });

      await axios.get("http://localhost:5000/getSec", {}).then((res) => {
        setAllSection(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setOpen(true);
    
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    DataServiceAndOptions();
  }, []);

  const [disabledBntn, setDisabledBtn] = useState(true);

  const [openItem1, setOpenItem1] = useState(false);
  const [openItem2, setOpenItem2] = useState(false);
  const [openSec, setOpenSec] = useState(false);

  const [optionsItem1, setOptionsItem1] = useState([]);
  const [optionsItem2, setOptionsItem2] = useState([]);
  const [secItem, setSecItem] = useState([]);

  const loadingItem1 = openItem1 && optionsItem1.length === 0;
  const loadingItem2 = openItem2 && optionsItem2.length === 0;
  const loadingItemSec = openSec && secItem.length === 0;

  const [valueService, setValueService] = useState([]);
  const [valueOption, setValueOption] = useState([]);
  const [section, setSection] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('ServiceType', valueService.id_type)
  //   localStorage.setItem('ServiceTypeName', valueService.title)
  // }, [valueService]);

  // useEffect(() => {
  //   localStorage.setItem('ServiceOption', valueOption.id_option)
  //   localStorage.setItem('ServiceOptionName', valueOption.title)

  // }, [valueOption]);

  useEffect(() => {
    if (valueService.length !== 0) {
      setDisabledBtn(false);
      setValueOption([]);
     
      const option_fin = options.filter((row) => {

      const rowcolummOptions = row.id_type;
      return rowcolummOptions===valueService.id_type

      });
      
      // console.log(option_fin);
      setServices_of_Options(option_fin);
      setItemOptions([]);
    } else {
      setDisabledBtn(true);
    }
  }, [valueService]);

  useEffect(() => {
    const DataItemsOptions = async (id_option) => {
      try {
        await axios
          .post("http://localhost:5000/getItemOption", {
            id_option: id_option,
          })
          .then((res) => {
            setItemOptions(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    if (valueOption.length !== 0) {
      DataItemsOptions(valueOption.id_option);
      console.log(ItemOptions);
    }
  }, [valueOption]);

  useEffect(() => {
    let active = true;

    if (!loadingItem1) {
      return undefined;
    }

    (async () => {
      await sleep(0.5e3); // For demo purposes.

      if (active) {
        setOptionsItem1([...services]);
        // open btn
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingItem1]);

  useEffect(() => {
    if (!openItem1) {
      setOptionsItem1([]);
      // setValueService([]);
    }
  }, [openItem1]);

  useEffect(() => {
    let active = true;

    if (!loadingItem2) {
      return undefined;
    }

    (async () => {
      await sleep(0.5e3); // For demo purposes.

      if (active) {
        setOptionsItem2([...services_of_options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingItem2]);

  useEffect(() => {
    if (!openItem2) {
      setOptionsItem2([]);
    }
  }, [openItem2]);

  useEffect(() => {
    let active = true;

    if (!loadingItemSec) {
      return undefined;
    }

    (async () => {
      await sleep(0.5e3); // For demo purposes.

      if (active) {
        setSecItem([...allSection]);
        // open btn
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingItemSec]);

  useEffect(() => {
    if (!openSec) {
      setSecItem([]);
    }
  }, [openSec]);
  
  const handleCloseModalSelect = () => {
    setIsSelect(false);
  };
  const onClickAcceptRole = async () => {
    // console.log(temp1,temp2,temp3,temp4);
    
    axios
      .post("http://localhost:5000/request", { data: temp1 })
      .then((response) => {
        console.log(response);
      });
      document.getElementById("requestf").reset();
      handleClick()
      handleCloseModalSelect();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const arr = [];
    // console.log(data.entries());
    for (let value of data.entries()) {
      // console.log();
      // console.log(value);
      // console.log(value[0]+ ', '+ value[1]);
      arr.push(value);

      // console.log(dataStore.get('ServiceType'));
    }
    setIsSelect(true)
    setTemp1(arr)
    // axios
    //   .post("http://localhost:5000/request", { data: arr })
    //   .then((response) => {
    //     console.log(response);
    //   });
    //   document.getElementById("requestf").reset();
    //   handleClick()
    // console.log(arr);
  };

  return (
    <div className="layout-component m_r">
      <h2 className="page-header">
        {"it service generate request".toUpperCase()}
      </h2>

      <div className="row box-scroll">
        <div className="col-12">
          <div className="card-g dataUser-min-h">
            <form className="row service-select" onSubmit={handleSubmit} id="requestf">
              <div className="col-12 header">IT &nbsp; SERVICE</div>

              <div className="box-fields-input-req">
              <Dialog
              open={isSelect}
              onClose={handleCloseModalSelect}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"  "}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  คุณต้องการที่จะส่งคำร้องใช่หรือไม่ ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModalSelect}>CANCEL</Button>
                <Button onClick={onClickAcceptRole} autoFocus>
                  CONFIRM
                </Button>
              </DialogActions>
            </Dialog>
                <Divider
                  sx={{
                    fontSize: 14,
                    fontFamily: "Kanit",
                    fontWeight: 500,
                    paddingX: 1.5,
                    paddingBottom: 1.5,
                    color: "#1976d2",
                  }}
                  textAlign="left"
                >
                  &nbsp; ข้อมูลผู้ร้องขอ &nbsp;
                </Divider>
              </div>

              <div className="box-fields-input-req" id="box-fields">
                <div className="dis-row">
                  <div className="fieldn">
                    <CssTextField
                      className="field-req"
                      id="requestor"
                      name="requestor"
                      label="Requestor"
                      type="text"
                      // variant="standard"
                      required
                      sx={{ width: 320, fontSize: 10 }}
                      value={localStorage.getItem("username_login")}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      บันทึกสำเร็จ
                    </Alert>
                  </Snackbar>
                  <div className="fieldn">
                    {/* <CssTextField_STDINPUT className="field-req" id='section' name='section' label='Section' type="text" variant="standard" 
                                                sx={{ width: 320 ,fontSize: 10}}
                                                InputLabelProps={{ shrink: true }}
                                    /> */}

                    <Autocomplete
                      id="section"
                      sx={{ width: 320, fontSize: 10 }}
                      // open={openItem1}
                      open={openSec}
                      onOpen={() => {
                        setOpenSec(true);
                      }}
                      onClose={() => {
                        setOpenSec(false);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.section === value.section
                      }
                      getOptionLabel={(option) => option.section}
                      options={secItem}
                      loading={loadingItemSec}
                      value={section.length !== 0 ? section : null}
                      onChange={(event, value) => {
                        if (value == null) {
                          setSection([]);
                        } else {
                          setSection(value);
                        }
                      }}
                      renderInput={(params) => (
                        <CssTextField
                          {...params}
                          label="Section"
                          // margin="normal"
                          title=""
                          // oninvalid="You must fill out the form!"
                          required
                          fullWidth
                          type="text"
                          id="section"
                          name="section"
                          autoComplete="name"
                          // autoFocus
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loadingItemSec ? (
                                  <CircularProgress color="inherit" size={15} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="dis-row">
                  <div className="fieldn">
                    <CssTextField
                      className="field-req"
                      id="mail"
                      name="mail"
                      label="Mail"
                      type="text"
                      // variant="standard"
                      required
                      sx={{ width: 320, fontSize: 10 }}
                      value={
                        localStorage.getItem("mail_user_login") == null
                          ? "-"
                          : localStorage.getItem("mail_user_login")
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="fieldn">
                    <CssTextField
                      className="field-req"
                      id="tel"
                      name="tel"
                      label="Tel"
                      type="text"
                      // variant="standard"
                      required
                      value={
                        localStorage.tel == null
                          ? "-"
                          : localStorage.tel
                      }
                      sx={{ width: 320, fontSize: 10 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                </div>
              </div>

              <div className="box-fields-input-req">
                <Divider
                  sx={{
                    fontSize: 14,
                    fontFamily: "Kanit",
                    fontWeight: 500,
                    paddingX: 1.5,
                    paddingBottom: 1.5,
                    color: "#1976d2",
                  }}
                  textAlign="left"
                >
                  &nbsp; เลือกประเภท และ หัวข้อบริการ &nbsp;
                </Divider>
              </div>

              <div className="box-fields-input-req">
                <div className="dis-row">
                  <div className="fieldn">
                    <LightTooltip
                      title="เลือกประเภทบริการ"
                      placement="top-start"
                      // disableFocusListener={false}
                      // disableHoverListener={false}
                      // disableTouchListener={false}
                      arrow
                    >
                      <Autocomplete
                        id="ServiceType1"
                        sx={{ width: 320, fontSize: 10 }}
                        // open={openItem1}
                        open={openItem1}
                        onOpen={() => {
                          setOpenItem1(true);
                        }}
                        onClose={() => {
                          setOpenItem1(false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.title === value.title
                        }
                        getOptionLabel={(option) => option.title}
                        options={optionsItem1}
                        loading={loadingItem1}
                        value={valueService.length !== 0 ? valueService : null}
                        onChange={(event, value) => {
                          if (value == null) {
                            setValueService([]);
                            setValueOption([]);
                            setItemOptions([]);
                          } else {
                            setValueService(value);
                          }
                        }}
                        renderInput={(params) => (
                          <CssTextField
                            {...params}
                            label="Service Type"
                            // margin="normal"
                            title=""
                            // oninvalid="You must fill out the form!"
                            required
                            fullWidth
                            type="text"
                            id="ServiceType"
                            name="ServiceType"
                            autoComplete="name"
                            // autoFocus
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loadingItem1 ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={15}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    </LightTooltip>
                  </div>
                  <div className="fieldn">
                    <LightTooltip
                      title="เลือกหัวข้อบริการ"
                      placement="top-start"
                      // disableFocusListener={false}
                      // disableHoverListener={false}
                      // disableTouchListener={false}
                      arrow
                    >
                      <Autocomplete
                        disabled={disabledBntn}
                        id="asynchronous-demo2"
                        sx={{ width: 320 }}
                        open={openItem2}
                        onOpen={() => {
                          setOpenItem2(true);
                        }}
                        onClose={() => {
                          setOpenItem2(false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.title === value.title
                        }
                        getOptionLabel={(option) => option.title}
                        options={optionsItem2}
                        loading={loadingItem2}
                        value={valueOption.length !== 0 ? valueOption : null}
                        onChange={(event, value) => {
                          if (value === null) {
                            setValueOption([]);
                          } else {
                          
                            setValueOption(value);
                          }
                        }}
                        renderInput={(params) => (
                          <CssTextField
                            {...params}
                            label="Service Option"
                            title=""
                            // margin="normal"
                            required
                            fullWidth
                            type="text"
                            id="ServiceOption"
                            name="ServiceOption"
                            autoComplete="name"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loadingItem2 ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={15}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    </LightTooltip>
                  </div>
                </div>
              </div>

              {ItemOptions.length === 0 ? null : (
                <div className="box-fields-input-req">
                  <Divider
                    sx={{
                      fontSize: 14,
                      fontFamily: "Kanit",
                      fontWeight: 500,
                      paddingX: 1.5,
                      paddingBottom: 1.5,
                      color: "#1976d2",
                    }}
                    textAlign="left"
                  >
                    &nbsp;รายละเอียดข้อมูลเกี่ยวกับ หัวข้อบริการ :{" "}
                    {valueOption.title} &nbsp;
                  </Divider>
                </div>
              )}

              <div className="box-fields-input-req" id="box-fields">
                <div className="dis-row">
                  {ItemOptions.length === 0
                    ? null
                    : ItemOptions.map((row, index) => (
                        <div className="fieldn">
                          <CssTextField
                            className="field-req"
                            id={row.id_item}
                            name={
                              row.id_item + "&" + row.service_items[0].title
                            }
                            label={row.service_items[0].title}
                            type="text"
                            required
                            // variant="standard"
                            sx={{ width: 320, fontSize: 10 }}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{maxLength: 100}}
                            placeholder={row.service_items[0].description }
                          />
                        </div>
                      ))}
                </div>
              </div>

              <div className="box-fields-input-req" id="box-fields">
                <div className="dis-row-end">
                  <Button
                    type="submit"
                    variant="outlined"
                    // onClick={handleNext}
                    sx={{ mr: 1, fontSize: 14, fontFamily: "Kanit" }}
                  >
                    ส่งคำร้อง
                  </Button>
                </div>
              </div>

              {/* <div className="typewrite-h">
                                <span className="wrap">If you want help from IT Support please select a service type and select service</span>
                            </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate_req;

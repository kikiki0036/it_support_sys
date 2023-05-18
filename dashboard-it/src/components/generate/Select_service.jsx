import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@mui/material/styles";
import axios from 'axios';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import './style.css'

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const LightTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: "0px 0px 4px #6262642f",
      fontSize: 12,
      fontFamily: 'Kanit'
    },
    [`& .${tooltipClasses.arrow}`]: {
      "&:before": {
        // border: "1px solid #ccc",
        boxShadow: "0px 1px 2px #6262642f ",
        backgroundColor: theme.palette.common.white,
  
      },
      width: 80,
      color: theme.palette.common.white,
      backgroundColor: "none"
    },
}));


const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
  },
  "& label.MuiInputLabel-root ": {
    fontSize: 14,  

  },
  "& .MuiInput-underline:after": {
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.mode === "light" ? "#6262642f" : "#6262642f",  

    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === "light" ? "#62626467" : "#62626467",    

    },
    "&.Mui-focused fieldset": {
     
    },
    "&.Mui-disabled fieldset": {
      borderColor: theme.palette.mode === "light" ? "#6262642f" : "#6262642f",    
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 14,
    fontFamily: 'Kanit'
    // fontFamily: ["Kanit"]
  },
  "& .MuiInputBase-input": {
    // fontSize: 14,   

  }
}));

const Select_service = () => {
  const [services, setServices] = useState([]);  
  const [options, setOptions] = useState([]);  

  const [services_of_options, setServices_of_Options] = useState([]);  


  const DataServiceAndOptions = async (e) => {
      try {

          await axios.get('http://localhost:5000/getServiceType', { }).then((res) => {  
            setServices(res.data);
          })

          await axios.get('http://localhost:5000/getServiceOption', { }).then((res) => {  
            setOptions(res.data);
          })

      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    DataServiceAndOptions();
  },[]);

  const [disabledBntn, setDisabledBtn] = useState(true);

  const [openItem1, setOpenItem1] = useState(false);
  const [openItem2, setOpenItem2] = useState(false);

  const [optionsItem1, setOptionsItem1] = useState([]);
  const [optionsItem2, setOptionsItem2] = useState([]);

  const loadingItem1 = openItem1 && optionsItem1.length === 0;
  const loadingItem2 = openItem2 && optionsItem2.length === 0;

  const [valueService, setValueService] = useState([]);
  const [valueOption, setValueOption] = useState([]);

  // useEffect(() => {
  //   var elements = document.getElementsByClassName('typewrite');
  //   for (var i=0; i<elements.length; i++) {
  //       var toRotate = elements[i].getAttribute('data-type');
  //       var period = elements[i].getAttribute('data-period');
  //       if (toRotate) {
  //         new TxtType(elements[i], JSON.parse(toRotate), period);
  //       }
  //   }
  //   // INJECT CSS
  //   var css = document.createElement("style");
  //   css.type = "text/css";
  //   css.innerHTML = ".typewrite > .wrap { border-right: 0.3em solid #cecece}";
  //   document.body.appendChild(css);
  // }, []);

    // useEffect(() => {
    //   if(services.length > 0) {
    //     setValueService(services[0])
    //   }
    // },[services]);


  useEffect(() => {
    localStorage.setItem('ServiceType', valueService.id_type)
    localStorage.setItem('ServiceTypeName', valueService.title)
  }, [valueService]);

  useEffect(() => {
    localStorage.setItem('ServiceOption', valueOption.id_option)
    localStorage.setItem('ServiceOptionName', valueOption.title)

  }, [valueOption]);

  useEffect(() => {
    if (valueService.length !== 0 ) {
      setDisabledBtn(false);
      setValueOption([]);
      const option_fin = options.filter((row) => {
          const rowcolummOptions = row.id_type
          return rowcolummOptions.toLowerCase().includes(valueService.id_type.toLowerCase());
      })

      setServices_of_Options(option_fin);

    } else {
      setDisabledBtn(true);
    }
  }, [valueService]);

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

  return (
    <div className="row service-select">
      <div className="col-12 header">
          IT &nbsp; SERVICE
      </div>
      <div className="col-12 field-select">
          <LightTooltip title="เลือกประเภทบริการ"
               placement="top-start"
                // disableFocusListener={false} 
                // disableHoverListener={false} 
                // disableTouchListener={false} 
                arrow
              >
              <Autocomplete
                id="ServiceType1"
                sx={{ width: 320 ,fontSize: 10}}
                // open={openItem1}
                open={openItem1}
                onOpen={() => { setOpenItem1(true);}}
                onClose={() => { setOpenItem1(false);}}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                getOptionLabel={(option) => option.title}
                options={optionsItem1}
                loading={loadingItem1}
                value={valueService.length !== 0 ? valueService : null}
                onChange={(event, value) => {
                  if(value == null) {
                    setValueService([])
                    setValueOption([])
                  } else {
                    setValueService(value)
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
                          {loadingItem1 ? <CircularProgress color="inherit" size={15} /> : null}
                          {params.InputProps.endAdornment}
                          
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
          </LightTooltip>
          <LightTooltip title="เลือกหัวข้อบริการ"
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
                onOpen={() => { setOpenItem2(true); }}
                onClose={() => { setOpenItem2(false); }}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                getOptionLabel={(option) => option.title}
                options={optionsItem2}
                loading={loadingItem2}
                value={valueOption.length !== 0 ? valueOption : null}
                onChange={(event, value) => {
                  if(value === null) {
                    setValueOption([])
                  } else {
                    setValueOption(value)
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
                          {loadingItem2 ? <CircularProgress color="inherit" size={15} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
          </LightTooltip>

      </div>
      <div className="typewrite-h">
        {/* <a href="" class="typewrite" data-period="2000" data-type='[ "If you want Help from IT Support", "Please select a service type", "And Select service" ]'> */}
          <span className="wrap">If you want help from IT Support please select a service type and select service</span>
        {/* </a> */}
      </div>

    </div>
  );
}

export default Select_service

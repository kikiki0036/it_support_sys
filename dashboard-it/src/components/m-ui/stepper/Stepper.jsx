import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import SettingsIcon from '@mui/icons-material/Settings';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { createTheme } from '@mui/system';
import moment from "moment";
import "moment-timezone";
// import dateShortcode from 'date-shortcode'

import './stepper.css'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 15,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:'linear-gradient(to right, rgb(255, 255, 255), #058dfa, rgb(255, 255, 255))',
            // backgroundImage:'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:'linear-gradient(to right, rgb(255, 255, 255), #058dfa, rgb(255, 255, 255))',
            // backgroundImage:'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 2,
        border: 0,
        backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));
  
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)',
        // backgroundImage:'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,20%), 0px 1px 1px 0px rgba(0,0,0,14%), 0px 1px 3px 0px rgba(0,0,0,12%)',

    }),
    ...(ownerState.completed && {
        backgroundImage:'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)',
        // boxShadow: '0px 2px 1px -1px rgba(0,0,0,20%), 0px 1px 1px 0px rgba(0,0,0,14%), 0px 1px 3px 0px rgba(0,0,0,12%)',

        // backgroundImage:'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));
  


// const themeColor = createTheme({
//     palette: {
//       background: {
//         paper: 'rgb(226, 226, 226)',
//       },
//       text: {
//         primary: 'rgb(192, 48, 192)',
//         secondary: '#46505A',
//       },
//       action: {
//         active: '#001E3C',
//       },
//       success: {
//         dark: '#009688',
//       },
//     },
// });

let dataStore = new FormData();
let dataStorebuf;

// dataStore.append('ServiceType' , '');
// dataStore.append('ServiceOption' , '');

const Stepper_C = (props) => {

    const [activeStep, setActiveStep] = useState(0);

    // const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")
    // const DatecurrentforID = moment().tz("Asia/Bangkok").format("YYMMDD")

    const formatDateTime = (datetime) => {
      let subDatetime = datetime.split(" ")
      let subDate = subDatetime[0].split("/")
      
      // let splitDate = datetime.substring()
      return  subDate[2] + "-" + subDate[1] + "-" + subDate[0] + " " + subDatetime[1]
    }  
  
    const [LastTkID, setLastTkID] = useState([]);  
    const [LastJobNo, setLastJobNo] = useState([]);  
    const [newidTk, setNewidTk] = useState('xxxxxxxx-xxxxxx');  
    // const [newidJOB, setNewidJOB] = useState('xxxxxxxxxxxxxx');  

  
    const LastTikket = async (e) => {
      try {
        await axios.get('http://localhost:5000/LastTikket', { }).then((res) => {  
          setLastTkID(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    }
    
    // console.log(formatDateTime(dataStore.get('jobstart')))

    useEffect(() => {
      
      const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")
      const DatecurrentforID = moment().tz("Asia/Bangkok").format("YYMMDD")

      const LastJob = async (e) => {
        try {
          await axios.get('http://localhost:5000/LastJob', { }).then((res) => {  
            setLastJobNo(res.data);
          })
        } catch (error) {
          console.log(error);
        }
      }

      const CreateItemTK = async (id_tk, id_item, value) => {
        // e.preventDefault();
        try {
            await axios.post('http://localhost:5000/CreateItemTK', {
              id_tk: id_tk,
              id_item: id_item,
              value: value,
            });
        } catch (error) {
          console.log(error);
        }
      }

      const CreateTK = async (newID) => {
        // e.preventDefault();
        try {
  
            let Status = "waite"
            let review_by = null
            if(localStorage.getItem('IDUser_login') !== null && localStorage.getItem('IDUser_login').substring(0,2) === "IT") {
              Status =  "approve"
              review_by = dataStorebuf.get('appoveby')
            }
  
            await axios.post('http://localhost:5000/CreateTikket', {
              tikket_no: newID,
              requestor: dataStorebuf.get('requestor'),
              tel: dataStorebuf.get('tel'),
              service_type: dataStorebuf.get('ServiceType'),
              service_option: dataStorebuf.get('ServiceOption'),
              tikket_date: Datecurrent,
              status: Status,
              review_by: review_by,
              createJob_by: review_by
            });
  
            let rowdataitems = JSON.parse(dataStorebuf.get('items'));
            for(var value in rowdataitems) {
              CreateItemTK(newID, rowdataitems[value].id_item, rowdataitems[value].value)
            }
  
            if(localStorage.getItem('IDUser_login') !== null && localStorage.getItem('IDUser_login').substring(0,2) === "IT") {
              LastJob()
            }
    
        } catch (error) {
          console.log(error);
        }
      }

      
      // CreateTK();
      if(LastTkID.length > 0) {
        let id_index = parseInt(LastTkID[0].tikket_no.split("-")[1])
        let new_id = ""
        let nameId = "tk" + DatecurrentforID + "-"

        if ((id_index + 1) < 10) {
          new_id = nameId + "00000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
          new_id = nameId + "0000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
          new_id = nameId + "000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
          new_id = nameId + "00"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10000) {
          new_id = nameId + "0"+ ( id_index + 1 ).toString()

        } else {
          new_id = nameId + ( id_index + 1 ).toString()
        }
        setNewidTk(new_id)
        CreateTK(new_id)
      }
    }, [LastTkID])
  


    useEffect(() => {
      const Datecurrent = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")
      const DatecurrentforID = moment().tz("Asia/Bangkok").format("YYMMDD")
      const CreateJOB = async (newID) => {
        // e.preventDefault();
        try {
            await axios.post('http://localhost:5000/CreateJob', {
              job_no: newID,  
              appove_by: dataStorebuf.get('appoveby'),
              assign_by: dataStorebuf.get('appoveby'),
              assign_to: dataStorebuf.get('assign'),
              assign_detail: dataStorebuf.get('assigndetail'),
              job_date: Datecurrent,
              open_date: null,
              start_date: formatDateTime(dataStorebuf.get('jobstart')),
              target_date: formatDateTime(dataStorebuf.get('jobtarget')),
              close_date: null,
              rootcase: "-",
              rootitem: "-",
              solutionnote: null,
              status: "pending",
              tikket_no: newidTk,
            });
        } catch (error) {
          console.log(error);
        }
      }

      // CreateJOB();
      if(LastJobNo.length > 0) {
        let id_index = parseInt((LastJobNo[0].job_no).substring(8,))
        let new_id = ""
        let nameId = "RQ" + DatecurrentforID
        if ((id_index + 1) < 10) {
          new_id = nameId + "00000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10 && (id_index + 1) < 100) {
          new_id = nameId + "0000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 100 && (id_index + 1) < 1000) {
          new_id = nameId + "000"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 1000 && (id_index + 1) < 10000) {
          new_id = nameId + "00"+ ( id_index + 1 ).toString()

        } else if ((id_index + 1) >= 10000) {
          new_id = nameId + "0"+ ( id_index + 1 ).toString()
        } else {
          new_id = nameId + ( id_index + 1 ).toString()
        }

        // setNewidJOB(new_id)
        CreateJOB(new_id)
      }
    }, [LastJobNo])


    const ColorlibStepIcon = (item) => {
        const { active, completed, className } = item;
        const icons = props.icon;
        // const icons = {
        //     1: <SettingsIcon sx={{ fontSize: 16 }} />,
        //     2: <GroupAddIcon sx={{ fontSize: 16 }} />,
        //     3: <VideoLabelIcon sx={{ fontSize: 16 }} />,
        // };
        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(item.icon)]}
            </ColorlibStepIconRoot>
        );
    }
      
    ColorlibStepIcon.propTypes = { 
        active: PropTypes.bool,
        className: PropTypes.string,
        completed: PropTypes.bool,
        icon: PropTypes.node,
    };

    
    //content header
    const steps = props.stepContent;

    const _renderStepContent = (step) => {
         return  props.contents[step](dataStore);
    }
    // const _renderStepContent = (step) => {
    //     switch (step) {
    //         case 0:
    //             return props.contents[0]();
    //         case 1:
    //             return props.contents[1]();
    //         case 2:
    //             return <div>content 3</div>;
    //         default:
    //             return <div></div>;
    //     }
    // }

    // const handleNext = () => {
    //     activeStep === steps.length - 1 ? setActiveStep(0) : setActiveStep(activeStep + 1 )
    // }    

    // const handleBack = () => {
    //     setActiveStep(activeStep - 1) 
    // }    

    const handleCancel = () => {
        setActiveStep(0); 
        let x = new FormData();
        dataStore = x;
    }    

    // useEffect(() => {

    // },[]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(activeStep === 3) {
          // LastTikket()
          let x = new FormData();
          dataStorebuf = x
          dataStorebuf = dataStore
          LastTikket()
          dataStore = x

        } else if (activeStep === 0) {

                      dataStore.set("ServiceType" , localStorage.getItem('ServiceType'));   
                      dataStore.set("ServiceOption" , localStorage.getItem('ServiceOption')); 
                      dataStore.set("ServiceTypeName" , localStorage.getItem('ServiceTypeName'));   
                      dataStore.set("ServiceOptionName" , localStorage.getItem('ServiceOptionName'));                                       

        } else if (activeStep === 1) {

                    let databuf = [];
                    for(var value of data.entries()) {
                        databuf.push({id_item:value[0].split('&')[0], title:value[0].split('&')[1], value:value[1]})
                    }
                    let details = JSON.stringify(databuf);
                    dataStore.append('items', details); 

        } else if (activeStep === 2) {

                  for(let value of data.entries()) {
                      dataStore.set(value[0] , value[1]);
                  }
                  // DataAllItemchecked.findIndex(object => { return object.id_item === item1 }) id_profile_emp_login
                  // dataStore.set("requestor", "PF" + dataStore.get('requestor'))
                  dataStore.set("requestor", localStorage.getItem('id_emp_login'))

        }
        //  else {

        //             for(var value of data.entries()) {
        //                 dataStore.set(value[0] , value[1]);
        //             }
        // }
               
        console.log("-------------------" + activeStep + "-------------------")
        for(let value of dataStore.entries()) {
            console.log(value[0]+ ', '+ value[1]);
            // console.log(dataStore.get('ServiceType'));
        }
        console.log("-------------------" + activeStep + "-------------------")
        

        // console.log(localStorage.getItem('ServiceType'))
        // console.log(localStorage.getItem('ServiceOption'))

        // localStorage.setItem('ServiceType', dataStore.get('ServiceType'))
        // localStorage.setItem('ServiceOption', dataStore.get('ServiceOption'))

        // console.log(localStorage.getItem('ServiceType'))
        // console.log(localStorage.getItem('ServiceOption'))

        // console.log({
        //     ServiceType: data.get('ServiceType'),
        //     ServiceItem: data.get('ServiceOption'),
        // });

        activeStep === steps.length - 1 ? setActiveStep(0) : setActiveStep(activeStep + 1 )
    };

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {
                    steps.map((label, index) => (
                        <Step key={"label"+index} sx={{ mt: 2 }}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            
            <form className="Containerstepper" onSubmit={handleSubmit}    >
                {
                    _renderStepContent(activeStep)
                }

                <div className="btn-stepContent">
                        {
                            activeStep > 0 ?  
                            <Button 
                                disabled={activeStep === 0}
                                onClick={handleCancel}
                                sx={{ mr: 1 }}
                                >
                                Cancel
                            </Button>
                            : null
                        }
                       
                        <Button
                            type="submit" 
                            // onClick={handleNext} 
                            sx={{ mr: 1 }}
                            >
                            {
                                activeStep === steps.length - 1
                                ? 'Create'
                                : 'Next'
                            }
                        </Button>
                </div>
            </form>
        </Stack>
    );
}

export default Stepper_C
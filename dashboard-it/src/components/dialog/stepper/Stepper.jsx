import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//     color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
//     display: 'flex',
//     height: 22,
//     alignItems: 'center',
//     ...(ownerState.active && {
//       color: '#784af4',
//     }),
//     '& .QontoStepIcon-completedIcon': {
//       color: '#784af4',
//       zIndex: 1,
//       fontSize: 18,
//     },
//     '& .QontoStepIcon-circle': {
//       width: 8,
//       height: 8,
//       borderRadius: '50%',
//       backgroundColor: 'currentColor',
//     },
// }));
  
// function QontoStepIcon(props) {
//     const { active, completed, className } = props;
  
//     return (
//       <QontoStepIconRoot ownerState={{ active }} className={className}>
//         {completed ? (
//           <Check className="QontoStepIcon-completedIcon" />
//         ) : (
//           <div className="QontoStepIcon-circle" />
//         )}
//       </QontoStepIconRoot>
//     );
// }
  
// QontoStepIcon.propTypes = {
//     active: PropTypes.bool,
//     className: PropTypes.string,
//     completed: PropTypes.bool,
// };
  
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
    // fontSize: 10,
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
        boxShadow: '0 3px 8px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)'
        // backgroundImage:'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));
  

function ColorlibStepIcon(props) {
    console.log(props)
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon sx={{ fontSize: 16 }} />,
        2: <GroupAddIcon sx={{ fontSize: 16 }} />,
        3: <VideoLabelIcon sx={{ fontSize: 16 }} />,
    };
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}
  
ColorlibStepIcon.propTypes = { 
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <div>content 1</div>;
        case 1:
            return <div>content 2</div>;
        case 2:
            return <div>content 3</div>;
        default:
            return <div></div>;
    }
}

const Stepper_C = () => {
    const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        activeStep === steps.length - 1 ? setActiveStep(0) : setActiveStep(activeStep + 1 )
    }    

    const handleBack = () => {
        setActiveStep(activeStep - 1) 
    }    

    useEffect(() => {

    },[]);

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {
                    steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                    ))
                }
            </Stepper>
            <div className="box-stepContent">
                {
                    _renderStepContent(activeStep)
                }
            </div>

             <div className="btn-stepContent">

                <Button 
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    Back
                </Button>
                <Button 
                    onClick={handleNext} 
                    sx={{ mr: 1 }}
                    >
                    {
                        activeStep === steps.length - 1
                        ? 'Create'
                        : 'Next'
                    }
                </Button>
               
            </div>
        </Stack>
    );
}

export default Stepper_C
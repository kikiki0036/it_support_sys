import React, { useEffect } from 'react'

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import {
    Box
} from '@mui/material';
function Progress(props) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={45}
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
                size={45}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

const Verify = () => {
    
    ///////////////////////////////////////
   
    const history = useHistory();

    useEffect(() => {

        const refreshToken = async () => {
        
            try {
                await axios.get('http://localhost:5000/token',).then((res) => {               
                     history.push("/it-service/it-support/");
                })
                
            } catch (error) {
                if (error.response) {
                    history.push("/it-service-login");
                }
            }
        }
    
        refreshToken();
        // getUsers();
    }, []);

    return (

        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}
        >
            <Progress />
        </Box>

    )
}

export default Verify
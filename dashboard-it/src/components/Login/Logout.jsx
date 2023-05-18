import React, {useEffect} from 'react'

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

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        const Logout = async () => {
            try {
                await axios.delete('http://localhost:5000/logout').then((res) => {               
                    history.push("/it-service-login");
                    history.go(0)
               });

               localStorage.setItem('id_user_login', "")

                // window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }

        Logout()

    }, []);


    localStorage.setItem('assignJob_prom', "")

    localStorage.setItem('id_user_login', "")

    localStorage.setItem('mail_user_login', "")

    localStorage.setItem('role_user_login', "")

    localStorage.setItem('username_login', "")

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

export default Logout
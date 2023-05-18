import React, { useState, useEffect } from 'react'

import './layout.css'

import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'

/////////////////////////////////////////////////////

import axios from 'axios';

import jwt_decode from "jwt-decode";

import { useHistory } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import RoutesIT from '../RoutesIT'
import RoutesUSER from '../RoutesUSER'
import RoutesAdmin from '../RoutesAdmin'
import ContentRigth from '../content-rigth/Content_rigth'
import { 
    Skeleton,
    Box
    
} from '@mui/material';

import Chatbot from '../../pages/Chatbot'
// import DatePickerExample from '../date-calendar/DatePickerCalendarExample';
// import Note from '../note/note'
// import Editor from '../../components/Editor/Edit';

// import Manage_task from '../../pages/manage_task'

const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))

    }, [dispatch]) 
    
    ///////////////////////////////////////   jwt.sign({id_user, user_name, mail, level_user}, process.env.ACCESS_TOKEN_SECRET,{
    const [username, setUsername] = useState('loading...');
    const [id_user, setIduser] = useState('loading...');
    const [mail, setMail] = useState('loading...');
    const [tname, setTname] = useState('loading...');
    const [tel, setTel] = useState('loading...');
    const [role, setRole] = useState("loading...");
    

    // const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // const [users, setUsers] = useState([]);
    // const history = useHistory();
    const history = useHistory();

    useEffect(() => {

        const refreshToken = async () => {
        
            try {
                await axios.get('http://localhost:5000/token',).then((res) => {  
                    const decoded = jwt_decode(res.data.accessToken);
                    setUsername(decoded.user_name);
                    setMail(decoded.mail)
                    setIduser(decoded.id_user);
                    setRole(decoded.role);
                    setExpire(decoded.exp); 
                    setTname(decoded.tname);    
                    setTel(decoded.tel)
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

    
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            await axios.get('http://localhost:5000/token',).then(res => {  
                config.headers.Authorization = `Bearer ${res.data.accessToken}`;
                const decoded =  jwt_decode(res.data.accessToken);
                setUsername(decoded.user_name);
                setMail(decoded.mail)
                setIduser(decoded.id_user);
                setRole(decoded.role);
                setExpire(decoded.exp); 
            })
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // const getUsers = async () => {

    //     const response = await axiosJWT.get('http://localhost:5000/users', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     setUsers(response.data);
    // }


    useEffect(() => {
        if(id_user !== 'loading...') {
            localStorage.setItem('id_user_login', id_user)
        }
    }, [id_user]);

    useEffect(() => {
        if(mail !== 'loading...') {
            if(mail === null)
            {
                localStorage.setItem('mail_user_login', "-")
            }
            else
            {
                localStorage.setItem('mail_user_login', mail)
            }
           
        }
    }, [mail]);

    useEffect(() => {
        if(role !== 'loading...') {
            localStorage.setItem('role_user_login', role)
            // role === "ROLE-IT-STAFF" || role === "ROLE-IT-MANAGER" || role === "ROLE-ADMIN" ?  history.push("/it-service/it-support/"): history.push("/it-service/it-support/generate-req");
        }
    }, [role]);

    useEffect(() => {
        if(username !== 'loading...') {
            localStorage.setItem('username_login', username)
        }
    }, [username]);
    useEffect(() => {
        if(tname !== 'loading...') {
            localStorage.setItem('tname', tname)
        }
    }, [tname]);
    useEffect(() => {
        if(tel !== 'loading...') {
            localStorage.setItem('tel', tel)
        }
    }, [tel]);
  


    return (
        <BrowserRouter>
            <Route render={(props) => (
                
                    role !== "" ?

                       <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>

                            <Sidebar {...props}
                                UserRole = {role}
                            />

                            {/* <Manage_task/> */}
                            <div className="layout__content">
                                <TopNav
                                    IDUser = {id_user}
                                    UserName = {username}
                                />
                            
                                {
                                    role === "ROLE-IT-STAFF"?
                                            <div className="layout__content-main">
                                                <RoutesIT/>
                                                <Chatbot/>  
                                                <ContentRigth
                                                    IDUser = {id_user}
                                                />
                                            </div>
                                        :null
                                }
                                  {
                                    role === "ROLE-EMP"?
                                            <div className="layout__content-main">
                                                <RoutesUSER/>
                                                <Chatbot/>  
                                                <ContentRigth
                                                    IDUser = {id_user}
                                                />
                                            </div>
                                        :null
                                }
                                  {
                                    role ==="ROLE-ADMIN"?
                                            <div className="layout__content-main">
                                                <RoutesAdmin/>
                                                <Chatbot/>  
                                                <ContentRigth
                                                    IDUser = {id_user}
                                                />
                                            </div>
                                        :null
                                }
                                            

                             


                          

                            </div>
                            {/* <Chatbot/>   */}

                        </div>

                    :
                        null

            )}/>

        </BrowserRouter>
    )
}

export default Layout

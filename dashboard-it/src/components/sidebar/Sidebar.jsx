import { React, useEffect, useState} from "react";

import { Link } from 'react-router-dom'

import './sidebar.css'
// import logo from '../../assets/images/logo.png'
// import sidebar_items from '../../assets/JsonData/sidebar_routes.json'

import axios from 'axios';

import { 
    Skeleton,
    Box
    
} from '@mui/material';

const SidebarItem = props => {

    useEffect(() => {
        const buttons = document.querySelectorAll('div.ef-hover')
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function (e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;
                let ripples = document.createElement('span');
                ripples.classList.add('span-hover');

                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';

                this.appendChild(ripples);
                setTimeout(() => {
                    ripples.remove();
                }, 1000);

            })

        })
    }, []);

    const active = props.active ? 'active' : ''
    
    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <div className={`ef-hover ${active}`}>
                    <i className={props.icon}></i>  
                </div>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    const sidebar_items = { 
        AccessRoleUSER :[
            {
                "display_name": "Generate",
                "route": "/it-service/it-support/generate-req",
                "icon": "bx bx-wrench"
            },
            {
                "display_name": "Notebook Center",
                "route": "/it-service/it-support/notebook_center",
                "icon": "bx bx-desktop"
            }
            ,
            {
                "display_name": "History",
                "route": "/it-service/it-support/history",
                "icon": "bx bx-book-alt"
            }
        ],
        AccessRoleIT :[
            {
                "display_name": "Manage Job",
                "route": "/it-service/it-support/",
                "icon": "bx bx-category-alt"
            },
            {
                "display_name": "Data",
                "route": "/it-service/it-support/customers",
                "icon": "bx bx-user-pin"
            },
            {
                "display_name": "Generate",
                "route": "/it-service/it-support/generate-req",
                "icon": "bx bx-wrench"
            },
            {
                "display_name": "Request",
                "route": "/it-service/it-support/request",
                "icon": "bx bx-task"
            },
            {
                "display_name": "Manage Task",
                "route": "/it-service/it-support/manage-task-job",
                "icon": "bx bxl-microsoft-teams"
            },
            {
                "display_name": "Notebook Center",
                "route": "/it-service/it-support/notebook-center",
                "icon": "bx bx-desktop"
            },
            {
                "display_name": "History",
                "route": "/it-service/it-support/history",
                "icon": "bx bx-book-alt"
            }
        ],
        AccessRoleADMIN :[
            {
                "display_name": "Config Service",
                "route": "/it-service/it-support/config",
                "icon": "bx bx-cog"
            },
            {
                "display_name": "Config Chatbot",
                "route": "/it-service/it-support/chatbotconfig",
                "icon": "bx bx-cog"
            },
        ],

    }

    let activeItem 

    if(props.UserRole === "ROLE-IT-STAFF" ) {
        activeItem = sidebar_items.AccessRoleIT.findIndex(item => item.route === props.location.pathname)

    } 
    else if(props.UserRole === "ROLE-ADMIN")
    {
        activeItem = sidebar_items.AccessRoleADMIN.findIndex(item => item.route === props.location.pathname)
    }
    
    else {
        activeItem = sidebar_items.AccessRoleUSER.findIndex(item => item.route === props.location.pathname)

    }
    // useEffect(() => {
    //     const Dataerp_prom = async (e) => {
    //         try {

    //             if(e.substring(0,2) === "IT") {
    //                 await axios.post('http://localhost:5000/geterp_prom', {
    //                     id_login : [e]

    //                  }).then((res) => {  
    //                     setErp_prom(res.data);

    //                 })

    //             } 

    //             // else {
    //             //     setErp_prom([{  
    //             //         "manage_job": false,
    //             //         "create_job": true,
    //             //         "asst_job": false,
    //             //         "approve_job": false,
    //             //         "service_config": false,
    //             //         "manageProfile":false,
    //             //         "notebook_center": true
    //             //     }]);

    //             // }
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     if(localStorage.getItem('IDUser_login') != null){
    //         Dataerp_prom(localStorage.getItem('IDUser_login'))
    //     }

    // }, [localStorage.getItem('IDUser_login')]);

    // useEffect(() => {
    //     if(erp_prom.length > 0) {
    //         localStorage.setItem('assignJob_prom', erp_prom[0].asst_job)
    //     }

    // }, [erp_prom]);

    return (
        <div className='sidebar'>

            <div className='sidebar__box'>

                <div className="sidebar__logo">
                    {/* <h1>APEX</h1> */}
                    <div className="waviy-sidebar">
                        <span style={{"--i":1}}>A</span>
                        <span style={{"--i":2}}>P</span>
                        <span style={{"--i":3}}>E</span>
                        <span style={{"--i":4}}>X</span>
                    </div>
                    <p>@apexcircuit thailand</p>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-light css-hr"/>
                {
                    props.UserRole !== "" ? 

                        props.UserRole === "ROLE-IT-STAFF" ?
                            sidebar_items.AccessRoleIT.map((item, index) => (
                                <Link to={item.route} key={index}>
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem}
                                    />
                                </Link>
                            ))
                        :
                            props.UserRole === "ROLE-EMP" ? 
                                sidebar_items.AccessRoleUSER.map((item, index) => (
                                    <Link to={item.route} key={index}>
                                        <SidebarItem
                                            title={item.display_name}
                                            icon={item.icon}
                                            active={index === activeItem}
                                        />
                                    </Link>
                                ))

                            :  props.UserRole === "ROLE-ADMIN" ?
                            sidebar_items.AccessRoleADMIN.map((item, index) => (
                                <Link to={item.route} key={index}>
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem}
                                    />
                                </Link>
                            ))
                        :null
                        
                    :
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                            <Skeleton width={210} height={55} sx={{marginX:1,marginY:0}}/>
                        </Box>
                    
                }
            
                {/* <div className="testColor">

                </div> */}

            </div>

        </div>
    )
}

export default Sidebar

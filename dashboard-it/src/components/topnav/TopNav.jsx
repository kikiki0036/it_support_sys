import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './topnav.css'

import { Link} from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'

import notifications from '../../assets/JsonData/notification.json'

import user_image from '../../assets/images/tuat.png'

import user_menu from '../../assets/JsonData/user_menus.json'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserCog } from '@fortawesome/free-solid-svg-icons'

import { Input } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';
import Nav from '../../pages/Nav';

const renderNotificationItem = (item, index) => (    
    <div className="notification-item item-nf" id="item-nf" key={index}>
        <i className={item.icon}></i>
        <span className="span-nf">{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__name">
            {user.user_id}
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
        <div className="topnav__right-user__image">
            {/* <img src={user.image} alt="" /> */}
            <FontAwesomeIcon icon={faUserCog} />
        </div>
    </div>
)

   

const Topnav = (props) => {

    const history = useHistory();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout').then((res) => {         
                // history.push("/it-service-login");
                history.go(0)      
            });

            localStorage.setItem('assignJob_prom', "")

            localStorage.setItem('id_user_login', "")

            localStorage.setItem('mail_user_login', "")

            localStorage.setItem('role_user_login', "")

            localStorage.setItem('username_login', "")

            localStorage.setItem('tname', "")

            localStorage.setItem('tel', "")

            // window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
    const profile = () => {
        history.push("/it-service/it-support/profile");
    }
    
    const renderUserMenu =(item, index) => {
    
        return (
            <div className="notification-item user-bnt cursor_pointer" onClick={() => item.content === "Logout"? Logout() : profile() }>
                
                <i className={item.icon+' menu-hover'}></i>
                <span className="menu-hover" >{item.content}</span>
    
                {/* <Link to={item.route || '/'} key={index}>
                    <div className="notification-item user-bnt">
                        <i className={item.icon+' menu-hover'}></i>
                        <span className="menu-hover" >{item.content}</span>
                    </div>
                </Link> */}
    
            </div>
        );
       
    };
    
    const { Search } = Input;

    // const suffix = (
    //     <AudioOutlined
    //         style={{
    //             fontSize: 16,
    //             color: '#1890ff',
    //         }}
    //     />
    // );

    const onSearch = value => console.log(value);

    const curr_user =  {
        // display_name: 'Attaphon N.',
        display_name: props.UserName,
        user_id: "Username : "+ props.IDUser,
        image: user_image
    }

    return (
        <div className='topnav'>
            {/* <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div> */}

            {/* <Nav pills className="search-n">
                <Search className="search-table" placeholder="Search here.." allowClear onSearch={onSearch} style={{ width: 200 }} />
            </Nav> */}

            {
                localStorage.getItem('role_user_login') === "ROLE-IT-MANAGER" ?
                    <div className="waviy">
                        <span style={{"--i":1}}>I</span>
                        <span style={{"--i":1}}>T</span>
                        <span style={{"--i":2}}>M</span>
                        <span style={{"--i":3}}>A</span>
                        <span style={{"--i":4}}>N</span>
                        <span style={{"--i":5}}>A</span>
                        <span style={{"--i":6}}>G</span>
                        <span style={{"--i":7}}>E</span>
                        <span style={{"--i":8}}>R</span>
                        
                    </div>
                :
                    localStorage.getItem('role_user_login') === "ROLE-ADMIN" ?
                        <div className="waviy">
                            <span style={{"--i":1}}>A</span>
                            <span style={{"--i":2}}>D</span>
                            <span style={{"--i":3}}>M</span>
                            <span style={{"--i":4}}>I</span>
                            <span style={{"--i":5}}>N</span>
                            <span style={{"--i":6}}>I</span>
                            <span style={{"--i":7}}>S</span>
                            <span style={{"--i":8}}>T</span>
                            <span style={{"--i":9}}>R</span>
                            <span style={{"--i":10}}>A</span>
                            <span style={{"--i":11}}>T</span>
                            <span style={{"--i":12}}>O</span>
                            <span style={{"--i":13}}>R</span>
                        </div>
                    :
                        <div></div>
            }
            
            <div className="topnav__right">
                {/* <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    /> 
                </div> */}
                
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>

                <div className="topnav__btnColor">
                    <ThemeMenu/>
                </div>
            </div>
        </div>
    )
}

export default Topnav

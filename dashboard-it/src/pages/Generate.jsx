import React, { useEffect } from 'react'

import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import { StyledEngineProvider } from '@mui/material/styles';
import Stepper  from '../components/m-ui/stepper/Stepper';

import SelectService from '../components/generate/Select_service';
import DetailItemReq from '../components/generate/DetailItemReq';
import DetailCreator from '../components/generate/DetailCreator';
import DetailGenReq from '../components/generate/DetailGenReq';

const Generate = () => {
  
  useEffect(() => {

    const letters = Array.from(document.querySelectorAll('.nav-link'))
      letters.forEach((letter) => {
        let timerId;
        letter.addEventListener('mousedown', (e) => {
          clearTimeout(timerId);
          const ripple = e.target.querySelector('.ripple-nav')
          const size = letter.offsetWidth;
          const pos = letter.getBoundingClientRect();
          const x = e.pageX - pos.left - size;
          const y = e.pageY - pos.top - size;
          ripple.style = 'top:' + y + 'px; left:' + x + 'px; width: ' + size * 2 + 'px; height: ' + size * 2 + 'px;';
          ripple.classList.remove('activer');
          ripple.classList.remove('start');
          setTimeout(() => {
            ripple.classList.add('start')
            setTimeout(() => {
              ripple.classList.add('activer')
            });
          });
          timerId = setTimeout(() => {
            ripple.classList.remove('activer');
            ripple.classList.remove('start');
          }, 500);
        })
        
        // letter.addEventListener('mouseup', (e) => {
        //   const ripple = e.target.querySelector('.ripple-nav')
        //   clearTimeout(timerId);
        //   timerId = setTimeout(() => {
        //     ripple.classList.remove('activer');
        //     ripple.classList.remove('start');
        //   }, 500);
        // })
    })
        //dd active class to the current button (highlight it)
        // document.querySelectorAll('div.ef-hover')
    
    let btns = document.querySelectorAll(".nav-link")
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            let current = document.getElementById("box1").querySelectorAll(".active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }

  }, []);

  const _renderStepContent_1 = () => {
    return  <SelectService/>
  }

  const _renderStepContent_2 = () => {
    return  <DetailItemReq/>
  }

  const _renderStepContent_3 = () => {
    return  <DetailCreator/>
  }

  const _renderStepContent_4 = (data) => {
    return  <DetailGenReq
              data={data}
            />
  }
  
  let stepContent3 = 'Requestor'
  if(localStorage.getItem('IDUser_login') !== null && localStorage.getItem('IDUser_login').substring(0,2) === "IT") {
    stepContent3 = 'Requestor / Assign'
  }

  return (
      <div className="layout-component m_r">
          <h2 className="page-header">
              { "mis self service".toUpperCase() }
          </h2>
          <div className="row">
              <div className="col-12">
                  <div className="card-g dataEmp-min-h box-generate-scoll">
                    <StyledEngineProvider injectFirst>
                      <Stepper
                        stepContent = {['Service', 'Detail Request', stepContent3, 'All Detail']}
                        contents = {[_renderStepContent_1, _renderStepContent_2, _renderStepContent_3, _renderStepContent_4]}
                        icon = {[ 
                                  "*",
                                  <DesignServicesIcon sx={{ fontSize: 16 }} />,
                                  <AssignmentIcon sx={{ fontSize: 16 }}/>,
                                  <PersonIcon sx={{ fontSize: 18}} />,
                                  <DisplaySettingsIcon sx={{ fontSize: 18 }} />
                                  
                                ]}
                      />
                    </StyledEngineProvider>
                  </div>
              </div>
          </div>
      </div>
  )

}

export default Generate
// {
//     <Col lg={ 8 }>
//         <UncontrolledTabs initialActiveTabId="overview">
//             { /* START Pills Nav */}
//             <div className="box1">
//                 <Nav pills className="nav-tab">
//                 {/* <Nav pills className="mb-4 flex-column flex-md-row mt-4 mt-lg-0 nav-tab"> */}
//                     <NavItem  className="btn letter active-item">
//                         <UncontrolledTabs.NavLink tabId="overview">
//                             Overview
//                         </UncontrolledTabs.NavLink>
//                         <div className="ripple-nav"></div>
//                     </NavItem>
//                     <NavItem className="btn letter">
//                         <UncontrolledTabs.NavLink tabId="detailContact">
//                             Detail
//                         </UncontrolledTabs.NavLink>
//                         <div className="ripple-nav"></div>
//                     </NavItem>
//                     <NavItem className="btn letter">
//                         <UncontrolledTabs.NavLink tabId="chat">
//                             Chat
//                         </UncontrolledTabs.NavLink>
//                         <div className="ripple-nav"></div>
//                     </NavItem>
//                     <NavItem className="btn letter">
//                         <UncontrolledTabs.NavLink tabId="messages">
//                             Messages 
//                             {/* <Badge pill color="secondary" className="ml-2">5</Badge> */}
//                         </UncontrolledTabs.NavLink>
//                         <div className="ripple-nav"></div>
//                     </NavItem>
//                     <div className="animation start-home"></div>
//                 </Nav>
//             </div>

//             { /* END Pills Nav */}
//             <UncontrolledTabs.TabContent>
//                 <TabPane tabId="overview" id="Overview">                                
//                    <div> s</div>
//                 </TabPane>
//                 <TabPane tabId="detailContact" id="Detail">
//                     B
//                 </TabPane>
//                 <TabPane tabId="chat" id="Chat">
//                     C
//                 </TabPane>
//                 <TabPane tabId="messages" id="Messages">
//                     D
//                 </TabPane>

//             </UncontrolledTabs.TabContent>
//         </UncontrolledTabs>
//     </Col>
//     }
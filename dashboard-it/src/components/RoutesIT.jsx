import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Request from '../pages/Request'
import ManageTask from '../pages/ManageTaskJob'

import Generate_req from '../pages/Generate_req'
// import Test_content_H from '../pages/DeviceCenter'
import Scheduler_DeviceCenter from '../pages/Scheduler_DeviceCenter'
import History from '../pages/History'
import Chatbotconfic from '../pages/Chatbotconfic'
import Allconfig from '../pages/Allconfig'
// import Generate from '../pages/Generate'
// import NotebookCenterBooking from '../pages/NotebookCenterBooking'
// import ManageTeam from '../pages/ManageTeam'
// import Config from '../pages/config'
import Profie from '../pages/Profie'
// import Slide_menu from '../pages/slide_menu'

import Logout from './Login/Logout'

// import Test_content from '../pages/Test_content'

const RoutesIT = (props) => {

    return (
        <Switch>
            <Route path='/it-service/it-support/'exact component={Dashboard}/>
            <Route path='/it-service/it-support/customers' component={Customers}/> 
            <Route path='/it-service/it-support/request' component={Request}/> 
            <Route path='/it-service/it-support/manage-task-job' component={ManageTask}/> 
            <Route path='/it-service/it-support/generate-req' component={Generate_req}/> 
            <Route path='/it-service/it-support/notebook-center' component={Scheduler_DeviceCenter}/>
            {/* <Route path='/it-service/it-support/config' component={Allconfig}/>
            <Route path='/it-service/it-support/chatbotconfig' component={Chatbotconfic}/> */}
          
            <Route path='/it-service/it-support/history' component={History}/>
            <Route path='/it-service/it-support/profile' component={Profie}/>
            {/* <Route path='/dashboard/generate' component={Generate}/> */}
            {/* <Route path='/dashboard/notebook_center' component={NotebookCenterBooking}/>
            <Route path='/dashboard/team-manage' component={ManageTeam}/>
            <Route path='/dashboard/config' component={Config}/> */}
            {/* <Route path='/dashboard/logout' component={Logout}/> */}
        </Switch>
    )
}

export default RoutesIT

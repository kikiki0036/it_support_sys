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

const RoutesAdmin = (props) => {

    return (
        <Switch>
            <Route path='/it-service/it-support/' exact component={Allconfig}/>
            <Route path='/it-service/it-support/config' component={Allconfig}/>
            <Route path='/it-service/it-support/chatbotconfig' component={Chatbotconfic}/>
            <Route path='/it-service/it-support/profile' component={Profie}/>
        
        </Switch>
    )
}

export default RoutesAdmin

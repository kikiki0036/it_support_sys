import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
// import Customers from '../pages/Customers'
// import Request from '../pages/Request'
// import History from '../pages/History'
// import Generate from '../pages/Generate'
// import NotebookCenterBooking from '../pages/NotebookCenterBooking'
// import ManageTeam from '../pages/ManageTeam'
// import Config from '../pages/config'
import Chatbot from '../../pages/Chatbot'
import Logout from './Login/Logout'


const Routes = () => {

    return (
        <Switch>
            <Route path='/dashboard'exact component={Dashboard}/>
            {/* <Route path='/dashboard/customers' component={Customers}/>
            <Route path='/dashboard/history' component={History}/>
            <Route path='/dashboard/request' component={Request}/> */}
            {/* <Route path='/dashboard/generate' component={Generate}/> */}
            {/* <Route path='/dashboard/notebook_center' component={NotebookCenterBooking}/>
            <Route path='/dashboard/team-manage' component={ManageTeam}/>
            <Route path='/dashboard/config' component={Config}/> */}

            <Route path='/dashboard/logout' component={Logout}/>
          
        </Switch>
    )
}

export default Routes

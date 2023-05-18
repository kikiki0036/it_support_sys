import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Historyemp from '../pages/Historyemp'
import Generate_req from '../pages/Generate_req'
import Profie from '../pages/Profie'
import Scheduler_DeviceCenter from '../pages/Scheduler_DeviceCenter'
import History from '../pages/History'

// import Logout from './Login/Logout'


const RoutesUSER = (props) => {

    return (
        <Switch>
            <Route path='/it-service/it-support/' exact component={Generate_req}/>
            <Route path='/it-service/it-support/generate-req'  component={Generate_req}/> 
            <Route path='/it-service/it-support/notebook_center' component={Scheduler_DeviceCenter}/>
            <Route path='/it-service/it-support/history' component={Historyemp}/>
            <Route path='/it-service/it-support/profile' component={Profie}/>

        </Switch>
    )
}

export default RoutesUSER

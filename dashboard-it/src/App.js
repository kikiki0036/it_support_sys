import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./components/Login/Login";
// import Logout from "./components/Login/Logout";
// import Logout from "./components/Logout";
import Layout from './components/layout/Layout'
import Verify from './Verify';
import VerifyEmail from "./pages/VerifyEmail.js";
import Profie from './pages/Profie';
// import Chatbot from './pages/Chatbot2'
// import Manage_task from './pages/manage_task'

// import { StyledEngineProvider } from '@mui/material/styles';
// import NewTable from './components/m-ui/NewTable';
// import Test_dialog_reqItem from './components/fileTest/Test_dialog_reqItem'
// import Signin from "./components/Login/Signin";
// import Nop from './Nop'

// import Test_content from './pages/Test_content'

import RenderData_Section from './assets/Field-RenderModel/RenderData_Autocomplete/RenderData_Section'

function App() {

  return (

      <BrowserRouter>

          <React.Fragment>
              {/* <Route exact path="/">
                <RenderData_Section/>
              </Route> */}
            
              <Route exact path="/">
                <Verify/>
              </Route>

              <Route path="/it-service-login">
                <Login/>
              </Route> 
              
              <Route path="/it-service/it-support/">
                <Layout/>
              </Route>
              <Route path="/verify-email">
                  <VerifyEmail/>
              </Route>

              {/* <Route path="/logout">
                <Logout/>
              </Route> */}

              {/* <Route path="/:id">
                <Nop />
              </Route> */}
              {/* <Route path="/xxx">
                <Test_dialog_reqItem/>
              </Route> */}
          </React.Fragment>
          {/* <Chatbot /> */}
          {/* <Manage_task/> */}

      </BrowserRouter>

  );
}

export default App;
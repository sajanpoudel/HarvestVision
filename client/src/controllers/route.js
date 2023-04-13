import React from 'react';

import LoginSignUp from "../pages/loginSignup";
import { Routes,Route } from 'react-router-dom';


const PageRoutes = () => {
    return ( <>
      <Routes>
        {/* <Route exact path="/" component={App} /> */}
        <Route path="/login_signup" component={LoginSignUp} element = {<LoginSignUp/>}/>
      </Routes>
      </>
    );
  };
  
  export default PageRoutes;
  
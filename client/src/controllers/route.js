import React from "react";

import LoginSignUp from "../pages/loginSignup";
import { Routes, Route } from "react-router-dom";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login_signup" element={<LoginSignUp />} />
      </Routes>
    </>
  );
};

export default PageRoutes;

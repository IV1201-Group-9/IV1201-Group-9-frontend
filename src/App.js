import React from 'react';
import LoginPage from './components/LoginPage.js';
import {ChakraProvider} from '@chakra-ui/react'
import SignupPage from "./components/SignupPage";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import ApplicationPage from "./components/ApplicationPage";

function App() {
  return (

      <ChakraProvider>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<LoginPage />} />
                  <Route exact path="/signup" element={<SignupPage />} />
                  <Route exact path="/admin" element={<AdminPage />} />
                  <Route exact path ="/applicants" element = {<ApplicationPage/>} />
                  </Routes>
              </BrowserRouter>

      </ChakraProvider>

  );
}

export default App;

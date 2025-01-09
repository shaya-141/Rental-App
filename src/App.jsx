import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

import { Toaster } from 'sonner'
import { DashboardProvider } from './Context/ActiveDashboardPage'
import { AuthProvider, useAuthContext } from './Context/Auth'
import Profile from './pages/Profile'
import Protection from './Components/ProtectionRoute/Protection'
import { FilesProvider } from './Context/GetUserFilesFromFirebase'
import Properties from './pages/Properties'
import { AllPropertiesProvider } from './Context/GetAllPropertise'
import PropertiesDetail from './pages/PropertiesDetail'
import DashboardMiddleware from './Components/MiddleWare/DashboardMiddleWare'
import Aboutus from './pages/Aboutus'
import Blog from './pages/Blogs'


function App() {


  return (
    <>
 <BrowserRouter>
        <AuthProvider>
          <AllPropertiesProvider>
            <FilesProvider>
              <DashboardProvider>
                <Toaster position="top-right" />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/aboutus' element={<Aboutus></Aboutus>}></Route>
                  <Route path='/blog' element={<Blog></Blog>}></Route>
                  
                  {/* <Route path='/profile' element={<Profile />} /> */}
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/propertise' element={<Properties />} />
                  <Route path='/propertise/:id' element={<PropertiesDetail />} />
                  <Route path='/dashboard/:id' element={<PropertiesDetail />} />
                </Routes>
              </DashboardProvider>
            </FilesProvider>
          </AllPropertiesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

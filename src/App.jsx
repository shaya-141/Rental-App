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


function App() {


  return (
    <>

      <BrowserRouter>
        <AuthProvider>
          <FilesProvider>


            <DashboardProvider>



              <Toaster position="top-right" />
              <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>
                <Route path='/dashboard' element={<Dashboard></Dashboard>}> </Route>
                {/* <Route path='/profile' element={<Profile></Profile>}></Route> */}

              </Routes>


            </DashboardProvider>
          </FilesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

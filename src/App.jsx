import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
 

  return (
    <BrowserRouter>
<Header/>
     

        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/products" element={<Product/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      
  )
}

export default App

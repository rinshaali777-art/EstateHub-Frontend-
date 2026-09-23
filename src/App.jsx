import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes, Route } from "react-router-dom";
import Landing from './pages/Landing'
import AddProperty from './pages/AddProperty'
import EditProperty from './pages/EditProperty'
import Pnf from './pages/Pnf'
import PropertyDetails from './pages/PropertyDetails'
import Header from './components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/add-property' element={<AddProperty/>}/>
        <Route path='/edit-property/:id' element={<EditProperty/>}/>
        <Route path='/property-details/:id' element={<PropertyDetails/>}/>
        <Route path='/*' element={<Pnf/>}/>
    </Routes>
    </>
  )
}

export default App

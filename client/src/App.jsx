import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
// import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'
import { Project } from './pages/Project'
import { Header } from './components/Header'
import { FooterCom } from './components/FooterCom'
import SignIn from './pages/SignIn'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='projects' element={<Project/>}/>
   </Routes>
   <FooterCom/>
   </BrowserRouter>
    </>
  )
}

export default App

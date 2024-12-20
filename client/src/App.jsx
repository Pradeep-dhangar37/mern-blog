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
import { PrivateRoute } from './components/PrivateRoute'
import { OnlyAdminPrivateRoute } from './components/OnlyAdminPrivateRoute'
import { CreatePost } from './pages/CreatePost'
import  UpdatePost  from './pages/UpdatePost'
import { PostPage } from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
   <ScrollToTop/>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Route>
    <Route element={<OnlyAdminPrivateRoute/>}>
    <Route path='/create-post' element={<CreatePost/>}/>
    <Route path='/update-post/:postId' element={<UpdatePost/>} />

    </Route>
    <Route path='projects' element={<Project/>}/>
    <Route path='/post/:postSlug' element={<PostPage/>}/>

   </Routes>
   <FooterCom/>
   </BrowserRouter>
    </>
  )
}

export default App

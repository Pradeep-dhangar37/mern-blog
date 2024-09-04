import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiArrowSmRight, HiDocumentText, HiUser} from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


export const DashSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
  const[tab, setTab] = useState('')
  const{currentUser} = useSelector(state => state.user)

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get('tab');
  if(tabFromUrl){
    setTab(tabFromUrl)
  }
  },[location.search])
  const handleSignOut = async()=>{
    try{
      const res = await fetch('/api/user/signOut',{
        method: 'POST',
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess());
      }
    }catch(err){
      console.log(err.message);
    }
  }
  return (
   <div>
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-4'>
            <Link to="/dashboard?tab=profile" >
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin': 'User'} labelColor = 'dark' as='button'>
                Profile
            </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
                 <Link to='/dashboard?tab=posts'>
                 <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                   Posts
                 </Sidebar.Item>
                 </Link>
            )}
           
            <Sidebar.Item active icon={HiArrowSmRight} onClick={handleSignOut} className="cursor-pointer">
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
   </div>
  )
}

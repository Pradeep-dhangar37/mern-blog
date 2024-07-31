import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


export const DashSidebar = () => {
    const location = useLocation();
  const[tab, setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get('tab');
  if(tabFromUrl){
    setTab(tabFromUrl)
  }
  },[location.search])
  return (
   <div>
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile" >
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor = 'dark'>
                Profile
            </Sidebar.Item>
            </Link>
            <Sidebar.Item active icon={HiArrowSmRight} className="cursor-pointer">
                Sign Out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
   </div>
  )
}
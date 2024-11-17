import { Button } from 'flowbite-react'
import React from 'react'

export default function () {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Wan't to learn more about Javascript
            </h2>
            <p className='text-gray-500'>
                Checkout this resources with 100 js projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none' ><a href="https://github.com/Pradeep-dhangar37 " target='_blank' rel='noopener noreferrer'>Learn More</a></Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto" alt="" />
        </div>
    </div>
  )
}

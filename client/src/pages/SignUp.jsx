import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'


export const SignUp = () => {
  return (
    <>
      <div className="min-h-screen mt-40 ">
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
            <div className='flex-1'>
            <Link to='/' className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Pradeep's</span>
            Blog
            </Link>
            <p>This is an demo Project. You can sign up with your email and password or with google</p>
            </div>
            <div className='flex-1'>
              <form action="" className='flex flex-col gap-4'>
                <div>
                  <Label value='Your UserName'></Label>
                  <TextInput
                  type="text"
                  placeholder='username'
                  id='username'/>
                </div>
                <div>
                  <Label value='Your email'></Label>
                  <TextInput
                  type="email"
                  placeholder='email'
                  id='email'/>
                </div>
                <div>
                  <Label value='Your password'></Label>
                  <TextInput
                  type="password"
                  placeholder='password'
                  id='password'/>
                </div>
                <Button gradientDuoTone="purpleToPink" type='submit'>Sign Up</Button>
              </form>
              <div className='flex gap-2 mt-5 text-sm'>
                <span>Have an Account?</span>
                <Link to="/sign-in" className='text-blue-500 '>Sign in</Link>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

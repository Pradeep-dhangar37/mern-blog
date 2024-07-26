// import { application } from 'express'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  OAuth  from '../components/OAuth'


export const SignUp = () => {
  const[formData, setFormData] = useState({})
  const[errorMessage, setErrorMessage] = useState(null)
  const[loading, setLoading] = useState('')
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  
  const handleSubmit = async(e)=>{
    
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields")
    }
    try{
      setLoading(true);
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.sucess === false){
         return setErrorMessage(data.message)
        }
        setLoading(false);
        if(res.ok){
          navigate('/sign-in')
        }
    }catch(err){

    }
  }
  return (
    <>
      <div className="min-h-screen mt-40 ">
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
            <div className='flex-1'>
            <Link to='/' className=' font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Pradeep's</span>
            Blog
            </Link>
            <p className='mt-4'>This is an demo Project. You can sign up with your email and password or with google</p>
            </div>
            <div className='flex-1'>
              <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                  <Label value='Your UserName'></Label>
                  <TextInput
                  type="text"
                  placeholder='username'
                  id='username' onChange={handleChange}/>
                </div>
                <div>
                  <Label value='Your email'></Label>
                  <TextInput
                  type="email"
                  placeholder='email'
                  id='email'
                  onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value='Your password'></Label>
                  <TextInput
                  type="password"
                  placeholder='password'
                  id='password'  onChange={handleChange}/>
                </div>
                <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
                  {
                    loading ? (
                      <>
                      <Spinner size='sm'/>
                      <span className='pl-3'></span>
                      </>
                    ) : 'Sing Up'
                  }
                  </Button>
                  <OAuth/>
              </form>
              <div className='flex gap-2 mt-5 text-sm'>
                <span>Have an Account?</span>
                <Link to="/sign-in" className='text-blue-500 '>Sign in</Link>
              </div>
              {
                errorMessage && (
                  <Alert className='mt-5' color="failure">
                    {errorMessage}
                  </Alert>
                )
              }
            </div>
        </div>
      </div>
    </>
  )
}

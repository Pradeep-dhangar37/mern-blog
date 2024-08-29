import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updatFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure , signoutSuccess} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
// import { Model } from 'mongoose';
import {HiOutlineExclamationCircle} from "react-icons/hi"


export const DashProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const[imageFileUploading, setImageFileUploading] = useState(false);
  const[updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const[updateUserError, setUpdateUserError] = useState(null);
  const[showModel, setShowModel] = useState(false);

  const[formData,  setFormData] = useState({});
  const filepickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Couldn't upload image (File must be less than 2 MB)");
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL});
          setImageFileUploadProgress(null); 
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No Changes Are Made");
      return;
    }
      if(imageFileUploading){
      setUpdateUserError("Please Wait For Image to Upload");
        return;
      }
    try {
      dispatch(updateStart());
      
      const response = await fetch(`api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(updatFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Profile Updated Succesfully")
      }
    } catch (err) {
      dispatch(updatFailure(err.message));
      setUpdateUserError(err.message);
    }
  };
  const handleDeleteUser = async()=>{
    setShowModel(false);
    try{
      dispatch(deleteUserStart());
      const res = fetch(`api/user/delete/${currentUser._id}`,
          {
            method: 'DELETE',  
          })
          const data = await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(data.message))
          }else{
            dispatch(deleteUserSuccess(data))
          }
      }    
    catch(err){
      dispatch(deleteUserFailure(err.message))
    }
  }
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
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filepickerRef} hidden />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => {
            filepickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
            }`}
          />
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between'>
        <span className='cursor-pointer' onClick={()=> setShowModel(true)}>Delete Account</span>
        <span onClick={handleSignOut} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {error && (
        <Alert color='success' className='mt-5'>
          {error}
        </Alert>
      )}
      {showModel && (
        <Modal show={showModel} onClose={()=> setShowModel(false)} popup size="md">
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14  text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Are you sure you want to delete your Account</h3>
              <div className='flex justify-center gap-4'>
                <Button color="failure" onClick={handleDeleteUser}>Yes i'm Sure</Button>
                <Button color="failure" onClick={()=> setShowModel(false)}>Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

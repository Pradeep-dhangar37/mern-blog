import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function CommentSection({postId}) {
    const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
            <div className='flex items-center gap-1 my-5 text-gray-500'>
                <p>Signed In As</p>
                <img src={currentUser.profilePicture} alt="" className='h-5 w-5 object-cover rounded-full'/>
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                @{currentUser.username}
                </Link>
            </div>
        ) : (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
                You must be sign in to see the comment
                <Link to={'/sign-in'} className='text-blue-500 hover:underline'>Sign In</Link>
            </div>
        )}
        {currentUser && (
            <form className='border border-teal-500 rounded-md p-3 ' onSubmit={handleSubmit}>
                <Textarea
                placeholder='Add A comment...'
                rows={3}
                maxLength={200}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                />
                <div className='flex justify-between item-center mt-5'>
                    <p className='text-gray-500 text-xs'>{200 - comment.length}</p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        Submit  
                    </Button>
                </div>
                {commentError && (
                  <Alert color="failure">
                  {commentError}
                </Alert>
                )}
            </form>
          
        )}
        </div>
  )
}
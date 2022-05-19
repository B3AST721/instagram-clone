import React from 'react';
import '/home/jaheel/instagram/src/Post.css'
import { Avatar } from '@mui/material';

function Post({username, imageURL, caption}) {
  return (
    <div className='post'>
        <div className='post-header'>
            <Avatar 
            className='post-avatar' 
            alt={username} 
            src='/static/images/avatar/1.jpg'
            />
            <h3>{username}</h3>
        </div>
        <img className='post-img' src={imageURL} alt='' />
        <h4 className='post-caption'><strong>{username}</strong> {caption}</h4>
    </div>
  )
}

export default Post
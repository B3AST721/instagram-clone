import { React, useState, useEffect } from 'react';
import '/home/jaheel/instagram/src/Post.css'
import { Avatar } from '@mui/material';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import '/home/jaheel/instagram/src/Post.css'

function Post({ user, postId, username, imageUrl, caption }) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
    unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      unsubscribe();
    }
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('')
  }

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

        <img className='post-img' src={imageUrl} alt='' />
        <h4 className='post-caption'><strong>{username}</strong> {caption}</h4>

        <div className='comments'>
          {comments.map((comment) => (
              <p>
                <strong>{comment.username}</strong> {comment.text}
              </p>
            ))}
          </div>
        
        {user && (
        <form className='comment-box'>
          <input
            className='post-input'
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='post-button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </button>
        </form>
        )}
    </div>
  )
}

export default Post
import './App.css';
import { React, useState, useEffect } from 'react';
import Post from './components/Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //Everytime data base changes code is ran
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  return (
    <div className="App">
      <div className='header'>
        <img 
          className='logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027'
          alt=''
        />
      </div>
      <h1>HELLO this is some meaningless text that I have placed here rn</h1>
      
      {
        posts.map(post => {
          return <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        })
      }
    </div>
  );
}

export default App;

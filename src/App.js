import './App.css';
import { React, useState, useEffect } from 'react';
import Post from './components/Post';
import { db, auth } from './firebase';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Input } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //When the user logs in...
        console.log(authUser)
        setUser(authUser);
      } else {
        //When user logs out...
        setUser(null);
      }
    })

    return () => {
      //Perform cleanup
      unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    //Everytime data base changes code is ran
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  const signUp = (e) => {
    e.preventDefault();

    //Sign up and alert error message if there is an error in input
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert(error.message))
    //Closes the modal after signup
    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();

    //Sign in and alert error message if there is an error in input
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    //Closes the modal after sign in
    setOpenSignIn(false);
  }

  return (
    <div className="App">
      {/* Sign Up */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form>
            <img 
              className='logo modal-logo'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027'
              alt=''
            />
            <Input
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      {/* Sign In */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form>
            <img 
              className='logo modal-logo'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027'
              alt=''
            />
            <Input
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>

      <div className='header'>
        <img 
          className='logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027'
          alt=''
        />
      </div>

      {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <div className='login-container'>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

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

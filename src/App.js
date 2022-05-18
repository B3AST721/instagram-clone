import './App.css';
import { React } from 'react';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <img 
          className='logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027'
          alt=''
        />
      </div>
      {/* Header */}

      {/* Post */}
      <Post />
      {/* Post */}
    </div>
  );
}

export default App;

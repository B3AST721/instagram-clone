import './App.css';
import { React } from 'react';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <div className='header'>
        <img 
          className='logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027'
          alt=''
        />
      </div>
      <h1>HELLO this is some meaningless text that I have placed here rn</h1>
      {/* Posts */}
      <Post username='jaheelwarr' imageURL='https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png' caption='This is the first post' />
      <Post username='jaheelwarr' imageURL='https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png' caption='This is the second post' />
      <Post username='jaheelwarr' imageURL='https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png' caption='This is the third post' />
    </div>
  );
}

export default App;

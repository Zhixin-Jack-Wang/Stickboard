import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  // const [user, setUser] = React.useState(null);
     const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   axios.get('/api?user=Zhixin-Jack-Wang')
  //     .then(response => {
  //       setUser(response.data);
  //     });
  // },[])
  React.useEffect(() => {
    axios.get('https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members')
      .then(response => {
        setUser(response.data);
        console.log(response);
      });
  },[])

  return (
    user && (
      <div className="App">
        <header className="App-header">
          {/* <img src={user.user.avatar_url} className="App-logo" alt="logo" />
          <p>
            {user.user.login}
          </p> */}
          <p>
            {data}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  )
}

export default App;

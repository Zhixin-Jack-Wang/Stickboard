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
    axios.get(`https://secure.meetup.com/oauth2/authorize
    ?client_id=1htrmcgkah9g2ma74lu773bf8k&response_type=code
    &https://mymeetups.herokuapp.com/`)
      .then(response => {
        setData(response.data);
        console.log(response);
      });
  },[])

  return (
    data && (
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

import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = React.useState(null);

  // React.useEffect(() => {
  //   axios.get('/api?user=Zhixin-Jack-Wang')
  //     .then(response => {
  //       setUser(response.data);
  //     });
  // },[])

    React.useEffect(() => {
    axios.get('/auth')
      .then(response => {
        setUser(response.data);
      });
  },[])


  //Event Handler
  const clickHandler = () =>{
    axios.get('/login').then(
      response=>console.log(response)
    )
  };

  return (
    // user && (
      <div className="App">
        <header className="App-header">
          {/* <img src={user.user.avatar_url} className="App-logo" alt="logo" />
          <p>
            {user.user.login}
          </p> */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={clickHandler}>
            AuthO
          </button>
        </header>
      </div>
    )
  // )
}

export default App;

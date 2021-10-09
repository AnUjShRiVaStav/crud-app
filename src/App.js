import React, { useState } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import Adduser from './Component/Adduser';
import Home from './Component/Home';

function App() {

  const [isAdduser, setIsAdduser] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState({});
  const [user, setUser] = useState({});
  const [isEditUser, setEditUser] = useState(false);
  const [result, setResult] = useState();

  const onCreate = () => {
    setIsAdduser({ isAdduser: true })
  }

  const onFormSubmit = (data) => {
    let apiUrl;

    if (isEditUser) {
      apiUrl = 'https://reqres.in/UPDATE';
    } else {
      apiUrl = 'https://reqres.in/CREATE';
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      myHeaders
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then((result) => {
        setResult({
          user: result,
          isEditUser: true,
          isAdduser: true
        });
      }, (error) => {
        setError({ error });
      }
      )
  }

  let editUser = userId => {
    const apiUrl = "https://reqres.in/UPDATE";
    const formData = new FormData();
    formData.append('userId', userId);

    const options = {
      method: 'PATCH',
      body: formData
    }
    fetch(apiUrl, options)
      .then(res => res.json())
      .then((result) => {
        // alert('hey');
        setResult({
          user: result,
          isEditUser: true,
          isAdduser: true
        });
      }, (error) => {
        setError({ error });
      }
      )
  }



  let userForm;
  if (isAdduser || isEditUser) {
    userForm = <Adduser onFormSubmit={onFormSubmit} user={user} />
  }



  return (
    <div className="App">
      <Container>
        {!isAdduser && <Button variant="primary" onClick={() => onCreate()}>Add User</Button>}
        {response.status === 'success' && <div><br /><Alert variant="info">{response.message}</Alert></div>}
        {!isAdduser && <Home editUser={editUser} />}
        {userForm}
        {error && <div>Error: {error.message}</div>}
      </Container>

    </div>
  );
}


export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='form'>
      <input type="text" placeholder="Search by first name..." value={searchTerm} onChange={handleSearch} />
      {filteredUsers.map(user => (
        <div className='form-div' key={user.id}>
          <p>{user.id}</p>
          <img src={user.avatar} alt={user.first_name} />
          <p className='user-name'>{user.first_name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;

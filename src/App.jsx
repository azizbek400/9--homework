import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = ({ users, setUsers, dismissedUsers, setDismissedUsers }) => {
    const dismissUser = (userId) => {
        const dismissedUser = users.find(user => user.id === userId);
        setDismissedUsers([...dismissedUsers, dismissedUser]);
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <div className="page-container">
            {users.map(user => (
                <div className="home-page" key={user.id}>
                    <img className='img' src={user.avatar} alt="User Avatar" />
                    <h3 className='first-name'>{user.first_name} {user.last_name}</h3>
                    <button className='btn' onClick={() => dismissUser(user.id)}>Dismiss</button>
                </div>
            ))}
        </div>
    );
};

const DismissedPage = ({ dismissedUsers }) => {

    return (
        <div className="page-container2">
            {dismissedUsers.map(user => (
                <div className="dismissed-page" key={user.id}>
                    <img className='img' src={user.avatar} alt="User Avatar" />
                    <h3 className='first-name'>{user.first_name} {user.last_name}</h3>
                </div>
            ))}
        </div>
    );
};

const App = () => {
    const [users, setUsers] = useState([]);
    const [dismissedUsers, setDismissedUsers] = useState([]);

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=1')
            .then(response => {
                setUsers(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('dismissedUsers', JSON.stringify(dismissedUsers));
    }, [dismissedUsers]);

    return (
        <div className='texts'>
            <h1>Employees</h1>
            <HomePage users={users} setUsers={setUsers} dismissedUsers={dismissedUsers} setDismissedUsers={setDismissedUsers} />

            <h2>Dismissed Employees</h2>
            <DismissedPage dismissedUsers={dismissedUsers} />
        </div>
    );
};

export default App;

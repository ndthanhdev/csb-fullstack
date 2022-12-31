import React from 'react';
import './app.css';
import LoginForm from './LoginForm';


function Cabinet(props) {
  const { name } = props.user;
  return (
    <div>
      <h1>
        Привет { name }! добро пожаловать в личный кабинет!
      </h1>
    </div>
  );
}

export default Cabinet;

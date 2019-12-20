import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import OnBoardForms from './components/forms.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <OnBoardForms/>
    </div>
  );
}

export default App;

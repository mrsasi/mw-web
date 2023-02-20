import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Cribs from './cribs';

function App() {
  return (
    <>
      <Cribs />
      <ToastContainer />
    </>

  );
}

export default App;

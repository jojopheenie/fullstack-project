import React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

import React  from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Terminal from './Components/Terminal';

function App() {
  return (
    <div className="app">
      <Header className= "app__header" />
      <Terminal className="app__terminal" />
      <Footer className =" app__footer"/>
    </div>
  );
}

export default App;

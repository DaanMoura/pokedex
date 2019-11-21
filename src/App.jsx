import React from 'react';
import './App.css';
import { Container, Sprite, Icon } from 'nes-react';
import Routes from './routes'

function App() {
  return (
    <div className="App">
      <header className="title">
        <Sprite sprite="pokeball" className="pokeball"/>
        <h1>Pokédex</h1>
      </header>

      <Container rounded className="content">
        <Routes/>
      </Container>

      <footer>
        Developed by <br/>
        <a href="https://github.com/daanmoura"><Icon icon="github"/> DaanMoura</a>
      </footer>
    </div>
  );
}

export default App;

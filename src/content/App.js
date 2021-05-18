import React from 'react'
import './App.scss'

import MelodyMaker from './MelodyMaker'
import { initNotes } from '../common/notes'

function App() {
  initNotes()
  return (
    <div className='App'>
      <header className='App-header'>
      </header>
      <div className='main bg bg-overlay'>
        <MelodyMaker/>
      </div>
    </div>
  );
}

export default App
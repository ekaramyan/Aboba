import { useState } from 'react'
import './styles/styles.scss'
import AIAnswer from './Components/AIAnswer'

function App() {

  return (
    <>
      <div className="App">
        <h2>Your AI helper</h2>
        <AIAnswer className='ai-answer' />
      </div>
    </>


  )
}

export default App

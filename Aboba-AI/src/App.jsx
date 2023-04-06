import { useState } from 'react'
import './styles/styles.scss'
import AIAnswer from './Components/AIAnswer'
import Example from './Components/test'

function App() {

  return (
    <>
      <div className="App">
        <h2>Your AI helper</h2>
        <AIAnswer className='ai-answer' />
        {/* <Example /> */}
      </div>
    </>


  )
}

export default App

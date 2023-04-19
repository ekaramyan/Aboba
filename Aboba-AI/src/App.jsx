import { useState } from 'react'
import './styles/styles.scss'
import AIAnswer from './Components/AIAnswer'
import Header from './Components/Header'


function App() {

  return (
    <>
      <div className="App">
        <Header />
        {/* <AITextAnswer /> */}
        <AIAnswer className='ai-answer' />
      </div>
    </>


  )
}

export default App

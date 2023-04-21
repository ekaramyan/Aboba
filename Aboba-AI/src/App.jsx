import { useEffect, useState } from 'react'
import './styles/styles.scss'
import AIAnswer from './Pages/AIAnswer'
import Header from './Components/Header'


function App() {
  const [language, setLanguage] = useState({ id: 0, name: 'english', languageCode: 'en-IN', value: 'en-IN-Wavenet-B', gender: 'MALE' });
  useEffect(() => {
    console.log("language updated in App: ", language);
  }, [language]);
  return (
    <>
      <div className="App">
        <Header handleChange={setLanguage} />
        <AIAnswer language={language} />
      </div>
    </>


  )
}

export default App

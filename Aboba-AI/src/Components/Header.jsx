import React, { useState } from 'react'
// import AIAnswer from '../Pages/AIAnswer'

export default function Header({ handleChange }) {
    const [language, setLanguage] = useState(0)

    const onCleanClick = () => {
        document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }



    const languages = [
        { id: 0, name: 'english', languageCode: 'en-IN', value: 'en-IN-Wavenet-B', gender: 'MALE' },
        { id: 1, name: 'russian', languageCode: 'ru-RU', value: 'ru-RU-Wavenet-D', gender: 'MALE' },
        { id: 2, name: 'ukrainian', languageCode: 'uk-UA', value: 'uk-UA-Wavenet-A', gender: 'FEMALE' },
        { id: 3, name: 'english(GB)', languageCode: 'en-GB', value: 'en-GB-Neural2-B', gender: 'MALE' },
    ]

    const handleChangeLanguage = (event) => {
        // const id = event.target.value;
        // setLanguage(languages[id]);
        const id = event.target.value;
        setLanguage(languages[id]);
        handleChange(languages[id]);
      }
    
    //   const onSelectClick = async (event) => {
    //     event.preventDefault();
    //     console.log(language);
    //     handleChange(language);
    //   }

    return (
        <div className='header'>
            <p>ABOBA-AI</p>
            <div className='controls'>
                <form>
                    <select name="language" id="language" onChange={handleChangeLanguage}>
                        {languages.map((language) => {
                            // console.log(language);
                            return <option className='option' value={language.id} key={language.id}>
                                {language.name}
                            </option>
                        })}
                    </select>
                    {/* <button className='languageBtn' onClick={onSelectClick}>Change voice languge</button> */}
                </form>
                <button className='controls__btn' onClick={onCleanClick}>Clean model's memory</button>
            </div>
            {/* <AIAnswer language={language} /> */}
        </div >
    )
}

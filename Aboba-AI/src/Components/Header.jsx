import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom } from '@fortawesome/free-solid-svg-icons';

export default function Header({ handleChange }) {
    const [language, setLanguage] = useState(null)

    const onCleanClick = () => {
        document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

    const languages = [
        { id: 0, name: 'english(IN)', languageCode: 'en-IN', value: 'en-IN-Wavenet-B', gender: 'MALE' },
        { id: 1, name: 'english(GB)', languageCode: 'en-GB', value: 'en-GB-Neural2-B', gender: 'MALE' },
        { id: 2, name: 'english(US)', languageCode: 'en-US', value: 'en-US-Neural2-I', gender: 'MALE' },
        { id: 3, name: 'Spanish', languageCode: 'es-ES', value: 'es-ES-Neural2-D', gender: 'FEMALE' },
        { id: 4, name: 'russian', languageCode: 'ru-RU', value: 'ru-RU-Wavenet-D', gender: 'MALE' },
        { id: 5, name: 'chinese', languageCode: 'cmn-CN', value: 'cmn-CN-Wavenet-D', gender: 'FEMALE' },
        { id: 6, name: 'ukrainian', languageCode: 'uk-UA', value: 'uk-UA-Wavenet-A', gender: 'FEMALE' },
        { id: 7, name: 'Japanese', languageCode: 'ja-JP', value: 'ja-JP-Neural2-B', gender: 'FEMALE' },
        { id: 8, name: 'Czech', languageCode: 'cs-CZ', value: 'cs-CZ-Wavenet-A', gender: 'FEMALE' },
        { id: 9, name: 'Polish', languageCode: 'pl-PL', value: 'pl-PL-Wavenet-C', gender: 'MALE' },
        { id: 10, name: 'German', languageCode: 'de-DE', value: 'de-DE-Neural2-D', gender: 'MALE' },
        { id: 11, name: 'French', languageCode: 'fr-FR', value: 'fr-FR-Neural2-A', gender: 'FEMALE' },
        { id: 12, name: 'Italian', languageCode: 'it-IT', value: 'it-IT-Neural2-C', gender: 'MALE' },
    ]

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    useEffect(() => {
        const lang_id = parseInt(getCookie('voice_laguage_id'), 10);
        if (lang_id) {
            setLanguage(languages[lang_id])
            handleChange(languages[lang_id]);
        } else {
            setLanguage(languages[0])
        }
    }, []);


    const handleChangeLanguage = (event) => {
        const id = event.target.value;
        setLanguage(languages[id]);
        handleChange(languages[id]);
        document.cookie = `voice_laguage_id=${languages[id].id}`
    }


    return (
        <div className='header'>
            <p>ABOBA-AI</p>
            <div className='controls'>
                <form>
                    <select name="language" id="language" onChange={handleChangeLanguage} value={language ? language.id : ''}>
                        {languages.map((language) => {
                            // console.log(language);
                            return <option className='option' value={language.id} key={language.id}>
                                {language.name}
                            </option>
                        })}
                    </select>
                    {/* <button className='languageBtn' onClick={onSelectClick}>Change voice languge</button> */}
                </form>
                <button className='controls__btn' onClick={onCleanClick}><FontAwesomeIcon icon={faBroom} /></button>
            </div>
            {/* <AIAnswer language={language} /> */}
        </div >
    )
}

import React from 'react'

export default function Header() {
    return (
        <div className='header'>
            <p>ABOBA-AI</p>
            <div className='controls'>
                <select name="language" id="language"></select>
                <button className='controls__btn'>Clean model's memory</button>
            </div>
        </div>
    )
}

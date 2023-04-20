import React from 'react'

export default function AITextAnswer(props) {
    return (
        <div className='ai-text'>
            <p>
                {props.loading ?  'Loading text...' :props.data}
            </p>
        </div >
    )
}

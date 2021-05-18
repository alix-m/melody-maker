import React, { useRef, useEffect } from "react"
import Score from '../components/Score'

import './MelodyMaker.scss'

const MelodyMaker = props => {

    const handleClick = () => {
        
    }

    const createTune = notes => {

    }

    return (
        <div className='maker-main'>
            <Score createTune={ createTune }/>
        </div>
    )
}

export default MelodyMaker
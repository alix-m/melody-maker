import React from "react"
import Score from '../components/Score'
import Note from '../components/Note'

import { createNotes, createNewTune } from "../utils/notes"
import { getSampler, playTune } from '../utils/musicplayer'

import playButton from '../assets/images/playbutton.png'

const MelodyMaker = () => {

    let noteElements = []
    let tune = []

    const createNoteElements = () => {
        createNotes()
        noteElements = []
        for (let i = 0; i < 16; i++) {
            noteElements.push(<Note key={i} id={i} value='rest' sampler={ getSampler() } onNoteChange={ handleNoteChange }/>)
        }
    }

    const handleNoteChange = note => {
        if (note.noteName != undefined) {
            tune[note.key[0]] = note.noteName
        }
    }

    tune = createNewTune()
    createNoteElements()

    return (
        <div className='maker-main'>
            <Score>{ noteElements }</Score>
            <img className='button ease' src={ playButton } onClick={ () => playTune(tune) }/>
        </div>
    )
}

export default MelodyMaker
import React, { useRef, useEffect } from "react"

import Note from './Note'
import './Score.scss'

import { getSampler, createTune } from '../common/notes'

const Score = props => {

    let staff = []
    let tune = {}

    const createNotes = () => {
        for(let s = 0; s < 2; s++){
            let notes = []
            for (let i = 0; i < 8; i++) {
                let id = `${ s == 0 ? 'top' : 'bottom' }_${ i }`
                tune[id] = 'rest'
                notes.push(<Note id={ id } value='rest' sampler={ getSampler() } onNoteChange={ handleNoteChange } />)
            }
        staff.push(notes)
        }
    }

    const handleNoteChange = note => {
        tune[note.key[0]] = note.noteName
    }
    
    const getTune = () => {
        let notes = Object.values(tune)
        notes.forEach(note => {
            if(note == 'rest') notes[notes.indexOf(note)] = null
        })
        createTune(notes)
    }

    createNotes()

    return (
        <div className="notes-container">
            <div className="notes" id={ 'top-staff' }> { staff[0] }</div>
            <div className="notes" id={ 'bottom-staff' }> { staff[1] }</div>
        </div>
    )
}

export default Score
const melodymaker = 
    `import React, { useRef, useEffect } from "react"
import Score from '../components/Score'
import Note from '../components/Note'
import * as Tone from 'tone';


import { getSampler, createTune } from '../common/notes'

import './MelodyMaker.scss'

const MelodyMaker = props => {

    let notes = []
    let tune = []

    const handleClick = () => {

    }

    const handleNoteChange = note => {
        console.log(note) 
    }

    const createNotes = () => {
        notes = []
        for (let i = 0; i < 16; i++) {
            tune.push[null]
            notes.push(<Note value='rest' id={ i } sampler={getSampler()} onNoteChange={handleNoteChange} />)
        }
    }

    const createTune = notes => {
        const synth = new Tone.Synth().toDestination();
        const part = new Tone.Part(((time, note) => {
            // the notes given as the second element in the array
            // will be passed in as the second argument
            synth.triggerAttackRelease(note, "8n", time);
        }), [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);
        Tone.Transport.start();
    }

    createNotes()

    return (
        <div className='maker-main'>
            <Score></Score>
        </div>
    )
}`

const score =  `
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
        <div>
        <div className="notes-container">
            <div className="notes" id={ 'top-staff' }> { staff[0] }</div>
            <div className="notes" id={ 'bottom-staff' }> { staff[1] }</div>
        </div>
            <button onClick={ getTune }>HIIIIII</button>
        </div>
    )
}

export default Score
`
let note = `
`
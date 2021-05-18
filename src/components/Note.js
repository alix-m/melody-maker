import React, { useState, useEffect } from "react"
import * as Tone from 'tone';
import { getNotes, playNote } from '../common/notes'

import './Note.scss'

const Note = props => {

    const notes = getNotes()

    const [index, setIndex] = useState(0)
    const [margin, setMargin] = useState(90)

    const handleWheel = e => {
       if(e.deltaY < 0 && index != notes.length -1 ){
            setIndex(index + 1)
            setMargin(margin - 10)
        } else if(e.deltaY > 0 && index != 0){
            setIndex(index - 1)
            setMargin(margin + 10)
        }
    }

    return(
        <div className="staff-notes" id={ props.id } onClick={ () => playNote(notes[index].noteName) }>
            <img className='note ease' onChange={ props.onNoteChange({ key:[props.id], noteName: notes[index].noteName}) } style={{ marginTop: margin + 'px' }} src={ notes[index].image } onClick={ playNote(notes[index].noteName) } onWheel={ handleWheel } />
        </div>
    )
}

export default Note
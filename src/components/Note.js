import React, { useState, useEffect } from "react"
import { playNote } from '../utils/musicplayer'
import { getNotes } from '../utils/notes'

import './Note.scss'

const Note = props => {

    const notes = getNotes()
    let styles = {}

    const [index, setIndex] = useState(0)
    const [position, setPosition] = useState(45)

    const handleWheel = e => {
       if(e.deltaY < 0 && index != notes.length - 1 ){
            setIndex(index + 1)
            setPosition(position - 3)
        } else if(e.deltaY > 0 && index != 0){
            setIndex(index - 1)
            setPosition(position + 3)
        }
    }

    if(index == 15){
        styles={ transform: `translateY(${position}px)`, overflow: 'hidden' }
    } else {
        styles={ transform: `translateY(${position}px)` }
    }

    return(
        <div className="note-container" id={ props.id } onClick={ () => playNote(notes[index].noteName) }>
            <img className='note ease' 
            onChange={ props.onNoteChange({ key:[props.id], noteName: notes[index].noteName}) } 
            style={ styles }
            src={ notes[index].image } 
            onClick={ playNote(notes[index].noteName) } 
            onWheel={ handleWheel } />
        </div>
    )
}

export default Note
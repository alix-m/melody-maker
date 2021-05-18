import * as Tone from 'tone';
import c5 from '../assets/audio/note_C5.mp3'
import mystery from '../assets/audio/note_mystery.mp3'

let noteNames = ['rest', 'hold', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'mystery']
let notes = []
let sampler = new Tone.Sampler({ urls: { 'C5': c5, 'C4': mystery }}).toDestination()

export const initNotes = () => {

    const importImages = r => {
        let images = {}
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item) })
        return images
    }

    let noteImages = importImages(require.context('../assets/images/notes', false, /\.(png|jpe?g|svg)$/))

    noteNames.forEach(n => {
        let note = { noteName: n }
        for(const img in noteImages){
            if(img == `note_${ n }.png`){
               note.image = noteImages[img].default
            }
        }
        notes.push(note)
    })
}

export const playNote = note => {
    if(note != 'rest' && note != 'hold' && note != 'mystery'){
        sampler.triggerAttackRelease(`${ note }`, 0.5);  
    } else if(note == 'mystery'){
        sampler.triggerAttackRelease('C4', '2n')
    } else {
        console.log('resting, yo')
    }
}

export const createTune = notes => {
    playTune(notes)
}

/**
export const playTune = tune => {
    let s = new Tone.Sampler({ urls: { 'C5': c5, 'C4': mystery }}).toDestination()
    const seq = new Tone.Sequence((time, note) => {
        s.triggerAttackRelease(note, 0.5, time);
        // subdivisions are given as subarrays
    }, tune).start(0);
    Tone.Transport.start();
}*/

export const playTune = tune => {
    sampler.triggerAttackRelease(tune, '4n');
}

export const getSampler = () => {
    return sampler
}

export const getNotes = () => {
    return notes
}

export const notesLength = () => {
    return notes.length
}
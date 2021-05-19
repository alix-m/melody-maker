import * as Tone from 'tone';

import harmonica from '../assets/audio/ac_harmonica.mp3'
import mystery from '../assets/audio/note_mystery.mp3'

const buffer = new Tone.ToneAudioBuffer(harmonica, () => {
    console.log("loaded");
});

let pitch = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'mystery']
let noteDuration = []
let sampler = new Tone.Sampler({ urls: { 'C5': harmonica, 'C4': mystery } }).toDestination()
const synth = new Tone.FMSynth().toDestination();

let tune = {}

export const playNote = note => {
    if (!['rest', 'hold', 'mystery', NaN, undefined].includes(note)) {
        sampler.triggerAttackRelease(`${note}`, '4n').toDestination()
    } else if (note == 'mystery') {
        sampler.triggerAttackRelease('C4', '4n')
    } else {
        console.log('resting, yo')
    }
}

export const playTune = tune => {
    Tone.Transport.stop()
    Tone.Transport.clear()
    Tone.Transport.cancel()
    let melody = makeMelody(tune)
    let t = Tone.now()
    var part = new Tone.Part(function (t, value) {
        sampler.triggerAttackRelease(value.pitch, Tone.Time(value.length).toNotation(), t)
    }, melody).start(0)
    Tone.Transport.start()
}

export const makeMelody = (tune) => {
    let melody = []
    let isNote = false
    let time = 0

    //let tune = ['G5', 'E6', 'hold', 'G5', 'F5', 'D6', 'hold', 'B5', 'C6', 'rest', 'mystery', 'rest', 'C5', 'rest', 'rest']

    loop1:
    for (let i = 0; i < tune.length; i++) {

        let note = { pitch: null, length: 0.25, time: time }
        let length = 0.25

        if (pitch.includes(tune[i])) {
            isNote = true
            note.pitch = tune[i] == 'mystery' ? 'C4' : tune[i]
            time += 0.25
            if (tune[i + 1] == 'hold') {
                let n = i
                loop2:
                for (let h = n + 1; h < tune.length; h++) {
                    if (tune[h] == 'hold') {
                        if (tune[i] != 'mystery') {
                            time += 0.25
                            length = length + 0.25
                        }
                        i++
                        note.length = length
                    } else {
                        isNote = false
                        melody.push(note)
                        break
                    }
                }
            } else {
                melody.push(note)
            }
        }
        else if (tune[i] == 'rest' || (tune[i] == 'hold' && !isNote)) {
            time += 0.25
            melody.push(note)
        }
    }
    melody[0].time = 0
    return melody
}

export const getSampler = () => {
    return sampler
}
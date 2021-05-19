import * as Tone from 'tone';
import { toneRhythm } from 'tone-rhythm';
import harmonica from '../assets/audio/ac_harmonica.mp3'
import mystery from '../assets/audio/note_mystery.mp3'

const buffer = new Tone.ToneAudioBuffer(harmonica, () => {
    console.log("loaded");
});

let pitch = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'mystery']
let noteDuration = []
let sampler = new Tone.Sampler({ urls: { 'C5': harmonica, 'C4': mystery } }).toDestination()
const synth = new Tone.Synth().toDestination();

let tune = {}

export const playNote = note => {
        if (!['rest', 'hold', 'mystery', NaN, undefined].includes(note)) {
            sampler.triggerAttackRelease(`${note}`, '4n').toDestination()
        } else if (note == 'mystery') {
            sampler.triggerAttackRelease('C4', '4n')
        } else {
            //console.log('resting, yo')
        }
}

export const playTune = tune => {
    Tone.Transport.stop()
    makeTune(tune)
}

export const makeTune = () => {
    let melody = []
    let isNote = false
    let time = 0

    let tune = ['G5', 'E6', 'hold', 'G5', 'F5', 'D6', 'hold', 'B5', 'C6', 'rest', 'mystery', 'rest', 'C5', 'rest', 'rest']

    let pitch = []
    let duration = []

    loop1:
    for (let i = 0; i < tune.length; i++) {

        let note = { pitch: null, length: '8n', time: `+0:0:${time}` }
        let length = '8n'

        if (pitch.includes(tune[i])) {
            isNote = true
            note.pitch = tune[i] == 'mystery' ? 'C4' : tune[i]
            time += 1
            if (tune[i + 1] == 'hold') { //&& tune[i] != 'mystery'){
                let n = i
                loop2:
                for (let h = n + 1; h < tune.length; h++) {
                    if (tune[h] == 'hold') {
                        if (tune[i] != 'mystery') {
                            length = length.concat(' + 8n ')
                        }
                        time += 1
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
            time += 1
            melody.push(note)
        }
    }
    melody[0].time = '+0:0:0'

    /**
    const part = new Tone.Part(((t, note) => {
        // the value is an object which contains both the note and the velocity
        sampler.triggerAttackRelease(note.pitch, note.length, note.time)
    }), melody).start();
    Tone.Transport.start();
    console.log('----> melody: ', melody)
 */
/**
    synth.triggerAttackRelease("G4", "8n", "+0:0:0")
    synth.triggerAttackRelease("F#4", "8n", "+0:0:2")
    synth.triggerAttackRelease("D#4", "8n", "+0:0:4")
    synth.triggerAttackRelease("A3", "8n", "+0:0:6")
    synth.triggerAttackRelease("G#3", "8n", "+0:0:8")
    synth.triggerAttackRelease("E4", "8n", "+0:0:10")
    synth.triggerAttackRelease("G#4", "8n", "+0:0:12")
    synth.triggerAttackRelease("C5", "8n", "+0:0:14")

}*/

let t = Tone.now()

    for (const note of melody) {
        console.log(note);
        if (note.pitch !== 'rest') {
          // synth.triggerAttackRelease(note[0], note[1]), t);
          synth.triggerAttackRelease(note.pitch, Tone.Time(note.length) - 0.1, t);
        }
        t += Tone.Time(note.length);
      }

}

/**
var part = new Tone.Part(function(time, value){
    //the value is an object which contains both the note and the duration
    synth.triggerAttackRelease(value.note, value.duration, time);
}, myMelody).start(0);
/**
export const makeTune = tune => {
    let noteLength = '4n'

    
        let i = tune.indexOf(note)
        if (note == 'rest') {
            tune[i] = null
        } else if (pitch.includes(note)) {
            console.log(pitch.includes(note))
            if (tune[i + 1] == 'hold') {
                let h = i + 1
                for (h; h < tune.length; h++) {
                    if (tune[h] == 'hold') {
                        noteLength = noteLength.concat(' +4n')
                    } 
                }
            }
        }
    })
} */

export const getSampler = () => {
    return sampler
}


/**
export const validateTune = tune => {
    let isValid = false
    tune.forEach(note => {
        let i = tune.indexOf(note)
        if(note == 'rest'){ tune[i] = null }
        if(note == 'hold' && ['rest', 'mystery', null].includes(tune[i - 1])){ tune[i] = null }
        else {
            if(tune[i + 1] == 'hold'){
                let noteLength = '4n'
                let holding = true
                for(let h = i + 1; (h < tune.length) && holding; h++){
                    if(tune[h] == 'hold'){
                        console.log('still holding', h)
                        //noteLength.concat('+4n')
                        //console.log(noteLength)
                    }
                    else {
                        holding = false
                    }
                }
            }
        }
    })
    //(tune.slice(i + 1, tune.length)).forEach(n => {
console.log('---> validation complete <---')
console.log(tune)

return isValid
}
*/
export const noteNames = ['rest', 'hold','G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'mystery']

let notes = []
let tune = []

export const createNotes = () => {

    notes = []

    const importImages = r => {
        let imports = {}
        r.keys().map((item) => { imports[item.replace('./', '')] = r(item) })
        return imports
    }

    let images = importImages(require.context('../assets/images/notes', false, /\.(png|jpe?g|svg)$/))

    noteNames.forEach(n => {
        let note = { noteName: n }
        for (const img in images) {
            if (img == `note_${n}.png`) {
                note.image = images[img].default
            }
        }
        notes.push(note)
    })
}

export const createNewTune = () => {
    tune = []
    for (let i = 0; i < 16; i++) {
        tune.push('rest')
    }
    return tune
}

export const defaultTune = () => {
    return ['G5', 'E6', 'hold', 'G5', 'F5', 'D6', 'hold', 'B5', 'C6', 'rest', 'mystery', 'rest', 'C5', 'rest', 'rest']
}

export const getTune = () => {
    return tune
}

export const getNotes = () => {
    return notes
}

const testTune = `{
    "pitch": "G5",
    "length": "4n",
    "time": "+0:0:0"
  },
  {
    "pitch": "E6",
    "length": "4n + 4n ",
    "time": "+0:0:2"
  },
  {
    "pitch": "G5",
    "length": "4n",
    "time": "+0:0:8"
  },
  {
    "pitch": "F5",
    "length": "4n",
    "time": "+0:0:10"
  },
  {
    "pitch": "D6",
    "length": "4n + 4n ",
    "time": "+0:0:12"
  },
  {
    "pitch": "B5",
    "length": "4n",
    "time": "+0:0:18"
  },
  {
    "pitch": "C6",
    "length": "4n",
    "time": "+0:0:20"
  },
  {
    "pitch": null,
    "length": "4n",
    "time": "+0:0:22"
  },
  {
    "pitch": "C4",
    "length": "4n",
    "time": "+0:0:24"
  },
  {
    "pitch": null,
    "length": "4n",
    "time": "+0:0:26"
  },
  {
    "pitch": "C5",
    "length": "4n + 4n ",
    "time": "+0:0:28"
  },
  {
    "pitch": null,
    "length": "4n",
    "time": "+0:0:34"
  },
  {
    "pitch": null,
    "length": "4n",
    "time": "+0:0:36"
  }
}`
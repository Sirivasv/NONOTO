import * as Tone from 'tone'
import * as WebMidi from 'webmidi'
import * as log from 'loglevel'

let Nexus = require('./nexusColored')

let midiOut;

let dummyMidiOut = new Tone.Instrument();
dummyMidiOut.playNote = () => {};


export function render() {
    let midiOutSelectElem: HTMLElement = document.createElement("div");
    midiOutSelectElem.id = 'select-midiout';
    document.body.appendChild(midiOutSelectElem);

    WebMidi.enable(function (err) {
        if (err) log.error(err);

        let midiOutSelect = new Nexus.Select('#select-midiout', {
            'size': [150, 50],
            'options': ['No Output'].concat(WebMidi.outputs.map((output) => output.name)),
        });
        function midiOutOnChange(ev) {
            if (this.value !== 'No Output') {
                    midiOut = WebMidi.getOutputByName(this.value);
            }
            else {
                    midiOut = dummyMidiOut;
            }
            log.info('Selected MIDI out: ' + this.value);
        };
        midiOutSelect.on('change', midiOutOnChange.bind(midiOutSelect));
        midiOutSelect.value = 'No Output';
    });
}


export function getOutput() {
    return midiOut
}
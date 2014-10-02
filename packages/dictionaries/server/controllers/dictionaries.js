'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
    //async = require('async'),
   // config = require('meanio').loadConfig(),
   // templates = require('../template');


exports.add = function (req, res) {


    var Dictionary = mongoose.model('Dictionary'),
    Monograph = mongoose.model('Monograph', 'cumed');

//Preuba luego borrar todo esto
    /*var dictionary = new Dictionary({
        v1: 'BR1.1',
        v3: [
            {'_': 'BR1.1', 'a': '1.00', 'b': 'T17a', 'c': ['v.1', 'e.2'], 't': '1001'},
            {'_': 'BR67.1', 'a': '614.32', 'b': 'T17a', 'c': ['v.2'], 't': '25'},
            {'b': 'T17a', 'c': ['v.2'], 't': '25'}
        ],
        v5: 'T',
        v6: 'mc',
        v11: [
            {'_': 'Fidel Santana', 'r': 'edt'},
            {'_': 'Fernanadno Sanchez', 'r': 'edt'}
        ],
        v12: [
            {'_': 'Alergias humanas', 'i': 'es'},
            {'_': 'Fernanadno Sanchez', 'i': 'en'}
        ],
        v14: [
            {'_': '[24543-3]', 'f': 5},
            {'_': '[1-3]', 'f': 1, 'l': 500}
        ],
        v16: [
            {'_': 'Fidel Santana', 's1': 'dasdfas', 's2': 'jjjjjjj', 'p': 'Iran', 'r': 'edt'},
            {'_': 'Fernanadno Sanchez', 's1': 's.af', 's2': 'jjjjjjj', 'r': 'edt'}
        ],
        v18: [
            {'_': 'Cólera: informe técnico', 'i': 'es'},
            {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
        ],
        v20: 'xvii,323',
        v21: 'fasd',
        v30: 'Esto es una prueba para de un titulo   ',
        v35: '32rv4145',
        v40: 'es',
        v50: 'Universidad de Buenos Aires. Facultad de Medicina',
        v51: 'Profesor titular',
        v54: 'dfasdffasdfasd',
        v55: '22345678',
        v56: 'Evento en el Palacio',
        v64: '516198191',
        v65: '51619819',
        v66: 'La Habana',
        v83: [
            {_: 'Sara', i: 'es'},
            {_: 'rrett', i: 'es'}
        ],
        v87: [
            {d: 'Sarampión', s: 'inmunol', 'k': 'kakakak'},
            {d: 'Vacuna Antisarampión', s: 'inmunol'},
            {d: 'Agua', s: 'anal'}
        ],
        v91: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'},
        v917: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}

    });*/

    var monograph = new Monograph({
        v1: 'BR1.1', //(LLenado automatico)
        v4: 'CUMED', //(LLenado automatico)
        v5: 'MC', //(LLenado automatico)
        v6: 'm', //(LLenado automatico)
        v84: '20041217', //(LLenado automatico)
        v91: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
        v92: 'FSM', //(LLenado automatico)
        v93: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
        v98: 'FONTE', //(LLenado automatico
        v899: 'LILDBIWEB-1.8', //(LLenado automatico)
        v9: 'a',
        v18: [
            {'_': 'Cólera: informe técnico', 'i': 'es'},
            {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
        ],
        v20: 'xvii,323',
        v40: 'es',
        v62: ['Gente Nueva', 'Guama'],
        v64: 'ago.-oct. 1991',
        v65: '51619819',
        v66: 'La Habana',
        v67: 'BR',
        v87: [
            {d: 'Sarampión', s: 'inmunol', k: 'kakakak'},
            {d: 'Vacuna Antisarampión', s: 'inmunol'},
            {d: 'Agua', s: 'anal'}
        ],
        v53: 'GGGGGGG',
        v54: 'dfasdffasdfasd',
        v56: 'Evento en el Palacio',
        v55: '22345678'


    });

    monograph.save(function (err) {
        if (err) {
            var modelErrors = [];

            if (err.errors) {
                for (var x in err.errors) {
                    modelErrors.push({
                        param: x,
                        msg: err.errors[x].message,
                        value: err.errors[x].value
                    });
                }
                res.status(400).send(modelErrors);
            }
            else{
                res.status(400).send([{
                    msg: err.message
                }]);
            }
            return res.status(400);
        }

        res.json(monograph);
    });

};

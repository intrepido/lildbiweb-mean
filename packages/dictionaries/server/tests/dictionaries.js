'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Dictionary = mongoose.model('Dictionary'),
    Monograph = mongoose.model('Monograph', 'cumed'),
    MonographicSerie = mongoose.model('MonographicSerie', 'cumed'),
    NoConventional = mongoose.model('NoConventional', 'cumed'),
    Thesis = mongoose.model('Thesis', 'cumed');

/**
 * Globals
 */
var user;
var dictionary;
var monograph;
var monographicSerie;
var noConventional;
var thesis;

/**
 * Test Suites
 */
describe('<Unit Test>', function () {
    describe('Model Dictionary:', function () {
        beforeEach(function (done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function () {
                /*  monograph = new Monograph({
                 v1: 'BR1.1',
                 v3: [
                 {'_': 'BR1.1', 'a': '1.00', 'b': 'T17a', 'c': ['v.1', 'e.2'], 't': '1001'},
                 {'_': 'BR67.1', 'a': '614.32', 'b': 'T17a', 'c': ['v.2'], 't': '25'},
                 {'b': 'T17a', 'c': ['v.2'], 't': '25'}
                 ],
                 v5: 'T',
                 v6: 'mc',
                 v8: [
                 {'u': 'Fidel Santana', i: 'es', q: 'cmp', y: 'AUDIO'},
                 {'u': 'http', i: 'es', q: 'cmp', y: 'AUDIO'}
                 ],
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
                 v30: 'Esto es una pr
                 ueba para de un titulo   ',
                 v35: '32rv4145',
                 v40: 'es',
                 v50: 'Universidad de Buenos Aires. Facultad de Medicina',
                 v51: 'Profesor titular',
                 v53: ['prueba'],
                 v54: 'dfasdffasdfasd',
                 v55: '22345678',
                 v56: 'Evento en el Palacio',
                 v64: '516198191',
                 v65: '51619819',
                 v66: 'La Habana',
                 v83: [
                 {_: 'SaraEstos aka aska slaksdjfa alaksjld alalkasdj flal alsjkdlkmpión', i: 'es'},
                 {_: 'Sarampión', i: 'es'}
                 ],
                 v84: '20041217',
                 v87: [
                 {d: 'Sarampión', s: 'inmunol', 'k': 'kakakak'},
                 {d: 'Vacuna Antisarampión', s: 'inmunol'},
                 {d: 'Agua', s: 'anal'}
                 ],
                 v91: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'},
                 v92: 'SMY',
                 v93: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'},
                 v98: 'BR1.1-131',
                 v917: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}

                 });*/

                /*monographicSerie = new MonographicSerie({
                 v1: 'BR1.1', //(LLenado automatico)
                 v4: 'LILACS', //(LLenado automatico)
                 v5: 'MS', //(LLenado automatico)
                 v6: 'ams', //(LLenado automatico)
                 v84: '20041217', //(LLenado automatico)
                 v91: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
                 v92: 'FSM', //(LLenado automatico)
                 v93: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
                 v98: 'FONTE', //(LLenado automatico
                 v899: 'LILDBIWEB-1.8', //(LLenado automatico
                 v9: 'a',
                 v12: [
                 {'_': 'Cólera: informe técnico', 'i': 'en'},
                 {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
                 ],
                 v14: [
                 {_: '[53]'}
                 ],
                 v18: [
                 {'_': 'Cólera: informe técnico', 'i': 'en'},
                 {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
                 ],
                 v20: 32,
                 v25: [
                 {'_': 'Cólera: informe técnico', 'i': 'en'}
                 ],
                 v30: [
                 'Este es el titulo'
                 ],
                 v40: 'es',
                 v62: ['Gente Nueva', 'Guama'],
                 v64: '1998',
                 v65: 19980000,
                 v66: 'La Habana',
                 v67: 'CU',
                 v87: [
                 {d: 'Sarampión', s: 'inmunol', k: 'kakakak'},
                 {d: 'Vacuna Antisarampión', s: 'inmunol'},
                 {d: 'Agua', s: 'anal'}
                 ]
                 });*/

                /*noConventional = new NoConventional({
                 v1: 'BR1.1', //(LLenado automatico)
                 v4: 'LILACS', //(LLenado automatico)
                 v5: 'N', //(LLenado automatico)
                 v6: 'am', //(LLenado automatico)
                 v84: '20041217', //(LLenado automatico)
                 v91: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
                 v92: 'FSM', //(LLenado automatico)
                 v93: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
                 v98: 'FONTE', //(LLenado automatico
                 v899: 'LILDBIWEB-1.8', //(LLenado automatico
                 v9: 'a',
                 v12: [
                 {'_': 'Cólera: informe técnico', 'i': 'en'},
                 {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
                 ],
                 v14: [
                 {_: '[53]'}
                 ],
                 v18: [
                 {'_': 'Cólera: informe técnico', 'i': 'en'},
                 {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
                 ],
                 v20: 32,
                 v21: 'v.2',
                 v25: [
                 {'_': 'Cólera: informe técnico', 'i': 'en'}
                 ],
                 v30: [
                 'Este es el titulo'
                 ],
                 v40: 'es',
                 v62: ['Gente Nueva', 'Guama'],
                 v64: '1998',
                 v65: 19980000,
                 v66: 'La Habana',
                 v67: 'CU',
                 v87: [
                 {d: 'Sarampión', s: 'inmunol', k: 'kakakak'},
                 {d: 'Vacuna Antisarampión', s: 'inmunol'},
                 {d: 'Agua', s: 'anal'}
                 ]
                 });*/

                thesis = new Thesis({
                    v1: 'BR1.1', //(LLenado automatico)
                    v4: 'LILACS', //(LLenado automatico)
                    v5: 'T', //(LLenado automatico)
                    v6: 'am', //(LLenado automatico)
                    v84: '20041217', //(LLenado automatico)
                    v91: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
                    v92: 'FSM', //(LLenado automatico)
                    v93: {_: 20060626, i: '14:04:18', f: '14:04:37', t: '0:04:37'}, //(LLenado automatico)
                    v98: 'FONTE', //(LLenado automatico
                    v899: 'LILDBIWEB-1.8', //(LLenado automatico
                    v9: 'a',
                    v10: [
                        {'_': 'Fidl, Fernandez'}
                    ],
                    v12: [
                        {'_': 'Cólera: informe técnico', 'i': 'en'}
                    ],
                    v14: [
                        {'_': '[23]'}
                    ],
                    v16: [
                        {'_': 'Fidl, Fernandez'}
                    ],
                    v18: [
                        {'_': 'Cólera: informe técnico', 'i': 'en'},
                        {'_': 'Simpósio de Plantas Medicinais no Brasil', 'i': 'pt'}
                    ],
                    v20: 32,
                    v30: [
                        'Este es el titulo'
                    ],
                    v40: 'es',
                    v50: 'Especialista',
                    v51: 'fadsfa',
                    v62: ['s.n'],
                    v64: '1998',
                    v65: 19980000,
                    v66: 'La Habana',
                    v67: 'CU',
                    v87: [
                        {d: 'Sarampión', s: 'inmunol', k: 'kakakak'},
                        {d: 'Vacuna Antisarampión', s: 'inmunol'},
                        {d: 'Agua', s: 'anal'}
                    ]
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                return thesis.save(function (err) {
                    should.not.exist(err);
                    //dictionary.v3[0].a.should.equal(1.00);
                    /*dictionary.title.should.equal('Dictionary Title');
                     dictionary.content.should.equal('Dictionary Content');
                     dictionary.user.should.not.have.length(0);
                     dictionary.created.should.not.have.length(0);*/
                    done();
                });
            });

            /*  it('should be able to show an error when try to save without title', function(done) {
             dictionary.title = '';

             return dictionary.save(function(err) {
             should.exist(err);
             done();
             });
             });

             it('should be able to show an error when try to save without content', function(done) {
             dictionary.content = '';

             return dictionary.save(function(err) {
             should.exist(err);
             done();
             });
             });

             it('should be able to show an error when try to save without user', function(done) {
             dictionary.user = {};

             return dictionary.save(function(err) {
             should.exist(err);
             done();
             });
             });*/

        });

        afterEach(function (done) {

            user.remove();
            done();
        });
    });
});

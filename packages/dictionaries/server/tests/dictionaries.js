'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Dictionary = mongoose.model('Dictionary'),
    Monograph = mongoose.model('Monograph', 'cumed');

/**
 * Globals
 */
var user;
var dictionary;
var monograph;

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

                monograph = new Monograph({
                    v1: 'BR1.1', //(LLenado automatico)
                    v4: 'CUMED', //(LLenado automatico)
                    v5: 'M', //(LLenado automatico)
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
                    v54: 'dfasdffasdfasd',
                    v56: 'Evento en el Palacio',
                    v55: '22345678'
                });

                done();
            });
        });

        describe('Method Save', function () {
            it('should be able to save without problems', function (done) {
                return monograph.save(function (err) {
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

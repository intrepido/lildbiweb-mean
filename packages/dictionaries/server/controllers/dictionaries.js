'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Dictionary = mongoose.model('Dictionary');
    //async = require('async'),
   // config = require('meanio').loadConfig(),
   // templates = require('../template');


exports.add = function (req, res) {


    var myRe = /\w+/;
    var myArray = myRe.exec("John Smith");

//Preuba luego borrar todo esto
    var dictionary = new Dictionary({
        v1: 'BR1.1',
        v3: [
            {'_': 'BR1.1', 'a': '1.00', 'b': 'T17a', 'c': ['v.1', 'e.2'], 't': '1001'},
            {'_': 'BR67.1', 'a': '614.32', 'b': 'T17a', 'c': ['v.2'], 't': '25'},
            {'b': 'T17a', 'c': ['v.2'], 't': '25'}
        ],
        v5: 'T',
        v6: 'as',
        v11: [
            {'_': 'Fidel Santana', 'r': 'edt'},
            {'_': 'Fernanadno Sanchez', 'r': 'edt'}
        ],
        v12: [
            {'_': 'Alergias humanas', 'i': 'es'},
            {'_': 'Fernanadno Sanchez', 'i': 'en'}
        ],
        v14: [
            {'_': '[24543-3]','f': 5},
            {'_': '[1-3]', 'f': 1, 'l': 500}
        ],
        v16: [
            {'_': 'Fidel Santana', 's1': 'dasdfas', 's2': 'jjjjjjj', 'p': 'Iran', 'r': 'edt'},
            {'_': 'Fernanadno Sanchez', 's1': 's.af', 's2': 'jjjjjjj', 'r': 'edt'}
        ]
    });

    dictionary.save(function (err) {
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

        res.json(dictionary);
    });

};

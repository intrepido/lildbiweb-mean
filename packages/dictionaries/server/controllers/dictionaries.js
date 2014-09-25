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
//Preuba luego borrar todo esto
    var dictionary = new Dictionary({
        v1: 'BR1.1',
        v3: [
            {'_': 'BR1.1', 'a': '1.00', 'b': 'T17a', 'c': ['v.1', 'e.2'], 't': '1001'},
            {'_': 'BR67.1', 'a': '614.32', 'b': 'T17a', 'c': ['v.2'], 't': '25'},
            {'b': 'T17a', 'c': ['v.2'], 't': '25'}
        ],
        v5: 'SCP',
        v6: 'as',
        v10: [
            {'_': 'Fidel Santana', 's1': 'fasd', 's2': 'T17a', 's3': 'dfasda', 'p': 'Cuba', 'c': 'La Habana'},
            {'_': 'Fernanadno Sanchez', 's1': 'fasdrrrrrrrrrrrrr', 's2': 'd4545T17a', 's3': '777a', 'p': 'Italia', 'c': 'Roma'},
            {'_': 'Gregorio Saltamonte', 's1': 's.af'}
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

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Validations
 */
/*
 DictionarySchema.path('3').validate(function(value) {
 return value.length;
 },"'3' cannot be an empty array");*/


/*
 DictionarySchema.path('title').validate(function(title) {
 return !!title;
 }, 'Title cannot be blank');

 DictionarySchema.path('content').validate(function(content) {
 return !!content;
 }, 'Content cannot be blank');*/

/**
 * Enumerators.
 */
var LiteratureTypes = ['S','SC','SCP','SP','M','MC','MCP','MP','MS','MSC','MSP','T','TS','N','NC','NP'];


/**
 * Dictionary Schema
 */
var DictionarySchema = new Schema({
    v1: { // CÓDIGO DEL CENTRO
        type: String,
        required: true, //Es requerido porque es llenado automaticamente por el sistema (NOTA: Averiguar como el lildbiweb viejo obtenia este codigo)
        trim: true
    },
    v3: [ //LOCALIZACIÓN DEL DOCUMENTO
        {
            _id: false,
            _: String, //codigo del centro
            a: String, //número de clasificación  (NOTA: Este campo siempre es un float?)
            b: String, //número del autor
            c: [String], //información referente al volumen, tomo, parte, número de ejemplares, etc
            t: Number //número de inventario   (NOTA: Este campo siempre es un numero?)
        }
    ],
    v4: [ //BASE DE DATOS
        {
            type: String,
            trim: true
        }
    ],
    v5:{ //TIPO DE LITERATURA
        type: String,
        enum: LiteratureTypes,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    }
}, { strict: true });


/**
 * Statics
 */
/*
 DictionarySchema.statics.load = function(id, cb) {
 this.findOne({
 _id: id
 }).populate('user', 'name username').exec(cb);
 };
 */
mongoose.model('Dictionary', DictionarySchema);

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
var validate_v10_1 = function (value) {
    if (this.parent().v6 === 'as')
        return value ? true : false;
    else
        return true;
};
*/

/*
 DictionarySchema.path('v10').validate(function(value) {
 return this.v10.length;
 },'the field v10 is already fully');*/
/*
 DictionarySchema.path('v11').validate(function(value) {
 return !this.v10.length;
 },'the field v10 is already fully');
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
var literatureTypes = ['S','SC','SCP','SP','M','MC','MCP','MP','MS','MSC','MSP','T','TS','N','NC','NP'];

var treatmentLevel = ['m','mc','ms','am','amc','ams','as','c'];

var languagueCode = ['es','en']; //Codificador

var fileExtension = ['css','cmp']; //Codificador

var fileType = ['css','cmp']; //Codificador

var registerType = ['a','c','d']; //Codificador

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
        enum: literatureTypes,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    },
    v6:{ //NIVEL DE TRATAMIENTO
        type: String,
        enum: treatmentLevel,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    },
    v7:[ //NÚMERO DEL REGISTRO
        {//número único secuencial atribuido al documento por la Institución Procesadora, de acuerdo con su entrada en la biblioteca
            type: Number,
            trim: true
        }
    ],
    v8:[ //DIRECCIÓN ELECTRÓNICA
        {
            _id: false,
            u: { //localizador de la fuente
                type: String,
                required: true,
                trim: true
            },
            i: { //código del idioma
                type: String,
                enum: languagueCode,
                required: true,
                trim: true
            },
            g: String, //texto completo
            k: String, //clave
            l: String, //logon
            q: { //extensión del archivo
                type: String,
                enum: fileExtension,
                required: true,
                trim: true
            },
            s: Number, //tamaño del archivo
            x: String, //nota no pública
            y: { //tipo de archivo
                type: String,
                enum: fileType,
                required: true,
                trim: true
            },
            z: String //nota pública
        }
    ],
    v9:{ //TIPO DE REGISTRO
        type: String,
        enum: registerType
    },
    v10:[ //AUTOR PERSONAL (nivel analítico)
        {
            _id: false,
            _: String, //nombre de la persona responsable por el contenido intelectual de un documento
            s1: String, //afiliación
            s2: String, //afiliación
            s3: String, //afiliación
            p: String, //país (NOTA: Por que no tiene un codificador de pais en este subcampo?)
            c: String, //ciudad
            r: Number //grado de responsabilidad
        }
    ],
    v11:[ //AUTOR INSTITUCIONAL (nivel analítico)
        {
            _id: false,
            _: String, //nombre de la institución responsable por el contenido intelectual de un documento
            r: Number //grado de resonsabilidad
        }
    ]
}, { strict: true });


/**
 * Pre-save hook
 */
DictionarySchema.pre('save', function (next) {
    if (!this.v10.length && !this.v11.length){ //Si v10 y v11 no son llenados, entonces ponerle valor 'Anon' a v10
        this.v10.push({'_': 'Anon'});
    }
    if(this.v10.length && this.v11.length){ //Si v10 y v11 son llenados, entonces solo dejar v10 con valor
        this.v11.splice(0, this.v11.length);
    }
    if(this.v6 === 'as'){ //Si v6 es una analitica periodica
        for(var key in  this.v10){
            if(!this.v10[key].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series'));
        }
    }
        //return next(new Error('Invalid password'));
    next();
});


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

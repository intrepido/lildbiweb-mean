'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Validations
 */

var validate_v10_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v10, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true
};

var validate_v16_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v16, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true
};


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
var literatureTypes = ['S', 'SC', 'SCP', 'SP', 'M', 'MC', 'MCP', 'MP', 'MS', 'MSC', 'MSP', 'T', 'TS', 'N', 'NC', 'NP'];

var treatmentLevel = ['m', 'mc', 'ms', 'am', 'amc', 'ams', 'as', 'c'];

var languagueCode = ['es', 'en']; //Codificador

var fileExtension = ['css', 'cmp']; //Codificador

var fileType = ['css', 'cmp']; //Codificador

var registerType = ['a', 'c', 'd']; //Codificador

var responsibilityGrade = ['edt', 'com', 'coord', 'org']; //Codificador

var idiomCode = ['en', 'es', 'pt', 'fr']; //Codificador

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
    v5: { //TIPO DE LITERATURA
        type: String,
        enum: literatureTypes,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    },
    v6: { //NIVEL DE TRATAMIENTO
        type: String,
        enum: treatmentLevel,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    },
    v7: [ //NÚMERO DEL REGISTRO
        {//número único secuencial atribuido al documento por la Institución Procesadora, de acuerdo con su entrada en la biblioteca
            type: Number,
            trim: true
        }
    ],
    v8: [ //DIRECCIÓN ELECTRÓNICA
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
    v9: { //TIPO DE REGISTRO
        type: String,
        enum: registerType
    },
    v10: [ //AUTOR PERSONAL (nivel analítico)
        {
            _id: false,
            _: String, //nombre de la persona responsable por el contenido intelectual de un documento
            s1: { //afiliación
                type: String,
                validate: [validate_v10_s1, 'The country is obligatory when the affiliation was especificated']
            },
            s2: String, //afiliación
            s3: String, //afiliación
            p: String, //país (NOTA: Por que no tiene un codificador de pais en este subcampo?)
            c: String, //ciudad
            r: { //grado de responsabilidad
                type: String,
                enum: responsibilityGrade
            }
        }
    ],
    v11: [ //AUTOR INSTITUCIONAL (nivel analítico)
        {
            _id: false,
            _: String, //nombre de la institución responsable por el contenido intelectual de un documento
            r: { //grado de responsabilidad
                type: String,
                enum: responsibilityGrade
            }
        }
    ],
    v12: [ //TÍTULO (nivel analítico)
        {
            _id: false,
            _: { //título del documento
                type: String,
                required: true
            },
            i: { //código del idioma
                type: String,
                enum: idiomCode,
                required: true
            }
        }
    ],
    v13: { //TÍTULO TRADUCIDO AL INGLÉS (nivel analítico)
        type: String,
        trim: true
    },
    v14: [ //PÁGINAS (nivel analítico)
        {
            _id: false,
            _: { //paginacion irregular o inexistente
                type: String,
                match: [/^\[\d+-\d+\]$/, 'The irregular pagination ({VALUE}) must match with "[initPage-lastPage]" format']
            },
            f: { //número inicial
                type: String
            },
            l: { //número final
                type: String
            }
        }
    ],
    v16: [ //AUTOR PERSONAL (nivel monográfico)
        {
            _id: false,
            _: String, //nombre de la persona responsable por el contenido intelectual de un documento
            s1: { //afiliación
                type: String,
                validate: [validate_v16_s1, 'The country is obligatory when the affiliation was especificated']
            },
            s2: String, //afiliación
            s3: String, //afiliación
            p: String, //país (NOTA: Por que no tiene un codificador de pais en este subcampo?)
            c: String, //ciudad
            r: { //grado de responsabilidad
                type: String,
                enum: responsibilityGrade
            }
        }
    ],
    v17: [ //AUTOR INSTITUCIONAL (nivel monográfico)
        {
            _id: false,
            _: String, //nombre de la institución responsable por el contenido intelectual de un documento
            r: { //grado de responsabilidad
                type: String,
                enum: responsibilityGrade
            }
        }
    ],
    v18: [ //TÍTULO (nivel monográfico)
        {
            _id: false,
            _: { //título del documento
                type: String,
                required: true,
                lowercase: true
            },
            i: { //código del idioma
                type: String,
                enum: idiomCode,
                required: true
            }
        }
    ]
}, { strict: true });


DictionarySchema.path('v12').validate(function (value) {
    return value.length ? true : false;
}, 'The title cannot be blank');

DictionarySchema.path('v18').validate(function (value) {
    return value.length ? true : false;
}, 'The title cannot be blank');

/**
 * Pre-save hook
 */
DictionarySchema.pre('save', function (next) { //Las reglas que se definen aqui, tienen que existir independientememte de si el campo al que se le aplica es llenado o no

    if (!this.v10.length && !this.v11.length) { //Si v10 y v11 no son llenados, entonces ponerle valor 'Anon' a v10
        this.v10.push({'_': 'Anon'});
    }

    if (this.v10.length && this.v11.length) { //Si v10 y v11 son llenados, entonces solo dejar v10 con valor
        this.v11.splice(0, this.v11.length);
    }

    if (this.v6 === 'as') { //Si v6 es una analitica de serie periodica entonces el campo s1 es obligatorio
        for (var i = 0; i < this.v10.length; i++) {
            if (!this.v10[i].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series'));
        }
    }

    if (!this.v16.length && !this.v17.length) { //Si v16 y v17 no son llenados, entonces ponerle valor 'Anon' a v16
        this.v16.push({'_': 'Anon'});
    }

    if (this.v16.length && this.v17.length) { //Si v16 y v17 son llenados, entonces solo dejar v16 con valor
        this.v17.splice(0, this.v17.length);
    }

    if (this.v6 === 'as') { //Si v6 es una analitica de serie periodica entonces el campo s1 es obligatorio
        for (var i = 0; i < this.v16.length; i++) {
            if (!this.v16[i].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series'));
        }
    }

    if (this.v5 === 'T') { //Si v5 es una Tesis entonces los campos de afiliacion no deben ser llenados
        for (var i = 0; i < this.v16.length; i++) {
            delete this.v16[i]._doc.s1;
            delete this.v16[i]._doc.s2;
            delete this.v16[i]._doc.s3;
            delete this.v16[i]._doc.p;
            delete this.v16[i]._doc.c;
            delete this.v16[i]._doc.r;
        }
    }

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

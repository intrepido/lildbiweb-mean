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
    return true;
};

var validate_v16_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v16, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true;
};

var validate_v23_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v23, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true;
};

var validate_v49_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v49, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true;
};

var validate_v35 = function (value) {
    return value.length <= 9;
};

var validate_v55 = function (value) {
    return value.toString().length === 8;
};

var validate_v65 = function (value) {
    return value.toString().length === 8;
};

var validate_v69 = function (value) {
    return value.length <= 13;
};

var validate_v84 = function (value) {
    return value.toString().length === 8;
};

var validate_v83 = function (value) {
    return value.length <= 2000;
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

var countryCode = ['BR', 'CO', 'CU', 'PR']; //Codificador

var itemForm = ['a', 'b', 'c', 'd']; //Codificador

var computerFileType = ['a', 'b', 'c', 'd']; //Codificador

var cartographicTypeMaterial = ['a', 'b', 'c', 'd']; //Codificador

var newspaperType = ['l', 'n', 'p', 'u']; //Codificador

var visualMaterialType = ['a', 'c', 'f', 'k']; //Codificador

var specificDesignationMaterial = ['c', 'd', 'e', 'f']; //Codificador

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
            trim: true,
            required: true
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
            s1: { //afiliación nivel 1
                type: String,
                validate: [validate_v10_s1, 'The country is obligatory when the affiliation was especificated in field v10']
            },
            s2: String, //afiliación nivel 2
            s3: String, //afiliación nivel 1
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
                validate: [validate_v16_s1, 'The country is obligatory when the affiliation was especificated in field v16']
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
    ],
    v19: { //TÍTULO TRADUCIDO AL INGLÉS (nivel monográfico)
        type: String,
        trim: true
    },
    v20: { //PÁGINAS (nivel monográfico)
        type: String,
        required: true,
        trim: true
    },
    v21: { //VOLUMEN (nivel monográfico)
        type: String,
        trim: true
    },
    v23: [ //AUTOR PERSONAL (nivel colección)
        {
            _id: false,
            _: String, //nombre de la persona responsable por el contenido intelectual de un documento
            s1: { //afiliación
                type: String,
                validate: [validate_v23_s1, 'The country is obligatory when the affiliation was especificated in field v23']
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
    v24: [ //AUTOR INSTITUCIONAL (nivel colección)
        {
            _id: false,
            _: String, //nombre de la institución responsable por el contenido intelectual de un documento
            r: { //grado de responsabilidad
                type: String,
                enum: responsibilityGrade
            }
        }
    ],
    v25: [ //TÍTULO (nivel colección)
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
    ],
    v26: { //TÍTULO TRADUCIDO PARA EL INGLÊS (nivel colección)
        type: String,
        trim: true
    },
    v27: { //NÚMERO TOTAL DE VOLÚMENES (nivel colección)
        type: Number,
        trim: true
    },
    v30: [ //TÍTULO (nivel serie)
        {
            type: String,
            trim: true
        }
    ],
    v31: { //VOLUMEN (nivel serie)
        type: String,
        trim: true
    },
    v32: { //NÚMERO DEL FASCICULO (nivel serie)
        type: String,
        trim: true
    },
    v35: { //ISSN
        type: String,
        trim: true,
        validate: [validate_v35, 'The ISSN dont must have more than 9 characters']
    },
    v38: [ //INFORMACIÓN DESCRIPTIVA
        {
            _id: false,
            b: { //otros detalles físicos (No se pone enum aqui porque se pueden poner detalles que no esten en el codificador)
                type: String,
                trim: true
            },
            a: { //extensión del ítem
                type: String,
                trim: true
            },
            c: { //dimensión
                type: String,
                trim: true
            },
            e: { //material acompañante
                type: String,
                trim: true
            }
        }
    ],
    v40: [ //IDIOMA DEL TEXTO
        {
            type: String,
            enum: idiomCode
        }
    ],
    v49: [ //TESIS, DISERTACIÓN - ORIENTADOR
        {
            _id: false,
            _: String, //orientador
            s1: { //afiliación
                type: String,
                validate: [validate_v49_s1, 'The country is obligatory when the affiliation was especificated in field v49']
            },
            s2: String, //afiliación
            s3: String, //afiliación
            p: String, //país (NOTA: Por que no tiene un codificador de pais en este subcampo?)
            c: String //ciudad
        }
    ],
    v50: { //TESIS, DISERTACIÓN - INSTITUCIÓN A LA CUAL SE PRESENTA
        type: String,
        trim: true,
        required: true
    },
    v51: { //TESIS, DISERTACIÓN – TÍTULO ACADEMICO
        type: String, //(tengo duda de si este campo es un enum o no)???????????
        trim: true,
        required: true
    },
    v52: [ //EVENTO - INSTITUCIÓN PATROCINADORA
        {
            type: String, //es repetible???????????????
            trim: true
        }
    ],
    v53: [ //EVENTO - NOMBRE
        {
            type: String, //es repetible???????????????
            trim: true,
            required: true
        }
    ],
    v54: { //EVENTO – FECHA
        type: String,
        trim: true,
        required: true
    },
    v55: { //FECHA NORMALIZADA
        type: Number,
        validate: [validate_v55, 'The normalized date must have 8 characters exactly']
    },
    v56: { //EVENTO – CIUDAD
        type: String,
        trim: true,
        required: true
    },
    v57: { //EVENTO – PAÍS
        type: String,
        enum: countryCode
    },
    v58: [ //PROYECTO - INSTITUCIÓN PATROCINADORA
        {
            type: String, //es repetible???????????????
            trim: true
        }
    ],
    v59: { //PROYECTO - NOMBRE
        type: String, //como indico que el docuemnto no pertenece a un Proyecto????????????????????
        trim: true
    },
    v60: { //PROYECTO – NÚMERO
        type: String,
        trim: true
    },
    v61: { //NOTA INTERNA
        type: String,
        trim: true
    },
    v62: [ //EDITORA
        {
            type: String,
            trim: true,
            required: true
        }
    ],
    v63: { //EDICIÓN
        type: String,
        trim: true
    },
    v64: { //FECHA DE PUBLICACIÓN
        type: String,
        trim: true,
        required: true
    },
    v65: { //FECHA NORMALIZADA
        type: Number,
        validate: [validate_v65, 'The normalized date must have 8 characters exactly']
    },
    v66: { //CIUDAD DE PUBLICACIÓN
        type: String,
        trim: true,
        required: true
    },
    v67: { //PAÍS DE PUBLICACIÓN
        type: String,
        enum: countryCode
    },
    v68: [ //SÍMBOLO
        {
            type: String,
            trim: true
        }
    ],
    v69: { //ISBN
        type: String,
        trim: true,
        validate: [validate_v69, 'The ISBN dont must have more than 13 characters']
    },
    v71: [ //TIPO DE PUBLICACIÓN    ************//Utiliza el DeSC
        {
            type: String,
            trim: true
        }
    ],
    v72: { //NÚMERO TOTAL DE REFERENCIAS
        type: Number
    },
    v74: { //ALCANCE TEMPORAL (DESDE)
        type: Number
    },
    v75: { //ALCANCE TEMPORAL (HASTA)
        type: Number
    },
    v76: [ //DESCRIPTOR PRECODIFICADO   ************//Utiliza el DeSC
        {
            type: String,
            trim: true
        }
    ],
    v78: [ //INDIVIDUO COMO TEMA
        {
            type: String,
            trim: true
        }
    ],
    v82: [ //REGIÓN NO DECS
        {
            type: String,
            trim: true
        }
    ],
    v83: [ //RESUMEN
        {
            _id: false,
            _: { //resumen
                type: String,
                validate: [validate_v83, 'The summary instance dont must have more than 2000 characters']
            },
            i: { //codigo del idioma
                type: String,
                enum: idiomCode
            }
        }
    ],
    v84: { //FECHA DE TRANSFERENCIA PARA LA BASE DE DATOS
        type: Number,
        trim: true,
        validate: [validate_v84, 'The transfered date to database must have 8 characters exactly'],
        required: true
    },
    v85: [ //PALABRAS-LLAVE DEL AUTOR  ************//Utiliza el DeSC
        {
            _id: false,
            _: String, //palabra-clave
            s: { //calificador
                type: String,
                trim: true
            },
            i: { //codigo del idioma
                type: String,
                enum: idiomCode
            }
        }
    ],
    v87: [ //DESCRIPTOR PRIMARIO    ************//Utiliza el DeSC
        {
            _id: false,
            d: { //descriptor
                type: String,
                trim: true
            },
            s: { //calificador
                type: String,
                trim: true
            }
        }
    ],
    v88: [ //DESCRIPTOR SECUNDARIO    ************//Utiliza el DeSC
        {
            _id: false,
            d: { //descriptor
                type: String,
                trim: true
            },
            s: { //calificador
                type: String,
                trim: true
            }
        }
    ],
    v91: {  //FECHA DE CREACIÓN DEL REGISTRO
        _: { //fecha en formato ISO 8601:1988
            type: Number,
            required: true
        },
        i: { //horario inicial de la creación conforme la norma ISO 8601:1988
            type: String,
            match: [/\d+:\d+:\d+/, 'The irregular pagination ({VALUE}) must match with (Ej: 14:04:18) format'],
            trim: true,
            required: true
        },
        f: { //horario final de la creación conforme la norma ISO 8601:1988
            type: String,
            match: [/\d+:\d+:\d+/, 'The irregular pagination ({VALUE}) must match with (Ej: 14:04:37) format'],
            trim: true,
            required: true
        },
        t: { //tiempo total de la creación conforme la norma ISO 8601:1988
            type: String,
            match: [/\d+:\d+:\d+/, 'The irregular pagination ({VALUE}) must match with (Ej: 0:0:19) format'],
            trim: true,
            required: true
        }
    },
    v92: [ //DOCUMENTALISTA
        {
            type: String,
            trim: true
        }
    ],
    v93: {  //FECHA DE LA ÚLTIMA MODIFICACIÓN
        _: { //fecha en formato ISO 8601:1988
            type: Number,
            required: true
        },
        i: { //horario inicial de la creación conforme la norma ISO 8601:1988
            type: String,
            match: [/\d+:\d+:\d+/, 'The irregular pagination ({VALUE}) must match with (Ej: 14:04:18) format'],
            trim: true,
            required: true
        },
        f: { //horario final de la creación conforme la norma ISO 8601:1988
            type: String,
            match: [/\d+:\d+:\d+/, 'The irregular pagination ({VALUE}) must match with (Ej: 14:04:37) format'],
            trim: true,
            required: true
        },
        t: { //tiempo total de la creación conforme la norma ISO 8601:1988
            type: String,
            match: [/\d+:\d+:\d+/, 'The irregular pagination ({VALUE}) must match with (Ej: 0:0:19) format'],
            trim: true,
            required: true
        }
    },
    v98: { //REGISTRO COMPLEMENTARIO (MONOGRAFIA, NO CONVENCIONAL, COLECCIÓN, SERIE O TESIS, DISERTACIÓN)
        type: String,
        trim: true,
        required: true
    },
    v101: { //REGISTRO COMPLEMENTARIO (EVENTO)
        type: String,
        trim: true
    },
    v102: { //REGISTRO COMPLEMENTARIO (PROYECTO)
        type: String,
        trim: true
    },
    v110: { //FORMA DEL ÍTEM
        type: String,
        enum: itemForm
    },
    v111: { //TIPO DE ARCHIVO DE COMPUTADOR
        type: String,
        enum: computerFileType
    },
    v112: { //TIPO DE MATERIAL CARTOGRÁFICO
        type: String,
        enum: cartographicTypeMaterial
    },
    v113: { //TIPO DE PERIÓDICO
        type: String,
        enum: newspaperType
    },
    v114: { //TIPO DE MATERIAL VISUAL
        type: String,
        enum: visualMaterialType
    },
    v115: { //DESIGNACIÓN ESPECÍFICA DEL MATERIAL (MATERIAL NO PROYECTABLE)
        type: String,
        enum: specificDesignationMaterial
    },
    v500: [ //NOTA GENERAL
        {
            type: String,
            trim: true
        }
    ],
    v505: [ //NOTA FORMATEADA DE CONTENIDO
        {
            type: String,
            trim: true
        }
    ],
    v530: [ //NOTA DE DISPONIBILIDAD DE FORMA FÍSICA ADICIONAL
        {
            type: String,
            trim: true
        }
    ],
    v533: [ //NOTA DE REPRODUCCIÓN
        {
            type: String,
            trim: true
        }
    ],
    v534: [ //NOTA DE VERSIÓN ORIGINAL
        {
            type: String,
            trim: true
        }
    ],
    v610: [ //INSTITUCIÓN COMO TEMA
        {
            type: String,
            trim: true
        }
    ],
    v653: [ //DESCRIPTORES LOCALES
        {
            type: String,
            trim: true
        }
    ],
    v700: [ //NOMBRE DEL REGISTRO DE ENSAYO CLÍNICO
        {
            _id: false,
            _: { //nombre de la base de datos donde el documento fue registrado   //***** Es un enum????????
                type: String
            },
            a: { //número del registro
                type: String,
                trim: true
            },
            u: { //url del registro
                type: String,
                trim: true
            }
        }
    ],
    v724: { //NÚMERO DOI
        type: String,
        trim: true
    },
    v899: { //VERSIÓN DEL SOFTWARE
        type: String,
        trim: true
    }

}, { strict: false });


DictionarySchema.path('v12').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v12" is obligatory');

DictionarySchema.path('v18').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v18" is obligatory');

DictionarySchema.path('v30').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v30" is obligatory');

DictionarySchema.path('v40').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v40" is obligatory');

DictionarySchema.path('v87').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v87" is obligatory');

DictionarySchema.path('v92').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v92" is obligatory');

DictionarySchema.path('v83').validate(function (value) {
    var cant = 0;
    for (var i = 0; i < value.length; i++) {
        cant += value[i]._.length;
    }
    return cant <= 6000 ? true : false;
}, 'The summary dont must have more than 6000 characters in total');


/**
 * Pre-save hook
 */

DictionarySchema.pre('validate', function (next) {
    if (!this.v10.length && !this.v11.length) { //Si v10 y v11 no son llenados, entonces ponerle valor 'Anon' a v10
        this.v10.push({'_': 'Anon'});
    }

    next();
});

DictionarySchema.pre('save', function (next) { //Las reglas que se definen aqui, tienen que existir independientememte de si el campo al que se le aplica es llenado o no

    if (!this.v10.length && !this.v11.length) { //Si v10 y v11 no son llenados, entonces ponerle valor 'Anon' a v10
        this.v10.push({'_': 'Anon'});
    }

    if (this.v10.length && this.v11.length) { //Si v10 y v11 son llenados, entonces solo dejar v10 con valor
        this.v11.splice(0, this.v11.length);
    }

    if (!this.v16.length && !this.v17.length) { //Si v16 y v17 no son llenados, entonces ponerle valor 'Anon' a v16
        this.v16.push({'_': 'Anon'});
    }

    if (this.v16.length && this.v17.length) { //Si v16 y v17 son llenados, entonces solo dejar v16 con valor
        this.v17.splice(0, this.v17.length);
    }

    if (!this.v23.length && !this.v24.length) { //Si v23 y v24 no son llenados, entonces ponerle valor 'Anon' a v23
        this.v23.push({'_': 'Anon'});
    }

    if (this.v23.length && this.v24.length) { //Si v23 y v24 son llenados, entonces solo dejar v23 con valor
        this.v24.splice(0, this.v24.length);
    }

    if (!this.v59 && !this.v60) { //Si v59 y v60 no son llenados, entonces no se indica que el documento forma parte de un proyecto.
        //this.v10.push({'_': 'Anon'});
    }

    if (this.v6 === 'as') { //Si v6 es una analitica de serie periodica entonces el campo s1 es obligatorio
        for (var i = 0; i < this.v10.length; i++) {
            if (!this.v10[i].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series in the field v10'));
        }
        for (var i = 0; i < this.v16.length; i++) {
            if (!this.v16[i].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series in the field v16'));
        }
        for (var i = 0; i < this.v23.length; i++) {
            if (!this.v23[i].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series in the field v23'));
        }
        for (var i = 0; i < this.v49.length; i++) {
            if (!this.v49[i].s1)
                return next(new Error('The affiliation is obligatory for analitics of periodic series in the field v49'));
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

        for (var i = 0; i < this.v23.length; i++) {
            delete this.v23[i]._doc.s1;
            delete this.v23[i]._doc.s2;
            delete this.v23[i]._doc.s3;
            delete this.v23[i]._doc.p;
            delete this.v23[i]._doc.c;
            delete this.v23[i]._doc.r;
        }
    }

    if (this.v6 === 'mc' || this.v6 === 'amc') { //Si v6 es una monografia perteneciente a una colección, o una analítica perteneciente a una colección, entonces el campo s1 es obligatorio
        if (!this.v21)
            return next(new Error('The field "v21" must be obligatory if the level of treatment are "mc" or "amc"'));
    }

    if (this.v54) { //Si v54 existe y tiene valor "s.f", entonces v55 no debe existir
        if (this.v54 === 's.f') {
            delete this._doc.v55;
        } else {
            if (!this.v55)
                return next(new Error('The field "v55" must exist because the field "v54" exist'));
        }
    }

    if (this.v64) { //Si v64 existe y tiene valor "s.f", entonces v65 no debe existir
        if (this.v64 === 's.f') {
            delete this._doc.v65;
        } else {
            if (!this.v65)
                return next(new Error('The field "v65" must exist because the field "v64" exist'));
        }
    }

    if (this.v75 < this.v74) {
        return next(new Error('The field "v75" must be bigger than "v74"'));
    }

    /*if(!this.v52 && !this.v53 && !this.v54 && !this.v55 && !this.v56 && !this.v57){
     delete this._doc.v101;
     }*/


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

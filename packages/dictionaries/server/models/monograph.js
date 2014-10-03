'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Enumerators.
 */

var literatureTypes = ['S', 'SC', 'SCP', 'SP', 'M', 'MC', 'MCP', 'MP', 'MS', 'MSC', 'MSP', 'T', 'TS', 'N', 'NC', 'NP'];

var treatmentLevel = ['m', 'mc', 'ms', 'am', 'amc', 'ams', 'as', 'c'];

var languagueCode = ['es', 'en']; //Codificador

var fileExtension = ['css', 'cmp']; //Codificador

var fileType = ['AUDIO', 'BASE DE DADOS', 'COMPACTADO']; //Codificador

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
 * Validations Squema Level (Simple)
 */

var validate_v10_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v10, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true
};

var validate_v16__ = function (value) {
    if (value !== 'Anon' && value) { //Si el subcampo _ de v16, existe y no es 'Anon'
        if (!value.match(/.,./)) //Si el subcampo _ de v16 no contiene coma
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

var validate_v23_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v23, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true
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
    return (value && value.toString().length) === 8;
};

var validate_v83 = function (value) {
    return value.length <= 2000;
};


/**
 * Monograph Schema
 */

var MonographSchema = new Schema({
    v1: { // CÓDIGO DEL CENTRO (LLenado automatico)
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
    v5: { //TIPO DE LITERATURA  (LLenado automatico)
        type: String,
        enum: literatureTypes,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    },
    v6: { //NIVEL DE TRATAMIENTO   (LLenado automatico)
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
        enum: registerType,
        required: true
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
            _: { //nombre de la persona responsable por el contenido intelectual de un documento
                type: String,
                validate: [validate_v16__, 'The name has no comma']
            },
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
                required: true
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
    v27: { //NÚMERO TOTAL DE VOLÚMENES (nivel colección)
        type: Number,
        trim: true
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
        trim: true
    },
    v55: { //FECHA NORMALIZADA
        type: Number,
        validate: [validate_v55, 'The normalized date must have 8 characters exactly']
    },
    v56: { //EVENTO – CIUDAD
        type: String,
        trim: true
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
    v84: { //FECHA DE TRANSFERENCIA PARA LA BASE DE DATOS   (LLenado automatico)
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
    v91: {  //FECHA DE CREACIÓN DEL REGISTRO   (LLenado automatico)
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
    v92: [ //DOCUMENTALISTA   (LLenado automatico)
        {
            type: String,
            trim: true
        }
    ],
    v93: {  //FECHA DE LA ÚLTIMA MODIFICACIÓN   (LLenado automatico)
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
    v98: { //REGISTRO COMPLEMENTARIO (MONOGRAFIA, NO CONVENCIONAL, COLECCIÓN, SERIE O TESIS, DISERTACIÓN)   (LLenado automatico)
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
    v724: { //NÚMERO DOI
        type: String,
        trim: true
    },
    v899: { //VERSIÓN DEL SOFTWARE   (LLenado automatico)
        type: String,
        trim: true,
        required: true
    }

}, { strict: false });


/**
 * Validations Document Level (Advanced)
 */

//**************** Validation for level of treatment (v6) for type of literature (v5) Monograph *****************/

MonographSchema.path('v12').validate(function (value) {
    if (this.v5 === ('M') && (this.v6 === 'am' || this.v6 === 'amc')) {
        if (!value.length) {
            return false;
        }
    }
    return true;
}, 'The field "v12" is obligatory');

MonographSchema.path('v25').validate(function (value) {
    if (this.v5 === ('M') && (this.v6 === 'amc' || this.v6 === 'mc' || this.v6 === 'c')) {
        if (!value.length) {
            return false;
        }
    }
    return true;
}, 'The field "v25" is obligatory');

MonographSchema.path('v18').validate(function (value) {
    if (this.v5 === ('M') && (this.v6 === 'am' || this.v6 === 'amc' || this.v6 === 'm' || this.v6 === 'mc')) {
        if (!value.length) {
            return false;
        }
    }
    return true;
}, 'The field "v18" is obligatory');


//**************** Others Validations *****************/

MonographSchema.path('v83').validate(function (value) {
    var cant = 0;
    for (var i = 0; i < value.length; i++) {
        cant += value[i]._.length;
    }
    return cant <= 6000 ? true : false;
}, 'The summary dont must have more than 6000 characters in total');

MonographSchema.path('v87').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v87" is obligatory');

MonographSchema.path('v92').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v92" is obligatory');

MonographSchema.path('v4').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v4" is obligatory');

MonographSchema.path('v40').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v40" is obligatory');

MonographSchema.path('v62').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v62" is obligatory');


/**
 * Pre-save hook (More Advanced Validations)
 */

MonographSchema.pre('save', function (next) { //

//**************** Validations for Level of treatment (v5) in combination with Project (P) and Conference (C) *****************/
        if (this.v5) {
            if (this.v5 === 'MC' || this.v5 === 'MCP') {//Si es una Conferencia o Evento (C)
                if (!this.v53.length) {
                    next(new Error('The field "v53" is obligatory'));
                }
                if (!this.v54) {
                    next(new Error('The field "v54" is obligatory'));
                }
                if (!this.v56) {
                    next(new Error('The field "v56" is obligatory'));
                }
            } else {//Si no es una Conferencia o Evento (C)
                delete this._doc.v52;
                delete this._doc.v53;
                delete this._doc.v54;
                delete this._doc.v55;
                delete this._doc.v56;
            }

            if (this.v5 !== 'MP' && this.v5 !== 'MCP') { //Si no es un Proyecto (P)
                delete this._doc.v58;
                delete this._doc.v59;
                delete this._doc.v60;
            }

            if (this.v5 !== 'MP' && this.v5 !== 'MC' && this.v5 !== 'MCP') {
                delete this._doc.v101;
                delete this._doc.v102;
            }
        }


//**************** Others Validations *****************/

        if (this.v6 === 'am' || this.v6 === 'amc') {
            if (!this.v10.length && !this.v11.length) { //Si v10 y v11 no son llenados, entonces ponerle valor 'Anon' a v10
                this.v10.push({'_': 'Anon'});
            }

            if (this.v10.length && this.v11.length) { //Si v10 y v11 son llenados, entonces solo dejar v10 con valor
                this.v11.splice(0, this.v11.length);
            }
        }

        if (this.v6 === 'amc' || this.v6 === 'mc' || this.v6 === 'c') {
            if (!this.v23.length && !this.v24.length) { //Si v23 y v24 no son llenados, entonces ponerle valor 'Anon' a v23
                this.v23.push({'_': 'Anon'});
            }

            if (this.v23.length && this.v24.length) { //Si v23 y v24 son llenados, entonces solo dejar v23 con valor
                this.v24.splice(0, this.v24.length);
            }
        }

        if (!this.v16.length && !this.v17.length) { //Si v16 y v17 no son llenados, entonces ponerle valor 'Anon' a v16
            this.v16.push({'_': 'Anon'});
        }

        if (this.v16.length && this.v17.length) { //Si v16 y v17 son llenados, entonces solo dejar v16 con valor
            this.v17.splice(0, this.v17.length);
        }

        if (this.v16.length) {
            for (var i = 0; i < this.v16.length; i++) {
                if (!this.v16[i].s1 || (this.v16[i].s1 === 's.af')) {  //Si el campo 's1' de v16 no existe o tiene valor 's.af' entonces eliminar los otros datos de afiliacion
                    delete this.v16[i]._doc.s2;
                    delete this.v16[i]._doc.s3;
                    delete this.v16[i]._doc.p;
                    delete this.v16[i]._doc.c;
                }
            }
        }


        if (this.v54) { //Si v54 existe y tiene valor "s.f", entonces v55 no debe existir
            if (this.v54 === 's.f') {
                delete this._doc.v55;
            } else {
                if (!this.v55)
                    return next(new Error('Entering information in the field "v55", is conditioned to field "v54"'));
            }
        }

        if (this.v64) { //Si v64 existe y tiene valor "s.f", entonces v65 no debe existir
            if (this.v64 === 's.f') {
                delete this._doc.v65;
            } else {
                if (!this.v65)
                    return next(new Error('Entering information in the field "v65", is conditioned to field "v64"'));
            }
        }

        if (this.v75 < this.v74) { //Si v75 es menor que v74
            return next(new Error('The field "v75" must be bigger than "v74"'));
        }

        if (this.v66) {
            if (!this.v67) {
                return next(new Error('Entering information in the field "v67", is conditioned to field "v66"'));
            }
        }

        if (!this.v8.length) {
            if (!this.v20) {
                return next(new Error('Tbe field "v20", is obligatory if is not a electronic document'));
            }
        }

        if (this.v18.length) {
            var temp = false;
            for (var j = 0; j < this.v18.length; j++) {
                if (this.v18[j].i === 'en') {  //Si existe al menos un campo en english
                    temp = true;
                }
            }
            if(!temp && !this.v19){ //Si todos los titulos estan en otros idiomas distintos al english y el campo v19 esta vacio
                return next(new Error('Tbe field "v18", requires that the translation is specified in the "v19" field'));
            }
            if(temp && this.v19){ //Si al menos un titulo esta en idioma english y el campo v19 esta lleno, entonces elimino el campo v19 con la traduccion
                delete this._doc.v19;
            }
        }


        //***************** Clean empty arrays ************************

        for (var obj in this._doc) {
            if (Array.isArray(this._doc[obj])) {
                if (!this._doc[obj].length) {
                    delete this._doc[obj];
                }
            }
        }


        next();
    }
)
;


/**
 * Statics
 */
/*
 MonographSchema.statics.load = function(id, cb) {
 this.findOne({
 _id: id
 }).populate('user', 'name username').exec(cb);
 };
 */
mongoose.model('Monograph', MonographSchema);

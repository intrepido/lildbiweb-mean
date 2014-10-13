'use strict';

/**********************************************************************************
 * Module dependencies.
 **********************************************************************************/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**********************************************************************************
 * Enumerators.
 **********************************************************************************/

var literatureTypes = ['S', 'SC', 'SCP', 'SP', 'M', 'MC', 'MCP', 'MP', 'MS', 'MSC', 'MSP', 'T', 'TS', 'N', 'NC', 'NP'];

var treatmentLevel = ['m', 'mc', 'ms', 'am', 'amc', 'ams', 'as', 'c'];

var languageCode = ['es', 'en']; //Codificador

var fileExtension = ['css', 'cmp']; //Codificador

var fileType = ['AUDIO', 'BASE DE DADOS', 'COMPACTADO']; //Codificador

var registerType = [null, 'a', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'm', 'o', 'p', 'r', 't']; //Codificador

var responsibilityGrade = ['edt', 'com', 'coord', 'org']; //Codificador

var idiomCode = ['en', 'es', 'pt', 'fr']; //Codificador

var countryCode = ['BR', 'CO', 'CU', 'PR']; //Codificador

var itemForm = [null, 'a', 'b', 'c', 'd', 's']; //Codificador

var computerFileType = ['a', 'b', 'c', 'd']; //Codificador

var cartographicTypeMaterial = ['a', 'b', 'c', 'd']; //Codificador

var newspaperType = ['l', 'n', 'p', 'u']; //Codificador

var visualMaterialType = [null, 'm', 'v', 'f', 'k']; //Codificador

var specificDesignationMaterial = ['c', 'd', 'e', 'f']; //Codificador


/**********************************************************************************
 /* Validations Squema Level (Simple).
 /**********************************************************************************/

var validate_v9 = function (value) {
    if ((this.v4.indexOf('LILACS') !== -1) && (value === 'c' || value === 'd' || value === 'e' || value === 'f' || value === 'j' || value === 'k' || value === 'm' || value === 'o' || value === 'p' || value === 'r' || value === 't')) {
        return false;
    }
    return true;
};

var validate_v10__ = function (value) {
    if (value !== 'Anon' && value) { //Si el subcampo _ de v10, existe y no es 'Anon'
        if (!value.match(/.,./)) //Si el subcampo _ de v10 no contiene coma
            return false;
    }
    return true
};

var validate_v10_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v10, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true
};

var validate_v13 = function (value) {
    if (this.v12 && this.v12.length) {
        var temp = false;
        for (var j = 0; j < this.v12.length; j++) {
            if (this.v12[j].i === 'en') {  //Si existe al menos un campo en English
                temp = true;
            }
        }
        if (!temp && !value) { //Si todos los titulos estan en otros idiomas distintos al english y el campo v13 esta vacio
            return false;
        }
        if (temp && value) { //Si al menos un titulo esta en idioma english y el campo v13 esta lleno, entonces elimino el campo v13 con la traduccion
            delete this._doc.v13;
        }
    }
    return true;
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

var validate_v19 = function (value) {
    if (this.v18 && this.v18.length) {
        var temp = false;
        for (var j = 0; j < this.v18.length; j++) {
            if (this.v18[j].i === 'en') {  //Si existe al menos un campo en English
                temp = true;
            }
        }
        if (!temp && !value) { //Si todos los titulos estan en otros idiomas distintos al english y el campo v19 esta vacio
            return false;
        }
        if (temp && value) { //Si al menos un titulo esta en idioma english y el campo v19 esta lleno, entonces elimino el campo v19 con la traduccion
            delete this._doc.v19;
        }
    }
    return true;
};

var validate_v20 = function (value) {
    if (!value && !this.v8.length && this.v6 !== 'c') {
        for (var i = 0; i < this.v38.length; i++) {
            if (this.v38[i].a === 'CD-ROM' || this.v38[i].a === 'Disquette') {
                return true;
            }
        }
        return false;
    }
    return true;
};

var validate_v35 = function (value) {
    return value.length <= 9;
};

var validate_v49_s1 = function (value) {
    if (value !== 's.af' && value) { //Si el subcampo s1 de v49, existe y tiene una afiliacion valida, entonces el subcampo p es obligatorio
        if (!this.p)
            return false;
    }
    return true;
};

var validate_v65 = function (value) {
    if (value) {
        return value.toString().length === 8;
    }

};

var validate_v67 = function (value) {
    return !value ? false : true;
};

var validate_v69 = function (value) {
    return value.length <= 13;
};

var validate_v74 = function (value) {
    if (this.v75) {
        if (this.v75 <= value) { //Si v75 es menor que v74
            return false;
        }
    }
    return true;
};

var validate_v75 = function (value) {
    if (!this.v74) {
        return false;
    }
    return true;
};

var validate_v84 = function (value) {
    return (value && value.toString().length) === 8;
};

var validate_v83 = function (value) {
    return value.length <= 2000;
};

var validate_v110 = function (value) {
    if ((this.v4.indexOf('LILACS') !== -1) && this.v8.length && (value !== 's')) {
        return false;
    }
    return true;
};

var validate_v114 = function (value) {
    if ((this.v4.indexOf('LILACS') !== -1) && this.v9 === 'g' && value !== 'm' && value !== 'v') {
        return false;
    }
    return true;
};


/**********************************************************************************
 * Thesis Monographic Serie Schema.
 **********************************************************************************/

var ThesisMonographicSerieSchema = new Schema({
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
    v5: { //TIPO DE LITERATURA (LLenado automatico)
        type: String,
        enum: literatureTypes,
        required: true //Es requerido porque es llenado automaticamente por el sistema
    },
    v6: { //NIVEL DE TRATAMIENTO (LLenado automatico)
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
                enum: languageCode,
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
        default: null, //Para que exista y pueda efectuarse la validacion
        enum: registerType,
        validate: [validate_v9, 'The value {{VALUE}} is not compatible with methodology of databases LILACS'],
        required: true
    },
    v10: [ //AUTOR PERSONAL (nivel analítico)
        {
            _id: false,
            _: { //nombre de la persona responsable por el contenido intelectual de un documento
                type: String,
                validate: [validate_v10__, 'The name ({VALUE}) has no comma']
            },
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
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v13, 'The translation must be specified in the field "v13"'],
        trim: true
    },
    v14: [ //PÁGINAS (nivel analítico)
        {
            _id: false,
            _: { //paginacion irregular o inexistente
                type: String,
                match: [/^\[\d+-?\d*\]$/, 'The irregular pagination ({VALUE}) must be between "[]"']
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
                validate: [validate_v16__, 'The name ({VALUE}) has no comma']
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
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v19, 'The translation must be specified in the field "v19"'],
        trim: true
    },
    v20: { //PÁGINAS (nivel monográfico)
        type: String,
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v20, 'The field "v20" is obligatory, if is not an electronic document'],
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
    v61: { //NOTA INTERNA
        type: String,
        trim: true
    },
    v62: [ //EDITORA   //es repetible???????????????
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
    v65: { //FECHA NORMALIZADA  ------- //FALTA VALIDAR BIEN
        type: Number,
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v65, 'The normalized date ({VALUE}) must have 8 characters exactly']
    },
    v66: { //CIUDAD DE PUBLICACIÓN
        type: String,
        trim: true,
        required: true
    },
    v67: { //PAÍS DE PUBLICACIÓN
        type: String,
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v67, 'Entering information in the field "v67", is conditioned to field "v66"'],
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
        validate: [validate_v69, 'The ISBN ({VALUE}) dont must have more than 13 characters']
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
        type: Number,
        validate: [validate_v74, 'The field "v74" must be lower than "v75"']
    },
    v75: { //ALCANCE TEMPORAL (HASTA)
        type: Number,
        validate: [validate_v75, 'Entering information in the field "v75", is conditioned to the field "v74"']
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
                validate: [validate_v83, 'The summary instance ({VALUE}) dont must have more than 2000 characters']
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
    v98: { //REGISTRO COMPLEMENTARIO (MONOGRAFIA, NO CONVENCIONAL, COLECCIÓN, SERIE O TESIS, DISERTACIÓN)
        type: String,
        trim: true,
        required: true
    },
    v110: { //FORMA DEL ÍTEM
        type: String,
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v110, 'For the database LILACS, the traditional material who has an electronic format "v8", must be fill with option Electronic (s)'],
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
        default: null, //Para que exista y pueda efectuarse la validacion
        validate: [validate_v114, 'For databases LILACS, the type of visual material "v114" must be Film (m) or Video Recorder (v)'],
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
    v899: { //VERSIÓN DEL SOFTWARE
        type: String,
        trim: true,
        required: true
    }

}, { strict: false });


/**********************************************************************************
 * Pre-validate hook (More Advanced Validations).
 **********************************************************************************/

ThesisMonographicSerieSchema.pre('validate', function (next) {
    //console.log('Antes: ' + JSON.stringify(this));

///**************** Eliminar los campos que no pertenescan a los niveles de tratamiento correspondientes, para una Serie Monografia. ****************/

    if (this.v5 === 'TS') {
        if (this.v6 === 'ms') {
            delete this._doc.v10;
            delete this._doc.v12;
            delete this._doc.v13;
            delete this._doc.v14;
        }

        delete this._doc.v11;
        delete this._doc.v17;
        delete this._doc.v21;
        delete this._doc.v23;
        delete this._doc.v24;
        delete this._doc.v25;
        delete this._doc.v26;
        delete this._doc.v27;
        delete this._doc.v52;
        delete this._doc.v53;
        delete this._doc.v54;
        delete this._doc.v55;
        delete this._doc.v56;
        delete this._doc.v57;
        delete this._doc.v58;
        delete this._doc.v59;
        delete this._doc.v60;
        delete this._doc.v70;
        delete this._doc.v101;
        delete this._doc.v102;
        delete this._doc.v700;
        delete this._doc.v779;
    }


//**************** v9 Validations *****************/

    if (this.v9 === 'm') {
        delete this._doc.v110;
        delete this._doc.v112;
        delete this._doc.v113;
        delete this._doc.v114;
        delete this._doc.v115;
    }
    if (this.v9 === 'a' || this.v9 === 'c' || this.v9 === 'd' || this.v9 === 'i' || this.v9 === 'j' || this.v9 === 'p' || this.v9 === 't') {
        delete this._doc.v111;
        delete this._doc.v112;
        delete this._doc.v113;
        delete this._doc.v114;
        delete this._doc.v115;
    }
    if (this.v9 === 'e' || this.v9 === 'f') {
        delete this._doc.v111;
        delete this._doc.v113;
        delete this._doc.v114;
        delete this._doc.v115;
    }
    if (this.v9 === 'g' || this.v9 === 'r' || this.v9 === 'o') {
        delete this._doc.v111;
        delete this._doc.v112;
        delete this._doc.v113;
        delete this._doc.v115;
    }
    if (this.v9 === 'k') {
        delete this._doc.v111;
        delete this._doc.v112;
        delete this._doc.v113;
    }


//**************** Other Validations *****************/

    if (this.v6 === 'ams' && this.v10 && this.v10.length) {
        for (var i = 0; i < this.v10.length; i++) {
            if (!this.v10[i].s1 || (this.v10[i].s1 === 's.af')) {  //Si el campo 's1' de v16 no existe o tiene valor 's.af' entonces eliminar los otros datos de afiliacion
                delete this.v10[i]._doc.s2;
                delete this.v10[i]._doc.s3;
                delete this.v10[i]._doc.p;
                delete this.v10[i]._doc.c;
            }
        }
    }

    if (this.v16 && this.v16.length) {
        for (var i = 0; i < this.v16.length; i++) {
            if (!this.v16[i].s1 || (this.v16[i].s1 === 's.af')) {  //Si el campo 's1' de v16 no existe o tiene valor 's.af' entonces eliminar los otros datos de afiliacion
                delete this.v16[i]._doc.s2;
                delete this.v16[i]._doc.s3;
                delete this.v16[i]._doc.p;
                delete this.v16[i]._doc.c;
            }
        }
    }


    next();
});


/**********************************************************************************
 * Validations Document Level (Advanced).
 **********************************************************************************/

ThesisMonographicSerieSchema.path('v4').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v4" is obligatory');

ThesisMonographicSerieSchema.path('v10').validate(function (value) {
    if (this.v6 === 'ams') {
        if (!value.length) {
            return false;
        }
        for (var i = 0; i < value.length; i++) {
            if (value[i]._ === 'Anon') {  //Si existe al menos un autor anonimo
                return false;
            }
        }
    }
    return true;
}, 'The field "v10" is obligatory, the author cant be anonymous');

ThesisMonographicSerieSchema.path('v12').validate(function (value) {
    if (this.v6 === 'ams' && !value.length) {
        return false;
    }
    return true;
}, 'The field "v12" is obligatory');

ThesisMonographicSerieSchema.path('v14').validate(function (value) { //1
    if (value && !value.length && !this.v8.length && (this.v6 === 'ams')) {
        for (var i = 0; i < this.v38.length; i++) {
            if (this.v38[i].a === 'CD-ROM' || this.v38[i].a === 'Disquette') {
                return true;
            }
        }
        return false;
    }
    return true;
}, 'The field "v14" is obligatory, if is not an electronic document');

ThesisMonographicSerieSchema.path('v14').validate(function (value) { //2
    if (value && value.length) {
        for (var i = 0; i < value.length; i++) {
            if (value[i]._ && (value[i].f || value[i].l)) {  //Si existe al menos en una instancia, valor en los campos "_" y en "f" o "l" al mismo tiempo
                return false;
            }
        }
    }
    return true;
}, 'The pagination in field "v14" dont be "irregular" and "no secuencial" at the same time');

ThesisMonographicSerieSchema.path('v16').validate(function (value) {
    if (!value.length) {
        return false;
    }
    for (var i = 0; i < value.length; i++) {
        if (value[i]._ === 'Anon') {  //Si existe al menos un autor anonimo
            return false;
        }
    }
    return true;
}, 'The field "v16" is obligatory, the author cant be anonymous');

ThesisMonographicSerieSchema.path('v18').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v18" is obligatory');

ThesisMonographicSerieSchema.path('v30').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v30" is obligatory');

ThesisMonographicSerieSchema.path('v40').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v40" is obligatory');

ThesisMonographicSerieSchema.path('v62').validate(function (value) {
    if(!value.length){
        return false;
    }
    for (var i = 0; i < value.length; i++) {
        if(value[i] !== 's.n'){
            return false;
        }
    }
    return true;
}, 'The field "v62" is obligatory the value (s.n)');

ThesisMonographicSerieSchema.path('v65').validate(function (value) {
    if (this.v64 === 's.f') {//Si v64 tiene valor "s.f", entonces v65 no debe existir
        delete this._doc.v65;
    } else {
        if (!value)
            return false;
    }
}, 'Entering information in the field "v65", is conditioned to field "v64"');

ThesisMonographicSerieSchema.path('v83').validate(function (value) {
    var cant = 0;
    for (var i = 0; i < value.length; i++) {
        cant += value[i]._.length;
    }
    return cant <= 6000 ? true : false;
}, 'The summary dont must have more than 6000 characters in total');

ThesisMonographicSerieSchema.path('v87').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v87" is obligatory');

ThesisMonographicSerieSchema.path('v92').validate(function (value) {
    return value.length ? true : false;
}, 'The field "v92" is obligatory');


/**********************************************************************************
 * Post-validate hook (More Advanced Validations).
 **********************************************************************************/
/*
 ThesisMonographicSerieSchema.post('validate', function (next) {

 });
 */

/***********************************************************************************
 * Pre-save hook (More Advanced Validations).
 ***********************************************************************************/

ThesisMonographicSerieSchema.pre('save', function (next) {
        for (var obj in this._doc) {
            //***************** Clean empty arrays ************************
            if (Array.isArray(this._doc[obj])) {
                if (!this._doc[obj].length) {
                    delete this._doc[obj];
                }
            }
            //***************** Clean null fields ************************
            if (!this._doc[obj]) {
                delete this._doc[obj];
            }
        }
        next();
    }
);


/**********************************************************************************
 * Statics.
 **********************************************************************************/
/*
 ThesisMonographicSerieSchema.statics.load = function(id, cb) {
 this.findOne({
 _id: id
 }).populate('user', 'name username').exec(cb);
 };
 */

mongoose.model('ThesisMonographicSerie', ThesisMonographicSerieSchema);

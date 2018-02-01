'use strict';

const calculadora = require('./calculadora');

console.log(calculadora.suma(1, 5));

console.log(calculadora.resta(1, 5));

calculadora.constante_de_calculo = 3.1416;

const calculadora2 = require('./calculadora');

console.log(calculadora2.constante_de_calculo);

'use strict';

const calculadora = require('./calculadora');

const paso = 5;

console.log(calculadora.suma(1, 5));

console.log(calculadora.resta(1, 5));

// yo como desarrollador creo que paso debe tener 6
if (paso === 6) {
  console.log('loquesea')
}

calculadora.constante_de_calculo = 3.1416;

const calculadora2 = require('./calculadora');

console.log(calculadora2.constante_de_calculo);

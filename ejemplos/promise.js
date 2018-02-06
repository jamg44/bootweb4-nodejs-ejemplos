'use strict';

// funcion que retorna una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    // aqui es donde hago lo que sea asíncrono
    setTimeout(() => {
      //resolve();
      reject(new Error('fatal!!'));
    }, ms);
  })
}

// como consumo una promesa
const promesa = sleep(2000);

console.log(promesa);

promesa.then(() => {
  console.log('La promesa se completó');
}).catch(err => {
  console.log('promesa fallida', err);
});

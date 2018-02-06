'use strict';

// funciones que devuelven promesas

function conArroz(plato) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(plato + ' arroz');
    }, 500);
  });
}

function conAjo(plato) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //resolve(plato + ' ajo');
      reject(new Error('chungo'));
    }, 500);
  });
}

function con(plato, ingrediente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(plato + ' ' + ingrediente);
    }, 500);
  });
}

// encadenar las funciones que devuelven promesas

const plato = 'paella con';

conArroz(plato)
  // en el then pongo una función que recibe el plato actualizado
  .then(conAjo)
  .then(plato => {
    return con(plato, 'gambas'); // devuelvo la promesa que obtengo de 'con'
                                 // para que el siguiente then pueda evaluarla
  })
  .then(plato => {
    console.log('El resultado es:', plato);
  })
  .catch(err => {
    console.log('Hubo un error', err);
  });
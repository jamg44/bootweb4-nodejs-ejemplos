'use strict';

const axios = require('axios');

(async () => { // la función devuelva una promesa
  try {
    const httpResponse = await axios.get('http://localhost:3000/apiv1/agentes');
    
    const responsePromises = [
      axios.get('http://localhost:3000/apiv1/agentes?name=Brown'),
      axios.get('http://localhost:3000/apiv1/agentes?name=Jones'),
      axios.get('http://localhost:3000/apiv1/agentes?limit=1')
    ];

    const responses = await Promise.all(responsePromises);

    console.log(responses.map(e => e.data.result));

    if (!httpResponse.data.success) throw new Error('Error en la petición');
    const result = httpResponse.data.result;
    console.log(result[2].name);
  } catch(err) {
    console.log('Hubo un error', err);
  }
  throw new Error('fallo sin controlar');
})().catch(err => console.log(err));

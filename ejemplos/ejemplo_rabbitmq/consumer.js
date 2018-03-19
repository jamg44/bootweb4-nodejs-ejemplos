'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';

// IIFE - Inmediatelly Invoked Function Expression
(async () => {

  // nos aseguramos de estar conectados
  const conn = await connectionPromise;

  // conectarnos a un canal
  const ch = await conn.createChannel();

  // conectar a una cola
  await ch.assertQueue(q, {});

  // le decimos al canal
  // cuantos mensajes puedo procesar
  // en paralelo
  ch.prefetch(1);

  await ch.consume(q, msg => {
    console.log(msg.content.toString());
    // procesamos el mensaje
    setTimeout(() => { // simulamos un trabajo
      // hemos terminado de procesar
      // confirmamos a rabbit que está procesado
      ch.ack(msg);
    }, 100);
  });

})().catch(err => { console.log(err); });

'use strict';

const conn = require('../lib/connectMongoose');
const Usuario = require('../models/Usuario');

conn.once('open', async () => {
  try {
    
    await initUsuarios();
    conn.close();

  } catch(err) {
    console.log('Hubo un error:', err);
    process.exit(1);
  }
});

async function initUsuarios() {
  const deleted = await Usuario.deleteMany();
  
  console.log(`Eliminados ${deleted.n} usuarios.`);
  const inserted = await Usuario.insertMany([
    { 
      name: 'admin',
      email: 'admin@example.com',
      password: await Usuario.hashPassword('1234')
    }
  ]);
  console.log(`Insertados ${inserted.length} usuarios.`);
}

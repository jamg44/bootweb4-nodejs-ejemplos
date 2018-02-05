'use strict';

// cargar el driver
const mysql = require('mysql');

// crear una conexión
const connection = mysql.createConnection({
  host: 'didimo.es',
  user: 'usuariocurso',
  password: 'us3r',
  database: 'cursonode'
});

// conectar
connection.connect(err => {
  if (err) {
    console.log('Imposible conectar', err);
    process.exit(1);
  }

  // lanzar consulta
  connection.query('SELECT * FROM agentes', (err, rows, fields) => {
    if (err) {
      console.log('Imposible hacer consulta', err);
      process.exit(1);
    }

    console.log(rows);

    // cerrar conexión
    connection.end();
  });

  
});

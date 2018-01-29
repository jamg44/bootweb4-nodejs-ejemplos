// cargar librería http
const http = require('http');

// definir un servidor
const server = http.createServer(function(request, response) {
  // en cada petición se ejecuta esto:
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('Wake up, <b>Neo</b>');
})

// arrancar el servidor
server.listen(1337, '127.0.0.1');
console.log('Servidor arrancado en http://127.0.0.1:1337');

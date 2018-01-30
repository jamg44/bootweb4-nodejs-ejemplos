'use strict';

const persona = {
  name: 'Jose',
  surname: 'Lopez',
  fullname: function() {
    console.log(this.name + ' ' + this.surname);
  }
};

//persona.fullname();

// const metodo = persona.fullname;
// metodo();

// con .bind() podemos asignar un this a cualquier función (excepto arrow)
//setTimeout(persona.fullname.bind(persona), 2000);

persona.fullname.call({ name:'pepe', surname:'gomez'})
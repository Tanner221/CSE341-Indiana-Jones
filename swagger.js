const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Indiana Jones Artifacts',
    description: 'All of these artifacts belong in a museum',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
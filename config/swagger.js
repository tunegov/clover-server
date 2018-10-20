const path = require('path')

module.exports = function (app) {
  const expressSwagger = require('express-swagger-generator')(app);

  let options = {
    swaggerDefinition: {
      info: {
        title: 'Clover GO',
        version: '1.0.0',
      },
      host: 'api.clover-company.cc',
      basePath: '/',
      produces: [
        "application/json",
        "application/xml"
      ],
      schemes: ['http'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: "",
        }
      }
    },
    docUrl: '/api-docs',
    basedir: path.join(__dirname, '../'),
    files: [
      '../server/**/*.route.js'
    ]
  };
  expressSwagger(options)
}

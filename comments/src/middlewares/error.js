const winston = require('winston');

module.exports =  function(app){
  
  app.use((req, res, next)=>{
    res.status(404).json({
      status : 404,
      success : false,
      message : `Route ${req.url} not found`
    });
  });

  app.use((err, req, res, next)=>{
    winston.error(err.message, err);

    const status = err?.status || 500;
    const message = err?.message || 'InternalServerError';
    res.status(status).json({
      status,
      success : false,
      message
    });
  });

};





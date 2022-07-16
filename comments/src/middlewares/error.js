const winston = require('winston');
const createError = require('http-errors');
module.exports =  function(app){
  
  app.use((req, res, next)=>{
    next(createError.NotFound("this URL not found"));
  });

  app.use((err, req, res, next)=>{
    winston.error(err.message, err);
    const serverError = createError.InternalServerError;
    const status = err?.status || serverError.status;
    const message = err?.message || serverError.message;
    res.status(status).json({
      data: null,
      error: {
        status,
        message
      }
    });
  });

};





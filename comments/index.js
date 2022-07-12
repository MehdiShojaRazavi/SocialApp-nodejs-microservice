const express = require('express');
const app = express();
const config = require('config');
const commentsPort = config.get('commentsPort');
const commentRouter = require('./src/routes/comment');

require('./startup/config')(app, express);
require('./startup/db')();
require('./startup/logging')();

app.use('/manage', commentRouter);

require('./src/middlewares/error')(app);

app.listen(commentsPort, () => console.log(`listening on port ${commentsPort}`));

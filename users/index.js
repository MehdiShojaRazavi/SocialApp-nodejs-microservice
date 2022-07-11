const express = require('express');
const app = express();

const config = require('config');

const userRouter = require('./src/routes/users');
const userContactRouter = require('./src/routes/contact');

require('./startup/config')(app, express);
require('./startup/db')();
require('./startup/logging')();

app.use('/manage', userRouter);
app.use('/contact', userContactRouter);

require('./src/middlewares/error')(app);

const port = config.get('port');
app.listen(port, () => console.log(`listening on port ${port}`));

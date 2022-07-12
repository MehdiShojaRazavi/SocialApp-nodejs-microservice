const express = require('express');
const app = express();
const config = require('config');
const usersPort = config.get('usersPort');
const userRouter = require('./src/routes/users');
const userContactRouter = require('./src/routes/contact');

require('./startup/config')(app, express);
require('./startup/db')();
require('./startup/logging')();

app.use('/manage', userRouter);
app.use('/contact', userContactRouter);

require('./src/middlewares/error')(app);

app.listen(usersPort, () => console.log(`listening on port ${usersPort}`));

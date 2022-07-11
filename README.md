# SocialApp

SocialApp is a service with Nodejs Implemented based on microservice to
allows CRUD operations and the retrieval of basic statistical data.

## Installation
Use the node package manager [npm] to install SocialApp.

```bash
cd gateway 
npm install
npm start

cd users 
npm install 
npm start 

cd comments 
npm install 
npm start
```

## Packages
   1.  auto-bind : ^4.0.0
   2.  axios : ^0.27.2
   3.  proxy : ^1.0.2
   4.  config : ^3.3.6
   5.  debug : ^4.3.2
   6.  express : ^4.18.1
   7.  express-async-errors : ^3.1.1
   8.  express-validator: ^6.14.2
   9.  moment: ^2.29.4
   10.  mongoose: ^6.4.3
   11. mongoose-timestamp: ^0.6.0
   12. morgan: ^1.10.0
   13. multer: ^1.4.5-lts.1
   14. path: ^0.12.7
   15. request: ^2.88.2
   16. winston: ^3.8.1
   17. xregexp: ^5.1.1
   18. body-parser: ^1.20.0

## Services with routes

1. Gateway Service         http://localhost:8000   
2. Users Service           http://localhost:8001
3. Comments Service        http://localhost:8002



http://localhost:8000
1. /users : Home of Users Service

   1. /manage
      1. get            /:id                       getUserById
      2. post           /add                       addUser
      3. patch          /updateProfilePic/:id      updateProfilePic
      4. delete         /remove/:id                removeUserById
      5. patch          /editUsername/:id          editUsernameById

   2. /contact
      1. patch          /edit/:id                  editContactByUserId
      2. get            /:id                       getContactByUserId
      3. delete         /remove/:id                removeContactByUserId

2. /comments  
      1. /manage
         1. post        /add/:userId               addComment
         2. delete      /delete/:id                deleteCommentById
         3. delete      /deleteAll/:userId         deleteAllCommentsByUserId
         4. patch       /edit/:id                  editCommentById
         5. get         /all/:userId               getAllCommentsByUserId 
         6. get         /:id                       getCommentById




# AuthenticatorJS
AuthenticatorJS is an authentication and authorization API made with Express.js, SequelizeORM, mysql an JWT. Its purpose is to be a boilerplate to integrate authentication API in other projects.

## Usage
### Configure DB
- create a database with mysql
- create an .env file at root based on the .env.example and fill the file with the correct informations.

### Launch server
```js
 node server.js
```

### Routes
There are 3 main routes

- **localhost/api/auth/signup** : Register a new user
- **localhost/api/auth/signin** : Login with credentials and get a JWT in cookie
- **localhost/api/auth/signout** : Disconnect and remove JWT

to access resources once your are connected you can use this route:

**localhost/api/ressources**

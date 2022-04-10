# KnowUrBudget API
KnowUrBudget is an API to auhtenticate users and store their information into a database. It permits to sync datas between different applications.

## Usage
### Configure DB
- run ```js npm install ```
- create a database with mysql
- create an .env file at root based on the .env.example and fill the file with the correct informations.

### Commands
- Launch server: ``` npm start ```
- create and seed db : ``` npm run seed ```

### Routes
There are 3 main routes

- **localhost/api/auth/signup** : Register a new user
- **localhost/api/auth/signin** : Login with credentials and get a JWT in cookie
- **localhost/api/auth/signout** : Disconnect and remove JWT

to access resources once your are connected you can use this route:

- [GET] **localhost/api/users/expenses** : accès aux dépenses d'un utilisateur
- [POST] **localhost/api/users/expenses** : add an expense to db
- [PUT] **localhost/api/users/expenses** : update an expense 
- [DELETE] **localhost/api/users/expenses** : delete an expense 


- [GET] **localhost/api/users/limit**: acces monthly limit from a user
- [POST] **localhost/api/users/limit**: update monthly limit


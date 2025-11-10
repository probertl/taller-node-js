# Taller de Nodejs, Express, MongoDB i Postman

## Library API

### Desplegar aplicació

1. Entrar a la carpeta `library_api`
2. Crear `.env` a partir de `.env.example` i ajusta `MONGO_URI`
3. Instal·lar les depèndencies:
   ```bash
   npm install
   ```
4. Arrencar l'aplicació en entorn de desenvolupament:
   ```
   npm run dev
   ```
5. L'API estarà desplegada a:
   http://localhost:3000/api
    
### Endpoints

Books

- GET  /api/books
- POST /api/books
- GET  /api/books/:id
- PUT  /api/books/:id
- DELETE /api/books/:id

Users

- POST /api/users
- GET  /api/users
- GET  /api/users/:id
- PUT  /api/users/:id

## Postman

1. Instal·lar aplicació desktop de [Postman](https://www.postman.com/)
2. Obrir l'aplicació
3. Importar collection
4. Importar environment
5. Executar les peticions
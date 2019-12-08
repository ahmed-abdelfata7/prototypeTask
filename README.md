# API-side
This is a back-end project used for serving a react application. Consists of two-schema(users,session) for authentication layer.
and a remote colletions served on a remote server(films,people,planets,species,transports,vehicles).

## Install
- Pull The project using the following command:

  `git pull https://github.com/EngAhmedMahmoud/prototypeTask.git`
- Install required packages:
  
  `npm i`
 
 - Running:
 
   `npm start` or `npm run dev` if you have a nodemon for development mode.
   
 - Testing:
 
   `npm run test:watch`
   
   **Note**: I don't have a right with remote db to create new schemas (users,session) so  this issue can be solved by one of these:
   - allow create permission(monolithic application).
   - after authentication based on local-db via API call we can answer the questions(star war statistics) but this way is very slow.
   - create a two micro-service one for authentication and the other for  star war statistics.
   
  
## API-doc
   you can find API-specs https://github.com/EngAhmedMahmoud/prototypeTask/tree/master/api-doc

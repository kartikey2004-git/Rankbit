// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

import { MongoClient, ServerApiVersion } from "mongodb";

// Check mongoDB URI is present or not

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// we have to pass some options which about server API that what is the version of api , strict , deprecationErrors

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise; // Basically it creates promise to connect with mongoDB database


// NextJS uses hot reloading : whenever we save something inside the app ,  it gonnna create new MongoClient every single time and we don't want to do that


// In Next.js development mode (when you save a file), it hot-reloads your code multiple times.


// If new MongoClient generates every time , then we'll end up with many database connections open (which will eventually crash database ).


if (process.env.NODE_ENV === "development") {

  // In development mode, use a global variable so that the value  is preserved across module reloads caused by HMR (Hot Module Replacement).


  // This global variable ensures that the Mongo client instance is reused across hot reloads during development.


  // Without this, each time your application reloads, a new instance of the Mongo Client would be created, potentially leading to connection issues.


  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

} else {

  // In production mode, it's best to not use a global variable.

  // This is because production runs once per request (no hot reload), so creating fresh instances is fine.


  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}


// Export a module-scoped MongoClient. 

// By doing this in a separate module, the client can be shared across functions.

export default clientPromise;


// Follows best practices for both dev (reusing the client) and prod (creating per-deploy safe clients).


/*

- This is usually seen when setting up the MongoDB Node.js driver (especially with MongoClient).

  1. serverApi
     
    - MongoDB has something called Stable API.

    - Instead of your app suddenly breaking when MongoDB introduces changes, you can lock your code to a particular API version.


    - serverApi is the configuration object where you tell MongoDB which version of the Stable API you want to use and how strict you want it to be.

  
  2. version: ServerApiVersion.v1
      
     - Use version 1 of MongoDB’s Stable API.

     - So all queries and commands we run will behave according to API v1 rules, even if you connect to a newer MongoDB server.


  3. strict: true
     
     - With strict mode, if you try to use any MongoDB command not included in v1 version of the Stable API, MongoDB will throw an error instead of silently running it.


     - Basically: “Don’t let me accidentally use unsupported features.”


  4. deprecationErrors: true

     - If you use something that’s deprecated in v1 of the API, MongoDB will throw an error.


     - This forces you to update your code instead of relying on outdated commands.


*/
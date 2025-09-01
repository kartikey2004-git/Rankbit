import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";

export const authOptions = {

  // some options for authentication
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // now adapter 
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}


/*
NextAuth --> Providers --> Google 

  - Create a project in google cloud console
  - We need to configure consent screen as always 
  and set User type to external

  - oAuth consent screen
     - app name
     - user support email
  
  - credentials

     - create credentials by oAuth client ID
     - Application type: web application
     - Authorised redirect urls from nextauth google provider

  - Now we have our client id and client secret to pass in our providers

  https://next-auth.js.org/providers/google

  adapters with mongoDB : https://authjs.dev/getting-started/adapters/mongodb


*/
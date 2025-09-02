We’re building a Rank Tracker app that lets users monitor their website rankings on Google.


- Next.js (latest version) for the frontend and The stack for this project will include:

   - Next.js (latest version) for the frontend and backend
   - MongoDB for storing keywords and results
   - Tailwind CSS for styling


Key concepts and tools we’ll cover:
  
   - 1. Scraping Google Search Results with Puppeteer : using a headless browser to simulate user searches and extract ranking data.


   - 2. Bright Data SERP API – a reliable third-party service to fetch Google results without getting blocked.


   - 3. Server Components vs. Client Components in Next.js – understanding when logic should run on the server (data fetching, APIs) versus the client (UI interactions).



   - 4. Headless Browser Operations : how to run Chrome or Chromium in the background from our code.


   - 5. Integrating Third-Party APIs – fetching data from external APIs and saving it into our MongoDB database.




- First we do some kind of authentication , this app will be accessible for loggedIn users

   - next-auth here for authentication
   - mongoose ODM (object data modelling ) for database for maintaing relationships


---------------------------------------------------


- Nextjs Routing Idea : uses file-system based routing, meaning you can use folders and files to define routes.



- Creating a page
   
   - A page is UI that is rendered on a specific route. 

   - To create a page, add a page file inside the app directory and default export a React component.


for ex: to create an home page (/):

```bash
# app/page.tsx

export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```


- Creating a layout
   
   - A layout is UI that is shared between multiple pages. 

   - On navigation

      - layouts preserve state
      - remain interactive
      - do not rerender.
   

   - define a layout by default exporting a React component from a layout file

   - The component should accept a children prop which can be a page or another layout.



- for ex: to create a layout that accepts your home as child , add a layout file inside the app directory


```bash
# app/layout.js

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```  

  - The layout above is called a root layout because it's defined at the root of the app directory. 
     
      - The root layout is required and must contain html and body tags.

---------------------------------------------------


- 1. What is App Routing?
    

    - Next.js (from version 13) introduced the App Router inside the app/ directory. 
    
    - Instead of pages/, you now structure your routes using folders and files.


           - Each folder = a route segment

           - Each page.js (or page.tsx) inside that folder = the actual page for that route

           - Special files like layout.js, loading.js, error.js give you layouts, spinners, and error boundaries.


- 2. Example Project Structure


```bash
app/
 ├─ layout.js # root layout of the app
 ├─ page.js   # index page of app structure
 ├─ about/    # about route
 │   └─ page.js  # actual page of about route
 |
 |
 ├─ blog/        # blog route
 │   ├─ page.js  # actual page of blog route
 │   └─ [id]/   # (dynamic route for a blog post)
 │       └─ page.js # actual page for single blog post
 |
 |
 |
 └─ dashboard/     # dashboard route
     ├─ layout.js  # actual layout of blog route
     ├─ page.js    # actual page of dashboard route
     └─ settings/  # /dashboard/settings route
         └─ page.js # actual page of dashboard route
```


- How the routes map
    
   - / → app/page.js
   - /about → app/about/page.js

   - /blog → app/blog/page.js
   - /blog/123 → app/blog/[id]/page.js (dynamic route for a blog post)

   - /dashboard → app/dashboard/page.js
   - /dashboard/settings → app/dashboard/settings/page.js


- for dynamic page , to get single blog id 

   for ex: If I visit /blog/42, it will render Blog Post ID: 42.

```bash

export default function BlogPost({ params }) {
  return <h1>Blog Post ID: {params.id}</h1>;
}
```


- 3. Layouts (Shared UI)
  
  - If you put a layout.js inside a folder, it wraps all pages inside that folder.
    

     - Now every page inside /dashboard (like /dashboard/settings) will show with that navbar.
  

```bash
export default function DashboardLayout({ children }) {
  return (
    <div>
      <h2>Dashboard Navbar</h2>
      <main>{children}</main>
    </div>
  );
}
```

   - Nested Routes with Layouts
     
      - This allows you to build complex dashboards or apps with persistent UI 
       
      like (sidebars, navbars, footers) without re-rendering them on navigation.


---------------------------------------------------

1. API Routes in Next.js
   
   - Next.js lets you create backend endpoints inside your project itself.
     
     - Each file becomes an API endpoint.
     - You place these files under /app/api/ (App Router).
    

   - For ex: A file /pages/api/hello.js is served at /api/hello.


2. Catch-all API routes
   
   - Normally, a file /pages/api/user.js only handles /api/user.


   - But sometimes you want a single file to handle multiple routes dynamically. 
   That’s where catch-all routes come in.
      
```bash
/pages/api/user/[...info].js
```

It will catch:

   - /api/user/1
   - /api/user/1/profile
   - /api/user/anything/here


- Inside it, we can access all the extra parts as an array

```bash
export default function handler(req, res) {
  const { info } = req.query;
  res.json({ info });
}
```
  
  - So hitting /api/user/1/profile would give:
  ```bash
  { "info": ["1", "profile"] }
  ```

---------------------------------------------------

- 3. Specific example with [...nextauth]
  
  - NextAuth.js (authentication library) needs many different API routes like: 

     - /api/auth/signin
     - /api/auth/signout
     - /api/auth/callback
     - /api/auth/session
  
  - Instead of you creating each one manually, NextAuth tells you:
     
     - Just make one file named [...nextauth].js under /api/auth/ and I’ll handle the rest.


```bash
/pages/api/auth/[...nextauth].js
```
  - any route that starts with /api/auth/ (signin, signout, session, callback, etc.)  automatically handled by the code you put in that single file.


     - [...nextauth] is a catch-all API route.
     
     - It lets NextAuth.js control every endpoint under /api/auth/  without you needing to write them one by one.


---------------------------------------------------

- here we got session object from getServerSession from next auth

```bash
{
  session: {
    user: {
      name: 'Kartikey Bhatnagar',
      email: 'kartikeybhatnagar247@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocLqKXXH4-HrlhPQIxzgXZAVrsuEMztWuduVo_qUrGwL3txEJdGq=s96-c'
    }
  }
}
```

- It is Array of objects of domains we are fetching on index page 

```bash

[
  {
    _id: new ObjectId('688bb7694afb19b19fc180a0'),
    domain: 'github.com',
    owner: 'kartikeybhatnagar247@gmail.com',
    icon: 'https://github.com/fluidicon.png',
    createdAt: 2025-07-31T18:35:21.593Z,
    updatedAt: 2025-07-31T18:35:21.593Z,
    __v: 0
  },
  {
    _id: new ObjectId('68b5d4f3df89664655ec18e5'),
    domain: 'nextjs.org',
    owner: 'kartikeybhatnagar247@gmail.com',
    icon: 'https://nextjs.org/favicon.ico?favicon.d29c4393.ico',
    createdAt: 2025-09-01T17:16:35.200Z,
    updatedAt: 2025-09-01T17:16:35.200Z,
    __v: 0
  },
  {
    _id: new ObjectId('68b5d502df89664655ec18e9'),
    domain: 'ui.shadcn.com',
    owner: 'kartikeybhatnagar247@gmail.com',
    icon: 'https://ui.shadcn.com/favicon-16x16.png',
    createdAt: 2025-09-01T17:16:50.015Z,
    updatedAt: 2025-09-01T17:16:50.015Z,
    __v: 0
  },
  {
    _id: new ObjectId('68b5d52bdf89664655ec18ed'),
    domain: 'git-scm.com',
    owner: 'kartikeybhatnagar247@gmail.com',
    icon: 'https://git-scm.com/favicon.ico',
    createdAt: 2025-09-01T17:17:31.469Z,
    updatedAt: 2025-09-01T17:17:31.469Z,
    __v: 0
  }
]
```

---------------------------------------------------

- Next step: implement keyword support : 
   
    - allow adding keywords for a specific domain on its page, 
    
    - generate graphs from those keywords later, and provide the option to remove a domain.



- When getting keywords for a particular domain , there is req.url , we request server to give response  : 

```bash
console.log(req.url); 

// http://localhost:3000/api/keywords?domain=github.com
```


```bash

# creates a URL object from the request URL
console.log(new URL(req.url));

// Here is URL object

URL {
  href: 'http://localhost:3000/api/keywords?domain=github.com',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/api/keywords',
  search: '?domain=github.com',
  searchParams: URLSearchParams { 'domain' => 'github.com' },
  hash: ''
}
```

--------------------------------------------------

Next step: build a single keyword page where we can delete keywords and display larger, detailed graphs.


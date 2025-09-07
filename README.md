We’re building a Rank Tracker app that lets users monitor their website rankings on Google.

- Next.js (latest version) for the frontend and The stack for this project will include:

  - Next.js (latest version) for the frontend and backend
  - MongoDB for storing keywords and results
  - Tailwind CSS for styling

Key concepts and tools we’ll cover:

- 1.  Scraping Google Search Results with Puppeteer : using a headless browser to simulate user searches and extract ranking data.

- 2.  Bright Data SERP API – a reliable third-party service to fetch Google results without getting blocked.

- 3.  Server Components vs. Client Components in Next.js – understanding when logic should run on the server (data fetching, APIs) versus the client (UI interactions).

- 4.  Headless Browser Operations : how to run Chrome or Chromium in the background from our code.

- 5.  Integrating Third-Party APIs – fetching data from external APIs and saving it into our MongoDB database.

- First we do some kind of authentication , this app will be accessible for loggedIn users

  - next-auth here for authentication
  - mongoose ODM (object data modelling ) for database for maintaing relationships

---

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

---

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

---

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

---

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

- any route that starts with /api/auth/ (signin, signout, session, callback, etc.) automatically handled by the code you put in that single file.

  - [...nextauth] is a catch-all API route.

  - It lets NextAuth.js control every endpoint under /api/auth/ without you needing to write them one by one.

---

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

---

- Next step: implement keyword support :

  - allow adding keywords for a specific domain on its page,

  - generate graphs from those keywords later, and provide the option to remove a domain.

- When getting keywords for a particular domain , there is req.url , we request server to give response :

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

---

Next step: build a single keyword page where we can delete keywords and display larger, detailed graphs.

Next Part : When we add a keyword here and if we have an existing keyword , we need to find the position of keyword for the particular domain

- For each keyword, we need to determine the domain’s ranking position on Google search results for that particular keyword

  - for ex : whether the domain appears within the top 100 results for that keyword when we googled that keyword.

---

1. Puppeteer + Headless Browser: kya hota hai?

- Puppeteer ek Node.js library hai jo Chrome ko programmatically control karti hai sab code se

  - tabs open karo
  - click/type karo
  - screenshots lo
  - PDFs banao
  - data scrape karo

- Ye DevTools Protocol ke through browser ko drive karti hai.

- By default headless (UI ke bina) run hota hai

- Headless browser = wohi Chrome, bas bina visible window ke.

  - Server pe chalane ke liye perfect, kyunki GUI ki zaroorat nahin.

  - Ab Chrome ke headless modes updated hain- Puppeteer v22+ me default headless: "new" hota hai

  - ek "shell" mode bhi hai jo chrome-headless-shell use karta hai

  - Ye subtle differences rakhte hain (rendering/flags).

2. Server par kyun chalate hain?

   - APIs banana: /screenshot?url=... → image return.

   - PDF service: HTML lo, pixel-perfect PDF do.
   - Web scraping/automation: Login, paginate, data nikaalo.

   - SSR/Pre-render: SPAs ki HTML generate karke SEO improve.

3. High-level architecture (seedha, simple)

   - Aapka Node server (Express/Fastify) request leta hai.

   - Server Puppeteer launch karta hai (ya pooled instance reuse karta hai).

   - Page open → actions (goto, click, type, wait...).

   - Result (HTML/data/screenshot/PDF) client ko return.

---

- Data after Scraping google search Results using serpAPI

```bash
export const data = {
  search_metadata: {
    id: '68b851debde9795218b84988',
    status: 'Success',
    json_endpoint: 'https://serpapi.com/searches/932bb5c91f83cf1d/68b851debde9795218b84988.json',
    pixel_position_endpoint: 'https://serpapi.com/searches/932bb5c91f83cf1d/68b851debde9795218b84988.json_with_pixel_position',
    created_at: '2025-09-03 14:34:06 UTC',
    processed_at: '2025-09-03 14:34:06 UTC',
    google_url: 'https://www.google.com/search?q=github&oq=github&uule=w+CAIQICIFSW5kaWE&num=10&sourceid=chrome&ie=UTF-8',
    raw_html_file: 'https://serpapi.com/searches/932bb5c91f83cf1d/68b851debde9795218b84988.html',
    total_time_taken: 1.24
  },
  search_parameters: {
    engine: 'google',
    q: 'github',
    location_requested: 'India',
    location_used: 'India',
    google_domain: 'google.com',
    num: '10',
    device: 'desktop'
  },
  search_information: {
    query_displayed: 'github',
    total_results: 0,
    time_taken_displayed: 0.12,
    organic_results_state: 'Results for exact spelling'
  },
  twitter_results: {
    title: 'GitHub (@github) · X',
    link: 'https://x.com/github?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    displayed_link: 'https://x.com/github',
    tweets: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  inline_videos: [
    {
      position: 1,
      title: 'Installing and Setting up Git and GitHub',
      link: 'https://www.youtube.com/watch?v=wDRoduig_98',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBsCFFHVUM5wooXazp7MyeDZFQOL5ykgJGFCupN5j4YgqHgfiLdtfieDwj-F9a&s&ec=73086138',
      channel: 'Alex The Analyst',
      duration: '7:14',
      platform: 'YouTube'
    },
    {
      position: 2,
      title: 'How To Use GitHub For Beginners',
      link: 'https://www.youtube.com/watch?v=a9u2yZvsqHA',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wMdFOhCaa58Jn_xulkZbLX8CREAHq4tRs_UmsENS8ww6moBHr0dSgdMZYduU&s&ec=73086138',
      channel: 'Corbin Brown',
      duration: '10:29',
      platform: 'YouTube'
    },
    {
      position: 3,
      title: 'What is Git and GitHub?',
      link: 'https://www.youtube.com/watch?v=QzvA7r-WndM&vl=en',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbfTJGSjGULfLKrg9n6meOnoXVdgbE49vHbwVLTDocKBn662-FBmhzyXnicTe6&s&ec=73086138',
      channel: 'Alex The Analyst',
      duration: '8:32',
      platform: 'YouTube'
    }
  ],
  related_questions: [
    {
      question: 'What is GitHub used for?',
      type: 'ai_overview',
      text_blocks: [Array],
      references: [Array],
      next_page_token: 'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJXaGF0IGlzIEdpdEh1YiB1c2VkIGZvcj8iLCJsayI6IkdobDNhR0YwSUdseklHRWdaMmwwYUhWaUlIVnpaV1FnWm05eSIsImJzIjoiYy1PeTRwSUl6MGdzVWNnc1ZuRFBMUEVvVFZJb0xVNU5VVWpMTDdLWC1NaGpKQzBsV1E2VlRsUkl6eXpKUUZMQTVjWWxINTVSaWFRMUtTY19PUnNvbVptbjRKbVhrcGxvTDdIQjFFaEJTcTRjb2dxcUgwbFZKa2dWbHlPWHJDZmNqUFQ4ZkxEcENrbXA2Wmw1ZWFsRnhmWVNuRVp5VWpJSUF6Q1ZjRGtoRzVGZm5nYzBQcWxTd1RjenVTaV9PRC10eEY1aU9RZXFHWEExdVRBMUFvd0EiLCJpZCI6ImZjXzMxRzRhSWlYRlp1ZDVPVVBzNldiMkFNXzEifQ==',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJXaGF0IGlzIEdpdEh1YiB1c2VkIGZvcj8iLCJsayI6IkdobDNhR0YwSUdseklHRWdaMmwwYUhWaUlIVnpaV1FnWm05eSIsImJzIjoiYy1PeTRwSUl6MGdzVWNnc1ZuRFBMUEVvVFZJb0xVNU5VVWpMTDdLWC1NaGpKQzBsV1E2VlRsUkl6eXpKUUZMQTVjWWxINTVSaWFRMUtTY19PUnNvbVptbjRKbVhrcGxvTDdIQjFFaEJTcTRjb2dxcUgwbFZKa2dWbHlPWHJDZmNqUFQ4ZkxEcENrbXA2Wmw1ZWFsRnhmWVNuRVp5VWpJSUF6Q1ZjRGtoRzVGZm5nYzBQcWxTd1RjenVTaV9PRC10eEY1aU9RZXFHWEExdVRBMUFvd0EiLCJpZCI6ImZjXzMxRzRhSWlYRlp1ZDVPVVBzNldiMkFNXzEifQ%3D%3D'
    },
    {
      question: 'Why is GitHub blocked in India?',
      type: 'featured_snippet',
      snippet: "The block order was confirmed on Twitter by Arvind Gupta, the national head of the ruling party BJP, and was attributed to a suggestion by India's Anti Terrorism Squad in response to content by the Islamic extremist group ISIS. Gupta also stated that websites that cooperated with the investigation were being unblocked.",
      title: 'Censorship of GitHub - Wikipedia',
      link: 'https://en.wikipedia.org/wiki/Censorship_of_GitHub#:~:text=The%20block%20order%20was%20confirmed,the%20investigation%20were%20being%20unblocked.',
      displayed_link: 'https://en.wikipedia.org › wiki › Censorship_of_GitHub',
      source_logo: 'https://serpapi.com/searches/68b851debde9795218b84988/images/dd36aef89e7e4da5b2470966d2420508e213622678b507e1396103bcd5d88c39.png',
      next_page_token: 'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJXaHkgaXMgR2l0SHViIGJsb2NrZWQgaW4gSW5kaWE/IiwibGsiOiJHaDUzYUhrZ2FYTWdaMmwwYUhWaUlHSnNiMk5yWldRZ2FXNGdhVzVrYVdFIiwiYnMiOiJjLU95NHBJSXowZ3NVY2dzVm5EUExQRW9UVklvTFU1TlVVakxMN0tYLU1oakpDMGxXUTZWVGxSSXp5ekpRRkxBNWNZbEg1NVJpYVExS1NjX09Sc29tWm1uNEptWGtwbG9MN0hCMUVoQlNxNGNvZ3FxSDBsVkprZ1ZseU9YckNmY2pQVDhmTERwQ2ttcDZabDVlYWxGeGZZU25FWnlVaklJQXpDVmNEa2hHNUZmbmdjMFBxbFN3VGN6dVNpX09ELXR4RjVpT1FlcUdYQTF1VEExQW93QSIsImlkIjoiZmNfMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU1fMSJ9',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJXaHkgaXMgR2l0SHViIGJsb2NrZWQgaW4gSW5kaWE%2FIiwibGsiOiJHaDUzYUhrZ2FYTWdaMmwwYUhWaUlHSnNiMk5yWldRZ2FXNGdhVzVrYVdFIiwiYnMiOiJjLU95NHBJSXowZ3NVY2dzVm5EUExQRW9UVklvTFU1TlVVakxMN0tYLU1oakpDMGxXUTZWVGxSSXp5ekpRRkxBNWNZbEg1NVJpYVExS1NjX09Sc29tWm1uNEptWGtwbG9MN0hCMUVoQlNxNGNvZ3FxSDBsVkprZ1ZseU9YckNmY2pQVDhmTERwQ2ttcDZabDVlYWxGeGZZU25FWnlVaklJQXpDVmNEa2hHNUZmbmdjMFBxbFN3VGN6dVNpX09ELXR4RjVpT1FlcUdYQTF1VEExQW93QSIsImlkIjoiZmNfMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU1fMSJ9'
    },
    {
      question: 'Is GitHub good for beginners?',
      type: 'featured_snippet',
      snippet: 'Yes, GitHub is an excellent platform for novice programmers for several reasons: Version Control: GitHub uses Git for version control, which is essential for managing changes to code. Learning Git helps you understand how to track changes, collaborate with others, and maintain code history.',
      title: 'Is GitHub a good platform to learn for a novice programmer? - Quora',
      date: 'Apr 1, 2015',
      link: 'https://www.quora.com/Is-GitHub-a-good-platform-to-learn-for-a-novice-programmer',
      displayed_link: 'https://www.quora.com › Is-GitHub-a-good-platform-to-...',
      next_page_token: 'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJJcyBHaXRIdWIgZ29vZCBmb3IgYmVnaW5uZXJzPyIsImxrIjoiR2h4cGN5Qm5hWFJvZFdJZ1oyOXZaQ0JtYjNJZ1ltVm5hVzV1WlhKeiIsImJzIjoiYy1PeTRwSUl6MGdzVWNnc1ZuRFBMUEVvVFZJb0xVNU5VVWpMTDdLWC1NaGpKQzBsV1E2VlRsUkl6eXpKUUZMQTVjWWxINTVSaWFRMUtTY19PUnNvbVptbjRKbVhrcGxvTDdIQjFFaEJTcTRjb2dxcUgwbFZKa2dWbHlPWHJDZmNqUFQ4ZkxEcENrbXA2Wmw1ZWFsRnhmWVNuRVp5VWpJSUF6Q1ZjRGtoRzVGZm5nYzBQcWxTd1RjenVTaV9PRC10eEY1aU9RZXFHWEExdVRBMUFvd0EiLCJpZCI6ImZjXzMxRzRhSWlYRlp1ZDVPVVBzNldiMkFNXzEifQ==',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJJcyBHaXRIdWIgZ29vZCBmb3IgYmVnaW5uZXJzPyIsImxrIjoiR2h4cGN5Qm5hWFJvZFdJZ1oyOXZaQ0JtYjNJZ1ltVm5hVzV1WlhKeiIsImJzIjoiYy1PeTRwSUl6MGdzVWNnc1ZuRFBMUEVvVFZJb0xVNU5VVWpMTDdLWC1NaGpKQzBsV1E2VlRsUkl6eXpKUUZMQTVjWWxINTVSaWFRMUtTY19PUnNvbVptbjRKbVhrcGxvTDdIQjFFaEJTcTRjb2dxcUgwbFZKa2dWbHlPWHJDZmNqUFQ4ZkxEcENrbXA2Wmw1ZWFsRnhmWVNuRVp5VWpJSUF6Q1ZjRGtoRzVGZm5nYzBQcWxTd1RjenVTaV9PRC10eEY1aU9RZXFHWEExdVRBMUFvd0EiLCJpZCI6ImZjXzMxRzRhSWlYRlp1ZDVPVVBzNldiMkFNXzEifQ%3D%3D'
    },
    {
      question: 'Is GitHub owned by Microsoft?',
      type: 'ai_overview',
      text_blocks: [Array],
      references: [Array],
      next_page_token: 'eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJJcyBHaXRIdWIgb3duZWQgYnkgTWljcm9zb2Z0PyIsImxrIjoiR2h4cGN5Qm5hWFJvZFdJZ2IzZHVaV1FnWW5rZ2JXbGpjbTl6YjJaMCIsImJzIjoiYy1PeTRwSUl6MGdzVWNnc1ZuRFBMUEVvVFZJb0xVNU5VVWpMTDdLWC1NaGpKQzBsV1E2VlRsUkl6eXpKUUZMQTVjWWxINTVSaWFRMUtTY19PUnNvbVptbjRKbVhrcGxvTDdIQjFFaEJTcTRjb2dxcUgwbFZKa2dWbHlPWHJDZmNqUFQ4ZkxEcENrbXA2Wmw1ZWFsRnhmWVNuRVp5VWpJSUF6Q1ZjRGtoRzVGZm5nYzBQcWxTd1RjenVTaV9PRC10eEY1aU9RZXFHWEExdVRBMUFvd0EiLCJpZCI6ImZjXzMxRzRhSWlYRlp1ZDVPVVBzNldiMkFNXzEifQ==',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJUR3QwWDNaRk9IQjJSVEZzUWtSQ1VUaERlbWRUYVU5aU0yd3dkakl5Wm1VMk56aHRWak5qV1Y5NlNYZFRPWEJXWkZObFkwZFpXRTFDVWxoaE5IbElZbGQ0WkdoVVlVaGlaRVIyYWtGd2FHSlBZMUYyYld4S1RFUjBUbXhxZDFGeFFSSVhNekZITkdGSmFWaEdXblZrTlU5VlVITTJWMkl5UVUwYUlrRkdUVUZIUjNCYUxVeFJSMmhDV1hOclFsTkRjSE5CYUdkek1tTlhNRGczVUhjIiwiZmN2IjoiMyIsImVpIjoiMzFHNGFJaVhGWnVkNU9VUHM2V2IyQU0iLCJxYyI6IkNnWm5hWFJvZFdJUUFIMmFXUjRfIiwicXVlc3Rpb24iOiJJcyBHaXRIdWIgb3duZWQgYnkgTWljcm9zb2Z0PyIsImxrIjoiR2h4cGN5Qm5hWFJvZFdJZ2IzZHVaV1FnWW5rZ2JXbGpjbTl6YjJaMCIsImJzIjoiYy1PeTRwSUl6MGdzVWNnc1ZuRFBMUEVvVFZJb0xVNU5VVWpMTDdLWC1NaGpKQzBsV1E2VlRsUkl6eXpKUUZMQTVjWWxINTVSaWFRMUtTY19PUnNvbVptbjRKbVhrcGxvTDdIQjFFaEJTcTRjb2dxcUgwbFZKa2dWbHlPWHJDZmNqUFQ4ZkxEcENrbXA2Wmw1ZWFsRnhmWVNuRVp5VWpJSUF6Q1ZjRGtoRzVGZm5nYzBQcWxTd1RjenVTaV9PRC10eEY1aU9RZXFHWEExdVRBMUFvd0EiLCJpZCI6ImZjXzMxRzRhSWlYRlp1ZDVPVVBzNldiMkFNXzEifQ%3D%3D'
    }
  ],
  organic_results: [
    {
      position: 1,
      title: 'GitHub · Build and ship software on a single, collaborative platform ...',
      link: 'https://github.com/',
      redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://github.com/&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECAwQAQ',
      displayed_link: 'https://github.com',
      favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a54c5e2d297ffa26f711fa8da20d024bce.png',
      snippet: "Millions of developers and businesses call GitHub home. Whether you're scaling your development process or just learning how to code, GitHub is where you belong ...",
      snippet_highlighted_words: [Array],
      sitelinks: [Object],
      source: 'GitHub'
    },
    {
      position: 2,
      title: 'GitHub',
      link: 'https://en.wikipedia.org/wiki/GitHub',
      redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/GitHub&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECCAQAQ',
      displayed_link: 'https://en.wikipedia.org › wiki › GitHub',
      favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a552ee58d99a52a7be4ce87677a7ee6ced.png',
      snippet: 'GitHub is a proprietary developer platform that allows developers to create, store, manage, and share their code. It uses Git to provide distributed version ...',
      snippet_highlighted_words: [Array],
      source: 'Wikipedia'
    },
    {
      position: 3,
      title: 'GitHub Universe 2025',
      link: 'https://githubuniverse.com/',
      redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://githubuniverse.com/&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECEMQAQ',
      displayed_link: 'https://githubuniverse.com',
      favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a5b369f506f8aeba7546ff8d6900c34880.png',
      snippet: "GitHub's two-day developer event celebrating innovation, collaboration, and the boundless potential of AI-powered development.",
      snippet_highlighted_words: [Array],
      source: 'GitHub Universe'
    },
    {
      position: 4,
      title: 'GitHub Careers',
      link: 'https://www.github.careers/',
      redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.github.careers/&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECEIQAQ',
      displayed_link: 'https://www.github.careers',
      favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a504001b85096018a268ef43607df951d1.png',
      snippet: 'We offer health, wellness, learning and development and social impact opportunities in addition to competitive pay, remote work, and comprehensive benefits.',
      snippet_highlighted_words: [Array],
      source: 'GitHub Careers'
    }
  ],
  perspectives: [
    {
      author: 'Alex The Analyst',
      source: 'YouTube',
      extensions: [Array],
      thumbnails: [Array],
      title: 'Installing and Setting up Git and GitHub',
      link: 'https://www.youtube.com/watch?v=wDRoduig_98',
      date: '1 day ago',
      video: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcT1BFPawvYxaL2r7BaMP7wGawWMjVD65tU6vg'
    },
    {
      author: 'r/webdev',
      source: 'Reddit',
      extensions: [Array],
      title: 'Help regarding GITHUB',
      snippet: 'Top comment · First step is learning how to capitalize correctly: GitHub.',
      link: 'https://www.reddit.com/r/webdev/comments/1n694ge/help_regarding_github/',
      date: '1 day ago'
    },
    {
      author: 'r/devops',
      source: 'Reddit',
      extensions: [Array],
      title: 'GitHub actions dashboard',
      snippet: 'Top comment · Interested to see it. If it can view status checks for a specific PR, specific branch/tag, or specific trigger (release, push, etc.) then it would be pretty useful to me. We have some projects that trigger 850ish jobs on pull requests and viewing all those in the pull request status check screen is cumbersome.',
      link: 'https://www.reddit.com/r/devops/comments/1n70atq/github_actions_dashboard/',
      date: '14 hours ago'
    },
    {
      author: 'Aashish Kumar',
      source: 'Medium',
      thumbnails: [Array],
      title: 'GitHub Repos Every Job-Hunting Developer Should Bookmark | by Aashish Kumar | The Pythonworld | Sep, 2025',
      link: 'https://medium.com/the-pythonworld/github-repos-every-job-hunting-developer-should-bookmark-9e2ec0e75d02',
      date: '8 hours ago'
    },
    {
      author: 'Alex_TheAnalyst',
      author_description: 'Data analyst',
      source: 'X',
      extensions: [Array],
      snippet: 'In this weeks lesson we are installing and setting up Git and GitHub! youtu.be/wDRoduig_98?si…',
      link: 'https://x.com/Alex_TheAnalyst/status/1962884971300786486?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet',
      date: '1 day ago'
    },
    {
      author: 'mitchellh',
      author_description: 'Software developer',
      source: 'X',
      extensions: [Array],
      snippet: "GitHub feels like a product that isn't used by the people that work there. That can't POSSIBLY be true, I know. I just hit issues everyday that really make me wonder... how can this bug exist? More likely engineers aren't empowered to fix things and are bogged down by red tape.",
      link: 'https://x.com/mitchellh/status/1961492873016479931?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet',
      date: '4 days ago'
    },
    {
      author: 'github',
      author_description: 'Software developer',
      source: 'X',
      extensions: [Array],
      snippet: "Build, test, and deploy your code automatically with GitHub Actions. 🚀 Learn the fundamentals and see what's possible in our guide.👇 docs.github.com/en/acti…",
      link: 'https://x.com/github/status/1962566123880059034?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet',
      date: '1 day ago'
    },
    {
      author: 'GitHub',
      author_description: 'Software developer',
      source: 'TikTok',
      extensions: [Array],
      thumbnails: [Array],
      title: 'What does open source mean to you? We chatted with @pikacodes at #GitHubUniverse 2024 #developer #programmer #opensource #coding',
      link: 'https://www.tiktok.com/@github/video/7544085319155518752',
      date: '4 days ago'
    },
    {
      author: 'freeCodeCamp',
      author_description: 'Non-profit educational org',
      source: 'X',
      extensions: [Array],
      thumbnails: [Array],
      snippet: 'Automating some of your workflows can help you write higher quality code in less time. Think testing & validating code changes right away - stuff like that. In this guide, Preston helps you set up automated GitHub workflows for your Python & React apps. www.freecodecamp.org/ne…',
      link: 'https://x.com/freeCodeCamp/status/1962486316945273122?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet',
      date: '2 days ago'
    },
    {
      author: 'GitHub',
      author_description: 'Software developer',
      source: 'YouTube',
      extensions: [Array],
      thumbnails: [Array],
      title: 'How to automate code reviews and testing with GitHub Copilot',
      link: 'https://www.youtube.com/watch?v=HDEGFNAUkX8&vl=en',
      date: '1 week ago',
      video: 'https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcQ0svugqXR4CIjFvuqC2e2PBnB6soXcbO0E7g'
    },
    {
      author: 'OpenAIDevs',
      source: 'X',
      extensions: [Array],
      snippet: 'We’re releasing new Codex features to make it a more effective coding collaborator: - A new IDE extension - Easily move tasks between the cloud and your local environment - Code reviews in GitHub - Revamped Codex CLI Powered by GPT-5 and available through your ChatGPT plan.',
      link: 'https://x.com/OpenAIDevs/status/1960809814596182163?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet',
      date: '6 days ago'
    },
    {
      author: 'r/learnprogramming',
      source: 'Reddit',
      extensions: [Array],
      title: 'Github??',
      snippet: 'Top comment · Continue learning python and build projects for next 2 years at least. Yes, you should absolutely upload projects to github. Learn fundamentals of git and the basic workflow of git - branches, commits. pull, push. Hardly takes 1 or 2 days. https://www.theodinproject.com/lessons/foundations-introduction-to-git https://www.theodinproject.com/lessons/foundations-git-basics this should be enough to get started. Good luck.',
      link: 'https://www.reddit.com/r/learnprogramming/comments/1n39vn0/github/',
      date: '4 days ago'
    }
  ],
  related_searches: [
    {
      block_position: 1,
      query: 'GitHub login',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+login&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAg2EAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+login'
    },
    {
      block_position: 1,
      query: 'GitHub Desktop',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+Desktop&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAhJEAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+Desktop'
    },
    {
      block_position: 1,
      query: 'GitHub download',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+download&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAhGEAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+download'
    },
    {
      block_position: 1,
      query: 'GitHub sign up',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+sign+up&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAhFEAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+sign+up'
    },
    {
      block_position: 1,
      query: 'GitHub login with Google',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+login+with+Google&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAhEEAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+login+with+Google'
    },
    {
      block_position: 1,
      query: 'GitHub com search',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+com+search&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAhBEAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+com+search'
    },
    {
      block_position: 1,
      query: 'Education GitHub',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=Education+GitHub&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAg_EAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=Education+GitHub'
    },
    {
      block_position: 1,
      query: 'GitHub repository link',
      link: 'https://www.google.com/search?sca_esv=21d142fe9e0fef6b&q=GitHub+repository+link&sa=X&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ1QJ6BAg6EAE',
      serpapi_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=GitHub+repository+link'
    }
  ],
  dmca_messages: { title: 'Notices about Filtered Results', messages: [ [Object] ] },
  pagination: {
    current: 1,
    next: 'https://www.google.com/search?q=github&sca_esv=21d142fe9e0fef6b&ei=31G4aIiXFZud5OUPs6Wb2AM&start=10&sa=N&sstk=Ac65TH6SFAosx7iWK4AVXMbceKMhbg6XeMkjobAt9cXmHx4SQ8SxIeDNDTni3o_GXhYPxct6uteydHFwCXTEdYpNXA-Wjrbfupn68Q&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ8NMDegQIMhAR',
    other_pages: {
      '2': 'https://www.google.com/search?q=github&sca_esv=21d142fe9e0fef6b&ei=31G4aIiXFZud5OUPs6Wb2AM&start=10&sa=N&sstk=Ac65TH6SFAosx7iWK4AVXMbceKMhbg6XeMkjobAt9cXmHx4SQ8SxIeDNDTni3o_GXhYPxct6uteydHFwCXTEdYpNXA-Wjrbfupn68Q&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ8tMDegQIMhAH',
      '3': 'https://www.google.com/search?q=github&sca_esv=21d142fe9e0fef6b&ei=31G4aIiXFZud5OUPs6Wb2AM&start=20&sa=N&sstk=Ac65TH6SFAosx7iWK4AVXMbceKMhbg6XeMkjobAt9cXmHx4SQ8SxIeDNDTni3o_GXhYPxct6uteydHFwCXTEdYpNXA-Wjrbfupn68Q&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ8tMDegQIMhAJ',
      '4': 'https://www.google.com/search?q=github&sca_esv=21d142fe9e0fef6b&ei=31G4aIiXFZud5OUPs6Wb2AM&start=30&sa=N&sstk=Ac65TH6SFAosx7iWK4AVXMbceKMhbg6XeMkjobAt9cXmHx4SQ8SxIeDNDTni3o_GXhYPxct6uteydHFwCXTEdYpNXA-Wjrbfupn68Q&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ8tMDegQIMhAL',
      '5': 'https://www.google.com/search?q=github&sca_esv=21d142fe9e0fef6b&ei=31G4aIiXFZud5OUPs6Wb2AM&start=40&sa=N&sstk=Ac65TH6SFAosx7iWK4AVXMbceKMhbg6XeMkjobAt9cXmHx4SQ8SxIeDNDTni3o_GXhYPxct6uteydHFwCXTEdYpNXA-Wjrbfupn68Q&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ8tMDegQIMhAN',
      '6': 'https://www.google.com/search?q=github&sca_esv=21d142fe9e0fef6b&ei=31G4aIiXFZud5OUPs6Wb2AM&start=50&sa=N&sstk=Ac65TH6SFAosx7iWK4AVXMbceKMhbg6XeMkjobAt9cXmHx4SQ8SxIeDNDTni3o_GXhYPxct6uteydHFwCXTEdYpNXA-Wjrbfupn68Q&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQ8tMDegQIMhAP'
    }
  },
  serpapi_pagination: {
    current: 1,
    next_link: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=10',
    next: 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=10',
    other_pages: {
      '2': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=10',
      '3': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=20',
      '4': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=30',
      '5': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=40',
      '6': 'https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&location=India&num=10&q=github&start=50'
    }
  }
}

```

---

```bash
export const data_organic_results = [
  {
    position: 1,
    title: 'GitHub · Build and ship software on a single, collaborative platform ...',
    link: 'https://github.com/',
    redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://github.com/&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECAwQAQ',
    displayed_link: 'https://github.com',
    favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a54c5e2d297ffa26f711fa8da20d024bce.png',
    snippet: "Millions of developers and businesses call GitHub home. Whether you're scaling your development process or just learning how to code, GitHub is where you belong ...",
    snippet_highlighted_words: [ 'GitHub', 'GitHub' ],
    sitelinks: { expanded: [Array] },
    source: 'GitHub'
  },
  {
    position: 2,
    title: 'GitHub',
    link: 'https://en.wikipedia.org/wiki/GitHub',
    redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/GitHub&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECCAQAQ',
    displayed_link: 'https://en.wikipedia.org › wiki › GitHub',
    favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a552ee58d99a52a7be4ce87677a7ee6ced.png',
    snippet: 'GitHub is a proprietary developer platform that allows developers to create, store, manage, and share their code. It uses Git to provide distributed version ...',
    snippet_highlighted_words: [ 'proprietary developer platform' ],
    source: 'Wikipedia'
  },
  {
    position: 3,
    title: 'GitHub Universe 2025',
    link: 'https://githubuniverse.com/',
    redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://githubuniverse.com/&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECEMQAQ',
    displayed_link: 'https://githubuniverse.com',
    favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a5b369f506f8aeba7546ff8d6900c34880.png',
    snippet: "GitHub's two-day developer event celebrating innovation, collaboration, and the boundless potential of AI-powered development.",
    snippet_highlighted_words: [ "GitHub's two-day developer event" ],
    source: 'GitHub Universe'
  },
  {
    position: 4,
    title: 'GitHub Careers',
    link: 'https://www.github.careers/',
    redirect_link: 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.github.careers/&ved=2ahUKEwjIgpn657yPAxWbDrkGHbPSBjsQFnoECEIQAQ',
    displayed_link: 'https://www.github.careers',
    favicon: 'https://serpapi.com/searches/68b851debde9795218b84988/images/86930c855147c4530ca78a21b45d24a504001b85096018a268ef43607df951d1.png',
    snippet: 'We offer health, wellness, learning and development and social impact opportunities in addition to competitive pay, remote work, and comprehensive benefits.',
    snippet_highlighted_words: [ 'health, wellness, learning and development' ],
    source: 'GitHub Careers'
  }
]
```

---

- Async mode mein hum is API ko request bhejenge h

    - woh immediately bolega: request received, hum check karke ready hone par results bhejenge.

```bash
var response_id;
require('request-promise')({
    method: 'POST',
    url: 'https://api.brightdata.com/serp/req?customer=hl_ae9fc608&zone=rankbit',
    json: {'country': 'us','query':{'q':'pizza'}},
    headers: {'Authorization': 'Bearer API_TOKEN'},
    resolveWithFullResponse: true,
}).then(function(data){ console.log(data); response_id=data.headers['x-response-id']; },
    function(err){ console.error(err); });
```

- Jab unke paas data ready ho jaata hai, woh hume callback endpoint pe notify kar dete hain. 

```bash
require('request-promise')({
    url: 'https://api.brightdata.com/serp/get_result?customer=hl_ae9fc608&zone=rankbit&response_id=' + response_id',
    headers: {'Authorization': 'Bearer API_TOKEN'},
}).then(function(data){ console.log(data); },
    function(err){ console.error(err); });
```

--------------------------------------------------


POST /api/results 200 in 1859ms

[
  {
  link: 'https://git-scm.com/',
  display_link: 'https://git-scm.com',
  title: 'Git',
  description: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.',
  extensions: [
    {
      type: 'site_link',
      extended: true,
      text: 'Download for Windows',
      link: 'https://git-scm.com/downloads/win',
      rank: 1
    },
    {
      type: 'site_link',
      extended: true,
      text: 'Downloads',
      link: 'https://git-scm.com/downloads',
      rank: 2
    },
    {
      type: 'site_link',
      extended: true,
      text: 'Download for macOS',
      link: 'https://git-scm.com/downloads/mac',
      rank: 3
    },
    {
      type: 'site_link',
      extended: true,
      text: 'Documentation',
      link: 'https://git-scm.com/doc',
      rank: 4
    },
    {
      type: 'site_link',
      extended: true,
      text: 'Download for Linux',
      link: 'https://git-scm.com/downloads/linux',
      rank: 5
    },
    {
      type: 'site_link',
      extended: true,
      text: 'More results from git-scm.com »',
      link: 'https://www.google.com/search?q=git+site:git-scm.com&sca_esv=518de7ca735d1bf8&hl=en&sa=X&ved=2ahUKEwjm8t77sr2PAxVRSjABHVqpMaIQrAN6BAggEAE',
      rank: 6
    }
  ],
  rank: 1,
  global_rank: 1
}
{
  link: 'https://github.com/',
  display_link: 'https://github.com',
  title: 'GitHub · Build and ship software on a single, collaborative ...',
  description: 'With GitHub Copilot embedded throughout the platform, you can simplify your toolchain, automate tasks, and improve the developer experience.',
  rank: 2,
  global_rank: 2
}
{
  link: 'https://en.wikipedia.org/wiki/Git',
  display_link: 'https://en.wikipedia.org › wiki › Git',
  title: 'Git',
  description: 'Git is a distributed version control software system that is capable of managing versions of source code or data. It is often used to control source code by ...',
  rank: 3,
  global_rank: 7
}
{
  link: 'https://gitforwindows.org/',
  display_link: 'https://gitforwindows.org',
  title: 'Git for Windows',
  description: 'Git for Windows focuses on offering a lightweight, native set of tools that bring the full feature set of the Git SCM to Windows',
  rank: 4,
  global_rank: 8
}
{
  link: 'https://docs.github.com/en/get-started/git-basics/set-up-git',
  display_link: 'https://docs.github.com › get-started › git-basics › set-u...',
  title: 'Set up Git',
  description: 'To use Git on the command line, you will need to download, install, and configure Git on your computer. You can also install GitHub CLI to use GitHub from the ...',
  rank: 5,
  global_rank: 10
 }
]

A cron job is basically a scheduled task that runs automatically at a fixed time, date, or interval on a server.

   - Think of it like an alarm clock for your code.

   - You tell the system:
     “Run this script every day at 7 AM”

   - Check this API every 5 minutes and and it’ll do it for you, without you touching anything.



- Cron job ek aisa system hai jo background me fixed schedule pe automatically koi command ya script chalata hai.


- Tumhe manually run karne ki zarurat nahi, wo apne aap chalega har bar schedule ke hisaab se.
     

      - Send email reminders every morning at 9 AM

      - Auto-backup database daily at midnight

      - Call an API every 5 minutes to update data

      - Clean up logs once a week

-----------------------------------------------


1. System Cron Job (Linux Crontab)
   
   - This is the real/original cron that runs at the OS level.

       - Where it runs: On your Linux server directly.


       - How it works: You edit crontab and tell the OS to run a command/script at specific times.


       - Independence: Works even if your app is stopped — because it’s managed by the system, not your app.


       - Use case: Backup databases, restart services, clean up logs, or run scripts that aren’t tied to one app.


2. App-Level Cron (e.g., node-cron)
  
   - This is a library inside your app that mimics cron behavior.

      - Where it runs: Inside your Node.js process (or any language equivalent).


      - How it works: You install a package like node-cron and write code to run tasks on a schedule.


      - Dependence: Only runs if your Node app is up and running. If the server restarts and the app isn’t restarted, your cron job won’t run.


      - Use case: App-specific tasks like sending emails, refreshing tokens, fetching API data.


      
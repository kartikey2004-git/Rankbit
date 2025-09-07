# RankBit — Domain & Keyword Rank Tracker  

Track how your website performs on search engines.  
Add your domain, monitor keyword rankings, visualize progress with charts, and let the system auto-update ranks every midnight.  

---

## 🔗 Preview  

**Live Site** → [https://rankbit.vercel.app/](#)  
**Repo** → [https://github.com/kartikey2004-git/Rankbit](#)  

---

## ⚙️ Tech Stack  

| Layer       | Tools Used                                   |  
|-------------|----------------------------------------------|  
| Frontend    | Next.js (React), Tailwind CSS, Recharts      |  
| Backend     | Node.js, Express.js, MongoDB, BrightData API |  
| Utilities   | Cron Jobs, Axios, Lodash                     |  

---

## ✨ Key Features  

- 🌍 **Domain Management** → Add and manage multiple domains.  
- 🔑 **Keyword Tracking** → Track search engine ranks for chosen keywords.  
- 📊 **Ranking Charts** → Visualize rank history and progress.  
- ⏱ **Automated Rank Updates** → Cron job runs every midnight.  
- 🛠 **CRUD Support** → Full create, read, update, delete for domains & keywords.  
- 🔎 **On-Demand Rank Check** → Instantly fetch rank for any keyword.  

---

## 🧠 Project Overview  

**Backend Handles:**  
- Scraping and fetching ranks via BrightData API  
- MongoDB for domains, keywords, and rank history  
- Cron job for nightly updates  

**Frontend Handles:**  
- Clean dashboard UI  
- CRUD for domains & keywords  
- Recharts-based graphs  
- Auth state and protected pages  

---

## 🚀 Getting Started Locally  

### Clone the repo  
```bash
git clone https://github.com/your-username/rankbit.git
cd rankbit

Install dependencies
npm install

Add environment variables
.env

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

MONGODB_URI=""

SECRET=""

SERP_API_KEY=

BRIGHTDATA_PASSWORD=""
BRIGHTDATA_API_KEY=""


NEXTAUTH_URL=
NEXTAUTH_SECRET=
```


### Run locally
```bash
npm run dev
```

### 🗂️ Folder Structure

```bash
rankbit/
├── .github/workflows/      # GitHub Actions (CI/CD)
├── .next/                  # Next.js build output
├── node_modules/           # Dependencies
├── public/                 # Public assets (favicon, snapshots, etc.)
├── src/                    
│   ├── app/                # App Router (Next.js 13+)
│   │   ├── api/            # API Routes
│   │   │   ├── auth/[…nextauth]   # NextAuth.js for authentication
│   │   │   ├── check-for-all-keywords/ # API for bulk keyword checks
│   │   │   ├── domains/    # Domain CRUD APIs
│   │   │   ├── keywords/   # Keyword CRUD APIs
│   │   │   └── results/    # Rank results APIs
│   │   ├── domains/[domain]   # Dynamic domain pages
│   │   ├── favicon.ico
│   │   ├── globals.css     # Global styles
│   │   ├── Header.jsx
│   │   ├── layout.js
│   │   ├── LoginScreen.jsx
│   │   └── page.js         # Main landing page
│   │
│   ├── components/         # Reusable components
│   │   └── ui/             # UI components
│   │       ├── Chart.jsx
│   │       ├── DomainRow.jsx
│   │       ├── DomainsList.jsx
│   │       ├── KeywordRow.jsx
│   │       ├── LogoutLink.jsx
│   │       ├── NewDomainForm.jsx
│   │       └── NewKeywordForm.jsx
│   │
│   ├── data/               # Static data
│   │   ├── faqs.json
│   │   └── features.json
│   │
│   ├── lib/                # Utility libraries
│   │   ├── mongoClient.js
│   │   ├── rankingFunction.js
│   │   ├── swal.js
│   │   └── utils.js
│   │
│   ├── models/             # MongoDB models
│   │   ├── Domain.js
│   │   ├── Keywords.js
│   │   └── Results.js
│   │
│   └── test/               # Testing + scrapers
│       ├── puppeteer.js
│       └── serp-api.js
|     
├──.gitignore
├──README.md
├──components.json
├──eslint.config.mjs
├──jsconfig.json
├──next.config.mjs
├──package.lock.json
├──package.json
├──postcss.config.mjs
```




### 🚧 Upcoming Features

- 📥 Export ranking reports (CSV, PDF)

- 🔔 Notifications when rankings change

- 📊 Advanced analytics & filters

## 📜 License

This project is open-source under the MIT License. Feel free to explore, use, and contribute!
# ⚾ Mets Recap App

An automated **ESPN-style New York Mets game recap app** powered by the MLB Stats API, AI-generated summaries, Supabase, and Next.js.

---

## 🚀 Overview

This app automatically:

1. Pulls the latest New York Mets game data from the MLB Stats API
2. Generates a structured ESPN-style recap using AI
3. Stores the result in Supabase
4. Displays it in a clean, mobile-friendly web app (Next.js + Vercel)

---

## 🧠 Features

* 📰 **AI-Generated Recaps** (ESPN-style formatting)
* ⚾ **Live MLB Data Integration**
* 🗄️ **Supabase Backend Storage**
* 📱 **Mobile-Friendly UI**
* 🔄 **Auto-refresh Latest Game**
* 🟡 **Fallback Mode** (handles no-game days gracefully)

---

## 📊 Example Output

```
Mets 3, Giants 0

The New York Mets opened their season in dominant fashion...

Winner: Player Name  
Loser: Player Name  
Save: Player Name  

🔥 Key Highlights  
Pitching...  
Offense...  

📊 What it means  
...
```

---

## 🧱 Tech Stack

* **Frontend:** Next.js (App Router)
* **Backend:** Supabase (Postgres + Edge Functions)
* **Data Source:** MLB Stats API
* **AI:** Google Gemini (recap generation)
* **Deployment:** Vercel

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```
git clone https://github.com/YOUR_USERNAME/Metsrecap.git
cd Metsrecap
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Add Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://xvuxlhuylyzaaboqigqg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

---

### 4. Run Locally

```
npm run dev
```

---

## 🗄️ Supabase Setup

### Table: `mets_daily_game`

Required columns:

* `id` (primary key)
* `headline` (text)
* `recap` (text)
* `result_summary` (text)
* `game_date` (text)
* `game_pk` (bigint)
* `status` (text)
* `raw` (jsonb)
* `updated_at` (timestamp)

---

## ⚡ Edge Function (Automation)

A Supabase Edge Function:

* Runs daily (e.g. 6 AM ET)
* Checks for latest Mets game
* Generates recap using AI
* Stores result in Supabase

If no game is found:

```
"No Mets Game Today"
```

is stored and displayed.

---

## 🚀 Deployment (Vercel)

1. Import repo into Vercel
2. Add environment variables:

   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

---

## 🧪 Expected Behavior

### 🟡 No Game Day

```
No Mets Game Today

The New York Mets do not have a scheduled game today.
```

---

### 🟢 Game Day

* Full ESPN-style recap appears automatically
* Includes:

  * Headline
  * Summary
  * Win/Loss/Save
  * Key Highlights
  * Analysis

---

## 📈 Future Improvements

* 📊 NL East standings integration
* 🔥 Player of the Game
* 📈 Last 10 games trend
* 🔔 Push notifications
* 📱 PWA (installable mobile app)

---

## 🙌 Credits

* MLB Stats API
* Supabase
* Vercel
* Google Gemini

---

## 📬 Notes

This project is designed as a **lightweight, automated sports media app** and can be expanded to support:

* All MLB teams
* Multiple sports
* Personalized feeds

---

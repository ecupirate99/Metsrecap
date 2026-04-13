# ⚾ Mets Recap App
An automated **ESPN-style New York Mets game recap app** powered by the MLB Stats API, AI-generated summaries, Supabase, and Next.js.
---
## 🚀 Overview
This app automatically:
1. Pulls the latest New York Mets game data from the **MLB Stats API**
2. Extracts verified player stats, pitching decisions, and key plays
3. Generates a structured ESPN-style recap using **OpenRouter AI** (Llama 3.1)
4. Stores the result in **Supabase**
5. Displays it in a clean, mobile-friendly web app (Next.js + Vercel)
---
## 🧠 Features
* 📰 **AI-Generated Recaps** (ESPN-style HTML formatting with Mets colors)
* ⚾ **Live MLB Data Integration** with verified player stats
* 📊 **Verified Stat Leaders** (hits, RBIs, home runs extracted from boxscore)
* 🎯 **Key Plays Extraction** (only scoring plays included)
* 🗄️ **Supabase Backend Storage** with fallback mode
* 📱 **Mobile-Friendly UI** with responsive design
* 🔄 **Auto-refresh Latest Game**
* 🟡 **Fallback Mode** (handles no-game days gracefully + AI failures)
* 🚀 **Hallucination Prevention** (strict data validation, no invented stats)
---
## 📊 Example Output
```
Athletics 1, New York Mets 0

Game Summary
The New York Mets fell to the Athletics 1-0, unable to muster any offense 
in a tightly contested game. The Mets' pitching staff was strong, but 
ultimately couldn't prevent a lone home run from Nick Kurtz in the 8th inning.

Pitching Decisions
Aaron Civale earned the win, while Freddy Peralta took the loss. 
Joel Kuhnel secured the save.

Stat Leaders
The top performers from the game were Francisco Lindor with 2 hits for the 
Mets, and Nick Kurtz with a home run and RBI for the Athletics.

Key Moments
• Nick Kurtz hit a solo home run in the 8th inning, breaking a scoreless 
  tie and giving the Athletics a 1-0 lead.
```
---
## 🧱 Tech Stack
* **Frontend:** Next.js (App Router) with React Hooks
* **Backend:** Supabase (Postgres + Edge Functions/Deno)
* **Data Source:** MLB Stats API v1.1 (live game feed + team records)
* **AI:** OpenRouter API with Llama 3.1 8B Instruct
* **Deployment:** Vercel (frontend) + Supabase (backend)
* **Language:** TypeScript (Deno Edge Functions)
---
## ⚙️ Setup Instructions
### 1. Clone Repo
```bash
git clone https://github.com/YOUR_USERNAME/Metsrecap.git
cd Metsrecap
```
---
### 2. Install Dependencies
```bash
npm install
```
---
### 3. Add Environment Variables
Create a `.env.local` file in your Next.js project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

For Supabase Edge Functions, create a `.env` in the `supabase/functions/mets-recap/` directory:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENROUTER_API_KEY=your_openrouter_api_key
```
---
### 4. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.
---
## 🗄️ Supabase Setup
### Table: `mets_daily_game`
Create a table with these columns:

| Column | Type | Required |
|--------|------|----------|
| `id` | bigint | Yes (Primary Key) |
| `headline` | text | Yes |
| `recap` | text | Yes (HTML-formatted) |
| `game_date` | timestamp | Yes |
| `game_pk` | bigint | No |
| `status` | text | No |
| `raw` | jsonb | No (full API response for debugging) |
| `updated_at` | timestamp | Yes |

### SQL to Create Table:
```sql
CREATE TABLE mets_daily_game (
  id BIGINT PRIMARY KEY,
  headline TEXT NOT NULL,
  recap TEXT NOT NULL,
  game_date TIMESTAMP NOT NULL,
  game_pk BIGINT,
  status TEXT,
  raw JSONB,
  updated_at TIMESTAMP NOT NULL
);
```

---
## ⚡ Supabase Edge Function (Automation)
### File: `supabase/functions/mets-recap/index.ts`

The Edge Function:
* **Triggers:** Manual invoke or scheduled (cron job via external service)
* **Checks:** Latest Mets games in the past 24 hours
* **Extracts:**
  - Player batting stats (hits, RBIs, home runs) from boxscore
  - Pitching decisions (winner, loser, save) from game data
  - Scoring plays (key moments)
  - Team record (wins/losses)
* **Validates:** All data before passing to AI
* **Generates:** ESPN-style HTML recap via OpenRouter
* **Stores:** Result in Supabase (upsert to id=1)

### Key Functions in Edge Function:
- `extractPlayerStats()` - Parses boxscore for verified batting stats
- `extractPitchingStats()` - Pulls pitcher statistics
- `extractKeyPlays()` - Extracts only scoring plays
- `buildGameSummary()` - Creates structured data for AI prompt

### If No Game Found:
```json
{
  "headline": "No Mets Game Today",
  "recap": "The New York Mets do not have a completed game in this window.",
  "status": "No game"
}
```

### If AI Request Fails:
Falls back to structured HTML recap with all verified data (no hallucinations).

---
## 📝 Frontend (page.jsx)
The Next.js frontend:
1. Loads game data from Supabase on component mount
2. Displays headline, date, and AI-generated recap (rendered as HTML)
3. Includes refresh button to manually fetch latest data
4. Shows "Loading..." state while fetching
5. Shows "No game data found" if no game exists

### Updated: Removed `result_summary` field
Previously showed stale pitcher names. Now only displays:
- `headline` - Game result
- `game_date` - Game timestamp
- `recap` - HTML-formatted recap (includes all pitching decisions)

---
## 🚀 Deployment (Vercel)
### Frontend:
1. Import repo into Vercel
2. Add environment variables:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

### Edge Function:
1. Deploy to Supabase:
```bash
supabase functions deploy mets-recap
```

2. Set environment secrets in Supabase dashboard:
   * `SUPABASE_URL`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `OPENROUTER_API_KEY`

3. (Optional) Schedule with external cron service (e.g., cron-job.org):
```
POST https://your-project.supabase.co/functions/v1/mets-recap
Authorization: Bearer your_anon_key
```

---
## 🧪 Expected Behavior
### 🟡 No Game Day
```
No Mets Game Today
The New York Mets do not have a completed game in this window.
```

### 🟢 Game Day (Success)
* Full ESPN-style recap appears
* Includes:
  * Headline with final score
  * Game summary paragraph
  * Pitching decisions (win/loss/save)
  * Stat leaders (verified from boxscore)
  * Key moments (scoring plays only)
  * Mets team record

### 🟠 Game Day (AI Unavailable)
* Fallback structured recap appears
* Includes all verified data (no AI-generated content)
* Shows pitcher decisions, stat leaders, and record

---
## 🛡️ Hallucination Prevention
This version includes multiple safeguards:

1. **Data Validation** - `safeGet()` prevents null/undefined crashes
2. **Source of Truth** - Only MLB Stats API data passed to AI
3. **Strict Prompting** - AI explicitly told "ONLY use provided data, NEVER invent"
4. **Field Verification** - Player stats filtered to only include verified fields
5. **Key Plays Filtering** - Only scoring plays with complete data included
6. **Fallback HTML** - If AI fails, structured recap generated from verified data
7. **Logging** - Console logs show what data was extracted at each step

---
## 📈 Future Improvements
* 📊 NL East standings integration
* 🏆 Player of the Game highlighting
* 📈 Last 10 games trend analysis
* 🔔 Push notifications for games
* 📱 PWA (installable mobile app)
* 🎬 Game highlight video embeds
* 🤖 Sentiment analysis (positive/negative game tone)
---
## 🙌 Credits
* **MLB Stats API** - Game data and statistics
* **Supabase** - Backend database and Edge Functions
* **OpenRouter** - AI model access (Llama 3.1)
* **Vercel** - Frontend hosting
* **Next.js** - React framework
---
## 📬 Notes
This project is designed as a **lightweight, automated sports media app** and can be expanded to support:
* All 30 MLB teams
* Multiple sports (NBA, NFL, NHL, MLS)
* Personalized feeds by team/player
* Historical game archives
* Advanced analytics and stats

---
## 🔧 Troubleshooting

### Issue: "null-null" showing for Mets record
**Solution:** Verify team API is returning record data. Check console logs for warnings.

### Issue: "Details unavailable" in stat leaders
**Solution:** Ensure boxscore has batting stats. MLB API sometimes delays stat updates.

### Issue: Empty key plays / highlights
**Solution:** Check if game has scoring plays. Some low-scoring games may have few key plays.

### Issue: Pitcher names showing from previous game
**Solution:** Make sure `result_summary` field is removed from frontend (only use `recap` field).

### Issue: OpenRouter API errors
**Solution:** 
- Verify `OPENROUTER_API_KEY` is set in Supabase secrets
- Check OpenRouter account has credits
- Review error logs in Supabase Edge Function dashboard

---
## 📄 License
MIT License - Feel free to fork and modify!

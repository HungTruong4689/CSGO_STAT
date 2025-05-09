# 🧠 CS:GO Match Statistics Dashboard

A modern, responsive dashboard built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Chart.js** to visualize round-by-round statistics from a real **CS:GO professional match log**.

🔗 **Live demo:** [csgo-stat.vercel.app](https://csgo-stat-git-main-hung-truongs-projects.vercel.app/)

---

## 🚀 Features

- 📈 **Scoreboard Over Time** – Round-by-round CT/T score progression
- 🔫 **Player Statistics Table** with:
  - Kills / Deaths
  - Headshots
  - Damage Dealt
  - Team badge (CT or TERRORIST)
  - MVP highlight (★)
- 📊 **First Half vs Second Half Breakdown with winner**
- 💡 Responsive and mobile-optimized
- ☁️ Vercel-ready deployment

---

## 📦 Technologies Used

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) via `react-chartjs-2`
- [ESLint + Prettier](https://eslint.org/)
- [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```txt
src/
├── components/
│ ├── PlayerStatsTable.tsx
│ └── ScoreboardChart.tsx
├── utils/
│ └── parser.ts
├── App.tsx
└── index.css
public/
└── NAVIvsVitaGF-Nuke.txt
```

## 🧪 How to Run Locally

# 1. Clone this repo

```bash
git clone https://github.com/HungTruong4689/CSGO_STAT.git
cd CSGO_STAT
```

# 2. Install dependencies

```bash
npm install
```

# 3. Run locally

```bash
npm run dev
```

# 4. Open http://localhost:5173 in your browser

## 🌐 Deployment

This project is deployed on Vercel:  
🔗 [https://csgo-stat-git-main-hung-truongs-projects.vercel.app/](https://csgo-stat-git-main-hung-truongs-projects.vercel.app/)

To deploy your own version, click below:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import)

---

## 📄 License

MIT License © 2025 Hung Truong

---

## 🙌 Acknowledgments

- [BLAST.tv](https://www.blast.tv/) for the match data
- [Chart.js](https://www.chartjs.org/)
- The Counter-Strike community

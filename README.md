![Status](https://img.shields.io/badge/status-in%20development-yellow)
# Steam Trading Bot Dashboard

Real-time analytics dashboard for automated Steam marketplace trading operations. Built with React, FastAPI, and PostgreSQL.

![Dashboard](https://via.placeholder.com/800x400/000000/00ff88?text=Dashboard+Screenshot)

## Tech Stack

**Frontend:** React 18, Vite, Recharts, Axios  
**Backend:** FastAPI, PostgreSQL, psycopg2  
**Deployment:** Docker, Nginx

## Features

- Real-time trading statistics and performance metrics
- Interactive price history charts (30-day data)
- Market analysis: volatility, trends, liquidity scores
- Order management and event tracking
- Dark theme UI with responsive design

## Project Structure

```
├── backend/
│   ├── app.py              # FastAPI endpoints
│   ├── dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Dashboard & Analysis pages
│   │   └── services/       # API layer
│   ├── dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

## Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd steam-dashboard

# Start with Docker
docker-compose up -d

# Or manually:
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend
cd frontend
npm install && npm run dev
```

**Environment Variables:**

```env
PASSWORD=your_postgres_password
DB_IP=localhost
```

## API Endpoints

|Endpoint|Description|
|---|---|
|`GET /api/stats`|Trading statistics|
|`GET /api/orders/recent`|Recent orders|
|`GET /api/skins/analysis?skin=<name>`|Skin analytics|
|`GET /api/skins/price-history?skin_id=<id>&days=30`|Price history|

## Database Schema

**order_events** - Trading activity log  
**skins_with_analysis** - Market analytics view  
**pricehistory** - Historical price data

## Skills Demonstrated

- Full-stack development (Python + React)
- RESTful API design
- Database optimization & complex queries
- Docker containerization
- Real-time data visualization
- Responsive UI/UX design

## License

MIT
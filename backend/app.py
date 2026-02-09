from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение к БД
conn = psycopg2.connect(
    dbname="steam",
    user="postgres",
    password=os.getenv("PASSWORD"),
    host=os.getenv("DB_IP"),
    port=5432
)

@app.get("/api/orders/recent")
def get_recent(limit: int = 50):
    result = []
    cur = conn.cursor()
    cur.execute("SELECT * FROM order_events ORDER BY created_at DESC LIMIT %s", (limit,))
    recent_orders = cur.fetchall()
    
    for recent_order in recent_orders:
        item_id, parent_id, event_type, amount, price, created_at, analysis_id, name = recent_order
        result.append({
            "name": name,
            "event_type": event_type,
            "price": price,
            "amount": amount,
            "created_at": created_at
        })
    return result


@app.get("/api/skins/analysis")
def get_skins_with_analysis(skin: str):
    cur = conn.cursor()
    cur.execute("select * from skins_with_analysis where name = %s", (skin, ))
    analyse_massive = cur.fetchone()
    if not analyse_massive:
        return {"error": "skin not found"}
    skin_id, name, skin_analysis_ts, appearance_date, item_name_id, orders_timestamp, history_timestamp, analysis_id, moment_price, volume, low_approx, high_approx, slope_1m, slope_6m, avg_month_price, avg_week_price, avg_5_sell_orders, avg_5_buy_orders, spread, mid_price, spread_percent, bid_depth, analysis_ts = analyse_massive
    analyse = {
        "id": skin_id,
        "name": name,
        "appearance_date": appearance_date,
        "orders_timestamp": orders_timestamp,
        "history_timestamp": history_timestamp,
        "analysis_id": analysis_id,
        "moment_price": moment_price,
        "volume": volume,
        "low_approx": low_approx,
        "high_approx": high_approx,
        "slope_1m": slope_1m,
        "slope_6m": slope_6m,
        "avg_month_price": avg_month_price,
        "avg_week_price": avg_week_price,
        "avg_5_sell_orders": avg_5_sell_orders,
        "analysis_timestamp": analysis_ts,
        "avg_5_buy_orders": avg_5_buy_orders,
        "spread": spread,
        "mid_price": mid_price,
        "spread_percent": spread_percent,
        "bid_depth": bid_depth
    }
    return analyse


from fastapi import Path

@app.get("/api/skins/price-history")
def get_skin_price_history_stub(skin_id: int, days: int = 30):
    data = []
    cur = conn.cursor()
    from_this = datetime.now() - timedelta(days)
    cur.execute("select * from pricehistory where skin_id=%s and date > %s order by date;", (skin_id, from_this))
    history = cur.fetchall()
    
    for skin_id, date, price, volume in history:
        data.append({
            "date": date.strftime("%Y-%m-%d"),
            "price": price,
            "volume": volume
        })

    return data



@app.get("/api/stats")
def get_skin_price_history_stub():
    cur = conn.cursor()
    
    cur.execute("select COUNT(*), SUM(price) from order_events where event_type = 'BUY_PLACED'")
    placed_orders, buy = cur.fetchone()
    
    cur.execute("select COUNT(*), SUM(price) from order_events where event_type = 'LEGACY' or event_type = 'SELL_PLACED';")
    placed_to_sell, sell = cur.fetchone()
    
    fictive = {
    "placed_orders": placed_orders,
    "placed_to_sell": placed_to_sell,
    "balance": 0,
    "buy": buy,
    "sell": sell,
    "total_profit": 0
    }
    return fictive


import React, { useState } from 'react';
import { dashboardAPI } from '../services/api';
import './Analysis.css';
import PriceChart from '../components/PriceChart';

const Analysis = () => {
  const [skinQuery, setSkinQuery] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAnalysisData = async () => {
    if (!skinQuery) return;

    try {
      setLoading(true);
      setError(null);

      const data = await dashboardAPI.getSkinsWithAnalysis(skinQuery);

      if (!data || data.error) {
        setError(data?.error || "Skin not found");
        setAnalysis(null);
      } else {
        setAnalysis(data);
      }

    } catch (err) {
      console.error(err);
      setError("Request failed");
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis">
      <div className="analysis-header">
        <h1>Skin Analysis</h1>
        <p>Enter exact skin name</p>
      </div>

      <div className="analysis-search">
        <input
          type="text"
          placeholder="USP-S | Alpine Camo (Battle-Scarred)"
          value={skinQuery}
          onChange={(e) => setSkinQuery(e.target.value)}
        />
        <button onClick={loadAnalysisData}>Analyze</button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {analysis && (
        <>
          <div className="card">
            <h3>{analysis.name}</h3>

            <div className="analysis-grid">
              <div><b>Moment price:</b> {analysis.moment_price}</div>
              <div><b>Volume:</b> {analysis.volume}</div>
              <div><b>Low approx:</b> {analysis.low_approx}</div>
              <div><b>High approx:</b> {analysis.high_approx}</div>

              <div><b>Slope 1m:</b> {analysis.slope_1m}</div>
              <div><b>Slope 6m:</b> {analysis.slope_6m}</div>

              <div><b>Avg month price:</b> {analysis.avg_month_price}</div>
              <div><b>Avg week price:</b> {analysis.avg_week_price}</div>

              <div><b>Avg 5 sell orders:</b> {analysis.avg_5_sell_orders}</div>
              <div><b>Avg 5 buy orders:</b> {analysis.avg_5_buy_orders}</div>

              <div><b>Spread:</b> {analysis.spread}</div>
              <div><b>Mid price:</b> {analysis.mid_price}</div>
              <div><b>Spread %:</b> {analysis.spread_percent}</div>
              <div><b>Bid depth:</b> {analysis.bid_depth}</div>

              <div><b>Analysis timestamp:</b> {analysis.analysis_timestamp}</div>
            </div>
          </div>

          {/* ГРАФИК */}
          <PriceChart
            skinId={analysis.id}
            title="Price history"
          />
        </>
      )}
    </div>
  );
};

export default Analysis;

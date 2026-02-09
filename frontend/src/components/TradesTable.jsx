const TradesTable = ({ trades }) => {
  console.log(trades);
  console.log(Array.isArray(trades) ? trades.length : 'trades is not an array');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="card">
      <h3 className="chart-title">Recent Trades</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Event Type</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(trades) && trades.length === 0 ? (
              <tr>
                <td colSpan="5">Нет данных для отображения</td>
              </tr>
            ) : (
              trades.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.name ? trade.name : 'Unknown'}</td>
                  <td>{trade.event_type}</td>
                  <td>{trade.price != null ? trade.price.toFixed(2) : '-'}</td>
                  <td>{trade.amount}</td>
                  <td>{formatDate(trade.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesTable;

export default function DashboardCards({ complaints }) {
  const total = complaints.length;

  const open = complaints.filter(
    (c) => c.status?.toLowerCase() !== "closed"
  ).length;

  const closed = complaints.filter(
    (c) => c.status?.toLowerCase() === "closed"
  ).length;

  return (
    <div className="cards">

      <div className="dashboard-card">
        <h3>Total Complaints</h3>
        <h1>{total}</h1>
      </div>

      <div className="dashboard-card">
        <h3>Open Complaints</h3>
        <h1>{open}</h1>
      </div>

      <div className="dashboard-card">
        <h3>Closed Complaints</h3>
        <h1>{closed}</h1>
      </div>

    </div>
  );
}
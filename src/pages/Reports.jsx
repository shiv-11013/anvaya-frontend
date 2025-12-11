import { useLeads } from "../context/LeadsContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import "./Reports.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Reports() {
  const { leads, loading } = useLeads();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Stats
  const totalLeads = leads.length;
  const closedLeads = leads.filter((l) => l.leadStatus === "Closed").length;
  const openLeads = totalLeads - closedLeads;
  const highPriorityLeads = leads.filter((l) => l.priority === "High").length;

  // Status counts
  const statusCounts = {
    New: leads.filter((l) => l.leadStatus === "New").length,
    Contacted: leads.filter((l) => l.leadStatus === "Contacted").length,
    Qualified: leads.filter((l) => l.leadStatus === "Qualified").length,
    "Proposal Sent": leads.filter((l) => l.leadStatus === "Proposal Sent")
      .length,
    Closed: leads.filter((l) => l.leadStatus === "Closed").length,
  };

  // Agent counts
  const agentCounts = leads.reduce((acc, lead) => {
    acc[lead.assignedAgent] = (acc[lead.assignedAgent] || 0) + 1;
    return acc;
  }, {});

  // Priority counts
  const priorityCounts = {
    High: leads.filter((l) => l.priority === "High").length,
    Medium: leads.filter((l) => l.priority === "Medium").length,
    Low: leads.filter((l) => l.priority === "Low").length,
  };

  // Chart Data
  const statusChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "#28a745",
          "#17a2b8",
          "#ffc107",
          "#fd7e14",
          "#6c757d",
        ],
        borderWidth: 0,
      },
    ],
  };

  const agentChartData = {
    labels: Object.keys(agentCounts),
    datasets: [
      {
        label: "Leads Assigned",
        data: Object.values(agentCounts),
        backgroundColor: "#007bff",
        borderRadius: 8,
      },
    ],
  };

  const priorityChartData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        data: Object.values(priorityCounts),
        backgroundColor: ["#dc3545", "#ffc107", "#28a745"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom", labels: { color: "#ccc" } } },
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { display: false } },
      y: { ticks: { color: "#ccc" }, grid: { color: "#333" } },
    },
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>📊 Reports & Analytics</h2>
        <p>Visual insights into your sales pipeline</p>
      </div>

      <div className="summary-stats">
        <div className="summary-card">
          <span className="summary-number">{totalLeads}</span>
          <span className="summary-label">Total Leads</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{openLeads}</span>
          <span className="summary-label">Open Leads</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{closedLeads}</span>
          <span className="summary-label">Closed Leads</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{highPriorityLeads}</span>
          <span className="summary-label">High Priority</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Lead Status Distribution</h3>
          <div className="chart-container">
            <Pie data={statusChartData} options={pieOptions} />
          </div>
        </div>
        <div className="chart-card">
          <h3>Leads by Sales Agent</h3>
          <div className="chart-container">
            <Bar data={agentChartData} options={barOptions} />
          </div>
        </div>
        <div className="chart-card">
          <h3>Priority Breakdown</h3>
          <div className="chart-container">
            <Doughnut data={priorityChartData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

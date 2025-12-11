import { useLeads } from "../context/LeadsContext";
import { useState } from "react";
import LeadForm from "../components/LeadForm";
import { Link } from "react-router-dom";
import "../Dashboard.css";
function Dashboard() {
  const { leads, addLead, loading, error } = useLeads();

  const [activeFilter, setActiveFilter] = useState("All");

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  const addNewLead = (newLead) => {
    setLeads([...leads, newLead]);
  };
  const newCount = leads.filter((lead) => lead.leadStatus === "New").length;
  const contactedCount = leads.filter(
    (lead) => lead.leadStatus === "Contacted"
  ).length;
  const qualifiedCount = leads.filter(
    (lead) => lead.leadStatus === "Qualified"
  ).length;
  const proposalCount = leads.filter(
    (lead) => lead.leadStatus === "Proposal Sent"
  ).length;
  const closedCount = leads.filter(
    (lead) => lead.leadStatus === "Closed"
  ).length;
  const filteredLeads =
    activeFilter === "All"
      ? leads
      : leads.filter((lead) => lead.leadStatus === activeFilter);
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Anvaya CRM Dashboard</h2>
        <p>Welcome to your Lead Management System</p>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeFilter === "All" ? "active" : ""}`}
          onClick={() => setActiveFilter("All")}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === "New" ? "active" : ""}`}
          onClick={() => setActiveFilter("New")}
        >
          New
        </button>
        <button
          className={`filter-btn ${
            activeFilter === "Contacted" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("Contacted")}
        >
          Contacted
        </button>
        <button
          className={`filter-btn ${
            activeFilter === "Qualified" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("Qualified")}
        >
          Qualified
        </button>
        <button
          className={`filter-btn ${
            activeFilter === "Proposal Sent" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("Proposal Sent")}
        >
          Proposal Sent
        </button>
        <button
          className={`filter-btn ${activeFilter === "Closed" ? "active" : ""}`}
          onClick={() => setActiveFilter("Closed")}
        >
          Closed
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <strong>New</strong>
          <div className="count">{newCount}</div>
        </div>
        <div className="stat-card">
          <strong>Contacted</strong>
          <div className="count">{contactedCount}</div>
        </div>
        <div className="stat-card">
          <strong>Qualified</strong>
          <div className="count">{qualifiedCount}</div>
        </div>
        <div className="stat-card">
          <strong>Proposal Sent</strong>
          <div className="count">{proposalCount}</div>
        </div>
        <div className="stat-card">
          <strong>Closed</strong>
          <div className="count">{closedCount}</div>
        </div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <LeadForm onAddLead={addNewLead} />
      </div>

      {/* Table */}
      <h3>All Leads ({filteredLeads.length})</h3>
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Status</th>
            <th>Agent</th>
            <th>Tag</th>
            <th>Priority</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.leadName}</td>
              <td>{lead.leadSource}</td>
              <td>{lead.leadStatus}</td>
              <td>{lead.assignedAgent}</td>
              <td>{lead.tag}</td>
              <td>{lead.priority}</td>
              <td>{lead.timeToClose}</td>

              <td>
                <Link to={`/leads/${lead._id}`} className="view-btn"></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

import { useLeads } from "../context/LeadsContext";
import { Link, useSearchParams } from "react-router-dom";
import "./Leads.css";

function Leads() {
  const { leads, loading } = useLeads();
  const [searchParams, setSearchParams] = useSearchParams();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // URL se filters
  const statusFilter = searchParams.get("status") || "All";
  const agentFilter = searchParams.get("agent") || "All";
  const sourceFilter = searchParams.get("source") || "All";

  // Unique values
  const statuses = [
    "All",
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const agents = ["All", ...new Set(leads.map((lead) => lead.assignedAgent))];
  const sources = ["All", ...new Set(leads.map((lead) => lead.leadSource))];

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchStatus =
      statusFilter === "All" || lead.leadStatus === statusFilter;
    const matchAgent =
      agentFilter === "All" || lead.assignedAgent === agentFilter;
    const matchSource =
      sourceFilter === "All" || lead.leadSource === sourceFilter;
    return matchStatus && matchAgent && matchSource;
  });

  const updateFilter = (filterName, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "All") {
      newParams.delete(filterName);
    } else {
      newParams.set(filterName, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="leads-page">
      <div className="leads-header">
        <h2>All Leads</h2>
        <p>Manage and filter your leads</p>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Agent</label>
          <select
            value={agentFilter}
            onChange={(e) => updateFilter("agent", e.target.value)}
          >
            {agents.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Source</label>
          <select
            value={sourceFilter}
            onChange={(e) => updateFilter("source", e.target.value)}
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <p className="results-count">
        Showing {filteredLeads.length} of {leads.length} leads
      </p>

      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Status</th>
            <th>Agent</th>
            <th>Priority</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-results">
                No leads found
              </td>
            </tr>
          ) : (
            filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.leadName}</td>
                <td>{lead.leadSource}</td>
                <td>
                  <span
                    className={`status-badge status-${lead.leadStatus
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {lead.leadStatus}
                  </span>
                </td>
                <td>{lead.assignedAgent}</td>
                <td>
                  <span className={`priority-${lead.priority.toLowerCase()}`}>
                    {lead.priority}
                  </span>
                </td>
                <td>{lead.timeToClose}</td>
                <td>
                  <Link to={`/leads/${lead._id}`} className="view-btn">
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;

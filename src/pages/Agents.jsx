import { useLeads } from "../context/LeadsContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Agents.css";

function Agents() {
  const { agents, addAgent, leads, loading } = useLeads();
  const [showForm, setShowForm] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", email: "" });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const getLeadCount = (agentName) => {
    return leads.filter((lead) => lead.assignedAgent === agentName).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAgent.name || !newAgent.email) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addAgent(newAgent);
      setNewAgent({ name: "", email: "" });
      setShowForm(false);
      alert("Agent added successfully!");
    } catch (err) {
      alert("Failed to add agent");
    }
  };

  return (
    <div className="agents-page">
      <div className="agents-header">
        <div>
          <h2>👤 Sales Agents</h2>
          <p>Manage your sales team</p>
        </div>
        <button
          className="add-agent-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Cancel" : "+ Add Agent"}
        </button>
      </div>

      {showForm && (
        <div className="add-agent-form">
          <h3>Add New Agent</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Agent Name</label>
              <input
                type="text"
                placeholder="Enter agent name"
                value={newAgent.name}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={newAgent.email}
                onChange={(e) =>
                  setNewAgent({ ...newAgent, email: e.target.value })
                }
              />
            </div>
            <button type="submit" className="submit-btn">
              Create Agent
            </button>
          </form>
        </div>
      )}

      <div className="agents-grid">
        {agents.map((agent) => (
          <div key={agent._id} className="agent-card">
            <div className="agent-avatar">{agent.name.charAt(0)}</div>
            <div className="agent-info">
              <h3>{agent.name}</h3>
              <p className="agent-email">{agent.email}</p>
              <div className="agent-stats">
                <span className="lead-count">
                  {getLeadCount(agent.name)} leads assigned
                </span>
              </div>
            </div>
            <Link to={`/leads?agent=${agent.name}`} className="view-leads-btn">
              View Leads →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agents;

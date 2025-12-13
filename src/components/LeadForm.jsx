import { useState } from "react";
import { useLeads } from "../context/LeadsContext";
import "../LeadForm.css";
import toast from "react-hot-toast";

function LeadForm({ onAddLead }) {
  const { agents } = useLeads();
  const INITIAL_FORM_STATE = {
    leadName: "",
    leadSource: "",
    assignedAgent: "",
    leadStatus: "",
    tag: "",
    timeToClose: "",
    priority: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = Object.values(formData);

    const hasEmptyField = values.includes("");

    if (hasEmptyField) {
      toast.error("Please fill all fields!");
      return;
    }
    const loadingToast = toast.loading("Creating lead...");

    try {
      await onAddLead(formData);
      toast.success("Lead added successfully!", { id: loadingToast }); // ✨ Success
      setFormData(INITIAL_FORM_STATE);
    } catch (err) {
      toast.error("Failed to add lead", { id: loadingToast }); // ✨ Error
      console.error(err);
    }
  };

  const isValid =
    formData.leadName.trim() !== "" &&
    formData.leadSource !== "" &&
    formData.assignedAgent !== "" &&
    formData.leadStatus !== "" &&
    formData.tag !== "" &&
    formData.timeToClose !== "" &&
    formData.priority !== "";

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Lead</h3>
      <input
        type="text"
        placeholder="Lead Name"
        value={formData.leadName}
        onChange={(e) => handleInputChange("leadName", e.target.value)}
      />
      <p>You typed: {formData.leadName}</p>
      <select
        value={formData.leadSource}
        onChange={(e) => handleInputChange("leadSource", e.target.value)}
      >
        <option value="">Select Source</option>
        <option value="Website">Website</option>
        <option value="Cold Call">Cold Call</option>
        <option value="Social Media">Social Media</option>
      </select>
      <p>Selected Source: {formData.leadSource}</p>
      <select
        value={formData.assignedAgent}
        onChange={(e) => handleInputChange("assignedAgent", e.target.value)}
      >
        <option value="">Select Agent</option>
        {agents.map((agent) => (
          <option key={agent._id} value={agent.name}>
            {agent.name}
          </option>
        ))}
      </select>{" "}
      <br />
      <br />
      <select
        value={formData.leadStatus}
        onChange={(e) => handleInputChange("leadStatus", e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Closed">Closed</option>
      </select>
      <br />
      <br />
      <select
        value={formData.tag}
        onChange={(e) => handleInputChange("tag", e.target.value)}
      >
        <option value="">Select Tag</option>
        <option value="High Value">High Value</option>
        <option value="Follow-up">Follow-up</option>
        <option value="New Lead">New Lead</option>
        <option value="Hot Lead">Hot Lead</option>
        <option value="Cold Lead">Cold Lead</option>
      </select>
      <br />
      <br />
      <input
        type="number"
        placeholder="Days to close"
        value={formData.timeToClose}
        onChange={(e) => handleInputChange("timeToClose", e.target.value)}
      />
      <br />
      <br />
      <select
        value={formData.priority}
        onChange={(e) => handleInputChange("priority", e.target.value)}
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <br />
      <br />
      {!isValid && <p>Please fill all fields!</p>}
      <button type="submit" disabled={!isValid}>
        Submit Lead
      </button>
    </form>
  );
}

export default LeadForm;

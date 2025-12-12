import { useState } from "react";
import "../LeadForm.css";

function LeadForm({ onAddLead }) {
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
    console.log("changed:", fieldName, "=>", value);

    console.log("Before update:", formData);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    console.log("Submit attempt. Current formData:", formData);

    const values = Object.values(formData);

    values.forEach((v, i) => {
      if (v === "") {
        console.log("EMPTY FIELD FOUND at index:", i);
      }
    });

    const hasEmptyField = values.includes("");

    if (hasEmptyField) {
      alert("Please fill all fields!");
      return;
    }

    const newLead = {
      id: Date.now(),
      ...formData,
      timeToClose: Number(formData.timeToClose),
    };

    onAddLead(newLead);

    console.log("Form Data:", formData);
    alert("Lead added successfully!");

    setFormData(INITIAL_FORM_STATE);
  };

  const isValid = Object.values(formData).every((v) => v !== "");

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
        <option value="Agent 1">Agent 1</option>
        <option value="Agent 2">Agent 2</option>
        <option value="Agent 3">Agent 3</option>
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

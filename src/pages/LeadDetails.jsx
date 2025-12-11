import { useParams, Link, useNavigate } from 'react-router-dom'
import { useLeads } from '../context/LeadsContext'
import { useState } from 'react'
import './LeadDetails.css'

function LeadDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { leads, addComment, updateLead, deleteLead } = useLeads()
  const [newComment, setNewComment] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Lead find karo - ✨ _id use karo
  const lead = leads.find(l => l._id === id)

  // Edit form state
  const [editData, setEditData] = useState(lead ? {
    leadStatus: lead.leadStatus,
    assignedAgent: lead.assignedAgent,
    priority: lead.priority
  } : {})

  if (!lead) {
    return (
      <div className="lead-not-found">
        <h2>Lead Not Found</h2>
        <p>The lead you're looking for doesn't exist.</p>
        <Link to="/">← Back to Dashboard</Link>
      </div>
    )
  }

  // Comment submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (newComment.trim() === '') {
      alert('Please enter a comment')
      return
    }
    try {
      await addComment(lead._id, newComment)
      setNewComment('')
    } catch (err) {
      alert('Failed to add comment')
    }
  }

  // Edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateLead(lead._id, editData)
      setIsEditing(false)
      alert('Lead updated successfully!')
    } catch (err) {
      alert('Failed to update lead')
    }
  }

  // Delete
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${lead.leadName}"?`)) {
      try {
        await deleteLead(lead._id)
        navigate('/')
        alert('Lead deleted successfully!')
      } catch (err) {
        alert('Failed to delete lead')
      }
    }
  }

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays} days ago`
  }

  return (
    <div className="lead-details-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>

      <div className="lead-header">
        <h2>{lead.leadName}</h2>
        <span className={`status-badge status-${lead.leadStatus.toLowerCase().replace(' ', '-')}`}>
          {lead.leadStatus}
        </span>
      </div>

      <div className="action-buttons">
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? '✕ Cancel' : '✏️ Edit Lead'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑️ Delete Lead
        </button>
      </div>

      {isEditing && (
        <div className="edit-form">
          <h3>Edit Lead</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="edit-grid">
              <div className="edit-group">
                <label>Status</label>
                <select
                  value={editData.leadStatus}
                  onChange={(e) => setEditData({...editData, leadStatus: e.target.value})}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="edit-group">
                <label>Assigned Agent</label>
                <select
                  value={editData.assignedAgent}
                  onChange={(e) => setEditData({...editData, assignedAgent: e.target.value})}
                >
                  <option value="Agent 1">Agent 1</option>
                  <option value="Agent 2">Agent 2</option>
                  <option value="Agent 3">Agent 3</option>
                </select>
              </div>
              <div className="edit-group">
                <label>Priority</label>
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({...editData, priority: e.target.value})}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>
      )}

      <div className="lead-info-card">
        <h3>📋 Lead Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Lead Source</label>
            <span>{lead.leadSource}</span>
          </div>
          <div className="info-item">
            <label>Assigned Agent</label>
            <span>{lead.assignedAgent}</span>
          </div>
          <div className="info-item">
            <label>Priority</label>
            <span className={`priority-${lead.priority.toLowerCase()}`}>
              {lead.priority}
            </span>
          </div>
          <div className="info-item">
            <label>Days to Close</label>
            <span>{lead.timeToClose} days</span>
          </div>
          <div className="info-item">
            <label>Tag</label>
            <span className="tag">{lead.tag}</span>
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h3>💬 Comments ({lead.comments?.length || 0})</h3>
        
        <div className="comments-list">
          {!lead.comments || lead.comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to add one!</p>
          ) : (
            lead.comments.map((comment, index) => (
              <div key={index} className="comment-card">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-time">{formatDate(comment.timestamp)}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            placeholder="Add a comment about this lead..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  )
}

export default LeadDetails
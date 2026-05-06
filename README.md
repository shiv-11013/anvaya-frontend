# Anvaya CRM - Lead Management System

A full-stack Customer Relationship Management (CRM) application built to help sales teams efficiently manage leads, track progress, and visualize sales data.

---

## Demo Link

[Live Demo](https://anvaya-frontend-git-main-shivs-projects-5cdfdbed.vercel.app)

---

## Demo Video

Watch a walkthrough (5-7 minutes) of all the major features of this app:
[Loom Video]()

---

## Features

### Lead Management

- Create, Read, Update, Delete (CRUD) operations for leads
- Track leads through different stages (New → Contacted → Qualified → Proposal Sent → Closed)
- Assign leads to sales agents
- Priority-based lead categorization (High, Medium, Low)
- Tag-based lead organization

### Real-time Collaboration

- 💬 Commenting system for lead updates
- 👥 Sales agent management
- 🔄 Real-time data synchronization

### Analytics & Reporting

- 📊 Interactive data visualizations (Pie, Bar, Doughnut charts)
- 📈 Lead status distribution
- 👤 Leads by sales agent
- 🎯 Priority breakdown

### Advanced Filtering

- 🔍 Filter leads by status, agent, and source
- 🔗 URL-based filtering for shareable links
- 📋 Multi-parameter filter combinations

### Frontend

- **React.js** - UI library
- **React Router** - Client-side routing
- **Context API** - Global state management
- **Axios** - HTTP client for API calls
- **Chart.js** - Data visualization
- **React Hot Toast** - Toast notifications
- **CSS3** - Styling (Flexbox, Grid, Dark theme)

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Deployment

- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

---

## API Endpoints

### Leads

- `GET /api/leads` - Get all leads (with optional filters)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create new lead
- `PATCH /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `POST /api/leads/:id/comments` - Add comment to lead

### Agents

- `GET /api/agents` - Get all sales agents
- `POST /api/agents` - Create new agent

---

## 💻 Usage Examples

### Create a Lead

```javascript
{
  "leadName": "Acme Corp",
  "leadSource": "Website",
  "assignedAgent": "Agent 1",
  "leadStatus": "New",
  "tag": "High Value",
  "priority": "High",
  "timeToClose": 30
}
```

### Filter Leads by URL

```
/leads?status=New
/leads?agent=Agent 1&status=Contacted
/leads?source=Website&priority=High
```

---

## 🔌 API Endpoints

### Leads

- `GET /api/leads` - Get all leads (with optional filters)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create new lead
- `PATCH /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `POST /api/leads/:id/comments` - Add comment to lead

### Agents

- `GET /api/agents` - Get all sales agents
- `POST /api/agents` - Create new agent

---

## Contact

For bugs or features request, please reach out to shivkumar121112@gmail.com

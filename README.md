# Anvaya CRM — Lead Management System

A full-stack CRM I built for sales teams to actually manage their lead pipeline — track where each lead is in the funnel, assign it to an agent, comment on it, and see the whole thing visualized instead of buried in a spreadsheet.

This one was less about learning a specific auth pattern (did that in KaviosPix) and more about handling a proper data-heavy app — filtering, relationships between leads/agents/comments, and turning that data into charts that actually mean something.

Live: https://anvaya-frontend-git-main-shivs-projects-5cdfdbed.vercel.app

*(Loom walkthrough — will add once I record it)*

## What it does

**Lead management**
- Full CRUD on leads
- Leads move through stages: New → Contacted → Qualified → Proposal Sent → Closed
- Each lead gets assigned to a sales agent
- Priority tagging — High/Medium/Low
- Custom tags for organizing leads beyond just status

**Collaboration**
- Comment thread on each lead, so the team can log updates/context without losing history
- Sales agent management (add/view agents)

**Analytics**
- Pie/bar/doughnut charts (Chart.js) for lead status distribution, leads-per-agent, and priority breakdown
- Basically turning the raw lead table into something a sales manager could actually glance at and understand

**Filtering**
- Filter by status, agent, or source
- Filters are reflected in the URL, so a filtered view is shareable/bookmarkable — this was a deliberate choice so someone could send a teammate a link like `/leads?agent=Agent 1&status=Contacted` and they'd land on exactly that view
- Multiple filters can be combined at once

## Stack

**Frontend**
- React + React Router
- Context API for global state (auth/agents mostly — didn't reach for Redux since the app doesn't need it at this size)
- Axios
- Chart.js for the visualizations
- React Hot Toast for notifications
- Plain CSS3 — flexbox/grid, dark theme

**Backend**
- Node + Express
- MongoDB + Mongoose

**Deployment**
- Frontend on Vercel, backend on Render, DB on Atlas

## API

**Leads**
```
GET     /api/leads              Get all leads (supports filters)
GET     /api/leads/:id          Get a single lead
POST    /api/leads              Create a lead
PATCH   /api/leads/:id          Update a lead
DELETE  /api/leads/:id          Delete a lead
POST    /api/leads/:id/comments Add a comment to a lead
```

**Agents**
```
GET   /api/agents    Get all sales agents
POST  /api/agents    Create a new agent
```

## Example — creating a lead

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

## URL-based filtering

```
/leads?status=New
/leads?agent=Agent 1&status=Contacted
/leads?source=Website&priority=High
```

Went with query params here instead of keeping filter state purely client-side because it makes the filtered view something you can actually link to someone — a sales manager could send "here's everyone stuck at Proposal Sent" as a URL instead of describing which filters to click.

## Contact

Bugs or feature requests: shivkumar121112@gmail.com

import { createContext, useState, useContext, useEffect } from 'react'
import * as api from '../services/api'

const LeadsContext = createContext()

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([])
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [leadsData, agentsData] = await Promise.all([
        api.getLeads(),
        api.getAgents()
      ])
      setLeads(leadsData)
      setAgents(agentsData)
      setError(null)
    } catch (err) {
      setError('Failed to fetch data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  
  const addLead = async (leadData) => {
    try {
      const newLead = await api.createLead(leadData)
      setLeads([newLead, ...leads])
      return newLead
    } catch (err) {
      console.error(err)
      throw err
    }
  }

 
  const updateLead = async (id, leadData) => {
    try {
      const updatedLead = await api.updateLead(id, leadData)
      setLeads(leads.map(lead => 
        lead._id === id ? updatedLead : lead
      ))
      return updatedLead
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const deleteLead = async (id) => {
    try {
      await api.deleteLead(id)
      setLeads(leads.filter(lead => lead._id !== id))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const addComment = async (leadId, commentText) => {
    try {
      const updatedLead = await api.addComment(leadId, {
        author: 'Current User',
        text: commentText
      })
      setLeads(leads.map(lead => 
        lead._id === leadId ? updatedLead : lead
      ))
      return updatedLead
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  
  const addAgent = async (agentData) => {
    try {
      const newAgent = await api.createAgent(agentData)
      setAgents([...agents, newAgent])
      return newAgent
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return (
    <LeadsContext.Provider value={{ 
      leads, 
      agents,
      loading,
      error,
      addLead, 
      updateLead,
      deleteLead,
      addComment,
      addAgent,
      refreshData: fetchInitialData
    }}>
      {children}
    </LeadsContext.Provider>
  )
}

export function useLeads() {
  const context = useContext(LeadsContext)
  if (!context) {
    throw new Error('useLeads must be used within LeadsProvider')
  }
  return context
}
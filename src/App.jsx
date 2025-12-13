import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadsProvider } from "./context/LeadsContext";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";
import LeadDetails from "./pages/LeadDetails";
function App() {
  return (
    <LeadsProvider>
      {" "}
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetails />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LeadsProvider>
  );
}

export default App;

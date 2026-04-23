import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadsProvider } from "./context/LeadsContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";
import LeadDetails from "./pages/LeadDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <LeadsProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/leads"
              element={
                <PrivateRoute>
                  <Layout>
                    <Leads />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/leads/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <LeadDetails />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/agents"
              element={
                <PrivateRoute>
                  <Layout>
                    <Agents />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </LeadsProvider>
    </AuthProvider>
  );
}

export default App;
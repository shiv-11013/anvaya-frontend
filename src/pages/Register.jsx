import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "agent" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Anvaya CRM</h2>
        <p style={styles.sub}>Create your account</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Shiv Kumar"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Role</label>
            <select
              style={styles.input}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a" },
  card: { background: "#2c2c2c", border: "1px solid #333", borderRadius: "12px", padding: "40px", width: "100%", maxWidth: "400px" },
  title: { color: "#fff", textAlign: "center", marginBottom: "8px", fontSize: "28px" },
  sub: { color: "#888", textAlign: "center", marginBottom: "30px" },
  group: { marginBottom: "20px" },
  label: { display: "block", color: "#888", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px" },
  input: { width: "100%", padding: "12px", background: "#3a3a3a", border: "1px solid #444", borderRadius: "6px", color: "#fff", fontSize: "14px", boxSizing: "border-box" },
  btn: { width: "100%", padding: "13px", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  footer: { color: "#888", textAlign: "center", marginTop: "20px", fontSize: "14px" },
  link: { color: "#007bff" },
};

export default Register;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Anvaya CRM</h2>
        <p style={styles.sub}>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Register</Link>
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
  btn: { width: "100%", padding: "13px", background: "#007bff", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  footer: { color: "#888", textAlign: "center", marginTop: "20px", fontSize: "14px" },
  link: { color: "#007bff" },
};

export default Login;
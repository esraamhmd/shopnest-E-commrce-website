import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/authSlice";
import "./AuthPages.css";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email,    setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]  = useState<Record<string, string>>({});
  const [loading,  setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim())
      e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Invalid email address";
    if (!password)
      e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ name: email.split("@")[0], email }));
      setLoading(false);
      navigate("/");
    }, 600);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand" onClick={() => navigate("/")}>
          <span className="auth-brand-name">ShopNest</span>
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({...p, email: ""})); }}
              placeholder="you@example.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({...p, password: ""})); }}
              placeholder="••••••••"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="auth-forgot"><a href="#">Forgot Password?</a></div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
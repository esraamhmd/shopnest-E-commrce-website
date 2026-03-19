import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/authSlice";
import "./AuthPages.css";

function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [agreed,    setAgreed]    = useState(false);
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [loading,   setLoading]   = useState(false);

  function clearErr(field: string) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim())        e.firstName = "First name is required";
    else if (firstName.trim().length < 2) e.firstName = "First name must be at least 2 characters";
    if (!lastName.trim())         e.lastName  = "Last name is required";
    if (!email.trim())            e.email     = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format";
    if (!password)                e.password  = "Password is required";
    else if (password.length < 8) e.password  = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(password)) e.password = "Password must contain at least one uppercase letter";
    if (!confirm)                 e.confirm   = "Please confirm your password";
    else if (confirm !== password) e.confirm  = "Passwords do not match";
    if (!agreed)                  e.agreed    = "You must agree to the Terms & Conditions";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ name: `${firstName} ${lastName}`, email }));
      setLoading(false);
      navigate("/");
    }, 600);
  }

  const strength = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    ? "strong" : password.length >= 6 ? "medium" : "weak";
  const strengthLabel = strength === "strong" ? "Strong" : strength === "medium" ? "Medium" : "Weak";

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand" onClick={() => navigate("/")}>
          <span className="auth-brand-name">ShopNest</span>
        </div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us today</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-row">
            <div className="auth-field">
              <label>First Name</label>
              <input type="text" value={firstName}
                onChange={(e) => { setFirstName(e.target.value); clearErr("firstName"); }}
                placeholder="John" className={errors.firstName ? "input-error" : ""}/>
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>
            <div className="auth-field">
              <label>Last Name</label>
              <input type="text" value={lastName}
                onChange={(e) => { setLastName(e.target.value); clearErr("lastName"); }}
                placeholder="Doe" className={errors.lastName ? "input-error" : ""}/>
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="auth-field">
            <label>Email Address</label>
            <input type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
              placeholder="you@example.com" className={errors.email ? "input-error" : ""}/>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input type="password" value={password}
              onChange={(e) => { setPassword(e.target.value); clearErr("password"); }}
              placeholder="••••••••" className={errors.password ? "input-error" : ""}/>
            {errors.password && <span className="field-error">{errors.password}</span>}
            {password && (
              <div className="password-strength">
                <div className={`strength-bar ${strength}`}/>
                <span className="strength-label">{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input type="password" value={confirm}
              onChange={(e) => { setConfirm(e.target.value); clearErr("confirm"); }}
              placeholder="••••••••"
              className={errors.confirm ? "input-error" : confirm && confirm === password ? "input-success" : ""}/>
            {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            {confirm && confirm === password && <span className="field-success">✓ Passwords match</span>}
          </div>

          <div className={`auth-checkbox ${errors.agreed ? "checkbox-error" : ""}`}>
            <input type="checkbox" id="agree" checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); clearErr("agreed"); }}/>
            <label htmlFor="agree">I agree to the <a href="#">Terms & Conditions</a></label>
          </div>
          {errors.agreed && <span className="field-error">{errors.agreed}</span>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
export default SignupPage;
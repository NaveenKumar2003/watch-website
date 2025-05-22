import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <--- THIS IS CRUCIAL
import "./LoginRegister.css"; // Styles for the combined form

function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false); // State to toggle between login and register forms
  
  // State variables for Login form inputs
  const [loginEmail, setLoginEmail] = useState(""); 
  const [loginPassword, setLoginPassword] = useState(""); 

  // State variables for Register form inputs
  const [registerName, setRegisterName] = useState(""); 
  const [registerEmail, setRegisterEmail] = useState(""); 
  const [registerPassword, setRegisterPassword] = useState(""); 

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Toggles the form display between login and register
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  // Handles the submission of the login form
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // --- Example hardcoded credentials for demonstration ---
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (loginEmail === validEmail && loginPassword === validPassword) {
      alert(`Welcome, ${loginEmail}!`); // Show welcome message
      navigate("/about"); // Redirect to the '/about' page upon successful login
    } else {
      alert("Invalid email or password. Please try again."); // Show error message
    }
  };

  // Handles the submission of the registration form
  const handleRegisterSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // --- Placeholder for actual registration logic (e.g., API call) ---
    console.log("Registering user:", { name: registerName, email: registerEmail, password: registerPassword });
    alert("Registration successful! You can now sign in."); // Inform user
    
    // After successful registration, switch to login form
    setIsRegister(false); 
    // Optionally clear register form fields
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  return (
    <div className={`container ${isRegister ? "right-panel-active" : ""}`}>
      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLoginSubmit}>
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          <p>
            Don't have an account?{" "}
            <button className="link-button" type="button" onClick={toggleForm}>
              Register here
            </button>
          </p>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegisterSubmit}>
          <h2>Create Account</h2>
          <input
            type="text"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <button className="link-button" type="button" onClick={toggleForm}>
              Sign In
            </button>
          </p>
        </form>
      </div>

      {/* Overlay Panel for animation */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login</p>
            <button className="ghost" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;

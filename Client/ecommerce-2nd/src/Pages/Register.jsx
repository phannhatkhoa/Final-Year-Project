import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const registerUser = async () => {
    try {
      if (formData.password !== formData.rePassword) {
        setError("Passwords do not match!");
        return;
      }

      // Process the API response
      setSuccess(true);
      setError(null);
      
    } catch (error) {
      // Handle API error
      setSuccess(false);
      setError("Something went wrong");
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">Registration successful!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rePassword">Re-enter Password:</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

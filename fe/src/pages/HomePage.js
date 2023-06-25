import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
const HomePage = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [exp, setExp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/token");
      const decoded = jwt_decode(response.data.accessToken);
      setToken(response.data.accessToken);
      setExp(decoded.exp);
    } catch (error) {
      navigate("/login");
    }
  };

  const axios_JWT = axios.create();

  axios_JWT.interceptors.request.use(
    async (config) => {
      const response = await axios.get("http://localhost:3000/users/token");
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExp(decoded.exp);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const logout = async () => {
    try {
      await axios.delete("http://localhost:3000/users/logout");
      navigate("/login");
    } catch (error) {}
  };
  const getHalo = async () => {
    const response = await axios_JWT.get("http://localhost:3000/halo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };
  return (
    <div>
      <div>
        <nav className="nav nav-pills nav-justified ">
          <a className="nav-link active" href="#" aria-current="page">
            Active link
          </a>
          <a className="nav-link" href="#">
            Link
          </a>
          <a onClick={logout} className="nav-link logout">
            logout
          </a>
        </nav>
      </div>
      <h2>Welcome to the Home Page</h2>

      <div className="container-lg !align !spacing">
        <button onClick={getHalo} type="button" className="btn btn-primary">
          Button
        </button>
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "./css/styles.css";

import "bootstrap/dist/css/bootstrap.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";

class App extends React.Component {
  state = {
    loggedIn: false,
  };

  handleLogin = (email, password) => {
    // Panggil API untuk melakukan login
    axios
      .post("http://localhost:3000/users/login", { email, password })
      .then((response) => {
        // Login berhasil
        this.setState({ loggedIn: true });
      })
      .catch((error) => {
        // Login gagal
        console.log(error);
      });
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

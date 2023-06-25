import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      if (res.data.status === "OK") {
        await setMsg(res.data.messages);
        await navigate("/home");
      } else {
        setMsg(res.data.messages);
      }
    } catch (error) {
      // console.log(error);
      setMsg(error);
    }
  };

  useEffect(() => {
    if (msg !== null) {
      alert(msg);
    }
  }, [msg]);

  return (
    <div className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white rounded-5">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <Form onSubmit={login}>
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Kalau sudah punya akun bisa login di sini
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Masukin emailnya disini ya 🙂"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="passwrd"
                        className="form-control form-control-lg"
                        placeholder="Passwordnya juga dong 😅"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </Form>
                </div>

                <div>
                  <p className="mb-0">
                    Tapi kalo belum bisa daftar dulu ko{" "}
                    <Link to="/register" className="text-white-50 fw-bold">
                      Klik aja disini
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

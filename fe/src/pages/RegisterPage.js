import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const res = await axios.post("http://localhost:3000/users/register", {
          nama,
          nim,
          email,
          password,
        });
        if (res.data.status === "OK") {
          await setMsg(res.data.messages);
          await navigate("/login");
        } else {
          setMsg(res.data.messages);
        }
      } else {
        setMsg("password dan confirmPassword harus sama ya");
      }
    } catch (error) {
      console.log(error);
      // setMsg(error.response.messages);
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
                  <h2 className="fw-bold mb-5 text-uppercase">
                    Daftar Dulu Ya 🙂
                  </h2>
                  <Form onSubmit={register}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="nama"
                        className="form-control form-control-lg"
                        placeholder="Nama Kamu Siapa ?"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="nim"
                        className="form-control form-control-lg"
                        placeholder="Nim kamu berapa?"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="masukin email juga ya"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        placeholder="passwordnya disini"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control form-control-lg"
                        placeholder="passwordnya sekali lagi ya"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Daftar
                    </Button>
                  </Form>
                </div>
                <div>
                  <p className="mb-0">
                    Kalau udah punya akun bisa{" "}
                    <Link to="/login" className="text-white-50 fw-bold">
                      Login disini loh
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

export default RegisterPage;

import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password, } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email, password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login your account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-class">Submit</button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Login;
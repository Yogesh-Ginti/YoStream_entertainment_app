import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { setEmail, setPassword, setEmailError, resetForm } from '../../redux/sync/formInputSlice';
import { loginUser } from '../../redux/async/userAuth/authSlice';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selecting state from Redux store
  const { email, password, emailError } = useSelector((state) => state.formInput);
  const { user, error } = useSelector(state => state.auth);

  // Redirect to profile page if user is authenticated
  useEffect(() => {
    if (user !== null) {
      navigate("/profile");
    }
  }, [user]);

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Event handler for email input change
  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      dispatch(setEmailError('Invalid email address'));
    } else {
      // Dispatch login action if email is valid
      dispatch(loginUser({ email, password }));
      dispatch(resetForm());
    }
  };

  return (
    <div className="flex flex-col justify-center gap-6 items-center w-full h-full">
      {/* Logo and application name */}
      <div>
        <Logo />
        <h1 className="italic text-amber-500">YoStream</h1>
      </div>
      {/* Login form */}
      <div className="shadow-lg rounded-lg bg-gray-800 px-6 py-2 flex flex-col justify-between items-center">
        <h1 className="text-2xl font-medium my-4">Sign In</h1>
        <div>
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="flex flex-col m-2">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              <label htmlFor="email">Email</label>
              <input
                className="text-black outline-none p-1 rounded-md"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {/* Password input */}
            <div className="flex flex-col m-2">
              <label htmlFor="password">Password</label>
              <input
                className="text-black outline-none p-1 rounded-md"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {/* Submit button */}
            <div className="m-4 text-center">
              <button
                className="bg-red-500 font-semibold py-2 px-4 rounded-lg"
                type="submit"
              >
                Login
              </button>
            </div>
            {/* Link to SignUp page */}
            <p>Don't have an account? <span className="text-red-500"><Link to="/signup">SignUp</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

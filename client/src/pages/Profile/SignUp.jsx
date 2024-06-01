import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { setUsername, setEmail, setPassword, setRepassword, setEmailError, setRePasswordError, resetForm } from '../../redux/sync/formInputSlice';
import { signUpUser } from '../../redux/async/userAuth/authSlice';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { username, email, password, repassword, emailError, rePasswordError } = useSelector((state) => state.formInput);
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user !== null) {
      navigate("/profile")
    }
  }, [user])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };
  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleRepasswordChange = (e) => {
    dispatch(setRepassword(e.target.value));
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      dispatch(setEmailError('Invalid email address'))
    }
    if (password !== repassword) {
      dispatch(setEmailError(''))
      dispatch(setRePasswordError(`Password didn't Match`))
      return;
    }
    dispatch(signUpUser({ username, email, password }))
    dispatch(resetForm());
  };

  return (
    <div className='flex flex-col justify-center gap-6 items-center w-full h-full'>
      <div>
        <Logo />
        <h1 className='italic text-amber-500'>YoStream</h1>
      </div>
      <div className='shadow-lg rounded-lg bg-gray-800 px-6 py-2 flex flex-col justify-between items-center'>
        <h1 className='text-2xl font-medium my-4'>Sign Up</h1>
        <div>
          <form onSubmit={handleRegister}>
            <div className='flex flex-col m-2'>
              <label htmlFor="username">Username</label>
              <input
                className='text-black outline-none p-1 rounded-md'
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className='flex flex-col m-2'>
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              <label htmlFor="username">Email</label>
              <input
                className='text-black outline-none p-1 rounded-md'
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className='flex flex-col m-2'>
              <label htmlFor="password">Password</label>
              <input
                className='text-black outline-none p-1 rounded-md'
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className='flex flex-col m-2'>
              {rePasswordError && <p className="text-red-500 text-sm">{rePasswordError}</p>}
              <label htmlFor="repassword">Re Password</label>
              <input
                className='text-black outline-none p-1 rounded-md'
                type="password"
                name="repassword"
                id="repassword"
                value={repassword}
                onChange={handleRepasswordChange}
              />
            </div>
            <div className='m-4 text-center'>
              <button
                className="bg-red-500 font-semibold py-2 px-4 rounded-lg"
                type="submit"
              >
                Create An Account
              </button>
            </div>
            <p>Already have an account? <span className='text-red-500'><Link to="/login">Login</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

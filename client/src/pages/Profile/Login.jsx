import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { setEmail, setPassword,setEmailError, resetForm } from '../../redux/sync/formInputSlice';
import { loginUser } from '../../redux/async/userAuth/authSlice';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, emailError} = useSelector((state) => state.formInput);
  const {user} = useSelector(state=> state.auth)

  //after come user navigate to profile page
  useEffect(()=>{
    if(user!== null){
      navigate("/profile")
    }
  },[user])
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      dispatch(setEmailError('Invalid email address'));
    }else{
      dispatch(loginUser({ email, password }))
      dispatch(resetForm());
    }
    
  };

  return (
    <div className="flex flex-col justify-center gap-6 items-center w-full h-full">
      <div>
        <Logo />
        <h1 className="italic text-amber-500">YoStream</h1>
      </div>
      <div className="shadow-lg rounded-lg bg-gray-800 px-6 py-2 flex flex-col justify-between items-center">
        <h1 className="text-2xl font-medium my-4">Sign In</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2">
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
            <div className="m-4 text-center">
              <button
                className="bg-red-500 font-semibold py-2 px-4 rounded-lg"
                type="submit"
              >
                Login
              </button>
            </div>
            
            <p>Don't have an account? <span className="text-red-500"><Link to="/signup">SignUp</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

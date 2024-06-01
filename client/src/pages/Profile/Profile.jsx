import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { logoutUser } from '../../redux/async/userAuth/authSlice';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth)
  useEffect(()=>{
    if(user===null){
      navigate('/login')
    }
  },[user])
  return (
    <>
      {
        user &&
        <div className='h-full w- p-10 flex justify-center items-start'>
        <div className='flex gap-3 flex-col items-center'>
          <CgProfile size={60} />
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <div >
            <button
            className='bg-blue-600 px-6 py-2 rounded-lg'
            onClick={()=>dispatch(logoutUser())}
            >Logout <IoIosLogOut/></button>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default Profile

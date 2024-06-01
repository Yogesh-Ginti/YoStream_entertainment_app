import React from 'react'
import { useSelector } from 'react-redux';
import Logo from "./Logo"
import { SiTrendmicro } from "react-icons/si";
import { BiSolidCameraMovie } from "react-icons/bi";
import { PiTelevisionFill } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Header() {
  const {user} = useSelector(state => state.auth)
  return (
    <>
      {/* main container for header */}
      <div className='sm:h-full rounded-xl sm:p-4 flex sm:flex-col justify-evenly sm:justify-between items-center sm:bg-gray-800'>
        {/* container for menu and logo */}
        <div className='sm:h-[50%] flex sm:flex-col sm:justify-between items-center'>
          <div className='hidden sm:block'>
            <Logo />
          </div>
          {/* icon container */}
          <div className='flex sm:flex-col gap-8'>
            <Link to="/" ><SiTrendmicro size={30} /></Link>
            <Link to="/movies"><BiSolidCameraMovie size={30} /></Link>
            <Link to="/tvshows"><PiTelevisionFill size={30} /></Link>
            {(user===null)?<Link to="/login"><FaBookmark size={30} /></Link>:
            <Link to="/bookmarks"><FaBookmark size={30} /></Link>
            }
          </div>
        </div>
        {/* profile container */}
        <div>
          {(user!==null)?<Link to="/profile" className=''><CgProfile size={30} /></Link>:
          <Link to="/login" className=''><CgProfile size={30} /></Link>}
        </div>
      </div>
    </>
  )
}

export default Header

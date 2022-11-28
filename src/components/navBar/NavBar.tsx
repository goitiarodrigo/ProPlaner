import { useState } from 'react'
import styles from './NavBar.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from '@mui/material/Modal';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
   const userName = localStorage.getItem('name')
   const photo = localStorage.getItem('profilePhoto')

   const navigate = useNavigate()

   const [isOpenMenu, setIsOpenMenu] = useState(false)

   const handleOpenUserMenu = () => {
      setIsOpenMenu(!isOpenMenu)
   }

   const handleLogout = () => {
      localStorage.clear()
      setIsOpenMenu(false)
      navigate('/login')
   }

   return (
      <div className={styles.nav_container}>
         <img src="https://assets.website-files.com/629e16486a8d874a94433d97/62a2775d86e66a72feb0261e_proplanner-new.svg" alt="logo"/>
         <div className={styles.info_user}>
            <div role='profile-photo' style={{backgroundImage: `url(${photo})`}} className={styles.profile_photo} />
            <span role='open-menu' onClick={handleOpenUserMenu}>
               <KeyboardArrowDownIcon style={{color: 'white'}} />
            </span>
         </div>
         <Modal
            role='modal-menu'
            open={isOpenMenu}
            onClose={() => setIsOpenMenu(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <div className={styles.modal}>
               <span>Hi, {userName}</span>
               <span role='close-session' onClick={handleLogout}>
                  <p>Log out</p>
                  <ExitToAppIcon />
               </span>
            </div>
         </Modal>
      </div>
   )
}

export default NavBar
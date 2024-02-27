import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png';
import styles from '../styles/Username.module.css';

export default function Username () {
  return (
    <div className="container mx-auto">
      <div className='flex h-screen'>
        <div className={styles.glass}>
        <div className="title flex flex-col items-center justify-center">
            <h4 className='text-5xl font-bold'>Hello Again! </h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Please enter your username and password to continue.
            </span>
          </div>
          <form className='py-1'>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={styles.avatar_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input className={styles.textbox} type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button>
</div>
              <div className="text-center py-4">
                <span className='text-red-500'>Not a Member? <Link className='text-red-500' to="/register">Register Now</Link> </span>
              </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { UserAuth } from '../../contexts/AuthContext';
import { animate } from '../../styles';
import { BsGoogle } from 'react-icons/bs';

const inputStyle = `p-4 mb-6 rounded-md outline-none bg-white text-black ${animate}`;
const buttonStyle = `p-4 rounded-md text-xl font-semibold bg-secondary dark:bg-secondary-dark text-primary dark:text-primary-dark hover:bg-white dark:hover:bg-white ${animate}`;

const SignUp = ({ onClickToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser, googleSignIn } = UserAuth();

  async function handleSubmit(e) {
    e.preventDefault('');
    setError('');
    try {
      await createUser(email, password);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-semibold text-white'>Create Account</h1>
      <p className='py-2 mb-2'>
        Already have an account?{' '}
        <button onClick={onClickToggleForm} className='underline'>
          Sign In
        </button>
      </p>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col text-xl text-primary dark:text-primary-dark'
      >
        {/* Email */}
        <input
          placeholder='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
        />

        {/* Password */}
        <input
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className={inputStyle}
        />

        {/* Confirm Password */}
        <input
          placeholder='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputStyle}
        />

        {/* Sign Up Button */}
        <button type='submit' className={`mb-3 ${buttonStyle}`}>
          Sign Up
        </button>
      </form>

      {/* Google Signin */}
      <span className='text-white text-center pb-3'>or</span>
      <button
        onClick={handleGoogleSignIn}
        className={`flex justify-evenly items-center ${buttonStyle}`}
      >
        <BsGoogle className='w-[2rem] h-[2rem]' />
        Continue with Google
      </button>
    </div>
  );
};

export default SignUp;

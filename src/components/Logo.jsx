import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ width = '100px' }) {
  return (
    <Link to='/'>
    <div className='flex items-center'>
      <img src="EchoBlog.jpeg" alt="Logo" style={{ width : '50px', height: '50px' }} className='rounded-full'/>
      <span className='ml-2'>EchoBlog</span>
    </div>
    </Link>
  );
}

export default Logo;

import React from 'react';
import { Link } from 'react-router-dom';
import EchoBlogImage from './Blog.png';

function Logo({ width = '100px' }) {
  return (
    <Link to='/'>
    <div className='flex items-center'>
      <img src={EchoBlogImage} alt="Logo" style={{ width : '90px', height: '70px' }} className='rounded-full'/>
      <span className='ml-2'>EchoBlog</span>
    </div>
    </Link>
  );
}

export default Logo;
import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className='block'>
      <div 
        className='w-full bg-gray-100 rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105'
        style={{ overflow: 'hidden' }}
      >
        <div className='flex justify-center mb-4'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={`Featured image for ${title}`} 
            className='rounded-md' 
            style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', backgroundColor: '#f0f0f0' }} 
          />
        </div>
        <h2 className='text-lg font-semibold text-center text-gray-800'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard

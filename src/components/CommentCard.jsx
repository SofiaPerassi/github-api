import React from 'react'
import user from '../assets/user.png'

export default function CommentCard({comment}) {
  return (
    <div className='py-2'>
        <li className=''>
            <div className='flex'>
                <img src={user} alt="" className='w-6'/>
                <h3 className="text-indigo-400 text-base font-normal px-2">{comment.user.login}</h3>
            </div>
        <h3 className=" text-base font-normal tracking-wide text-slate-600 py-1"><strong>Content:</strong> {comment.body}</h3>
        <h3 className=" text-base font-normal tracking-wide text-slate-600"><strong>Date of creation:</strong> {comment.created_at.slice(0, -10)}</h3>
        </li>
    </div>
  )
}

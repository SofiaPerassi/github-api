import React from 'react'
import pullIcon from '../assets/pullRequestLogo.png';
import issueIcon from '../assets/issuesLogo.png';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router';

export default function Card({request}) {

    const {repo} = useParams();

    if(request){
        return (
            <div className="flex-col justify-center content-center place-content-around bg-white rounded-2xl h-full border shadow-md max-w-xs md:max-w-none overflow-hidden hover:scale-105">
            <Link to={`/detail/${repo.replace('/', '_')}/`  + request.number} >
            <div className='object-center'>
            { request.pull_request ? 
                <img className="object-center flex px-20 justify-center aspect-video w-100 h-auto object-cover rounded-t-2xl object-center" src={pullIcon} /> : 
                <img className="aspect-video w-100 rounded-t-2xl object-cover object-center" src={issueIcon}/>
            }
            </div>
            <div className="p-4 justify-center content-center ">
                { request.user.login ? 
                <small className="text-indigo-400 text-xs">{request.user.login}</small> :
                <small className="text-indigo-400 text-xs">No author Name</small>
                }
                { request.title ?
                <h1 className="text-xl font-bold text-slate-700 pb-2 text-center ">{request.title}</h1> :
                <h1 className="text-xl font-bold text-slate-700 pb-2">No Title</h1>
                }
                { request.created_at ? 
                <p className="text-sm tracking-tight font-normal text-slate-500 leading-6">
                Date of creation: {request.created_at.slice(0, -10)}
                </p>:
                <p className="text-sm tracking-tight font-normal text-slate-500 leading-6">
                Date of creation: 
                </p>
                }
                { request.comments ?
                <p className="text-sm tracking-tight font-normal text-slate-500 leading-6">
                Number of comments: {request.comments}
                </p> : 
                <p className="text-sm tracking-tight font-normal text-slate-500 leading-6">
                Number of comments: None
                </p>
                }
                { request.labels.length > 0 ?
                <ul className="text-sm tracking-tight font-normal text-slate-500 leading-6">
                    Labels: 
                {request.labels.map(label => {
                    return(
                        <li className='list-disc list-inside'>{label.name}</li>
                    )
                })}
                </ul> : 
                <p className="text-sm tracking-tight font-normal text-slate-500 leading-6">
                    No labels
                </p>
                }
            </div>
            </Link>
          </div>
          )
    }  
  
}

import React, {useEffect, useState} from 'react'
import Card from './Card'
import {Link, useParams} from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux'
import {getAll} from '../actions'
import axios from 'axios';

export default function List() {
  
  const dispatch = useDispatch();

  const {user, repo} = useParams();
  
  const [page, setPage] = useState(1);

  const all = useSelector((state) => state.all)

  useEffect(() => {
    dispatch(getAll(user, repo, page))
  }, [dispatch, user, repo, page])

  const pageNumbers = [];

  const [pageLimit, setPageLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const handleNext = () => {
    setPage(page + 1)
    if(page + 1 > maxPageLimit){
      setMaxPageLimit(maxPageLimit + pageLimit);
      setMinPageLimit(minPageLimit + pageLimit);
    }
  }

  const handlePrev = () => {
    setPage(page - 1)
    if(page > 1 && ((page - 1) % pageLimit === 0)){
      setMaxPageLimit(maxPageLimit - pageLimit);
      setMinPageLimit(minPageLimit - pageLimit);
    }
  }

  if(all){

    for(let i=1; i<=Math.ceil(all.total_count / 15); i++){
      pageNumbers.push(i);
    }

    const pagination = (totalPages) => {
      setPage(totalPages)
    }

    const renderPagination = pageNumbers.map(number => {
      if(number < maxPageLimit + 1 && number > minPageLimit){
        return (
          <button onClick={() => pagination(number)}
          className={page === number ? 
          "rounded-lg px-4 py-2 text-center transition duration-300 bg-indigo-400" : 
          "rounded-lg bg-indigo-500 px-4 py-2 text-center transition duration-300 hover:bg-indigo-400"}>
            {number}
          </button>
        )
      } else {
        return null
      }
    })

    return (
      <div className="h-auto w-screen bg-gradient-to-br from-pink-50 to-indigo-100 px-8 pt-8 pb-0">
        <h1 className="text-center font-bold text-2xl text-indigo-500 py-3">ISSUES AND PULL REQUESTS</h1>         
        <Link to='/' className="flex items-center w-16 rounded-lg bg-indigo-500 px-4 py-2 text-white text-center hover:scale-105">
          Back
        </Link>

        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10">
        {  all.items.map(request => (
          <Card 
          request={request}
          key={request.id}
          number={request.number}
          />  
        ))}

        </div>
        <div className="flex min-h-full items-center justify-center pb-10">
            <div className="flex select-none space-x-1 text-white">
              {(page === 1) ? 
                           <button className="rounded-lg bg-indigo-200 px-4 py-2text-center transition duration-300" disabled={true}>Previous</button> : 
                           <button className="rounded-lg bg-indigo-500 px-4 py-2 text-center transition duration-300 hover:bg-indigo-400"
              onClick={() => handlePrev()}
              >
                Previous
              </button>}
                {renderPagination}
              {(page === Math.ceil(all.total_count / 15)) ? 
              <button className="rounded-lg bg-indigo-200 px-4 py-2 text-center transition duration-300" disabled={true}>Next</button> : 
              <button className="rounded-lg bg-indigo-500 px-4 py-2 text-center transition duration-300 hover:bg-indigo-400"
              onClick={() => handleNext()}
              >
                Next
              </button>}
            </div>
        </div>
      </div>
    )
  } else {
    return(
      <div className='flex items-center'>
          <div className="p-32">
          <button type="button" className="flex items-center rounded-lg bg-indigo-500 px-4 py-2 text-white" disabled>
            <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium subpixel-antialiased">Processing...</span>
          </button>
          </div>
      </div>
    )
  }
  
}

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../actions';
import {Link} from 'react-router-dom'

export default function SearchBar() {
  
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [repo, setRepo] = useState('');

  function userInput(e) {
    e.preventDefault()
    setUser(e.target.value)
  }

  function repoInput(e) {
    e.preventDefault()
    setRepo(e.target.value)
  }

  const handleSubmit = (e) => {
    if(!user || !repo){
      e.preventDefault();
      alert('Complete the username and repository name')
    } else {
      e.preventDefault();
      setRepo('');
      setUser('');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-50 to-indigo-100 p-8">
      <form onSubmit={(e) => handleSubmit(e)} className="bg-white rounded-2xl border shadow-x1 p-10 max-w-lg">
        <div className="flex flex-col items-center space-y-4">
        <h3 className="font-bold text-xl text-gray-700 w-4/6 text-center">Enter the username and repository you want to search from</h3>
        <input type="text" placeholder="Username" onChange={userInput} className="border-2 rounded-lg w-full h-12 px-4"/>
        <input type="text" placeholder="Repository" onChange={repoInput} className="border-2 rounded-lg w-full h-12 px-4"/>
        {user && repo ? <Link to={`/list/${user}/${repo.replace('/', '_')}`}>
          <button type='submit'  className="bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 hover:scale-105 font-semibold px-4 py-3 w-50">
            Search
          </button>
          </Link> :
        <button type='submit' disabled={true} className="bg-indigo-200 text-white rounded-lg font-semibold px-4 py-3 w-50">Search</button>}
        </div>
      </form>
    </div>
  )
}

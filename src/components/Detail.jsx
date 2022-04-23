import {React, useEffect} from 'react';
import { useParams } from 'react-router';
import { getDetail, getComments } from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentCard from './CommentCard'

export default function Detail() {

  const {user, repo, number} = useParams();
  const dispatch = useDispatch();
  
  // async function data(){
  //   let json = await axios.get('https://api.github.com/repos/' + repo.replace('_', '/') + '/issues/' + number)
  //   const data = json.data
  //   return data
  // }

  // useEffect(() => {
  //   data()
  //   console.log(data)
  // });

  useEffect(() => {
    dispatch(getDetail(repo, number),
    dispatch(getComments(repo, number)))
  }, [dispatch, repo, number])

  const data = useSelector((state) => state.issue)
  const comments = useSelector(state => state.comments);

  if(data){
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-pink-50 to-indigo-100 p-8">
        { data.pull_request ?
        <h1 className="text-center font-bold text-2xl text-indigo-500 py-3">PULL REQUEST</h1> :
        <h1 className="text-center font-bold text-2xl text-indigo-500 py-3">ISSUE</h1>
        }
        
        <Link to={`/list/${user}/${repo.replace('/', '_')}`}
        className="pb-2 flex items-center w-16 rounded-lg bg-indigo-500 px-4 py-2 text-white text-center hover:scale-105">
          Back
        </Link>
  
        <div className='my-5 mx-10 bg-slate-100 overflow-y-scroll rounded-lg shadow-xl '>
        <div className='backdrop-blur-lg relative h-96 flex-row py-4'>
        <div className='px-4 mx-4 align-middle'>
          <h3 className="py-4 text-base font-normal tracking-wide text-slate-600">
          <strong className='text-lg'>Title:</strong> {data.title}
          </h3>
          <h3 className="text-base font-normal tracking-wide text-slate-600">
          <strong className='text-lg'>Description:</strong> {data.body}
          </h3>
          { comments ? 
            <h3 className="py-4 text-base text-slate-600">
            <ul>
            <strong className='text-lg'>Comment list:</strong>
              { comments.map(comment => {
                return(
                <CommentCard
                comment={comment}
                  />
                ) 
              })}
            </ul> 
          </h3> : 
          <h3>No comments</h3> }
        </div>
        </div>   
        </div>
        
        {/* <div className="flex items-end justify-center min-h-screen px-4 pt-4 text-center sm:block sm:p-0 w-3/4 ">
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
            <div className="inline-block h-fit w-3/4 overflow-hidden align-middle transition-all transform border-t border-l border-solid shadow-xl bg-gradient-to-b from-white-rgba to-white-rgba2 rounded-3xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-t-gray-200 border-l-gray-200">
              <div className="px-4 pt-5 pb-5 sm:p-6">
                <div className="sm:flex backdrop-filter backdrop-blur-lg">
                    <div className="mt-16 pt-14">
                      <h3 className=" pb-4 text-2xl font-normal tracking-widest text-white bottom-20">
                        Title: {data.title}
                      </h3>
                      <h3 className=" pb-4 text-xl font-normal tracking-widest text-white bottom-8">
                        Description: {data.body}
                      </h3>

                      { comments ? 
                        <h3 className=" bottom-0 pt-6 pb-2 text-xl font-normal tracking-widest text-white">
                        <ul>
                          Comment list:
                          { comments.map(comment => {
                            return(
                            <CommentCard
                            comment={comment}
                             />
                            ) 
                          })}
                        </ul> 
                      </h3> : 
                      <h3>No comments</h3> }
                    </div>
                </div>
              </div>
            </div>
        </div> */}
      </div>
    )
  }
}

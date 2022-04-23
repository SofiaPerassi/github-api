import axios from 'axios';

export function getAll(user, repo, page = 1){
    return async function(dispatch){
        const queryString = 'q=' + encodeURIComponent(`author:${user} repo:${repo.replace('_', '/')}`);
        const pagination = `&page=${page}&per_page=15`
        let json = await axios.get('https://api.github.com/search/issues?' + queryString + pagination)
        const data = json.data
        return dispatch({
            type: 'GET_ALL',
            payload: data
        })
    }
}

//https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/45623
export function getDetail(repo, number){
    return async function(dispatch){
        let json = await axios.get('https://api.github.com/repos/' + repo.replace('_', '/') + '/issues/' + number)
        const data = json.data
        return dispatch({
            type: 'GET_DETAIL',
            payload: data
        })
    }
}

//https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/45623/comments
export function getComments(repo, number){
    return async function(dispatch){
        let json = await axios.get('https://api.github.com/repos/' + repo.replace('_', '/') + '/issues/' + number  + '/comments')
        const data = json.data
        return dispatch({
            type: 'GET_COMMENTS',
            payload: data
        })
    }
}


export const GET_ALL = 'GET_ALL';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_COMMENTS = 'GET_COMMENTS';
import instance from "../../config/axios"

const initialState = {
    Bookmarks: [],
    Bookmark: {}
}

export default function jobBookmarkReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOOKMARKS':
            return { ...state, Bookmarks: action.payload }
        case 'SET_BOOKMARK':
            return { ...state, Bookmark: action.payload }
        default:
            return state
    }
}

export function fetchBookmarks(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/bookmark', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_BOOKMARKS', payload: data })
    }
}

export function fetchBookmark(token, jobId) {
    return async (dispatch) => {
        const { data } = await instance.get(`/bookmark/marked/${jobId}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_BOOKMARK', payload: data })
    }
}

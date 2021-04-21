import instance from "../../config/axios"

const initialState = {
    BookmarkJobseekers: [],
    BookmarkJobseeker: {}
}

export default function applicantReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOOKMARK_JOBSEEKERS':
            return { ...state, BookmarkJobseekers: action.payload }
        case 'SET_BOOKMARK_JOBSEEKER':
            return { ...state, BookmarkJobseeker: action.payload }
        default:
            return state
    }
}

export function fetchBookmarkJobseekers(token) {
    return async (dispatch) => {
        const { data } = await instance.get('/bookmark-jobseeker', {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_BOOKMARK_JOBSEEKERS', payload: data })
    }
}

export function fetchBookmarkJobseekerById(token, jobseekerId) {
    return async (dispatch) => {
        const { data } = await instance.get(`/bookmark-jobseeker/${jobseekerId}`, {
            headers: {
                access_token: token
            }
        })
        dispatch({ type: 'SET_BOOKMARK_JOBSEEKER', payload: data })
    }
}

import instance from "../../config/axios"

const initialState = {
  WorkExperinces: [],
  WorkExperince: {}
}

export default function WorkExperince(state = initialState, action) {
  switch (action.type) {
    case 'SET_WORK_EXPERIENCES':
      return { ...state, WorkExperinces: action.payload }
    case 'SET_WORK_EXPERIENCE':
      return { ...state, WorkExperince: action.payload }
    case 'ADD_EXPERIENCE':
      const newExperience = state.WorkExperinces.concat(action.payload)
      return { ...state, WorkExperinces: newExperience }
    default:
      return state
  }
}


export function fetchWorkExperiences(token) {
  return async (dispatch) => {
    const { data } = await instance.get(`/user/fulltime/experience`, {
      headers: {
        access_token: token
      }
    })
    dispatch({ type: 'SET_WORK_EXPERIENCES', payload: data })
  }
}

export function fetchWorkExperience(token, id) {
  return async (dispatch) => {
    const { data } = await instance.get(`/user/fulltime/experience/${id}`, {
      headers: {
        access_token: token
      }
    })
    dispatch({ type: 'SET_WORK_EXPERIENCE', payload: data })
  }
}

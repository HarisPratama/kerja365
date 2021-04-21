import instance from "../../config/axios"

const intialState = {
  Educations: [],
  Education: {}
}

export default function educationReducer(state = intialState, action) {
  switch (action.type) {
    case 'SET_EDUCATIONS':
      return { ...state, Educations: action.payload }
    case 'SET_EDUCATION':
      return { ...state, Education: action.payload }
    case 'ADD_EDUCATION':
      const newEducation = state.Educations.concat(action.payload)
      return { ...state, Educations: newEducation }

    default:
      return state
  }
}

export function fetchEducations(token) {
  return async (dispatch) => {
    const { data } = await instance.get(`/user/fulltime/education`, {
      headers: {
        access_token: token
      }
    })
    dispatch({ type: 'SET_EDUCATIONS', payload: data })
  }
}

export function fetchEducation(token, id) {
  return async (dispatch) => {
    const { data } = await instance.get(`/user/fulltime/education/${id}`, {
      headers: {
        access_token: token
      }
    })
    dispatch({ type: 'SET_EDUCATION', payload: data })
  }
}

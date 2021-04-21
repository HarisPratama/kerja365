import database from '@react-native-firebase/database'
import instance from '../../config/axios'

const initialState = {
    Messages: [],
    Notifications: []
}

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MESSAGES':
            return { ...state, Messages: action.payload }
        case 'SET_NOTIFICATIONS':
            return { ...state, Notifications: action.payload }
        default:
            return state
    }
}


export function fetchMessages(id, token) {
    return (dispatch) => {
        database().ref()
        const rootDB = database().ref()
        const urlHistory = `messages/${id}/`
        const messageDB = rootDB.child(urlHistory)

        messageDB.on('value', async snapshot => {
            if (snapshot.val()) {
                const oldHistory = snapshot.val()
                const newHistory = []

                const promise = await Object.keys(oldHistory).map(async key => {
                    const { data } = await instance.get(`/user/${oldHistory[key].uidPartner}`, {
                        headers: {
                            access_token: token
                        }
                    })
                    newHistory.push({
                        id: key,
                        partner: data,
                        ...oldHistory[key]
                    })
                })
                await Promise.all(promise)
                dispatch({ type: 'SET_MESSAGES', payload: newHistory })
            }
        })
    }
}

export function fetchNotifications(id) {
    return (dispatch) => {
        const rootDB = database().ref()
        const urlHistory = `notifications/${id}/`
        const notificationDB = rootDB.child(urlHistory)

        notificationDB.on('value', async snapshot => {
            if (snapshot.val()) {
                const getNotif = snapshot.val()
                const notifications = []
                Object.keys(getNotif).map(key => notifications.push({ id: key, title: getNotif[key].title }))
                dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications })
            }
        })
    }
}

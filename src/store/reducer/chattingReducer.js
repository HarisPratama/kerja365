import database from '@react-native-firebase/database';

const initialState = {
    Chats: []
}


export default function chattingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CHATS':
            return { ...state, Chats: action.payload }
        default:
            return state
    }
}


export function fetchChatting(userOne, userTwo) {
    return (dispatch) => {
        database().ref(`/chatting/${userOne}_${userTwo}/allChat`).on('value', (snapshot) => {
            if (snapshot.val()) {
                const dataSnapshot = snapshot.val()
                const allDataChat = []
                Object.keys(dataSnapshot).map(key => {
                    const dataChat = dataSnapshot[key]
                    const newChat = []
                    Object.keys(dataChat).map(itemChat => {
                        newChat.push({
                            id: itemChat,
                            data: dataChat[itemChat]
                        })
                    })
                    allDataChat.push({
                        id: key,
                        data: newChat
                    })
                })
                dispatch({ type: 'SET_CHATS', payload: allDataChat })
            }
        })
    }
}

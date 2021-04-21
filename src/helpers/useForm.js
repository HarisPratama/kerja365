import { useState } from 'react';
const useForm = (initialState) => {
    const [state, setState] = useState(initialState);
    return [state, (formType, value) => {
        if (formType === 'reset') {
            return setState(initialState);
        }
        return setState({...state, [formType]: value})
    }]
}

export default useForm

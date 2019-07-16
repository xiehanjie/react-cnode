import { TOPICS } from '../actions/topics'

const defaultState = {
    data: []
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case TOPICS: {
            return {
                ...state,
                ...action
            }
        }   
        default: {
            return state
        }
    }
}
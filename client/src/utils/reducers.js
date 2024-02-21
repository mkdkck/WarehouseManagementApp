import { UPDATE_PRODUCTS } from './actions'

export default function reducer(state, action) {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                user: action.payload,
            }

        default:
            return state;
    }
}
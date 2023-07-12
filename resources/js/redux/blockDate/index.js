import { types } from "./types";

export const initialState = {
    data: {
        dates: [],
        times: []
    },
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_BLOCK_DATES}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_BLOCK_DATES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: {
                    dates: [],
                    times: []
                },
            };

        case `${types.FETCH_BLOCK_DATES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };

        default:
            return state
    }
}
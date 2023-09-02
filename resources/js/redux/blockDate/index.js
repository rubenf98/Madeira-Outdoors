import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: [],
    selector: [],
    meta: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_BLOCK_DATES}_PENDING`:
        case `${types.DELETE_BLOCK_DATE}_PENDING`:
        case `${types.CREATE_BLOCK_DATE}_PENDING`:
        case `${types.FETCH_BLOCK_DATES_SELECTOR}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_BLOCK_DATES_SELECTOR}_PENDING`:
            return {
                ...state,
                loading: false,
                data: [],
                meta: {}
            };

        case `${types.FETCH_BLOCK_DATES}_REJECTED`:
        case `${types.DELETE_BLOCK_DATE}_REJECTED`:
        case `${types.CREATE_BLOCK_DATE}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: [],
                meta: {}
            };

        case `${types.CREATE_BLOCK_DATE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.DELETE_BLOCK_DATE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.FETCH_BLOCK_DATES_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data,
            };

        case `${types.FETCH_BLOCK_DATES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        default:
            return state
    }
}
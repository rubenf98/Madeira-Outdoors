import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_ACTIVITY}_PENDING`:
        case `${types.UPDATE_ACTIVITY}_PENDING`:
        case `${types.FETCH_ACTIVITIES}_PENDING`:
        case `${types.FETCH_ACTIVITY}_PENDING`:
        case `${types.CREATE_ACTIVITY}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.CREATE_ACTIVITY}_REJECTED`:
        case `${types.UPDATE_ACTIVITY}_REJECTED`:
        case `${types.DELETE_ACTIVITY}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_ACTIVITY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_ACTIVITY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_ACTIVITY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                )
            };

        case `${types.FETCH_ACTIVITY}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };
        case `${types.FETCH_ACTIVITIES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: [],
                meta: {}
            };
        case `${types.FETCH_ACTIVITY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_ACTIVITIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_ACTIVITY}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}
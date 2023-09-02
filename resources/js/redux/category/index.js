import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: {},
    selector: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_CATEGORY}_PENDING`:
        case `${types.UPDATE_CATEGORY}_PENDING`:
        case `${types.FETCH_CATEGORIES}_PENDING`:
        case `${types.FETCH_CATEGORY}_PENDING`:
        case `${types.CREATE_CATEGORY}_PENDING`:
        case `${types.FETCH_CATEGORY_SELECTOR}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.CREATE_CATEGORY}_REJECTED`:
        case `${types.UPDATE_CATEGORY}_REJECTED`:
        case `${types.DELETE_CATEGORY}_REJECTED`:
        case `${types.FETCH_CATEGORY_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.FETCH_CATEGORY_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.UPDATE_CATEGORY}_FULFILLED`:
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

        case `${types.FETCH_CATEGORY}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };
        case `${types.FETCH_CATEGORIES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };
        case `${types.FETCH_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_CATEGORIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
            };

        case `${types.SET_CURRENT_CATEGORY}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}
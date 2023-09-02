import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

export const fetchBlockDates = (filters = {}) => ({
    type: types.FETCH_BLOCK_DATES,
    payload: axios.get(`${window.location.origin}/api/blocked-dates?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchBlockDateSelector = () => ({
    type: types.FETCH_BLOCK_DATES_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/blocked-dates`)
})

export const deleteBlockDate = id => ({
    type: types.DELETE_BLOCK_DATE,
    payload: axios.delete(`${window.location.origin}/api/blocked-dates/${id}`),
    meta: { id }
});

export const createBlockDate = (data) => ({
    type: types.CREATE_BLOCK_DATE,
    payload: axios.post(`${window.location.origin}/api/blocked-dates`, data),
});
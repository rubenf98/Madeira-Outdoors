import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

export const fetchBlockDates = (filters = {}) => ({
    type: types.FETCH_BLOCK_DATES,
    payload: axios.get(`${window.location.origin}/api/blocked-dates?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
})

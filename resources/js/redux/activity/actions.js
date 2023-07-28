import queryString from "query-string";
import { types } from "./types";
import axios from "axios";

export const fetchActivities = (filters) => ({
    type: types.FETCH_ACTIVITIES,
    payload: axios.get(`${window.location.origin}/api/activities?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchActivity = (id) => ({
    type: types.FETCH_ACTIVITY,
    payload: axios.get(`${window.location.origin}/api/activities/${id}`)
})

export const deleteActivity = id => ({
    type: types.DELETE_ACTIVITY,
    payload: axios.delete(`${window.location.origin}/api/activities/${id}`),
    meta: { id }
});

export const updateActivity = (id, data) => ({
    type: types.UPDATE_ACTIVITY,
    payload: axios.put(`${window.location.origin}/api/activities/${id}`, data),
});

export const createActivity = (data) => ({
    type: types.CREATE_ACTIVITY,
    payload: axios.post(`${window.location.origin}/api/activities`, data),
});


export const setCurrentActivity = (data = []) => ({
    type: types.SET_CURRENT_ACTIVITY,
    payload: data,
});
import { types } from "./types";
import axios from "axios";
import queryString from "query-string";

export const fetchCategories = () => ({
    type: types.FETCH_CATEGORIES,
    payload: axios.get(`${window.location.origin}/api/categories`)
})

export const fetchCategorySelector = (filters = {}) => ({
    type: types.FETCH_CATEGORY_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/categories?${queryString.stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchCategory = (id) => ({
    type: types.FETCH_CATEGORY,
    payload: axios.get(`${window.location.origin}/api/categories/${id}`)
})

export const deleteCategory = id => ({
    type: types.DELETE_CATEGORY,
    payload: axios.delete(`${window.location.origin}/api/categories/${id}`),
    meta: { id }
});

export const updateCategory = (id, data) => ({
    type: types.UPDATE_CATEGORY,
    payload: axios.put(`${window.location.origin}/api/categories/${id}`, data),
});

export const createCategory = (data) => ({
    type: types.CREATE_CATEGORY,
    payload: axios.post(`${window.location.origin}/api/categories`, data),
});


export const setCurrentCategory = (data = []) => ({
    type: types.SET_CURRENT_CATEGORY,
    payload: data,
});
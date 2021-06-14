import {
    ADD_LIST,
    GET_LIST,
    ADD_LIST_LOCAL,
    UPDATE_ITEM,
    DELETE_ITEM,
    UPDATE_LIST_ITEM
} from './types'

import AsyncStorage from '@react-native-community/async-storage'


export const updateList = (payload) => {
    return (dispatch) => {
       dispatch({  type: ADD_LIST, payload })
    }
}

export const getList = () => {
    return async (dispatch) => {
        let data = await AsyncStorage.getItem(ADD_LIST_LOCAL)
        if (data) {
            dispatch({  type: GET_LIST, payload: JSON.parse(data) })
        }
            
    }
}

export const deleteItem = (payload) => {
    return (dispatch) => {
       dispatch({  type: DELETE_ITEM, payload})
    }
}



export const updateItem = (payload) => {
    return (dispatch) => {
       dispatch({  type: UPDATE_ITEM, payload})
    }
}


export const updateListItem = (payload) => {
    return (dispatch) => {
       dispatch({  type: UPDATE_LIST_ITEM, payload})
    }
}
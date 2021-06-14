import {
    GET_LIST,
    ADD_LIST,
    UPDATE_ITEM,
    DELETE_ITEM,
    ADD_LIST_LOCAL,
    UPDATE_LIST_ITEM
  } from '../actions/types';
  import AsyncStorage from '@react-native-community/async-storage'
  
  const INITIAL_STATE = {
    list: [],
    updateItems: [],
    id: 0
  };
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_LIST:
        return {
          ...state,
          list: action.payload,
        };
  
      case ADD_LIST:
        const obj = action.payload;
        let arr = state.list.slice()

        arr.push(obj)
        AsyncStorage.setItem(ADD_LIST_LOCAL, JSON.stringify(arr))

        return {
            ...state,
            list: arr,
        };
  
      case UPDATE_ITEM:
        const updated = action.payload;
        let array = state.list.slice()
        const elementsIndex = array.findIndex(x => x.id == updated.id);
        var finalArray = array[elementsIndex]

        return {
            ...state,
            updateItem: finalArray
        }
  
      case DELETE_ITEM:
        let itemToBeDelete = action.payload;
        let deleteArray = state.list.slice();

        let index = deleteArray.findIndex(x => x.id == itemToBeDelete.id);

        deleteArray.splice(index, 1);

        AsyncStorage.clear();
        AsyncStorage.setItem(ADD_LIST_LOCAL, JSON.stringify(deleteArray))

        return {
            ...state,
            list: deleteArray
        }
      
      case UPDATE_LIST_ITEM:
        const updateListItem=action.payload;
        let updateItemListArray = state.list.slice();

        const updateListIndex = updateItemListArray.findIndex(x => x.id == updateListItem.id);

        updateItemListArray[updateListIndex].id=updateListItem.id;
        updateItemListArray[updateListIndex].title=updateListItem.title;
        updateItemListArray[updateListIndex].description=updateListItem.description;
        updateItemListArray[updateListIndex].date=updateListItem.date;
        updateItemListArray[updateListIndex].time=updateListItem.time;

        AsyncStorage.clear();
        AsyncStorage.setItem(ADD_LIST_LOCAL, JSON.stringify(updateItemListArray))

        return {
            ...state,
            list: updateItemListArray
        }
  
      default:
        return state;
    }
  };
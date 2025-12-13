import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

let tasksSlice = createSlice({
  name: "tasks-slice",
  initialState: {
    data: [],
    filteredData: [],
    item: {},
    status: "All",
    category: "All",
  },
  reducers: {
    create(state, action) {
      //   state.data = [action.payload, ...state.data];
      //   state.data.unshift(action.payload);
      state.data.push(action.payload);
      state.filteredData = state.data;
    },
    read(state, action) {
      state.data = action.payload;
      state.filteredData = state.data;
    },
    update(state, action) {
      let index = state.data.findIndex(
        (element) => element.id == action.payload.id
      );
      state.data[index] = action.payload;
      state.filteredData = state.data;
      state.item = action.payload;
    },
    delete(state, action) {
      let filteredData = state.data.filter(
        (element) => element.id != action.payload
      );
      state.data = filteredData;
    },
    //....filter!
    filterByCategory(state, action) {
      state.category = action.payload;
      if (action.payload == "All") {
        //Reset filteredData array from original data array
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(
          (element) => element.categoryId == action.payload
        );
      }
    },
    filterBySearch(state, action) {
      if (action.payload != "") {
        state.filteredData = state.data.filter((element) =>
          element.name.includes(action.payload)
        );
      } else {
        //Reset filteredData array from original data array
        state.filteredData = state.data;
      }
    },
    filterByStatus(state, action) {
      state.status = action.payload;
      if (action.payload != "All") {
        state.filteredData = state.data.filter(
          (element) => element.status == action.payload
        );
      } else {
        //Reset filteredData array from original data array
        state.filteredData = state.data;
      }
    },
    setItem(state, action) {
      state.item = action.payload;
    },
    updateStatus(state, action) {
      let index = state.data.findIndex(
        (element) => element.id == action.payload.id
      );
      state.data[index] = action.payload;
      state.filteredData = state.data;
      state.item = action.payload;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;

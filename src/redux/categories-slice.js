import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

//CRUD - Create, Read, Update, Delete
let categoriesSlice = createSlice({
  name: "categories-slice",
  initialState: { data: [], category: {} },
  reducers: {
    create(state, action) {
      state.data.push(action.payload);
    },
    read(state, action) {
      state.data = action.payload;
    },
    edit(state, action) {
      state.category = state.data.find(
        (element) => element.id == action.payload
      );
    },
    update(state, action) {
      // alert(action.payload.category.id);
      let index = state.data.findIndex(
        (element) => element.id == action.payload.category.id
      );
      state.data[index] = action.payload.category;
    },
    delete(state, action) {
      let filteredData = state.data.filter(
        (element) => element.id != action.payload
      );
      state.data = filteredData;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;

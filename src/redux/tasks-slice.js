import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filteredData: [],
  item: {},
  status: "All",
  category: "All",
  searchTerm: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    create(state, action) {
      state.data.push(action.payload);
      state.filteredData = applyFilters(state);
    },
    read(state, action) {
      state.data = action.payload;
      state.filteredData = applyFilters(state);
    },
    update(state, action) {
      const index = state.data.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.data[index] = action.payload;
      state.item = action.payload;
      state.filteredData = applyFilters(state);
    },
    delete(state, action) {
      state.data = state.data.filter((task) => task.id !== action.payload);
      state.filteredData = applyFilters(state);
    },
    setItem(state, action) {
      state.item = action.payload;
    },
    filterBySearch(state, action) {
      state.searchTerm = action.payload;
      state.filteredData = applyFilters(state);
    },
    filterByStatus(state, action) {
      state.status = action.payload;
      state.filteredData = applyFilters(state);
    },
    filterByCategory(state, action) {
      state.category = action.payload;
      state.filteredData = applyFilters(state);
    },
  },
});

function applyFilters(state) {
  return state.data.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(state.searchTerm.toLowerCase());
    const matchesStatus =
      state.status === "All" || task.status === state.status;
    const matchesCategory =
      state.category === "All" || task.categoryId === state.category;
    return matchesSearch && matchesStatus && matchesCategory;
  });
}

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;

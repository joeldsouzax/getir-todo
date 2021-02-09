import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Visibility } from "../types";

const filters = createSlice({
  name: "filters",
  initialState: "all" as Visibility,
  reducers: {
    setVisibility: (state, action: PayloadAction<Visibility>) => {
      return action.payload;
    },
  },
});

const filtersReducer = filters.reducer;
export const { setVisibility } = filters.actions;
export default filtersReducer;

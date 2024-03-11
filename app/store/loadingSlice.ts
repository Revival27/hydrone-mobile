import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,

  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

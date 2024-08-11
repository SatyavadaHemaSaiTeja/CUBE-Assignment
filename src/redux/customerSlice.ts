import { createSlice } from '@reduxjs/toolkit';
import { Customer } from '../services/api';

interface CustomerState {
  customers: Customer[];
}

const initialState: CustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;

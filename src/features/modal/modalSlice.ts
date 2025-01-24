import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface ModalState {
  isOpen: boolean;
  formType: 'login' | 'register';
}

// Define the initial state using that type
const initialState: ModalState = {
  isOpen: false,
  formType: 'login',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.formType = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formType = 'login';
    },
  },
});

export default modalSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal.isOpen;
export const selectModalFormType = (state: RootState) => state.modal.formType;

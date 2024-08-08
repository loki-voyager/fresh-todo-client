import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/UserTypes/UserTypes";

interface UserStoreInterface {
  data: UserType | null;
}

const initialState: UserStoreInterface = {
  data: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SaveUser: (state, action: PayloadAction<UserType>) => {
      state.data = action.payload;
    },
    DeleteUser: (state) => {
      state = initialState;
    },
  },
});

const UserReducer = UserSlice.reducer;

export const { SaveUser, DeleteUser } = UserSlice.actions;

export { UserReducer };

import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
    isLoggedIn: false,
    onboardingShown: false,
    userId: '',
    accessToken: '',
    profileImageUrl: '',
    userData: {},
    walletBalance: 0,
  },
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      state.isAuthorized = true;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setProfileImageUrl: (state, action) => {
      state.profileImageUrl = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
    authorizedLogin: state => {
      state.isLoggedIn = true;
    },
    authorizedSignUp: (state, action) => {
      state.isAuthorized = true;
      state.accessToken = action.payload;
    },
    logout: state => {
      state.isAuthorized = false;
      state.isLoggedIn = false;
      state.accessToken = '';
      state.userData = {};
      state.profileImageUrl = '';
      state.userId = '';
    },
    setOnbaordingShown: state => {
      state.onboardingShown = true;
    },
  },
});

export const {
  login,
  setUserData,
  setProfileImageUrl,
  authorizedLogin,
  authorizedSignUp,
  setAccessToken,
  logout,
  setOnbaordingShown,
  setUserId,
  setWalletBalance
} = authSlice.actions;
export default authSlice.reducer;

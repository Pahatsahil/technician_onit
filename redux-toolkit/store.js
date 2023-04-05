import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        "isAuthorized",
        "isLoggedIn",
        "onboardingShown",
        "userId",
        "accessToken",
        "profileImageUrl",
        "userData",
        "walletBlanace"
    ]
};
export const store = configureStore({
    reducer: {
        auth: persistReducer(persistConfig, authReducer),
    },
    middleware: [thunk]
})

export const persistor = persistStore(store);
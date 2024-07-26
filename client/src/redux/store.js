import { configureStore , combineReducers} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';

// Combine reducers if you have more reducers in the future
const rootReducer = combineReducers({
    user: userReducer,
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

// Create persistor
export const persistor = persistStore(store);

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { loginReducer, permissionUserReducer, roleReducer } from '@shared/components/auth/login/store-slice/login.slice';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  role: roleReducer,
  user: loginReducer,
  permission: permissionUserReducer,
});


const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


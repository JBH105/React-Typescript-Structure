import { ApiService } from '@core/helpers/base-api/api.service';
import { generateApiReducers } from '@core/helpers/base-api/reducer-helper';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiEndpoint } from '@shared/constant/app-endpoint';
import { APP_SLICE_NAME } from '@shared/constant/app-slice';
import { buildInitialState, IMasterState } from '@shared/interfaces/IMasterState';
import { AbstractActionService } from '@store/abstract-action.service';

import { ILogin, ILoginState, IRole, IUserPermission } from '../interfaces/IAuth';
import { localStorageService } from '@core/helpers/base-api/service/localStorageServices';

const permissionService = new ApiService<IUserPermission>(ApiEndpoint.permission);
const permissionState: IMasterState<IUserPermission> = buildInitialState<IUserPermission>();

export const USER_ACTION = {
  PERMISSION: 'user/permission'
} as const;
export const { fetchByIdAction: fetchUserPermission } = AbstractActionService<IUserPermission>(
  USER_ACTION.PERMISSION,
  permissionService,
  false
);

const permissionSlice = createSlice({
  name: APP_SLICE_NAME.permission,
  initialState: permissionState,
  reducers: {},
  extraReducers: (builder) => {
    generateApiReducers<IMasterState<IUserPermission>, IUserPermission>(builder, [fetchUserPermission]);
  }
});

// Role Slice
const roleService = new ApiService<IRole>(ApiEndpoint.role);
const roleInitialState: IMasterState<IRole> = buildInitialState<IRole>();

export const ROLE_ACTION = {
  LOAD_LOGIN: 'role/fetchRole'
} as const;

export const { fetchAction: fetchRole } = AbstractActionService<IRole>(ROLE_ACTION.LOAD_LOGIN, roleService);

const roleSlice = createSlice({
  name: APP_SLICE_NAME.role,
  initialState: roleInitialState,
  reducers: {},
  extraReducers: (builder) => {
    generateApiReducers<IMasterState<IRole>, IRole>(builder, [fetchRole]);
  }
});

// Login Slice
const authService = new ApiService<ILogin>(ApiEndpoint.auth);

const loginInitialState: ILoginState = {
  data: null,
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk('user/login', async (loginData: ILogin, thunkAPI) => {
  try {
    const response = await authService.create(loginData);
    localStorage.setItem('token', response.token);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const loginSlice = createSlice({
  name: APP_SLICE_NAME.user,
  initialState: loginInitialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      // localStorage.removeItem('token');
      localStorageService.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = loginSlice.actions;
export const roleReducer = roleSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const permissionUserReducer = permissionSlice.reducer;

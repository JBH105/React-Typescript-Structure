import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from './types/api-response';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const generateApiReducers = <T, U>(
  builder: ActionReducerMapBuilder<T>,
  actions: AsyncThunk<any, any, any>[],
  dataStates?: (keyof T)[]
) => {
  const defaultDataStates: (keyof T)[] = ['data' as keyof T];
  actions.forEach((_, index) => {
    const currentStateKey = dataStates?.[index] || defaultDataStates[index];
    builder
      .addMatcher(
        (action) => action.type === actions[index].pending.type,
        (state) => {
          return { ...state, loading: true, error: null, isSuccess: false };
        }
      )
      .addMatcher(
        (action) => action.type === actions[index].fulfilled.type,
        (state, action: { payload: ApiResponse<U> }) => {
          const payload = action.payload as ApiResponse<U>;
          const updatedState = { ...state, [currentStateKey]: payload, loading: false, error: null, isSuccess: true };
          return updatedState;
        }
      )
      .addMatcher(
        (action) => action.type === actions[index].rejected.type,
        (state, action: { payload: ApiResponse<U>; error: { message: string } }) => {
          return { ...state, loading: true, error: action?.error?.message, isSuccess: false };
        }
      );
  });
};

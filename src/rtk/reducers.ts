/**
 * Application reducers
 * Combine all reducers in this file and export the combined reducers.
 *
 * @module Reducer
 * @category Utils
 *
 */

import { combineReducers } from '@reduxjs/toolkit';

import api from '@/rtk/apiSlice';

import ArticleReducer, { KEY as KEY_ARTICLE } from '@/rtk/article/slice';

export const AppReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [KEY_ARTICLE]: ArticleReducer,
});

export type RootState = ReturnType<typeof AppReducer>;
export default AppReducer;

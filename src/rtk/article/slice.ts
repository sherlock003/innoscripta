/**
 * @module ArticleSlice
 * @category RTK Reducers
 *
 */

import { createSlice } from '@reduxjs/toolkit';

import { ArticleSource } from '@/enums/article.enums';
import type { RootState } from '@/rtk/reducers';
import type { PayloadAction } from '@reduxjs/toolkit';

type State = {
  source: ArticleSource;
};

export const KEY = 'Article';

export const initialState: State = {
  source: ArticleSource.NEWSAPI,
};

const slice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    updateSource: (state: State, action: PayloadAction<ArticleSource>) => ({
      ...state,
      source: action.payload,
    }),
  },
});

export const { updateSource } = slice.actions;
export const selectSourceState = (state: RootState) => state[KEY].source;
export const { reducer } = slice;
export default slice.reducer;

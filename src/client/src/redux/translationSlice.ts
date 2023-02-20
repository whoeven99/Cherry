import { createAsyncThunk, createEntityAdapter, createSlice, type EntityState } from '@reduxjs/toolkit';
import { type TextResponse, translateAsync } from '../app/api';
import { type RootState } from '../app/store';

interface TranslatedLanguage {
  id: string
  translated: string
  loading: boolean
}

interface TranslationSliceState {
  translatedLanguages: EntityState<TranslatedLanguage>
}

const translationAdapter = createEntityAdapter<TranslatedLanguage>();

const initialState: TranslationSliceState = {
  translatedLanguages: translationAdapter.getInitialState()
};

export const translate = createAsyncThunk<TextResponse, { langId: string }, { state: RootState }>(
  'translation/translate',
  async ({ langId }, { getState }) => {
    const rephrasedText = getState().common.rephrasedText;
    return await translateAsync(langId, rephrasedText);
  }
);

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(translate.pending, (state, action) => {
        const { langId } = action.meta.arg;
        translationAdapter.upsertOne(state.translatedLanguages, {
          id: langId,
          loading: true,
          translated: ''
        });
      })
      .addCase(translate.fulfilled, (state, action) => {
        const { langId } = action.meta.arg;
        translationAdapter.upsertOne(state.translatedLanguages, {
          id: langId,
          loading: false,
          translated: action.payload.text
        });
      });
  }
});

export const {
  selectById: selectTranslatedLanguageById
} = translationAdapter.getSelectors<RootState>(state => state.translation.translatedLanguages);

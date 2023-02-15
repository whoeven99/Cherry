import { createEntityAdapter, createSlice, type EntityState, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../app/store';

interface TranslationEntry {
  id: string
  items: Record<string, string>
}

interface LanguageState {
  sourceLanguageId: string
  translations: EntityState<TranslationEntry>
}

const translationsAdapter = createEntityAdapter<TranslationEntry>();

const initialState: LanguageState = {
  sourceLanguageId: 'en',
  translations: translationsAdapter.getInitialState()
};

export const languageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSourceLanguageId (state, action: PayloadAction<string>) {
      state.sourceLanguageId = action.payload;
    },
    setTranslations (state, action: PayloadAction<TranslationEntry[]>) {
      translationsAdapter.setAll(state.translations, action.payload);
    },
    addTranslation (state, action: PayloadAction<{ id: string, items: Record<string, string> }>) {
      translationsAdapter.addOne(state.translations, action.payload);
    }
  }
});

export const { setSourceLanguageId, addTranslation, setTranslations } = languageSlice.actions;

const { selectAll } = translationsAdapter.getSelectors();

export const selectAllTranslationsByLanguageId = (
  state: RootState,
  languageId: string
): Array<{ id: string, source: string, text: string }> => {
  return selectAll(state.language.translations).map(translation => ({
    id: translation.id,
    source: translation.items[state.language.sourceLanguageId],
    text: translation.items[languageId]
  }));
};

export default languageSlice.reducer;


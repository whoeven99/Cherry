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
    updateTranslation (state, action: PayloadAction<{ keyId: string, languageId: string, text: string }>) {
      const { keyId, languageId, text } = action.payload;
      const translation = state.translations.entities[keyId];

      if (translation != null) {
        translation.items[languageId] = text;
      }
    }
  }
});

export const { setSourceLanguageId, setTranslations, updateTranslation } = languageSlice.actions;

const { selectAll } = translationsAdapter.getSelectors();

export const selectAllTranslationsByLanguageId = (
  state: RootState,
  languageId: string
): Array<{ keyId: string, source: string, text: string }> => {
  return selectAll(state.language.translations).map(translation => ({
    keyId: translation.id,
    source: translation.items[state.language.sourceLanguageId],
    text: translation.items[languageId]
  }));
};

export default languageSlice.reducer;


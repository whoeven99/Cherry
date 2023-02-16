import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum Stage {
  PasteSource,
  Rephrase,
  SelectTarget,
  TranslationReview
}

interface CommonSliceState {
  sourceLangId: string
  stage: Stage
}

const initialState: CommonSliceState = {
  sourceLangId: 'en',
  stage: Stage.PasteSource
};

export const commonSlice = createSlice({
  name: 'rephrase',
  initialState,
  reducers: {
    setStage (state, action: PayloadAction<Stage>) {
      state.stage = action.payload;
    },
    setSourceLangId (state, action: PayloadAction<string>) {
      state.sourceLangId = action.payload;
    }
  }
});

export const { setStage, setSourceLangId } = commonSlice.actions;

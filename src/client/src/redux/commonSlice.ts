import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export enum Stage {
  PasteSource,
  Rephrase,
  SelectTargetLanguages,
  FinalReview
}

interface CommonSliceState {
  stage: Stage
  sourceLangId: string
  text: string // confirmed rephrased text in source language
  targetLangIds: string[]
}

const initialState: CommonSliceState = {
  stage: Stage.PasteSource,
  sourceLangId: 'en',
  text: '',
  targetLangIds: ['de', 'fr', 'es']
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
    },
    completeRephrase (state, action: PayloadAction<string>) {
      state.text = action.payload;
      state.stage = Stage.SelectTargetLanguages;
    },
    setTargetLangIds (state, action: PayloadAction<string[]>) {
      state.targetLangIds = action.payload;
    }
  }
});

export const { setStage, setSourceLangId, completeRephrase, setTargetLangIds } = commonSlice.actions;

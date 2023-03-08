import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { rephraseAsync } from '../app/api';

export enum Stage {
  PasteSource,
  LoadingRephrase,
  Rephrase,
  SelectTargetLanguages,
  FinalReview
}

interface CommonSliceState {
  stage: Stage
  sourceLangId: string
  targetLangIds: string[]
  rawText: string
  rephrasedText: string
}

export const rephrase = createAsyncThunk<string, { input: string } >(
  'rephrase',
  async ({ input }) => {
    const response = await rephraseAsync(input);
    return response.text;
  }
);

const initialState: CommonSliceState = {
  stage: Stage.PasteSource,
  sourceLangId: 'en',
  targetLangIds: ['de', 'ru'],
  rawText: '',
  rephrasedText: ''
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
    startRephrasing (state, action: PayloadAction<string>) {
      state.stage = Stage.SelectTargetLanguages;
      state.rephrasedText = action.payload;
    },
    setTargetLangIds (state, action: PayloadAction<string[]>) {
      state.targetLangIds = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(rephrase.pending, (state) => {
        state.stage = Stage.LoadingRephrase;
      })
      .addCase(rephrase.fulfilled, (state, action) => {
        state.stage = Stage.Rephrase;
        state.rawText = action.meta.arg.input;
        state.rephrasedText = action.payload;
      });
  }
});

export const {
  setStage, setSourceLangId, startRephrasing, setTargetLangIds
} = commonSlice.actions;

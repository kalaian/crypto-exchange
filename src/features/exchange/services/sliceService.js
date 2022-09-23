import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncThunk = (type, asyncAction) =>
  createAsyncThunk(type, async (payload, { rejectWithValue }) => {
    return await asyncAction(payload).catch(({ response }) => {
      throw rejectWithValue(response);
    });
  });

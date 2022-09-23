import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../features/exchange/services/exchangeSlice";

export const store = configureStore({
  reducer: {
    exchangeData: exchangeReducer,
  },
});

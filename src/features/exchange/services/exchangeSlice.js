import { createSlice, isAnyOf, isAllOf } from "@reduxjs/toolkit";
import { asyncThunk } from "./sliceService";
import { toast } from "react-toastify";
import axios from "axios";

export const SLICE_NAME = "exchangeData";

export const {
  GET_BINANCE_DATA,
  GET_BITFINEX_DATA,
  GET_HUOBI_DATA,
  GET_KRAKEN_DATA,
} = {
  GET_BINANCE_DATA: "getBinanceData",
  GET_BITFINEX_DATA: "getBitfinexData",
  GET_HUOBI_DATA: "getHuobiData",
  GET_KRAKEN_DATA: "getKrakenData",
};

const initialState = {
  filteredData: "",
  cryptoData: [],
};

export const getBinanceData = asyncThunk(
  `${SLICE_NAME}/${GET_BINANCE_DATA}`,
  async (symbol) => {
    const requestSymbol = symbol.replace(/\//g, "");
    const response = await axios.get(
      "https://api.binance.com/api/v3/ticker/24hr",
      { params: { symbol: requestSymbol } }
    );
    return {
      exchange: "Binance",
      symbol: symbol,
      price: response.data.lastPrice,
      highPrice: response.data.highPrice,
      lowPrice: response.data.lowPrice,
      volume: response.data.volume,
    };
  }
);

export const getBitfinexData = asyncThunk(
  `${SLICE_NAME}/${GET_BITFINEX_DATA}`,
  async (symbol) => {
    const requestSymbol = symbol.replace(/\//g, "");
    const response = await axios.get(
      `https://try.readme.io/https://api.bitfinex.com/v1/pubticker/${requestSymbol}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    return {
      exchange: "Bitfinex",
      symbol: symbol,
      price: response.data.last_price,
      highPrice: response.data.high,
      lowPrice: response.data.low,
      volume: response.data.volume,
    };
  }
);

export const getKrakenData = asyncThunk(
  `${SLICE_NAME}/${GET_KRAKEN_DATA}`,
  async (symbol) => {
    const requestSymbol = symbol.replace(/\//g, "");
    const response = await axios.get("https://api.kraken.com/0/public/Ticker", {
      params: { pair: requestSymbol },
    });
    const responsetValues = Object.values(response.data.result)[0];
    return {
      exchange: "Kraken",
      symbol: symbol,
      price: responsetValues.c[0],
      highPrice: responsetValues.h[1],
      lowPrice: responsetValues.l[1],
      volume: responsetValues.v[1],
    };
  }
);

export const getHuobiData = asyncThunk(
  `${SLICE_NAME}/${GET_HUOBI_DATA}`,
  async (symbol) => {
    const requestSymbol = symbol.replace(/\//g, "").toLowerCase();
    const response = await axios.get(
      "https://api.huobi.pro/market/detail/merged",
      { params: { symbol: requestSymbol } }
    );
    return {
      exchange: "Huobi",
      symbol: symbol,
      price: response.data.tick.close,
      highPrice: response.data.tick.high,
      lowPrice: response.data.tick.low,
      volume: response.data.tick.vol,
    };
  }
);

const exchangeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(
        getBinanceData.fulfilled,
        getBitfinexData.fulfilled,
        getKrakenData.fulfilled,
        getHuobiData.fulfilled
      ),
      (state, action) => {
        const isDuplicated = state.cryptoData.some(
          ({ symbol, exchange }) =>
            (symbol.includes(action.payload.symbol) ||
              symbol.includes(action.payload.symbol.replace(/\//g, ""))) &&
            exchange.includes(action.payload.exchange)
        );
        return {
          ...state,
          cryptoData: isDuplicated
            ? [...state.cryptoData]
            : [...state.cryptoData, action.payload],
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        getBinanceData.rejected,
        getBitfinexData.rejected,
        getHuobiData.rejected
      ),
      (state, action) => {
        if (action.type.includes("Binance")) {
          toast.error("Pair wasnt found at Binance exchange");
        }
        if (action.type.includes("Bitfinex")) {
          toast.error("Pair wasnt found at Bitfinex exchange");
        }
        if (action.type.includes("Huobi")) {
          toast.error("Pair was not found at Huobi exchange");
        }
      }
    );
  },
});

export const exchangeSelector = (state) => state[SLICE_NAME];

export default exchangeSlice.reducer;

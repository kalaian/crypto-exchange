import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CryptoTable from "./components/CryptoTable";
import CryptoFilter from "./components/CryptoFilter";
import TableModal from "./components/TableModal";
import {
  getBinanceData,
  getBitfinexData,
  getHuobiData,
  getKrakenData,
  exchangeSelector,
} from "./services/exchangeSlice";
import styles from "./CryptoExchange.module.css";

const CryptoExchange = () => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState("ETH/BTC");
  const { cryptoData } = useSelector(exchangeSelector);

  const queryString = window.location.pathname.replace(/\//g, "");
  const shouldDisableButton = cryptoData.some(
    ({ symbol }) =>
      symbol.includes(filterData.replace(/\//g, "")) ||
      symbol.includes(filterData)
  );

  useEffect(() => {
    if (queryString.length > 1 && !queryString.includes("details")) {
      dispatch(getBinanceData(queryString));
      dispatch(getBitfinexData(queryString));
      dispatch(getHuobiData(queryString));
      dispatch(getKrakenData(queryString));
    }
    if (queryString.length > 1 && queryString.includes("details")) {
      const modifiedQueryString = queryString.replace("details", "");
      dispatch(getBinanceData(modifiedQueryString));
      dispatch(getBitfinexData(modifiedQueryString));
      dispatch(getHuobiData(modifiedQueryString));
      dispatch(getKrakenData(modifiedQueryString));
    }
  }, []);

  const handleCryptoSearch = () => {
    dispatch(getBinanceData(filterData));
    dispatch(getBitfinexData(filterData));
    dispatch(getHuobiData(filterData));
    dispatch(getKrakenData(filterData));
  };

  const handleOnChange = (e) => {
    setFilterData(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Crypto Exchange</h1>
      <TableModal
        tableData={cryptoData}
        shouldOpen={queryString.includes("details")}
      />
      <CryptoFilter
        handleSearch={handleCryptoSearch}
        handleOnChange={handleOnChange}
        disabled={shouldDisableButton}
      />
      <CryptoTable tableData={cryptoData} />
    </div>
  );
};

export default CryptoExchange;

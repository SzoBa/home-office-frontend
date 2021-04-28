import React, { useState, useEffect } from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import useSortedData from "../../hooks/UseSortedData";
import * as ENV from "../files/ENV.json";
import {
  CURRENCY_BUY,
  CURRENCY_LONG,
  CURRENCY_SELL,
  CURRENCY_SHORT,
  DESCENDING,
} from "../../containers/ConstContainer";
import { useHistory } from "react-router";

export default function CurrencyTable() {
  const history = useHistory;
  const [currencies, setCurrencies] = useState([]);
  const [sortedCurrencies, setSortedCurrencies] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      url: ENV.currencies,
    };
    const getData = async () => {
      const response = await axios(options);
      setCurrencies(response.data.slice(1));
    };
    getData().catch((error) => {
      toastr.error(error.response);
      return history.push("/");
    });
  }, [history]);

  const [sortByField, sortConfig] = useSortedData(
    currencies,
    orderCurrenciesByKey,
    {
      key: CURRENCY_SHORT,
      direction: DESCENDING,
    },
    setSortedCurrencies
  );

  const showSortedBy = (fieldName) => {
    return sortConfig.key === fieldName ? sortConfig.direction : "";
  };

  return (
    <table className="table_style" id="currency_table">
      <thead>
        <tr>
          <th
            onClick={() => sortByField(CURRENCY_SHORT)}
            className={showSortedBy(CURRENCY_SHORT)}
          >
            {CURRENCY_SHORT}
          </th>
          <th
            onClick={() => sortByField(CURRENCY_LONG)}
            className={showSortedBy(CURRENCY_LONG)}
          >
            {CURRENCY_LONG}
          </th>
          <th
            onClick={() => sortByField(CURRENCY_BUY)}
            className={showSortedBy(CURRENCY_BUY)}
          >
            {CURRENCY_BUY}
          </th>
          <th
            onClick={() => sortByField(CURRENCY_SELL)}
            className={showSortedBy(CURRENCY_SELL)}
          >
            {CURRENCY_SELL}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedCurrencies.map((item, index) => (
          <tr key={index}>
            {item.map((data, index) => (
              <td key={index}>{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  function orderCurrenciesByKey(key, order = DESCENDING) {
    return function sorter(a, b) {
      const valueA =
        key === CURRENCY_SHORT
          ? a[0]
          : key === CURRENCY_LONG
          ? a[1]
          : key === CURRENCY_BUY
          ? parseFloat(a[2])
          : parseFloat(a[3]);

      const valueB =
        key === CURRENCY_SHORT
          ? b[0]
          : key === CURRENCY_LONG
          ? b[1]
          : key === CURRENCY_BUY
          ? parseFloat(b[2])
          : parseFloat(b[3]);

      let compare = 0;
      if (valueA > valueB) {
        compare = 1;
      } else if (valueA < valueB) {
        compare = -1;
      }
      return order === DESCENDING ? compare * -1 : compare;
    };
  }
}

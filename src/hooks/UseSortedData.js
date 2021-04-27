import { useEffect, useMemo, useState } from "react";
import { ASCENDING, DESCENDING } from "../containers/ConstContainer";

const useSortedData = (
  data,
  sortingFunction,
  config = { key: null, direction: null },
  stateSetter
) => {
  const [sortConfig, setSortConfig] = useState(config);
  const sortedData = useMemo(() => {
    let sortedData = [...data];
    if (sortConfig.key !== null) {
      sortedData.sort(sortingFunction(sortConfig.key, sortConfig.direction));
    }
    return sortedData;
    /* eslint-disable */
  }, [data, sortConfig]);
  /* eslint-enable */

  const sortByField = (key) => {
    let direction =
      sortConfig.key === key && sortConfig.direction === DESCENDING
        ? ASCENDING
        : DESCENDING;
    setSortConfig({ key: key, direction: direction });
  };

  useEffect(() => {
    if (sortedData) {
      stateSetter(sortedData);
    }
  }, [sortedData, stateSetter]);

  return [sortByField, sortConfig];
};

export default useSortedData;

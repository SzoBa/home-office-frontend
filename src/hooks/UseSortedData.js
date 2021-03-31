import { useMemo, useState } from "react";

const DESCENDING = "desc";
const ASCENDING = "asc";

const useSortedData = (
  data,
  sortingFunction,
  config = { key: null, direction: null }
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

  return [sortedData, sortByField, sortConfig];
};

export default useSortedData;

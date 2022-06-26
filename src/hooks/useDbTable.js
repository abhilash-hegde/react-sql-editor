import { useEffect, useState } from "react";
import TABLES from "../constants/tables";

const useJson = (tab, query) => {
  const [table, setTable] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tab !== "query") {
      setTable(tab);
    } else {
      if (query) {
        let formattedQuery = query.replace(/\s\s+/g, "-");
        formattedQuery = formattedQuery.toLowerCase();
        const match = formattedQuery
          ? formattedQuery.match(/ * from (\w+)/)
          : [];

        if (match?.length > 0) {
          formattedQuery = match[1];
          if (TABLES.includes(formattedQuery)) {
            setTable(formattedQuery);
            setError(null);
          } else {
            setError("Table Not Found!");
            setTable(null);
          }
        } else {
          setError("Table Not Found!");
          setTable(null);
        }
      } else {
        setTable(null);
        setError(null);
      }
    }
  }, [tab, query]);

  return { table, error };
};

export default useJson;

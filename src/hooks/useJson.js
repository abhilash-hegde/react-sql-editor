import { useEffect, useState } from "react";
import TABLES from "../constants/tables";

const URL = (selectdTable) =>
  `https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/json/${selectdTable}.json`;

const useJson = (selectdTable) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getTableData = async (selectdTable) => {
    setData([]);
    const tableName = TABLES.find((tb) => tb === selectdTable);
    if (tableName) {
      setError(false);
      try {
        const streamObj = await fetch(URL(selectdTable));
        if (streamObj.status === 200) {
          const resp = await streamObj.json();
          setData(resp);
          setLoading(false);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setError(true);
      console.error("Please enter a valid query");
    }
  };

  useEffect(() => {
    setLoading(true);
    getTableData(selectdTable);
  }, [selectdTable]);

  return { data, error, loading };
};

export default useJson;

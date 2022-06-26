import TABLES from "./tables";

export default [
  {
    key: "query",
    label: "Query Editor",
  },
  {
    key: "tables",
    label: "Explore Tables",
    children: TABLES.map((tb) => ({
      key: tb,
      label: tb,
    })),
  },
];

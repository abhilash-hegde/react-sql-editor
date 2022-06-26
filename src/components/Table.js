import { Table } from "antd";
import TableSearch from "./TableSearch";

export default function DataTable({ data, error = false }) {
  const { columns = [], datasource = [] } = data;

  const ac = columns.map((k) => ({
    ...k,
    ...TableSearch(k["key"]),
  }));
  return (
    <Table
      bordered
      columns={ac}
      dataSource={datasource}
      tableLayout='auto'
      scroll={{ x: "500px" }}
      locale={{
        emptyText: error ? "Something Went Wrong!" : "No Records Found!",
      }}
    />
  );
}

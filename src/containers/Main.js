import useJson from "../hooks/useJson";
import DataTable from "../components/Table";
import { Card, Button } from "antd";
import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import { FileExcelOutlined } from "@ant-design/icons";

const initTableData = {
  datasource: [],
  columns: [],
};

export default function Main({ table }) {
  const { data, error, loading } = useJson(table);

  const [tableData, setTableData] = useState(initTableData);

  useEffect(() => {
    if (data?.length) {
      const columns = [];
      const obj = [];
      Object.keys(data[0]).forEach((el) => {
        let ellipsis = false;
        if (typeof data[0][el] == "object") {
          obj.push(el);
          ellipsis = true;
        }

        columns.push({
          title: el,
          label: el,
          dataIndex: el,
          key: el,
          ellipsis,
          sortDirections: ["descend", "ascend"],
          sorter: (a, b) => a.date - b.date,
        });
      });

      const datasource = data.map((el) => {
        obj.forEach((ob) => {
          el[ob] = JSON.stringify(el[ob]);
        });
        return el;
      });
      setTableData({
        columns,
        datasource,
      });
    } else {
      setTableData(initTableData);
    }
  }, [data]);

  return table ? (
    <Card
      title={table}
      loading={loading}
      className="main-table-view"
      extra={
        tableData.datasource.length ? (
          <CSVLink data={tableData.datasource} headers={tableData.columns}>
            <Button type='primary' icon={<FileExcelOutlined />}>
              Export CSV
            </Button>
          </CSVLink>
        ) : null
      }
    >
      <DataTable data={tableData} error={error} />
    </Card>
  ) : null;
}

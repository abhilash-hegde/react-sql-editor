import { useState } from "react";
import Layout from "antd/lib/layout";
import Result from "antd/lib/result";
import Sidebar from "./containers/Sidebar";
import SqlEditor from "./components/SqlEditer";
import Main from "./containers/Main";
import useDbTable from "./hooks/useDbTable";

import "antd/lib/layout/style/css";
import "antd/lib/result/style/css";
import "./styles.css";

const { Content } = Layout;

export default function App() {
  const [selected, setSelected] = useState("query");
  const [query, setQuery] = useState(null);

  const { table, error } = useDbTable(selected, query);

  return (
    <Layout hasSider>
      <Sidebar selected={selected} setSelected={setSelected} />
      <Layout
        style={{
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {selected === "query" && (
            <SqlEditor currQuery={query} excecuteQuery={setQuery} />
          )}
          {table && <Main table={table} />}
          {error && <Result title={error} status='warning' />}
        </Content>
      </Layout>
    </Layout>
  );
}

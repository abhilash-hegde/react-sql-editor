import { useState } from "react";
import AceEditor from "react-ace";
import { Button, Card } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-min-noconflict/theme-tomorrow";

export default function SqlEditor({ currQuery, excecuteQuery }) {
  const [query, setQuery] = useState(currQuery);
  return (
    <Card
      title='Query Editor'
      extra={
        <Button
          icon={<ConsoleSqlOutlined />}
          disabled={!query}
          onClick={() => excecuteQuery(query)}
          type='primary'
        >
          Run Query
        </Button>
      }
    >
      <AceEditor
        aria-label='query input'
        mode='mysql'
        theme='tomorrow'
        fontSize={16}
        maxLines={6}
        minLines={6}
        width='100%'
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={false}
        placeholder={"Type your query"}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={query}
        onChange={setQuery}
        showLineNumbers
      />
    </Card>
  );
}

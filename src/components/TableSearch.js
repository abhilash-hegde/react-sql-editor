import React, { useState, useRef } from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const TableSearch = (dataIndex) => {
  const [searchedText, setSearchedText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  let searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchedText("");
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder='Search...'
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters);
              confirm({ closeDropdown: true });
            }}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const filterValue = record[dataIndex];
      if (filterValue) {
        const searchArray = value.toString().trim().toLowerCase().split(/\s+/);
        return searchArray.every((search) =>
          filterValue.toString().toLowerCase().includes(search)
        );
      }
      return "";
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) => {
      if (searchedColumn === dataIndex) {
        const serachedString = searchedText.toString().trim().toLowerCase();
        if (serachedString) {
          const searchArray = serachedString.split(/\s+/);
          return (
            <Highlighter
              highlightStyle={{ backgroundColor: "rgb(#1890ff, 0.3)", padding: 0 }}
              searchWords={searchArray}
              autoEscape
              textToHighlight={text.toString()}
            />
          );
        }
      }
      return text;
    },
  };
};

export default TableSearch;

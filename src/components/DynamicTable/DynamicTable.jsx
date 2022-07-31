import React from "react";
import { Table } from "antd";
//Import Style
import "./DynamicTable.scss";


const DynamicTable = ({ isLoading = false, data = {}, columns = [] }) => {
  return (
    <div className="dynamic-table__container">
      <Table loading={isLoading} dataSource={data} columns={columns} />
    </div>
  );
};

export default DynamicTable;

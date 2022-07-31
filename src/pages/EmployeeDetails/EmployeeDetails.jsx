import React, { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";
import _ from "lodash";
//Import Helpers
import DynamicTable from "../../components/DynamicTable";
import BreadCrumbComponent from "../../components/Breadcrumb";
import SearchBar from "../../components/SearchBar";
import {
  employeeDetailsColumns,
  BreadcrumbsConstant,
  FIELDS_KEY_NAMES
} from "../../constants/EmployeeTable";
import {capitalizeWord} from '../../lib/helpers/general-helper'
//import Hooks
import useFetch from "../../hooks/useFetch";
//import Style
import "./EmployeeDetails.scss";

const EmployeeDetails = () => {
  const [reformattedData, setReformattedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClick] = useState(false);

  const { data, isLoading, error } = useFetch(
    "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
  );

  useEffect(() => {
    if (!data) return;
    data.data.result.auditLog.forEach((item) => {
      if (item["applicationType"]) {
        item["applicationType"] = capitalizeWord(item["applicationType"]);
      }
      if (item["actionType"]) {
        item["actionType"] = capitalizeWord(item["actionType"]);
      }
    });

    setReformattedData(data.data.result.auditLog);
  }, [data]);

  useEffect(()=> {
    setIsSearchButtonClick(false);
    setFilteredData([]);
  },[]);

  const handleOnSearchLoggerClick = useCallback((filterData)=>{
    setIsSearchButtonClick(true);
    Object.keys(filterData).forEach(key => !filterData[key] && delete filterData[key]);

    if(_.isEmpty(filterData)) return;
    const dataAfterFilter =_.filter(reformattedData, filterData);
    setFilteredData(dataAfterFilter);
  },[reformattedData]);

  console.log({isSearchButtonClicked, filteredData, reformattedData});
  // Show the loading indicator for API
  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="employee-details__container">
      <BreadCrumbComponent breadcrumdsArr={BreadcrumbsConstant} />
      <SearchBar
          handleOnSearchLoggerClick={handleOnSearchLoggerClick}
          tableData={reformattedData}
          setFilteredData={setFilteredData}
      />
      <DynamicTable
        columns={employeeDetailsColumns}
        isLoading={isLoading}
        data={isSearchButtonClicked  ? filteredData : reformattedData }
      />
    </div>
  );
};

export default EmployeeDetails;

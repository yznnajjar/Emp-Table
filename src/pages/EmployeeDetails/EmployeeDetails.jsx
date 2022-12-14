import React, { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";
import _ from "lodash";
import moment from "moment";
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
import {extractDataBasedOnDate} from '../../lib/helpers/employee-details';
//import Hooks
import useFetch from "../../hooks/useFetch";
//import Style
import "./EmployeeDetails.scss";



const EmployeeDetails = () => {
  const [reformattedData, setReformattedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClick] = useState(false);
  const [isResetClicked, setIsResetClicked] = useState(false);
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


  useEffect(()=>{
    if(!data || !isResetClicked) return;

    setReformattedData(data.data.result.auditLog);
  },[isResetClicked]);

  const handleOnSearchLoggerClick = useCallback((filterData)=>{
    setIsSearchButtonClick(true);

    const filterDataWithoutRef = {...filterData};
    Object.keys(filterDataWithoutRef).forEach(key => !filterDataWithoutRef[key] && delete filterDataWithoutRef[key]);

    if(_.isEmpty(filterDataWithoutRef)) setIsSearchButtonClick(false);

    const dataDateFiltered = extractDataBasedOnDate([...reformattedData], filterDataWithoutRef[FIELDS_KEY_NAMES.FROM_DATE], filterDataWithoutRef[FIELDS_KEY_NAMES.TO_DATE])
    FIELDS_KEY_NAMES.FROM_DATE in filterDataWithoutRef && delete filterDataWithoutRef[FIELDS_KEY_NAMES.FROM_DATE]
    FIELDS_KEY_NAMES.TO_DATE in filterDataWithoutRef && delete filterDataWithoutRef[FIELDS_KEY_NAMES.TO_DATE]

    const dataToFilter = dataDateFiltered.length ? dataDateFiltered : reformattedData;
    const dataAfterFilter =_.filter(dataToFilter, filterDataWithoutRef);
    setFilteredData(dataAfterFilter);
  },[reformattedData]);

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
          setIsResetClicked={setIsResetClicked}
          setIsSearchButtonClick={setIsSearchButtonClick}
      />
      <DynamicTable
        columns={employeeDetailsColumns}
        isLoading={isLoading}
        data={isSearchButtonClicked ? filteredData : reformattedData }
      />
    </div>
  );
};

export default EmployeeDetails;

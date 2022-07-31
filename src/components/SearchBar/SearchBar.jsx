import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Select, Input, DatePicker, InputNumber, Button} from "antd";
import moment from 'moment';
import _ from 'lodash';
//import constant
import {FIELDS_KEY_NAMES, FIELDS_LABELS} from '../../constants/EmployeeTable'
//import Style
import "./SearchBar.scss";

const SearchBar = ({
  tableData = [],
  handleOnSearchLoggerClick=() =>{}
}) => {
  const [applicationTypeData, setApplicationTypeData] = useState([]);
  const [actionTypeData, setActionTypeData] = useState([]);
  const [minAndMaxDate, setMinAndMaxDate] = useState({
    minDate:"",
    maxDate:""
  });

  const [searchTableData, setSearchTableData] = useState({
    [FIELDS_KEY_NAMES.EMPLOYEE_NAME]: "",
    [FIELDS_KEY_NAMES.APPLICATION_TYPE]: "",
    [FIELDS_KEY_NAMES.APPLICATION_ID]: "",
    [FIELDS_KEY_NAMES.FROM_DATE]: "",
    [FIELDS_KEY_NAMES.TO_DATE]: "",
    [FIELDS_KEY_NAMES.ACTION_TYPE]: "",

  });

  const handleFieldsChange = useCallback((key, value) => {
    setSearchTableData({...searchTableData, [key]: value});
  }, [searchTableData]);

  /*
   ** Effect To Get MaxDate And MinDate
  */
  useEffect(()=>{
      if(tableData.length === 0) return;
      const getDates = tableData.map(item => item.creationTimestamp.split(" ")[0]).sort((a,b) => new Date(a) - new Date(b));
      setMinAndMaxDate({minDate:  getDates.at(0), maxDate: getDates.at(-1)});
  },[tableData]);

  /*
  * Effect To Add DropDown Data
  * */
  useEffect(()=>{
    if(tableData.length  === 0) return;

    const objOfAppTypeData = {};
    const objOfActionTypeData = {};

    tableData.forEach((item) => {
      if (!objOfAppTypeData[item['applicationType']] && item['applicationType']) {
        objOfAppTypeData[item['applicationType']] = 1;
      }

      if (!objOfActionTypeData[item['actionType']] && item['actionType']) {
        objOfActionTypeData[item['actionType']] = 1;
      }
    });

      const returnKeysAppType = Object.keys(objOfAppTypeData).map(item => ({label: item, value: item}));
      const returnKeysActionType = Object.keys(objOfActionTypeData).map(item => ({label: item, value: item}));

      returnKeysAppType.length && setApplicationTypeData([...returnKeysAppType]);
      returnKeysActionType.length &&  setActionTypeData([...returnKeysActionType]);
  },[tableData]);


  return (
    <div className="search-bar">
      {/* Employee Name */}
      <div>
        <span>{FIELDS_LABELS.EMPLOYEE_NAME}</span>
        <Input
          type="text"
          value={searchTableData[FIELDS_KEY_NAMES.EMPLOYEE_NAME]}
          className="wd220"
          placeholder="e.g. Admin.User"
          onChange={(e) =>
            handleFieldsChange(FIELDS_KEY_NAMES.EMPLOYEE_NAME, e.target.value.replaceAll(/[0-9]/ig, ""))
          }
        />
      </div>

      {/* From Date */}
      <div>
        <span>{FIELDS_LABELS.ACTION_TYPE}</span>
        <Select
          className="wd220"
          showSearch
          onChange={value=> handleFieldsChange(FIELDS_KEY_NAMES.ACTION_TYPE, value)}
          options={actionTypeData}
        ></Select>
      </div>
      <div>
        <span>{FIELDS_LABELS.APPLICATION_TYPE}</span>
        <Select
          className="wd220"
          showSearch
          onChange={value=> handleFieldsChange(FIELDS_KEY_NAMES.APPLICATION_TYPE, value)}
          options={applicationTypeData}
        ></Select>
      </div>

      {/* Show Date Picker */}
      <div>
        <span>{FIELDS_LABELS.FROM_DATE}</span>
        <DatePicker
          className="wd220"
          defaultPickerValue={moment(minAndMaxDate.minDate)}
          disabledDate={current => !current || current.isBefore(minAndMaxDate.minDate) || current.isSameOrAfter(minAndMaxDate.maxDate) }
          onChange={(date, dateString) => {
            handleFieldsChange(FIELDS_KEY_NAMES.FROM_DATE, dateString);
          }}
        />
      </div>
      <div>
        <span>{FIELDS_LABELS.TO_DATE}</span>
        <DatePicker
          className="wd220"
          defaultPickerValue={moment(minAndMaxDate.maxDate)}
          disabledDate={current =>{
            return !current || current.isAfter(minAndMaxDate.maxDate) || current.isSameOrBefore(minAndMaxDate.minDate) || searchTableData[FIELDS_KEY_NAMES.FROM_DATE] &&  current.isSameOrBefore(searchTableData[FIELDS_KEY_NAMES.FROM_DATE]) }
          }
          onChange={(date, dateString) => {
            handleFieldsChange(FIELDS_KEY_NAMES.TO_DATE, dateString);
          }}
        />
      </div>
      {/* Application ID Field */}
      <div>
        <span>{FIELDS_LABELS.APPLICATION_ID}</span>
        <Input
          type="number"
          className="wd220"
          placeholder="e.g. 219841/2021"
          min={0}
          onChange={(e) =>{
            handleFieldsChange(FIELDS_KEY_NAMES.APPLICATION_ID, +e.target.value);
          }
          }
        />
      </div>
      <Button
        className="search-button wd266"
        onClick={()=> handleOnSearchLoggerClick(searchTableData)}>{FIELDS_LABELS.SEARCH_LOGGER}</Button>
    </div>
  );
};
export default SearchBar;

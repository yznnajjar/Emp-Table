import { ArrowUpOutlined  } from '@ant-design/icons';

const sortIcon = (title) =>{
  const style = {
    backgroundColor:"var(--color-blue-3)",
    borderRadius:"50%",
    fontSize:"12px",
    padding:"3px"
  };

  return (
    <div>
      {title} <ArrowUpOutlined style={style}/>
    </div>
  )
};

export const employeeDetailsColumns = [
  {
    title: sortIcon("Log ID"),
    dataIndex: "logId",
    key: "logId",
    sorter: (a, b) => a.logId - b.logId,
  },
  {
    title: sortIcon("Application Type"),
    dataIndex: "applicationType",
    key: "applicationType",
    sorter: (a, b) => a.applicationType?.localeCompare(b.applicationType),
  },
  {
    title:sortIcon("Application ID"),
    dataIndex: "applicationId",
    key: "applicationId",
    sorter: (a, b) => a.applicationId - b.applicationId,
    render: (text) => text || <span style={{ color: "#DFDCE6" }}>-/-</span>,
  },
  {
    title: sortIcon("Action"),
    dataIndex: "actionType",
    key: "actionType",
    sorter: (a, b) => a.actionType?.localeCompare(b.actionType),
  },
  {
    title: sortIcon("Action Details"),
    dataIndex: "logInfo",
    key: "logInfo",
    sorter: (a, b) => a.logInfo?.localeCompare(b.logInfo),
    render: (text) => text || <span style={{ color: "#DFDCE6" }}>-/-</span>,
  },
  {
    title: sortIcon("Date : Time"),
    dataIndex: "creationTimestamp",
    key: "creationTimestamp",
    sorter: (a, b) =>
      new Date(a.creationTimestamp) - new Date(b.creationTimestamp),
    render: (text) => text.replace(/\s/g, " / "),
  },
];

export const BreadcrumbsConstant = ["Home", "Administration", "Logger search"];

export const FIELDS_KEY_NAMES = {
  EMPLOYEE_NAME: "employeeName",
  APPLICATION_TYPE: "applicationType",
  APPLICATION_ID: "applicationId",
  FROM_DATE: "fromDate",
  TO_DATE: "toDate",
  ACTION_TYPE: "actionType",
};

export const FIELDS_LABELS = {
  EMPLOYEE_NAME: "Employee Name",
  APPLICATION_TYPE: "Application Type",
  APPLICATION_ID: "Application ID",
  FROM_DATE: "From Date",
  TO_DATE: "To Date",
  ACTION_TYPE: "Action Type",
  SEARCH_LOGGER: "Search Logger",
};

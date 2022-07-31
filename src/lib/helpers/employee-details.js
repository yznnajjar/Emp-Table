import moment from "moment";

export const extractDataBasedOnDate = (data, fromDate = undefined, toDate = undefined) => {
  if(!toDate && fromDate){
    return data.filter(item => moment(item['creationTimestamp'].split(" ")[0]).isSameOrAfter(fromDate));
  }

  if(!fromDate && toDate){
    return data.filter(item => moment(item['creationTimestamp'].split(" ")[0]).isSameOrBefore(toDate));
  }

  return data.filter(item => moment(item['creationTimestamp'].split(" ")[0]).isSameOrAfter(fromDate) && moment(item['creationTimestamp'].split(" ")[0]).isSameOrBefore(toDate));
};

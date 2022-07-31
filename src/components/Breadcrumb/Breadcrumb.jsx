import React from "react";
import { Breadcrumb } from "antd";
//Import Style
import "./Breadcrumb.scss";

const { Item } = Breadcrumb;

const BreadCrumbComponent = ({ breadcrumdsArr = [] }) => {
  return (
    <div className="breadcrumb__container">
      <Breadcrumb separator=">">
        {React.Children.toArray(
          breadcrumdsArr.map((item) => <Item>{item}</Item>)
        )}
      </Breadcrumb>
    </div>
  );
};
export default BreadCrumbComponent;

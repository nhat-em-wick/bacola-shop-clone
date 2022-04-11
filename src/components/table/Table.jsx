import React from "react";

import "./table.scss";
const Table = (props) => {
  return (
    <div className="table-wrapper">
      <table>
        { props.renderHead ? (
          <thead>
            <tr>
              {
                props.renderHead
              }
            </tr>
          </thead>
        ) : null}
        {
          props.renderBody ? (
            <tbody>
              {
                props.renderBody
              }
            </tbody>
          ) : null
        }
      </table>
    </div>
  );
};

export default Table;

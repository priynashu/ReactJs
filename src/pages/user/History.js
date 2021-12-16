import React from "react";

import UserNav from "../../components/nav/UserNav";
//these are bootstrap grid classes here it will page into 6 parts
const History = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <div className="col-md-2">User History</div>
    </div>
  </div>
);
export default History;

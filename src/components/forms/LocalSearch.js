import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    e.preventDefault();
  };
  return (
    <div className="pt-4 pb-4">
      <input
        type="search"
        className="form-control mb-4"
        onChange={handleSearchChange}
        value={keyword}
        placeholder="filter/search"
      />
    </div>
  );
};
export default LocalSearch;

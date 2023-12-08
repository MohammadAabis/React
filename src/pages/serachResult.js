import React from "react";
import "./SearchResult.css";
import { Link } from "react-router-dom";

const SearchResult = (props) => {
  return (
    <div className="result-list">
      {props.results &&
        props.results.map((data) => {
          return (
            <div>
              <Link to={"/product/" + data.id}>
                {data.category} <i className="fa fa-angle-right"></i>{" "}
                {data.title}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SearchResult;

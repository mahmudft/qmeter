import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import QTable from "./components/table/QTable";


function App() {

  // const filterTodos = () => {
  //   return null
  // }
  return (
      <div className="main">
        <div className="navbar">
          <div style={{lineHeight: '0px'}}>
            <h4>Campaigns</h4>
            <span className="subtext">
              <i>
                You can communicate with your customers directly fom this
                section
              </i>
            </span>
          </div>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#83c26e" }}
            // onClick={handleClick}
          >
            <Link to="/thread">New Thread</Link>
          </Button>
        </div>
        <div className="table-section">
          <QTable />
        </div>
      </div>
  );
}

export default App;

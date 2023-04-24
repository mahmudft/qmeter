import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { REMOVE_TEMPLATE } from "./../../store/constants";
import { useDispatch } from "react-redux";
import "./qtable.css";
import Swal from "sweetalert2";

const QTable = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.templates);

  const deleteTemplate = (id) => {
    Swal.fire({
      title: "Notice",
      text: "do you want to delete email?",
      icon: "info",
      showCancelButton: true,
      cancenButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       dispatch({
          type: REMOVE_TEMPLATE,
          payload: id,
        });
        Swal.fire("Deleted!", "", "success");
      } else {
        Swal.fire("Canceled", "", "info");
      }
    });
  };

  const sortEmails = (entries) => {
    setTimeout(() => {
      //pass
    }, 5000);
    return entries?.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  };

  const searchEntries = (entries) => {
    if (search)
      return entries?.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      );
    else return entries;
  };

  return (
    <div className="qtable-area">
      <div>
        <OutlinedInput
          type="text"
          sx={{ float: "right", width: "400px", right: 0 }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          onChange={(el) => setSearch(el.currentTarget.value)}
          placeholder="Search"
          size="small"
        />
      </div>
      <TableContainer
        component={Paper}
        sx={{ width: "auto", overflowX: "hidden", boxShadow: "none" }}
      >
        <Table size="medium" sx={{ border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type&nbsp;</TableCell>
              <TableCell align="right">Date&nbsp;</TableCell>
              <TableCell align="right">Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchEntries(sortEmails(rows))?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.isSent ? null : (
                    <span
                      style={{
                        backgroundColor: "#ffe6e6",
                        color: "red",
                        padding: "5px",
                        fontStyle: "normal",
                      }}
                    >
                      Draft
                    </span>
                  )}{" "}
                  {row.name}
                </TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    // style={{ backgroundColor: "orange", color: "white" }}
                    sx={{
                      backgroundColor: "orange",
                      color: "white",
                    }}
                  >
                    <Link to={`/thread/${row.id}`}>
                      {row.isSent ? "View" : "Edit"}
                    </Link>
                  </Button>{" "}
                  <Button
                    onClick={() => deleteTemplate(row.id)}
                    size="small"
                    sx={{ backgroundColor: "red", color: "white" }}
                    // style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QTable;

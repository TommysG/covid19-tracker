import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import { numberWithCommas } from "../utils/functions";
import Image from "next/image";
import styles from "../styles/Table.module.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "country",
    numeric: false,
    // disablePadding: true,
    label: "Country",
  },
  { id: "cases", numeric: true, disablePadding: false, label: "Total Cases" },
  {
    id: "todayCases",
    numeric: true,
    disablePadding: false,
    label: "New Cases",
  },
  {
    id: "deaths",
    numeric: true,
    disablePadding: false,
    label: "Total Deaths",
  },
  {
    id: "todayDeaths",
    numeric: true,
    disablePadding: false,
    label: "New Deaths",
  },
  {
    id: "recovered",
    numeric: true,
    disablePadding: false,
    label: "Total Recovered",
  },
  {
    id: "active",
    numeric: true,
    disablePadding: false,
    label: "Active Cases",
  },
  {
    id: "critical",
    numeric: true,
    disablePadding: false,
    label: "Serious Critical",
  },
  {
    id: "population",
    numeric: true,
    disablePadding: false,
    label: "Population",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: "gray" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span
                  //   className={classes.visuallyHidden}
                  style={{
                    border: 0,
                    clip: "rect(0 0 0 0)",
                    height: 1,
                    margin: -1,
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    top: 20,
                    width: 1,
                  }}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  //   classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({ countries }) {
  //   const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, countries.length - page * rowsPerPage);

  return (
    <div style={{ width: "100%" }}>
      <Paper
        // className={classes.paper}
        style={{ width: "100%", marginBottom: 15, borderRadius: 8 }}
      >
        <TableContainer>
          <Table
            // className={classes.table}
            style={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              //   classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={countries.length}
            />
            <TableBody>
              {stableSort(countries, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      style={
                        index % 2
                          ? { background: "#FAFCFF" }
                          : { background: "white" }
                      }
                    >
                      <Link href={`/country/${row.countryInfo.iso2}`}>
                        <TableCell component="th" id={labelId} scope="row">
                          <a className={styles.countryBox}>
                            <Image
                              src={row.countryInfo.flag}
                              width={25}
                              height={16.7}
                              alt="flag"
                              priority
                            />
                            <span className={styles.countryName}>
                              {row.country}
                            </span>
                          </a>
                        </TableCell>
                      </Link>
                      <TableCell align="right" style={tableText}>
                        {numberWithCommas(row.cases)}
                      </TableCell>
                      <TableCell
                        align="right"
                        // style={{ color: "red", fontWeight: 600, fontSize: 16 }}
                        style={newCases}
                      >
                        {row.todayCases > 0
                          ? `+${numberWithCommas(row.todayCases)}`
                          : ""}
                      </TableCell>
                      <TableCell align="right" style={tableText}>
                        {numberWithCommas(row.deaths)}
                      </TableCell>
                      <TableCell align="right" style={newDeaths}>
                        {row.todayDeaths > 0
                          ? `+${numberWithCommas(row.todayDeaths)}`
                          : ""}
                      </TableCell>
                      <TableCell align="right" style={tableText}>
                        {numberWithCommas(row.recovered)}
                      </TableCell>
                      <TableCell align="right" style={tableText}>
                        {numberWithCommas(row.active)}
                      </TableCell>
                      <TableCell align="right" style={tableText}>
                        {numberWithCommas(row.critical)}
                      </TableCell>
                      <TableCell align="right" style={tableText}>
                        {numberWithCommas(row.population)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={countries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const newCases = {
  color: "#4B87FF",
  fontWeight: 600,
};

const newDeaths = {
  color: "#F1C23E",
  fontWeight: 600,
};

const tableText = {
  color: "#666666",
  fontWeight: 500,
};

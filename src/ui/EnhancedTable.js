import * as React from 'react';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'service',
    label: 'Service',
  },
  {
    id: 'features',
    label: 'Features',
  },
  {
    id: 'complexity',
    label: 'Complexity',
  },
  {
    id: 'platforms',
    label: 'Platforms',
  },
  {
    id: 'users',
    label: 'Users',
  },
  {
    id: 'total',
    label: 'Total',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, rows, selected, setRows, setSelected } = props;
  const [undo, setUndo] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [totalFilter, setTotalFilter] = React.useState('>');
  const [filterPrice, setFilterPrice] = React.useState('');
  const [alert, setAlert] = React.useState({
    open: false,
    color: '#FF3232',
    message: 'Row deleted!',
  });

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleTotalFilter = (event) => {
    setFilterPrice(event.target.value);

    if (event.target.value !== '') {
      const newRows = [...rows];

      newRows.map((row) =>
        eval(
          `${event.target.value} ${
            totalFilter === '=' ? '===' : totalFilter
          } ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );

      setRows(newRows);
    } else {
      const newRows = [...rows];
      newRows.map((row) => (row.search = true));

      setRows(newRows);
    }
  };

  const filterChange = (operator) => {
    if (filterPrice !== '') {
      const newRows = [...rows];

      newRows.map((row) =>
        eval(
          `${filterPrice} ${
            operator === '=' ? '===' : operator
          } ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );

      setRows(newRows);
    }
  };

  const onDelete = () => {
    const newRows = [...rows];
    const selectedRows = newRows.filter((row) => selected.includes(row.name));

    selectedRows.map((row) => (row.search = false));
    setRows(newRows);
    setUndo(selectedRows);
    setSelected([]);

    setAlert({ ...alert, open: true });
  };

  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...rows];
    const redo = [...undo];

    redo.map((row) => (row.search = true));
    Array.prototype.push.apply(newRows, ...redo);

    setRows(newRows);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.secondary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="secondary"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="secondary"
          variant="subtitle1"
          component="div"
        >
          {null}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon style={{ fontSize: 30 }} color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick} id="menu-positioned-button">
            <FilterListIcon style={{ fontSize: 50 }} color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      <Snackbar
        action={
          <Button style={{ color: '#fff' }} onClick={onUndo}>
            Undo
          </Button>
        }
        open={alert.open}
        ContentProps={{ style: { backgroundColor: alert.color } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={alert.message}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            setAlert({ ...alert, open: false });
            const newRows = [...rows];
            const names = [...undo.map((row) => row.name)];

            setRows(newRows.filter((row) => !name.includes(row.name)));
          }
        }}
      />
      <Menu
        aria-labelledby="menu-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        style={{ zIndex: 1302 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
      >
        <MenuItem
          sx={{
            '&:hover': { backgroundColor: '#fff' },
            '&.Mui-focusVisible': { backgroundColor: '#fff' },
          }}
        >
          <TextField
            placeholder="Enter a price to filter"
            value={filterPrice}
            onChange={handleTotalFilter}
            variant="standard"
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    fontSize: '1.5rem',
                    color: (theme) => theme.palette.common.orange,
                  }}
                >
                  <span>$</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    cursor: 'pointer',
                    fontSize: '2rem',
                    color: (theme) => theme.palette.common.orange,
                  }}
                  onClick={() => {
                    setTotalFilter(
                      totalFilter === '>'
                        ? '<'
                        : totalFilter === '<'
                        ? '='
                        : '>'
                    );
                    filterChange(
                      totalFilter === '>'
                        ? '<'
                        : totalFilter === '<'
                        ? '='
                        : '>'
                    );
                  }}
                >
                  <span>{totalFilter}</span>
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
}

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const switchFilters = () => {
    const { websiteChecked, iOSChecked, androidChecked, softwareChecked } =
      props;

    if (!websiteChecked && !iOSChecked && !androidChecked && !softwareChecked) {
      return props.rows;
    }

    const websites = props.rows.filter((row) =>
      websiteChecked ? row.service === 'Website' : null
    );
    const iOSApps = props.rows.filter((row) =>
      iOSChecked ? row.platforms.includes('iOS') : null
    );
    const androidApps = props.rows.filter((row) =>
      androidChecked ? row.platforms.includes('Android') : null
    );
    const softwareApps = props.rows.filter((row) =>
      softwareChecked ? row.service === 'Custom Software' : null
    );

    let newRows = websites.concat(
      iOSApps.filter((item) => websites.indexOf(item) < 0)
    );

    let newRows2 = newRows.concat(
      androidApps.filter((item) => newRows.indexOf(item) < 0)
    );

    let newRows3 = newRows2.concat(
      softwareApps.filter((item) => newRows2.indexOf(item) < 0)
    );

    return newRows3;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
        <EnhancedTableToolbar
          rows={props.rows}
          selected={selected}
          setRows={props.setRows}
          setSelected={setSelected}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(
                switchFilters().filter((row) => row.search),
                getComparator(order, orderBy)
              )
                .slice(
                  props.page * rowsPerPage,
                  props.page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell align="center" style={{ maxWidth: '5em' }}>
                        {row.features}
                      </TableCell>
                      <TableCell align="center">{row.complexity}</TableCell>
                      <TableCell align="center">{row.platforms}</TableCell>
                      <TableCell align="center">{row.users}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.filter((row) => row.search).length}
          rowsPerPage={rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

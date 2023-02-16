import React, { useState } from 'react';

import Add from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FilterList from '@mui/icons-material/FilterList';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  service: {
    fontWeight: '300!important',
  },
  users: {
    marginRight: 0,
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) {
  return { name, date, service, features, complexity, platforms, users, total };
}

export default function ProjectManager() {
  const { classes } = useStyles();
  const theme = useTheme();

  const [rows, setRows] = useState([
    createData(
      'Artem Suzdal',
      '01/10/23',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '1500$'
    ),
    createData(
      'Bill Gates',
      '01/20/2023',
      'Custom Software',
      'GPS, Push Notifications, Users/Authentication, File Transfer',
      'Medium',
      'Web Application',
      '0-10',
      '$1600'
    ),
    createData(
      'Steve Jobs',
      '01/23/2023',
      'Custom Software',
      'Photo/Video, File Transfer, Users/Authentication',
      'Low',
      'Web Application',
      '10-100',
      '$1250'
    ),
  ]);

  const platformOptions = ['Web', 'iOS', 'Android'];
  const featureOptions = [
    'Photo/Video',
    'GPS',
    'File Transfer',
    'User/Authentication',
    'Biometrics',
    'Push Notifications',
  ];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: '2em', marginLeft: '5em' }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search project deatils or create a new entry."
            variant="standard"
            style={{ width: '35em', marginLeft: '5em' }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDialogOpen(true)}
                >
                  <Add color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: '5em', marginTop: '2em' }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={websiteChecked}
                  onChange={() => setWebsiteChecked(!websiteChecked)}
                />
              }
              label="Websites"
              labelPlacement="start"
              style={{ marginRight: '5em' }}
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={iOSChecked}
                  onChange={() => setIOSChecked(!iOSChecked)}
                />
              }
              label="iOS Apps"
              labelPlacement="start"
              style={{ marginRight: '5em' }}
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={androidChecked}
                  onChange={() => setAndroidChecked(!androidChecked)}
                />
              }
              label="Android Apps"
              labelPlacement="start"
              style={{ marginRight: '5em' }}
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={softwareChecked}
                  onChange={() => setSoftwareChecked(!softwareChecked)}
                />
              }
              label="Custom Software"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          style={{ marginTop: '5em' }}
        >
          <Grid item style={{ marginRight: 75 }}>
            <FilterList color="secondary" style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: '15em' }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Features</TableCell>
                  <TableCell align="center">Complexity</TableCell>
                  <TableCell align="center">Platforms</TableCell>
                  <TableCell align="center">Users</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">{row.name}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      label="Name"
                      id="name"
                      value={name}
                      variant="standard"
                      onChange={(event) => setName(event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    style={{ marginTop: '5em' }}
                  >
                    <Grid item>
                      <Typography variant="h4">Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label="service"
                        name="service"
                        value={service}
                        onChange={(event) => setService(event.target.value)}
                      >
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Website"
                          label="Website"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Mobile App"
                          label="Mobile App"
                          control={<Radio />}
                        />
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Custom Software"
                          label="Custom Software"
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item style={{ marginTop: '5em' }}>
                      <Select
                        labelId="platforms"
                        style={{ width: '12em' }}
                        id="platforms"
                        multiple
                        displayEmpty
                        variant="standard"
                        value={platforms}
                        renderValue={
                          platforms.length > 0 ? undefined : () => 'Platforms'
                        }
                        onChange={(event) => setPlatforms(event.target.value)}
                      >
                        {platformOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  alignItems="center"
                  direction="column"
                  style={{ marginTop: 16 }}
                  sm
                >
                  <Grid item>
                    <DatePicker
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      inputFormat="MM/dd/yyyy"
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: '5em' }}
                    >
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="complexity"
                          name="complexity"
                          value={complexity}
                          onChange={(event) =>
                            setComplexity(event.target.value)
                          }
                        >
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="Low"
                            label="Low"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="Medium"
                            label="Medium"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{ label: classes.service }}
                            value="High"
                            label="High"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                >
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      label="Total"
                      id="total"
                      value={total}
                      variant="standard"
                      onChange={(event) => setTotal(event.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="flex-end"
                      style={{ marginTop: '5em' }}
                    >
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="users"
                          name="users"
                          value={users}
                          onChange={(event) => setUsers(event.target.value)}
                        >
                          <FormControlLabel
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value="0-10"
                            label="0-10"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value="10-100"
                            label="10-100"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            classes={{
                              label: classes.service,
                              root: classes.users,
                            }}
                            value="100+"
                            label="100+"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item style={{ marginTop: '5em' }}>
                        <Select
                          labelId="features"
                          style={{ width: '12em' }}
                          MenuProps={{ style: { zIndex: 1302 } }}
                          id="features"
                          multiple
                          displayEmpty
                          variant="standard"
                          value={features}
                          renderValue={
                            features.length > 0 ? undefined : () => 'Features'
                          }
                          onChange={(event) => setFeatures(event.target.value)}
                        >
                          {featureOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </LocalizationProvider>
  );
}

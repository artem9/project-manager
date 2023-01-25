import React, { useState } from 'react';

import Add from '@mui/icons-material/Add';
import FormGroup from '@mui/material/FormGroup';
import FilterList from '@mui/icons-material/FilterList';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
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

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({}));

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

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  return (
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
              <InputAdornment position="end">
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
    </Grid>
  );
}

import React, { useState } from 'react';

import Add from '@mui/icons-material/Add';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({}));

export default function ProjectManager() {
  const { classes } = useStyles();
  const theme = useTheme();

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
                <Add color="primary" />
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
    </Grid>
  );
}

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  btn: {
    color: '#fafafa'
  }
}));

export default function Navbar() {
  const classes = useStyles();

  const [userConnected, setUserConnected] = useState(false);

  const clearStorage = () => {
    localStorage.clear();
    setUserConnected(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      setUserConnected(true);
    } else {
      setUserConnected(false);
    }
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Les Bons Artisans
            </Link>
          </Typography>
          {!userConnected ? (
            <Link to="/login" className={classes.link}>
              <Button className={classes.btn}>Connection</Button>
            </Link>
          ) : (
            <Link to="/login" className={classes.link}>
              <Button className={classes.btn} onClick={clearStorage}>Déconnection</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

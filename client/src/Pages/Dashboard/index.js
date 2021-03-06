import React, {useEffect, useState, useContext} from "react";
import clsx from "clsx";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "../../Components/ListItems";
import Cards from "./Components/Cards";
import ButtonCards from "./Components/Cards/buttons";
import Copyright from "../../Components/Copyright";
import Charts from "./Components/Cards/";
import Map from "./Components/Map";
import Footer from "../../Components/Footer";
import { Auth } from "aws-amplify";
import { GlobalUserState } from "../../Components/globalUserState";

import API from "../../utils/API";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#BB86FC",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  fixedHeight: {
    height: "70px",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  
  
  const [tripsData,setTripsData] = useState([])
  const [globalUserData, setGlobalUserData] = useContext(GlobalUserState)

  const localData = localStorage.getItem('user')
  // ---------- Use Effect hooks -------------
  useEffect(() => {
    
    console.log("global state: ",  globalUserData);
   

      localStorage.setItem('user', JSON.stringify({globalUserData}))
      
      setTripsData(globalUserData.trips)
    
    
  }, [globalUserData]);
  

  

  // ---------- Check cognito user and then get db user from cognito ID -------------
  //  API.getUser()
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position='absolute'
            className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}>
                <MenuIcon />
              </IconButton>
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                className={classes.title}>
                Welcome, {globalUserData.email}!
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant='permanent'
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth='lg' className={classes.container}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={8}>
                <Paper className={classes.paper}>
                    <Map trips={globalUserData.trips} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Charts />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <ButtonCards />
                  </Paper>
                </Grid>
              </Grid>
              <Box pt={4} pb={4}>
                <Footer />
              </Box>
            </Container>
          </main>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

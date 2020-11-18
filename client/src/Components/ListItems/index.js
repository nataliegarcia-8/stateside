import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EventIcon from "@material-ui/icons/Event";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import PersonIcon from "@material-ui/icons/Person";
import LayersIcon from "@material-ui/icons/Layers";
import { Auth } from "aws-amplify";
import { Route, Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <Route
        render={({ history }) => (
          <ListItemText
            primary="Past Trips"
            onClick={() => {
              history.push("/pasttrip");
            }}
          />
        )}
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CardTravelIcon />
      </ListItemIcon>
      <Route
        render={({ history }) => (
          <ListItemText
            primary="Current Trip"
            onClick={() => {
              history.push("/currenttrip");
            }}
          />
        )}
      />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SpeakerNotesIcon />
      </ListItemIcon>
      <Route
        render={({ history }) => (
          <ListItemText
            primary="Plan Trip"
            onClick={() => {
              history.push("/plantrip");
            }}
          />
        )}
      />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>User Settings</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Account Info" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText
        primary="Logout"
        onClick={() => {
          Auth.signOut();
        }}
      ></ListItemText>
    </ListItem>
  </div>
);

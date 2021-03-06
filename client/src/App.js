import React, { useState, useEffect } from "react";
import Login from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import NoMatch from "./Pages/NoMatch";
import PlanTrip from "./Pages/PlanTrip";
import API from "./utils/API";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth, Hub, SignIn } from "aws-amplify";
import PastTrip from "./Pages/PastTrip";
import CurrentTrip from "./Pages/CurrentTrip";
import UserState from "./Components/globalUserState";
import { Authenticator } from "aws-amplify-react";
import InternalApp from "./InternalApp"
import AuthWrapper from "./AuthWrapper";
import awsconfig from "./aws-exports";
function App() {
  
 
      return (
        <Authenticator hideDefault={true} amplifyConfig={awsconfig}>
          <AuthWrapper/>
        
        </Authenticator>
      );


}

export default App;





// import React, { useState, useEffect } from "react";
// import Login from "./Pages/LoginPage";
// import Dashboard from "./Pages/Dashboard";
// import NoMatch from "./Pages/NoMatch";
// import PlanTrip from "./Pages/PlanTrip";
// import API from "./utils/API";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Auth, Hub } from "aws-amplify";
// import PastTrip from "./Pages/PastTrip";
// import CurrentTrip from "./Pages/CurrentTrip";
// import UserState from "./Components/globalUserState";

// function App() {
//   const [loginState, setLoginState] = useState("signedOut");

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (loginState === "signedOut"){

//       checkUser();
//     }
//     setAuthListener();
//   }, []);

//   const checkUser = async () => {
//     if (user === null){

//       try {
//         const user = await Auth.currentAuthenticatedUser();
//         setUser(user);
//         console.log("user: ", user);
//         console.log("signedIn");
//         setLoginState("signedIn");
//       } catch (error) {
//         console.log(error);
        
//       }
//     } else {
      
//       return;
//     }
//   };

//   const saveNewUser = (user) => {
//     API.saveUser({
//       email: user.attributes.email,
//       cognitoId: user.username,
//     });
//   };

//   const setAuthListener = async () => {
//     Hub.listen("auth", (data) => {
//       switch (data.payload.event) {
//         case "signIn":
//           console.log("user signed in");
//           setLoginState("signedIn");
//           break;

//         case "signOut":
//           console.log("user signed out");
//           setLoginState("signedOut");

//           break;
//         default:
//           break;
//       }
//     });
//   };

//   switch (loginState) {
//     case "signedIn":
//       saveNewUser(user);
//       return (
//         <Router>
//           <div>
//             <Switch>
//               <Route exact path="/">
//                 <UserState>
//                   <Dashboard />
//                 </UserState>
//               </Route>
//               <Route exact path="/plantrip">
//                 <UserState>
//                   <PlanTrip />
//                 </UserState>
//               </Route>
//               <Route exact path="/pasttrip">
//                 <UserState>
//                   <PastTrip />
//                 </UserState>
//               </Route>
//               <Route exact path="/currenttrip">
//                 <UserState>
//                   <CurrentTrip />
//                 </UserState>
//               </Route>
//               <Route component={NoMatch} />
//             </Switch>
//           </div>
//         </Router>
//       );

//     case "signedOut":
//       return (
//         <Router>
//           <div>
//             <Switch>
//               <Route exact path="/" component={Login} />
//               <Route component={NoMatch} />
//             </Switch>
//           </div>
//         </Router>
//       );
//     default:
//       break;
//   }
// }

// export default App;
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './screens/Login';
import Home from './screens/Home';
import PrivateRoute from './feature/PrivateRoute';
import PublicRoute from './feature/PublicRoute';

import ROLE from './helpers/roles';

import Page404 from './screens/Page404';

import Setting from './screens/Setting';
import ParkingOut from './screens/ParkingOut';
import ParkingReport from './screens/ParkingReport';
import SalesReport from './screens/SalesReport';
import Membership from './screens/Membership';
import MembershipUsers from './screens/MembershipUsers';
import PackageUsers from './screens/PackageUsers';
import Home2 from './screens/Home2';
import Home3 from './screens/home3';
import Qrhelp from './helpers/Qrhelp';
import MemberhsipTypes from './screens/MembershipTypes';
import PackageTypes from './screens/PackageTypes';
import UserManagement from './screens/UserManagement';


function App() {
  return (
    <div className="App">
      {/*  page start  */}
      < main className="container-xxl vh-100 p-0" >
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute roles={[ROLE.Admin, ROLE.User]}>
                <Home2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/parking-out"
            element={
              <PrivateRoute roles={[ROLE.Admin, ROLE.User]}>
                <ParkingOut />
              </PrivateRoute>
            }
          />
          <Route
            path="/membership"
            element={
              <PrivateRoute roles={[ROLE.Admin, ROLE.User]}>
                <Membership />
              </PrivateRoute>
            }
          />

          <Route
            path="/membership-users"
            element={
              <PrivateRoute roles={[ROLE.Admin, ROLE.User]}>
                <MembershipUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/package-users"
            element={
              <PrivateRoute roles={[ROLE.Admin, ROLE.User]}>
                <PackageUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/parking-report"
            element={
              <PrivateRoute roles={[ROLE.Admin, ROLE.User]}>
                <ParkingReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/sales-report"
            element={
              <PrivateRoute roles={[ROLE.Admin]}>
                <SalesReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <PrivateRoute roles={[ROLE.Admin]}>
                <Setting />
              </PrivateRoute>
            }
          />
          <Route
            path="/membership-types"
            element={
              <PrivateRoute roles={[ROLE.Admin]}>
                <MemberhsipTypes />
              </PrivateRoute>
            }
          />
          <Route
            path="/package-types"
            element={
              <PrivateRoute roles={[ROLE.Admin]}>
                <PackageTypes />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <PrivateRoute roles={[ROLE.Admin]}>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <Page404 />
            }
          />
          <Route
            path="/home2"
            element={
              <Home2 />
            }
          />
          <Route
            path="/home3"
            element={
              <Home3 />
            }
          />
          <Route
            path="/qrprint"
            element={
              <Qrhelp />
            }
          />
        </Routes>
      </main>
      {/* page end  */}
    </div>
  );

}

export default App;

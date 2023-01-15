
import './App.css'
import React from 'react'
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Screen/Login'
import Dashboard from './components/Dashboard/Dashboard'
import User from './components/Dashboard/User/User';
import Articles from './components/Dashboard/Articles/Articles';
import ReadMoreArticle from './components/Dashboard/Articles/ReadMoreArticle';
import AdminUserList from './components/Dashboard/Admin/AdminUserList';
import QueriesList from './components/Dashboard/Queries/QueriesList';
import ViewQuery from './components/Dashboard/Queries/ViewQuery';
import Logs from './components/Dashboard/Logs/Logs';
import Hits from './components/Dashboard/Hits/Hits';
import PrivateRoutes from './components/Dashboard/PrivateRoutes/PrivateRoutes';
import BroadCast from './components/Dashboard/BroadCast/BroadCast';
function Routing() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/dashboard"  element={<PrivateRoutes Component={Dashboard}/>}> </Route>

          {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
          <Route exact path="/user" element={<PrivateRoutes Component={User}/>}> </Route>
          <Route exact path="/articles"  element={<PrivateRoutes Component={Articles}/>}> </Route>
          <Route exact path="/articles/:id"  element={<PrivateRoutes Component={ReadMoreArticle}/>}> </Route>
          <Route exact path="/adminlists"  element={<PrivateRoutes Component={AdminUserList}/>}> </Route>
          <Route exact path="/queries"  element={<PrivateRoutes Component={QueriesList}/>}> </Route>
          <Route exact path="/queries/:id"  element={<PrivateRoutes Component={ViewQuery}/>}> </Route>
          <Route exact path="/logs"  element={<PrivateRoutes Component={Logs}/>}> </Route>
          <Route exact path="/hits"  element={<PrivateRoutes Component={Hits}/>}> </Route>
          <Route exact path="/broadcast"  element={<PrivateRoutes Component={BroadCast}/>}> </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default Routing  
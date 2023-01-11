
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
function Routing() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/articles" element={<Articles />} />
          <Route exact path="/articles/:id" element={<ReadMoreArticle />} />
          <Route exact path="/adminlists" element={<AdminUserList />} />
          <Route exact path="/queries" element={<QueriesList />} />
          <Route exact path="/queries/:id" element={<ViewQuery />} />
          <Route exact path="/logs" element={<Logs />} />
          <Route exact path="/hits" element={<Hits />} />
        </Routes>
      </Router>

    </div>
  )
}

export default Routing  
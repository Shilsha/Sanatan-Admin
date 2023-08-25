
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Screen/Login'
import Dashboard from './components/Dashboard/Dashboard'
import User from './components/Dashboard/User/User';
import Articles from './components/Dashboard/Articles/Articles';
import ReadMoreArticle from './components/Dashboard/Articles/ReadMoreArticle';
import AdminUserList from './components/Dashboard/Admin/AdminUserList';
import AdminUserProfile from './components/Dashboard/Admin/AdminUserProfile';
import QueriesList from './components/Dashboard/Queries/QueriesList';
import ViewQuery from './components/Dashboard/Queries/ViewQuery';
import Logs from './components/Dashboard/Logs/Logs';
import Hits from './components/Dashboard/Hits/Hits';
import FeedbackList from './components/Dashboard/Feedbacks/FeedbackList';
import PrivateRoutes from './components/Dashboard/PrivateRoutes/PrivateRoutes';
import BroadCast from './components/Dashboard/BroadCast/BroadCast';
import BlogsPost from './components/Dashboard/BlogsPost/BlogsPost';
import Profile from './components/Dashboard/Profile/Profile';
import BlogReview from './components/Dashboard/BlogsPost/BlogReview';
import BlogCategory from './components/Dashboard/BlogsPost/BlogCategory';
import BlogHistory from './components/Dashboard/BlogsPost/BlogHistory';
import BlogReview2 from './components/Dashboard/BlogsPost/BlogReview2';
import SingleViewHistory from './components/Dashboard/BlogsPost/SingleViewHistory';
import BlogReject from './components/Dashboard/BlogsPost/BlogReject';
import SingleBlogReject from './components/Dashboard/BlogsPost/SingleBlogReject';
import UpdateBlog from './components/Dashboard/BlogsPost/UpdateBlog';
import DraftedBlogs from './components/Dashboard/BlogsPost/DraftedBlogs';
import SingleDraftView from './components/Dashboard/BlogsPost/SingleDraftView';
import SingleInactiveView from './components/Dashboard/BlogsPost/SingleInactiveView';
import BlogInactive from './components/Dashboard/BlogsPost/BlogInactive';
import RepresentativeHome from './components/Dashboard/Anushthan/Representative/RepresentativeHome';
import UserCallsQueries from './components/Dashboard/Anushthan/Representative/UserCallsQueries';
import InterstedCallsList from './components/Dashboard/Anushthan/Representative/InterstedCallsList';
import ClientList from './components/Dashboard/Anushthan/Representative/ClientList';
import AnushthanRunningtatus from './components/Dashboard/Anushthan/Representative/AnushthanRunningStatus';
import PanditJiHome from './components/Dashboard/Anushthan/PanditJiModule/PanditJiHome';
import UserMeetingLinks from './components/Dashboard/Anushthan/PanditJiModule/UserMeetingLinks';
import PanditAnushthanRunningStatus from './components/Dashboard/Anushthan/PanditJiModule/PanditAnushthanRunningStatus';
import ClientProfileFull from './components/Dashboard/Anushthan/Client/ClientProfileFull';
import ClientForm from './components/Dashboard/Anushthan/Client/ClientForm';
import AnushthanDetails from './components/Dashboard/Anushthan/Client/AnushthanDetails';
import FamilyDetails from './components/Dashboard/Anushthan/Client/FamilyDetails';
import TalkToPanditJi from './components/Dashboard/Anushthan/Client/TalkToPanditJi';
import PaymentsList from './components/Dashboard/Anushthan/Client/PaymentsList';
import CallNotes from './components/Dashboard/Anushthan/Client/CallNotes';
import ViewProfile from './components/Dashboard/Anushthan/Representative/ViewProfile';
import blogSearchAll from './components/Dashboard/BlogsPost/BlogsSearchAll';
import AnushthanHome from './components/Dashboard/Anushthan/AnushthanHome';
import AddAnushthan from './components/Dashboard/Anushthan/AddAnushthan';
import SingleAnushthanView from './components/Dashboard/Anushthan/SingleAnushthanView';
import UpdateAnushthan from './components/Dashboard/Anushthan/UpdateAnushthan';
import Test from './components/Test';


function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/test" element={<Test/>} />

          <Route exact path="/dashboard" element={<PrivateRoutes Component={Dashboard} />}> </Route>
          <Route exact path="/users" element={<PrivateRoutes Component={User} />}> </Route>
          <Route exact path="/dashboard/profile" element={<PrivateRoutes Component={Profile} />}> </Route>
          <Route exact path="/adminlists" element={<PrivateRoutes Component={AdminUserList} />}> </Route>
          <Route exact path="/adminlists/:ids" element={<PrivateRoutes Component={AdminUserProfile} />}> </Route>
          <Route exact path="/queries" element={<PrivateRoutes Component={QueriesList} />}> </Route>
          <Route exact path="/queries/:id" element={<PrivateRoutes Component={ViewQuery} />}> </Route>
          <Route exact path="/logs" element={<PrivateRoutes Component={Logs} />}> </Route>
          <Route exact path="/hits" element={<PrivateRoutes Component={Hits} />}> </Route>
          <Route exact path="/feedbacks" element={<PrivateRoutes Component={FeedbackList} />}> </Route>
          <Route exact path="/broadcast" element={<PrivateRoutes Component={BroadCast} />}> </Route>
          <Route exact path="/blogsPost" element={<PrivateRoutes Component={BlogsPost} />}> </Route>
          <Route exact path="/blog" element={<PrivateRoutes Component={BlogReview} />}> </Route>
          <Route exact path="/blogCategory" element={<PrivateRoutes Component={BlogCategory} />}> </Route>
          <Route exact path="/updateBlog/:id" element={<PrivateRoutes Component={UpdateBlog} />}> </Route>
          <Route exact path="/blogHistory" element={<PrivateRoutes Component={BlogHistory} />}> </Route>
          <Route exact path="/blogSearchAll" element={<PrivateRoutes Component={blogSearchAll} />}> </Route>
          <Route exact path="/blogInactive" element={<PrivateRoutes Component={BlogInactive} />}> </Route>
          <Route exact path="/blogReview" element={<PrivateRoutes Component={BlogReview2} />}> </Route>
          <Route exact path="/blogDrafted" element={<PrivateRoutes Component={DraftedBlogs} />}> </Route>
          <Route exact path="/blogReject" element={<PrivateRoutes Component={BlogReject} />}> </Route>
          <Route exact path="/blogReject/:id" element={<PrivateRoutes Component={SingleBlogReject} />}> </Route>
          <Route exact path="/blogReview/:id" element={<PrivateRoutes Component={ReadMoreArticle} />}> </Route>
          <Route exact path="/blogHistory/:id" element={<PrivateRoutes Component={SingleViewHistory} />}> </Route>
          <Route exact path="/blogDrafted/:id" element={<PrivateRoutes Component={SingleDraftView} />}> </Route>
          <Route exact path="/blogInactive/:id" element={<PrivateRoutes Component={SingleInactiveView} />}> </Route>
          <Route exact path="/AnushthanHome" element={<PrivateRoutes Component={AnushthanHome} />}> </Route>
          <Route exact path="/RepresentativeHome" element={<PrivateRoutes Component={RepresentativeHome} />}> </Route>
          <Route exact path="/UserCallsQueries/:id" element={<PrivateRoutes Component={ViewProfile} />}> </Route>
          <Route exact path="/UserCallsQueries" element={<PrivateRoutes Component={UserCallsQueries} />}> </Route>
          <Route exact path="/interstedCallsList" element={<PrivateRoutes Component={InterstedCallsList} />}> </Route>
          <Route exact path="/ClientList" element={<PrivateRoutes Component={ClientList} />}> </Route>
          <Route exact path="/AnushthanRunningtatus" element={<PrivateRoutes Component={AnushthanRunningtatus} />}> </Route>
          <Route exact path="/addAnushthan" element={<PrivateRoutes Component={AddAnushthan} />}> </Route>
          <Route exact path="/addAnushthan/:id" element={<PrivateRoutes Component={SingleAnushthanView} />}> </Route>
          <Route exact path="/updateAnushthan/:id" element={<PrivateRoutes Component={UpdateAnushthan} />}> </Route>
          <Route exact path="/PanditJiHome" element={<PrivateRoutes Component={PanditJiHome} />}> </Route>
          <Route exact path="/UserMeetingLinks" element={<PrivateRoutes Component={UserMeetingLinks} />}> </Route>
          <Route exact path="/PanditAnushthanRunningStatus" element={<PrivateRoutes Component={PanditAnushthanRunningStatus} />}> </Route>
          <Route exact path="/ClientProfile" element={<PrivateRoutes Component={ClientProfileFull} />}>
            <Route exact path="/ClientProfile/" element={<PrivateRoutes Component={ClientForm} />}></Route>
            <Route exact path="/ClientProfile/AnushthanDetails" element={<PrivateRoutes Component={AnushthanDetails} />}></Route>
            <Route exact path="/ClientProfile/FamilyDetails" element={<PrivateRoutes Component={FamilyDetails} />}></Route>
            <Route exact path="/ClientProfile/TalkToPanditJi" element={<PrivateRoutes Component={TalkToPanditJi} />}></Route>
            <Route exact path="/ClientProfile/CallNotes" element={<PrivateRoutes Component={CallNotes} />}></Route>
            <Route exact path="/ClientProfile/PaymentsList" element={<PrivateRoutes Component={PaymentsList} />}></Route>
          </Route>
        </Routes>

      </Router>

    </div>
  )
}

export default Routing  
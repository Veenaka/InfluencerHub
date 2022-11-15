import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/admin-pages/Home";
import AllUsers from "./components/admin-pages/AllUsers";
import NewUsers from "./components/admin-pages/NewUsers";
import AdminLogin from "./components/admin-pages/AdminLogin";
import CommentReports from "./components/admin-pages/CommentReports";
import AccountReports from "./components/admin-pages/AccountReports";
import SuspendedUsers from "./components/admin-pages/SuspendedUsers";
import AdminSettings from "./components/admin-pages/AdminSettings";
import FirstLogin from "./components/admin-pages/FirstLogin";
import Category from "./components/Category/category";
import EditAccount from "./components/admin-pages/EditAccount";
import Main from "./components/Main";
import Signup from "./components/Signup";
import SignupBusiness from "./components/Signup/indexb";
import Login from "./components/Login";
import Business from "./components/Business";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword/index";
import PasswordReset from "./components/PasswordReset";
import Payment from "./components/Payment";
import Update from "./components/Update/Update";
import Detail from "./components/Detail";
import View from "./components/View";
import Search from "./components/Search";
import Filter from "./components/Filter";
import ViewAdmin from "./components/ViewAdmin";
import ProfileView from "./components/ProfileView";
import CreatePost from "./components/posts-and-comments/CreatePost";
import EditPost from "./components/posts-and-comments/EditPost";
import AllPosts from "./components/posts-and-comments/AllPosts";
import PostDetails from "./components/posts-and-comments/PostDetails";
import Report from "./components/Report";
import AddProject from "./components/projects-and-events/AddProject";
import AllInfluencerProjects from "./components/projects-and-events/AllInfluencerProjects";
import AddEvents from "./components/projects-and-events/AddEvents";
import AllInfluencerEvents from "./components/projects-and-events/AllInfluencerEvents";
import AllBusinessEvents from "./components/projects-and-events/AllBusinessEvents";
import ChooseInfluencer from "./components/projects-and-events/ChooseInfluencer";
import ViewNotifications from "./components/Notifications/index";
import Image from "./components/Test/Image";
import FirstLogini from "./components/Main/FirstLogini";
import PendingList from "./components/projects-and-events/PendingList";
import AllBusinessProjects from "./components/projects-and-events/AllBusinessProjects";
import PendingEvents from "./components/projects-and-events/PendingEvents";
import FirstLoginb from "./components/Business/FirstLoginb";

import Updateb from "./components/Update/Updateb";
import Paymenti from "./components/Payment/Paymenti";
import Paymentb from "./components/Payment/Paymentb";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="adminlogin" element={<AdminLogin />}></Route>
      <Route>
        <Route path="dashboard" element={<Home />} />
        <Route path="allUsers" element={<AllUsers />} />
        <Route path="newUsers" element={<NewUsers />} />
        <Route path="accountReports" element={<AccountReports />} />
        <Route path="commentReports" element={<CommentReports />} />
        <Route path="suspendedusers" element={<SuspendedUsers />} />
        <Route path="adminsettings" element={<AdminSettings />} />
        <Route path="firstlogin" element={<FirstLogin />} />
        <Route path="editaccount" element={<EditAccount />} />
      </Route>
      {user && <Route path="/login" exact element={<Login />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signupb" exact element={<SignupBusiness />} />
      <Route path="/category" exact element={<Category />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" element={<Main />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="/detail" exact element={<Detail />} />
      <Route path="/search" exact element={<Search />} />
      <Route path="/view/:id" exact element={<View />} />
      <Route path="/viewadmin/:id" exact element={<ViewAdmin />} />
      <Route path="/filter" exact element={<Filter />} />
      <Route path="/business" exact element={<Business />} />
      <Route path="/payment/:id" exact element={<Payment />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/profileview/:id" exact element={<ProfileView />} />
      <Route path="/allposts" element={<AllPosts />}></Route>
      <Route path="/addpost" element={<CreatePost />}></Route>
      <Route path="/editpost/:id" element={<EditPost />}></Route>
      <Route path="/post/:id" element={<PostDetails />}></Route>
      <Route path="/viewnotifications" element={<ViewNotifications />}></Route>
      <Route
        path="/addEvents/:projectName/:projectID"
        element={<AddEvents />}
      />
      <Route path="/imagee" element={<Image />} />
      <Route path="/firstlogini" element={<FirstLogini />} />
      <Route path="/firstloginb" element={<FirstLoginb />} />
      <Route path="/report/:id" exact element={<Report />} />
      <Route path="/manageprojects" element={<ChooseInfluencer />} />
      <Route path="/addProject/:influencerID" element={<AddProject />} />
      <Route path="/updateb/:id" element={<Updateb />} />
      <Route path="/paymenti/:id" element={<Paymenti/>} />
      <Route path="/paymentb/:id" element={<Paymentb/>} />
      <Route
        path="/allInfluencerprojects"
        element={<AllInfluencerProjects />}
      />
      <Route path="/allBusinessprojects" element={<AllBusinessProjects />} />
      <Route
        path="/addEvents/:projectName/:projectID"
        element={<AddEvents />}
      />
      <Route
        path="/allInfluencerEvents/:projectName/:projectID"
        element={<AllInfluencerEvents />}
      />
      <Route
        path="/allBusinessEvents/:projectName/:projectID"
        element={<AllBusinessEvents />}
      />
      <Route path="/acceptProjects" element={<PendingList />} />

      <Route
        path="/acceptEvents/:projectName/:projectID"
        element={<PendingEvents />}
      />
    </Routes>
  );
}

export default App;

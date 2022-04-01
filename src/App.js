import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Login } from "./components/Login";
import { NotFound } from "./components/ErrorPages/NotFound";
import RequireAuth from "./components/RequireAuth";
import { UserPage } from './features/auth/UserPage'
import { Chat } from './features/chat'
import { MainCall } from './features/makeCall'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<React.Fragment><Login /></React.Fragment>} />
        {/* Routes which must be protected */}
        <Route path="/" element={<RequireAuth><MainLayout /></RequireAuth>} >
          <Route index element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="posts" element={<RequireAuth><PostsList /></RequireAuth>} />
          <Route path="profile" element={<RequireAuth><UserPage /></RequireAuth>} />
          <Route path="call" element={<RequireAuth><MainCall /></RequireAuth>} />
          <Route path="chat" element={<RequireAuth><Chat /></RequireAuth>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


export const Home = () => {
  return <div>Home page</div>
}

export const PostsList = () => {
  return <div>Posts page</div>
}

export const Profile = () => {
  return <div>Profile page</div>
}


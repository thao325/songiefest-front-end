import React from "react";
// import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ExplorePage from "./Forms/ExplorePage";
import LoginPage from "./Forms/LoginForm";
import MusicPostPage from "./Forms/MusicPostPage";
import HomePage from "./Pages/HomePage";
import { Register } from "./Forms/Register.jsx";
import axios from "axios";

const baseUrl = "https://songiefest-be.herokuapp.com/";

// convert API data to Json
const convertMusicPostFromApi = (apiMusicPost) => {
  const { id, username, date_published, likes_count } = apiMusicPost;
  const newMusicPost = { id, username, datePublished, likesCount };
  return newMusicPost;
};

const convertCommentFromApi = (apiComment) => {
  const { id, text, date_published } = apiComment;
  const newComment = { id, text, datePublished };
  return newComment;
};

const convertSongFromApi = (apiSong) => {
  const { id, title, artist, album, play_count } = apiSong;
  const newSong = { id, title, artist, album, playCount };
  return newSong;
};

const convertUserFromApi = (apiUser) => {
  const { id, email, username, date_published } = apiUser;
  const newUser = { id, email, username, datePublished };
  return newUser;
};

// ===  get all music posts/ EXPLORE PAGE  ===
// function not done 
// const getAllMusicPostsApi = async () => {
//   try {
//     const response = await axios.get(`${baseUrl}explore/`);
//     console.log("API music posts data", response.data);
//     // convert API data from backend 
//     return response.data.map(convertMusicPostFromApi);
//   } catch (error) {
//     console.log(error);
//   };

// };




// do we want users to post a music post?




function App() {





  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <h1>SongieFest</h1>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/explore" element={<ExplorePage />} exact />
            <Route path="/login" element={<LoginPage />} exact />
            <Route path="/musicpost/:id" element={<MusicPostPage />} />
            <Route path="/register" element={<Register />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

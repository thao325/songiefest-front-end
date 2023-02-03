import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import MusicPost from "../components/MusicPost";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listMusicPosts } from "../actions/productActions";

// useSelector lets select certain parts of our state (our redux store)
function HomePage() {
  const dispatch = useDispatch();
  const musicPostList = useSelector((state) => musicPostList);
  const { error, loading, musicPosts } = musicPostList; // an object

  // dispatch to fire off listMusicPosts, call the function to update the store
  useEffect(() => {
    dispatch(listMusicPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Music Posts</h1>
      {/* while posts are loading, render loading message */}
      {loading ? (
        <Loader />
      ) : // if error, render error message.
      // passing error as a child into this component
      error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // if not loading & we don't have an error, render this row back
        <Row>
          {musicPosts.map((musicPost) => (
            <Col key={musicPost.id} sm={12} md={6} lg={4} xL={3}>
              <MusicPost musicPost={musicPost} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomePage;
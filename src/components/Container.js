import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useTopicList from "../Hooks/useTopiclist";
// import styled from "../styles/container.module.css";
import "../styles/global.css";
import Item from "./Item";

export default function Container() {
  const [Page, setPage] = useState(1);
  const { load, error, topics, hasMore } = useTopicList(Page);
  // console.log("Current page:", Page);
  // console.log("Topics loaded:", topics.length);
  // console.log(topics);

  return (
    <div>
      {topics.length > 0 && (
        <InfiniteScroll
          dataLength={topics.length}
          hasMore={true}
          loader={hasMore ? "Loading....." : ""}
          next={() => setPage((prev) => prev + 13)}
        >
          {topics.map((topic) => (
            <Link to={`/quiz/${topic.ID}`} key={topic.ID}>
              <Item
                name={topic.name}
                image={topic.image}
                id={topic.ID}
                noq={topic.noq}
              />
              {/* {console.log(topic)} */}
            </Link>
          ))}
        </InfiniteScroll>
      )}

      {!hasMore && topics.length > 0 && (
        <p style={{ textAlign: "center", marginTop: "1rem", color: "#888" }}>
          🎉 You have reached the end!
        </p>
      )}
      {!load && topics.length === 0 && <p className="load">No data found</p>}
      {load && <p className="load">Loading.....</p>}
      {error && <p className="load">There was an error!</p>}
    </div>
  );
}

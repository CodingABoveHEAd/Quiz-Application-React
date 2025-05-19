import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useTopicList(page) {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [topics, setTopics] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      const db = getDatabase();
      const topicsRef = ref(db, "topics");

      const topicQuery = query(
        topicsRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(13)
      );

      try {
        setError(false);
        setLoad(true);

        const snapshot = await get(topicQuery);
        setLoad(false);

        if (snapshot.exists()) {
          const newTopics = Object.values(snapshot.val());

          setTopics((prevTopics) => {
            const existingIDs = new Set(prevTopics.map((t) => t.ID));
            const uniqueTopics = newTopics.filter(
              (t) => !existingIDs.has(t.ID)
            );
            return [...prevTopics, ...uniqueTopics];
          });

          if (newTopics.length < 4) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setLoad(false);
      }
    }

    fetchTopics();
  }, [page]);

  return {
    load,
    error,
    topics,
    hasmore: hasMore,
  };
}

import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswer(ID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [Answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const AnswersRef = ref(db, `answers/${ID}/questions`);
      const AnswerQuery = query(AnswersRef, orderByKey());

      try {
        setError(false);
        setLoading(true);

        const snapshot = await get(AnswerQuery);
        setLoading(false);

        if (snapshot.exists()) {
          const newAnswers = Object.values(snapshot.val());

          setAnswers((prevAnswers) => {
            const existingIndexes = new Set(prevAnswers.map((q) => q.index));

            const uniqueAnswers = newAnswers.filter(
              (q) => !existingIndexes.has(q.index)
            );

            return [...prevAnswers, ...uniqueAnswers];
          });
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }

    fetchAnswers();
  }, [ID]);

  return {
    loading,
    error,
    Answers,
  };
}

import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestion(ID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const questionsRef = ref(db, `quiz/${ID}/questions`);
      const questionQuery = query(questionsRef, orderByKey());

      try {
        setError(false);
        setLoading(true);

        const snapshot = await get(questionQuery);
        setLoading(false);

        if (snapshot.exists()) {
          const newQuestions = Object.values(snapshot.val());

          setQuestions((prevQuestions) => {
            const existingIndexes = new Set(prevQuestions.map((q) => q.index));

            const uniqueQuestions = newQuestions.filter(
              (q) => !existingIndexes.has(q.index)
            );

            return [...prevQuestions, ...uniqueQuestions];
          });
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [ID]);

  return {
    loading,
    error,
    questions,
  };
}

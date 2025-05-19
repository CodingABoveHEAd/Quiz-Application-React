import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useHelp() {
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const [helps, setHelps] = useState([]);

  useEffect(() => {
    async function fetchHelps() {
      const db = getDatabase();
      const helpsRef = ref(db, "helps");
      const helpQuery = query(helpsRef, orderByKey());

      try {
        setError(false);
        setLoad(true);

        const snapshot = await get(helpQuery);
        setLoad(false);

        if (snapshot.exists()) {
          const newHelps = Object.values(snapshot.val());

          setHelps((prevHelps) => {
            const existingIDs = new Set(prevHelps.map((t) => t.ID));
            const uniqueHelps = newHelps.filter((t) => !existingIDs.has(t.ID));
            return [...prevHelps, ...uniqueHelps];
          });
        }
      } catch (err) {
        console.error(err);
        setError(true);
        setLoad(false);
      }
    }
    fetchHelps();
  }, []);

  return {
    load,
    error,
    helps,
  };
}

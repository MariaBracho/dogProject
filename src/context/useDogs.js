import { useCallback, useEffect } from "react";
import useDogsContext from "./useDogsContext";
import getDogs from "../service/getDogs";

export default function useDogs() {
  const { setListOfDogs, listOfDogs } = useDogsContext();

  const fetchListOfDogs = useCallback(() => {
    getDogs({ limit: 5 })
      .then((dogs = []) => {
        localStorage.setItem("listOfDogs", JSON.stringify(dogs));
        setListOfDogs(dogs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setListOfDogs]);

  useEffect(() => {
    const listOfDogsHasEmpty = listOfDogs.length === 0;
    if (listOfDogsHasEmpty) {
      fetchListOfDogs();
    }
  }, [listOfDogs, fetchListOfDogs]);

  return { listOfDogs, fetchListOfDogs };
}

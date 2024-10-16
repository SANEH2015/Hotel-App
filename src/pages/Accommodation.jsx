import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccommodations } from "../features/accommodationSlice";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Accommodation = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.list);

  // Only fetch accommodations if the Redux state is empty (e.g., initial load)
  useEffect(() => {
    if (accommodations.length === 0) {
      const fetchAccommodations = async () => {
        const querySnapshot = await getDocs(collection(db, "accommodations"));
        const accommodationsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch(setAccommodations(accommodationsList));
      };

      fetchAccommodations();
    }
  }, [dispatch, accommodations.length]); // Depend on `accommodations.length` to avoid fetching again if the list is not empty

  return (
    <div className="space-y-4">
      {accommodations.map((accommodation) => (
        <div key={accommodation.id} className="border rounded-md p-4 shadow-sm">
          <h2 className="text-xl font-semibold">{accommodation.name}</h2>
          <p className="text-gray-600">{accommodation.description}</p>
          <p className="text-gray-800">Price: ${accommodation.price} per night</p>
          {accommodation.imageUrl && <img src={accommodation.imageUrl} alt={accommodation.name} className="mt-2 w-full h-auto" />}
        </div>
      ))}
    </div>
  );
};

export default Accommodation;

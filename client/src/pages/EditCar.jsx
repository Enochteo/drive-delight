import React, { useEffect, useState } from "react";
import "../App.css";
import CarForm from "../components/CarForm";
import { fetchCar, updateCar } from "../services/CarsAPI";
import { useParams, useNavigate } from "react-router-dom";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCar(id);
        if (mounted) setInitial(data);
      } catch (err) {
        console.error("fetch car failed", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      await updateCar(id, payload);
      alert("Car updated");
      navigate("/customcars");
    } catch (err) {
      console.error("update failed", err);
      alert("Failed to update car");
    }
  };

  if (!initial) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit car</h2>
      <CarForm initial={initial} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditCar;

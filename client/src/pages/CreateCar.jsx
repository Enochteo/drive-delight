import React from "react";
import "../App.css";
import CarForm from "../components/CarForm";
import { createCar } from "../services/CarsAPI";

const CreateCar = () => {
  const handleSubmit = async (payload) => {
    try {
      await createCar(payload);
      // you might want to navigate to /customcars after creation
      alert("Car saved");
    } catch (err) {
      console.error("create failed", err);
      alert("Failed to save car");
    }
  };

  return (
    <div>
      <h2>Customize your car</h2>
      <CarForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCar;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./CarDetails.css";
import CarPreview from "../components/CarPreview";
import { fetchCar, deleteCar } from "../services/CarsAPI";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCar(id);
        if (mounted) setCar(data);
      } catch (err) {
        console.error("fetch car failed", err);
        if (mounted) setError("Unable to load car");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this car?")) return;
    try {
      setDeleting(true);
      await deleteCar(id);
      navigate("/customcars");
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + (err.message || "unknown error"));
      setDeleting(false);
    }
  };

  if (loading) return <div className="cars-loading">Loading…</div>;
  if (error) return <div className="cars-error">Error: {error}</div>;
  if (!car) return <div className="cars-empty">Car not found</div>;

  return (
    <main className="car-details-page">
      <div className="car-details-top">
        <CarPreview
          name={car.name}
          exterior={car.exterior}
          roof={car.roof}
          wheels={car.wheels}
          interior={car.interior}
        />
        <div className="car-details-actions">
          <Link to={`/edit/${car.id}`} className="btn">
            Edit
          </Link>
          <button
            className="btn outline"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
          <Link to="/customcars" className="btn outline">
            Back
          </Link>
        </div>
      </div>

      <section className="car-details-specs">
        <h2>{car.name}</h2>
        <dl>
          <div>
            <dt>Exterior</dt>
            <dd>{car.exterior}</dd>
          </div>
          <div>
            <dt>Roof</dt>
            <dd>{car.roof}</dd>
          </div>
          <div>
            <dt>Wheels</dt>
            <dd>{car.wheels}</dd>
          </div>
          <div>
            <dt>Interior</dt>
            <dd>{car.interior}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default CarDetails;

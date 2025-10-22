import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./ViewCars.css";
import { fetchCars, deleteCar } from "../services/CarsAPI.js";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCars();
        if (!mounted) return;
        if (!Array.isArray(data)) {
          setCars([]);
          setError("Unexpected response from server");
        } else {
          setCars(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching Cars", err);
        if (mounted) setError("Unable to load cars");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="cars-loading">Loading cars…</div>;
  if (error) return <div className="cars-error">Error: {error}</div>;

  if (!cars.length) {
    return (
      <div className="cars-empty">
        <p>No custom cars found.</p>
        <Link to="/" className="btn">
          Create a new car
        </Link>
      </div>
    );
  }

  return (
    <section className="cars-grid" aria-live="polite">
      {cars.map((car) => {
        if (!car || Number.isNaN(Number(car.id))) return null;
        return (
          <article className="car-card" key={car.id}>
            <h3 className="car-name">
              <Link to={`/customcars/${car.id}`}>{car.name || "Untitled"}</Link>
            </h3>

            <dl className="car-specs">
              <div>
                <dt>Exterior</dt>
                <dd>{car.exterior || "—"}</dd>
              </div>
              <div>
                <dt>Interior</dt>
                <dd>{car.interior || "—"}</dd>
              </div>
              <div>
                <dt>Roof</dt>
                <dd>{car.roof || "—"}</dd>
              </div>
              <div>
                <dt>Wheels</dt>
                <dd>{car.wheels || "—"}</dd>
              </div>
            </dl>

            <div className="car-actions">
              <Link to={`/edit/${car.id}`} className="btn small">
                Edit
              </Link>
              <Link to={`/customcars/${car.id}`} className="btn outline small">
                View
              </Link>
              <button
                onClick={async () => {
                  if (!confirm("Delete this car?")) return;
                  try {
                    setDeletingId(car.id);
                    await deleteCar(car.id);
                    setCars((prev) => prev.filter((c) => c.id !== car.id));
                  } catch (err) {
                    console.error("delete failed", err);
                    alert("Delete failed: " + (err.message || "unknown"));
                  } finally {
                    setDeletingId(null);
                  }
                }}
                className="btn small"
                disabled={deletingId === car.id}
                aria-label={`Delete ${car.name || "car"}`}
              >
                {deletingId === car.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ViewCars;

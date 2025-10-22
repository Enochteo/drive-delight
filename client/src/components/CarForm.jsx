import React, { useMemo, useState } from "react";
import CarPreview from "./CarPreview";
import {
  exteriorOptions,
  roofOptions,
  wheelsOptions,
  interiorOptions,
} from "../data/customizationOptions";
import "./CarForm.css";

const formatPrice = (n) => `$${n.toLocaleString()}`;

const CarForm = ({ initial = {}, onSubmit }) => {
  const [name, setName] = useState(initial.name || "");
  const [exterior, setExterior] = useState(
    initial.exterior || exteriorOptions[0].value
  );
  const [roof, setRoof] = useState(initial.roof || roofOptions[0].value);
  const [wheels, setWheels] = useState(
    initial.wheels || wheelsOptions[0].value
  );
  const [interior, setInterior] = useState(
    initial.interior || interiorOptions[0].value
  );

  const price = useMemo(() => {
    const base = 25000; // example base price
    const extras = [
      exteriorOptions.find((o) => o.value === exterior)?.price || 0,
      roofOptions.find((o) => o.value === roof)?.price || 0,
      wheelsOptions.find((o) => o.value === wheels)?.price || 0,
      interiorOptions.find((o) => o.value === interior)?.price || 0,
    ].reduce((a, b) => a + b, 0);
    return base + extras;
  }, [exterior, roof, wheels, interior]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, exterior, roof, wheels, interior, price });
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <div className="car-form-row">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="car-form-grid">
        <section>
          <h4>Exterior</h4>
          <div className="selected-feature">
            {exteriorOptions.find((o) => o.value === exterior)?.label}{" "}
            <span className="muted">
              +${exteriorOptions.find((o) => o.value === exterior)?.price || 0}
            </span>
          </div>
          <div className="swatch-grid">
            {exteriorOptions.map((opt) => (
              <button
                type="button"
                key={opt.id}
                className={`swatch ${opt.value === exterior ? "selected" : ""}`}
                onClick={() => setExterior(opt.value)}
                title={`${opt.label} (+$${opt.price})`}
              >
                <span
                  className="swatch-color"
                  style={{ background: opt.color || "#ccc" }}
                />
                <small>{opt.label}</small>
              </button>
            ))}
          </div>

          <h4>Roof</h4>
          <div className="selected-feature">
            {roofOptions.find((o) => o.value === roof)?.label}{" "}
            <span className="muted">
              +${roofOptions.find((o) => o.value === roof)?.price || 0}
            </span>
          </div>
          <div className="swatch-grid">
            {roofOptions.map((opt) => (
              <button
                type="button"
                key={opt.id}
                className={`swatch ${opt.value === roof ? "selected" : ""}`}
                onClick={() => setRoof(opt.value)}
              >
                <small>{opt.label}</small>
                <small className="muted">+${opt.price}</small>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h4>Wheels</h4>
          <div className="selected-feature">
            {wheelsOptions.find((o) => o.value === wheels)?.label}{" "}
            <span className="muted">
              +${wheelsOptions.find((o) => o.value === wheels)?.price || 0}
            </span>
          </div>
          <div className="swatch-grid">
            {wheelsOptions.map((opt) => (
              <button
                type="button"
                key={opt.id}
                className={`swatch ${opt.value === wheels ? "selected" : ""}`}
                onClick={() => setWheels(opt.value)}
                title={`${opt.label} (+$${opt.price})`}
              >
                <div
                  className="swatch-wheel"
                  dangerouslySetInnerHTML={{ __html: opt.svg || "" }}
                />
                <small>{opt.label}</small>
              </button>
            ))}
          </div>

          <h4>Interior</h4>
          <div className="selected-feature">
            {interiorOptions.find((o) => o.value === interior)?.label}{" "}
            <span className="muted">
              +${interiorOptions.find((o) => o.value === interior)?.price || 0}
            </span>
          </div>
          <div className="swatch-grid">
            {interiorOptions.map((opt) => (
              <button
                type="button"
                key={opt.id}
                className={`swatch ${opt.value === interior ? "selected" : ""}`}
                onClick={() => setInterior(opt.value)}
              >
                <small>{opt.label}</small>
                <small className="muted">+${opt.price}</small>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="form-bottom">
        <CarPreview
          name={name}
          exterior={exterior}
          roof={roof}
          wheels={wheels}
          interior={interior}
        />
        <div className="price-block">
          <div className="price-label">Estimated price</div>
          <div className="price-value">{formatPrice(price)}</div>
          <button type="submit" className="btn primary">
            Save Car
          </button>
        </div>
      </div>
    </form>
  );
};

export default CarForm;

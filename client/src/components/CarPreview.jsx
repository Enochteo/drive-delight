import React from "react";
import "./CarPreview.css";
import { exteriorOptions, wheelsOptions } from "../data/customizationOptions";

const CarPreview = ({ name, exterior, roof, wheels, interior }) => {
  const exteriorOpt = exteriorOptions.find((o) => o.value === exterior);
  const wheelsOpt = wheelsOptions.find((o) => o.value === wheels);

  const bg = exteriorOpt?.color || "#eee";
  const roofStyle = roof === "black_contrast" ? { background: "#111" } : {};

  return (
    <div className="car-preview" aria-hidden>
      <div className="preview-body" style={{ background: bg }}>
        <div className="preview-roof" style={roofStyle} />
        <div
          className="preview-wheels"
          dangerouslySetInnerHTML={{ __html: wheelsOpt?.svg || "" }}
        />
      </div>
      <div className="preview-meta">
        <div className="preview-name">{name || "Your car"}</div>
        <div className="preview-interior">
          {interior || "Standard interior"}
        </div>
      </div>
    </div>
  );
};

export default CarPreview;

import React from "react";

export default function ShinyText({ children, className = "" }) {
  return (
    <span className={`shiny-text ${className}`}>
      {children}
    </span>
  );
}

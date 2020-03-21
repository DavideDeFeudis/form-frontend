import React, { useState, useEffect } from "react";
import "./SpinnerModal.scss";
import loadingGif from "../../images/load.gif";

export default function SpinnerModal({ loading }) {
  const [displaySpinner, setDisplaySpinner] = useState(false);
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setDisplaySpinner(true);
      }, 400);
      return () => clearTimeout(timer);
    } else if (displaySpinner) {
      setDisplaySpinner(false);
    }
  }, [loading]);

  if (!displaySpinner) {
    return null;
  } else {
    return (
      <div className="modal-container">
        <img
          src={loadingGif}
          width="45"
          height="45"
          alt="Bitte warten Sie..."
        />
      </div>
    );
  }
}

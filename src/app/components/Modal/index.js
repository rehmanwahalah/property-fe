import React, { useEffect } from "react";
import classes from "./modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable body scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup function to enable scroll when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={classes.blurOverlayStyles}></div>
      <div className={classes.modalOverlay} onClick={onClose}>
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={classes.modalClose} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;

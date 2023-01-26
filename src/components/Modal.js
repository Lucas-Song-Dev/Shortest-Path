import React, { useState } from "react";

function Modal(props) {
  const [clickCount, setClickCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handleModalClick = () => {
    if (clickCount == 0) {
      for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
          window.scrollTo(0, i / 2);
        }, i * 2);
      }
      setClickCount(clickCount + 1);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${
        isOpen
          ? props.bckOn
            ? "modalxxx-disabled"
            : "modalxxx-enabled"
          : "modalxxx-disabled"
      }`}
      onClick={handleModalClick}
    >
      <div className="intro font-Montserrat-Black"> Shortest Path</div>
    </div>
  );
}

export default Modal;

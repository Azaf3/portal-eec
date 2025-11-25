import React from 'react';

const Sobre = () => {
  return (
    <div className="w-full">
      <div
        className="w-full bg-center bg-no-repeat bg-cover"
        style={{ height: '420px', backgroundImage: "url('/banner-sobre.png')" }}
        role="img"
        aria-label="Banner do Portal EEC"
      />
    </div>
  );
};

export default Sobre;

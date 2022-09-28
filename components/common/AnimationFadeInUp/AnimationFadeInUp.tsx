import React, { useRef } from "react";

const AnimationFadeInUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0.5 }) => {

  return (
    <div className="fade-up" style={{opacity: 0, animation: `fadeInUp 0.4s ${delay}s forwards`}}>
      {children}
    </div>
  );
};

export default AnimationFadeInUp;

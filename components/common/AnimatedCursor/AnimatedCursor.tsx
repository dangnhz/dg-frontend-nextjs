import React, { useState, useCallback, useEffect, useRef } from "react";
import {useRouter} from "next/router";
import gsap from "gsap";
import styles from "./AnimatedCursor.module.scss";

gsap.config({
  nullTargetWarn: false
})

const AnimatedCursor = () => {
  const router= useRouter();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLeafRef = useRef<SVGSVGElement>(null);
  const [cursorScale, setCursorScale] = useState(0.2);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const updateCursor = useCallback(
    (cursorX : number, cursorY:number) => {
      //Move the cursor
      gsap.to(cursorRef.current, {
        x: cursorX,
        y: cursorY,
        opacity: 1,
        duration: 0.15,
      });
      gsap.to(cursorLeafRef.current, {
        scale: cursorScale,
        duration: 0.3,
      });
    },
    [cursorScale]
  );

  const updateCoordinates = (e: { clientX: any; clientY: any; }) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mouseenter", () => {
      gsap.to(cursorRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    });
    document.addEventListener("mouseleave", () => {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    });
    document.addEventListener("mousemove", updateCoordinates);
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    const cursorX = mousePos.x - cursorRef.current?.clientWidth / 2;
    const cursorY = mousePos.y - cursorRef.current?.clientHeight / 2;
    updateCursor(cursorX, cursorY);
  }, [mousePos, updateCursor]);

  useEffect(() => {
    setTimeout(() => {
      const hoverElements = document.querySelectorAll("[data-cursor-type]");
      hoverElements.forEach((element) => {
        const cursorType = element.getAttribute("data-cursor-type");

        if (cursorType === "medium") {
          element.addEventListener("mousemove", (e) => {
            e.stopImmediatePropagation();
            if (!cursorRef.current) return;
            const elementRect = element.getBoundingClientRect();
            const cursorX = elementRect.left - cursorRef.current?.clientWidth / 2 - 15;
            const cursorY = elementRect.top - cursorRef.current?.clientHeight / 2 + elementRect.height / 2;
            gsap.to(cursorRef.current, {
              x: cursorX,
              y: cursorY,
              duration: 0.4,
            });
          });
        } else if (cursorType === "big") {
          element.addEventListener("mouseenter", () => {
            setCursorScale(1);
          });

          element.addEventListener("mouseleave", () => {
            setCursorScale(0.2);
          });
        } else if (cursorType === "none") {
          element.addEventListener("mouseover", () => {
            setCursorScale(0);
          });

          element.addEventListener("mouseleave", () => {
            setCursorScale(0.2);
          });
        }
      });
    }, 3000);

    return () => {
      setCursorScale(0.2);
    };
  }, [router]);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <svg className={styles.cursorLeaf} ref={cursorLeafRef} viewBox="-20 0 200 121">
        <path
          fill="#3FB91E"
          d="M132.51339,0.394554499 C102.779097,0.394554499 0.000124981269,1.6899762 0.000124981269,64.298905 C0.000124981269,93.3485494 21.118835,119.807974 58.8231843,119.807974 C98.6690877,119.807974 149.477098,90.5954663 149.477098,0.394554499 L132.51339,0.394554499 Z"></path>
      </svg>
    </div>
  );
};

export default AnimatedCursor;

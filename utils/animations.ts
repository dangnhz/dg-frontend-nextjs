import gsap from "gsap";

//OPEN THE MENU
export const staggerReveal = (timeline:any, nodes:HTMLAllCollection) => {
  timeline.to(nodes, {
    height: "100vh",
    transformOrigin: "right top",
    skewY: 2,
    scaleY: 1,
    duration: 0.5,
    stagger: 0.1,
  });
  timeline.to(nodes, {
    skewY: 0,
    duration: 0,
  });
};

//CLOSE THE MENU

export const staggerRevealClose = (timeline:any, nodes:HTMLAllCollection) => {
  timeline.to(nodes, {
    skewY: 2,
    duration: 0,
  });

  timeline.to(nodes, {
    scaleY: 0,
    duration: 0.7,
    ease: "power3.inOut",
    stagger: 0.07,
  });
};

export const menuCurtainReveal = (timeline:any, node:HTMLElement) => {
  timeline.to(node, {
    keyframes: [
      { height: 0, bottom: window.outerHeight, duration: 0 },
      { height: window.outerHeight, bottom: 0, duration: 0.6, ease: "power3.inOut" },
      { height: 0, bottom: 0, duration: 0.6, ease: "power3.inOut" },
    ],
  });
};

export const menuCurtainClose = (timeline:any, node:HTMLElement) => {
  timeline.to(node, {
    keyframes: [
      { height: 0, bottom: 0, duration: 0 },
      { height: window.outerHeight, bottom: 0, duration: 0.6, ease: "power3.inOut" },
      { height: 0, bottom: window.outerHeight, duration: 0.6, ease: "power3.inOut" },
    ],
  });
};

// STAGGER THE LINKS TO APPEAR
export const staggerTextReveal = (timeline:any, nodes:HTMLAllCollection) => {
  timeline.fromTo(
    nodes,
    {
      yPercent: 100,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power3.inOut",
      stagger: 0.1,
    }
  );
};

export const staggerTextHide = (timeline:any, nodes:HTMLAllCollection) => {
  timeline.fromTo(
    nodes,
    {
      yPercent: 0,
      opacity: 1,
    },
    {
      opacity: 0,
      yPercent: -100,
      duration: 0.3,
      ease: "power3.inOut",
      stagger: 0.1,
    }
  );
};

export const pageCurtainReveal = () => {
  gsap.set("#navbar", { autoAlpha: 0, duration: 0 });
  gsap.set(".page-inner", { autoAlpha: 0 });

  const tl = gsap.timeline();

  tl.to(".page-curtain", {
    keyframes: [
      { height: 0, bottom: 0, duration: 0 },
      { height: window.outerHeight, bottom: 0, duration: 0.8, ease: "power3.inOut" },
      { height: 0, bottom: window.outerHeight, duration: 0.8, ease: "power3.inOut" },
    ],
    delay: 0.5
  })
    .to(
      ".page-inner",
      {
        autoAlpha: 1,
        duration: 0.5,
      },
      "-=0.7"
    )
    .to(
      "#navbar",
      {
        autoAlpha: 1,
        duration: 0.5,
      },
      "-=1"
    );
};

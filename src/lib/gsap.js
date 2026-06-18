import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

gsap.config({
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, useGSAP };

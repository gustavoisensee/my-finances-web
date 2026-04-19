import { useEffect, useRef } from "react";

/**
 * Hook to make a card sticky on mobile when scrolling
 * The card will stick below the navbar (80px from top) when scrolled
 */
export const useStickyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardOffsetRef = useRef<number>(0);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store the initial offset position
    if (cardRef.current) {
      cardOffsetRef.current = cardRef.current.offsetTop;
    }

    const handleScroll = () => {
      if (cardRef.current && spacerRef.current && window.innerWidth < 640) {
        const scrollPosition = window.scrollY;
        const triggerPoint = cardOffsetRef.current - 80; // 80px is navbar height
        const shouldBeSticky =
          scrollPosition > triggerPoint && triggerPoint > 0;

        if (shouldBeSticky) {
          // Add sticky classes
          cardRef.current.classList.add(
            "transition-all",
            "duration-200",
            "ease-in-out",
            "fixed",
            "top-[4rem]",
            "left-0",
            "right-0",
            "z-30",
            "shadow-lg",
            "border-b",
            "animate-in",
            "fade-in",
            "slide-in-from-top-2"
          );
          cardRef.current.classList.remove(
            "relative",
            "rounded-2xl",
            "shadow-sm"
          );
          spacerRef.current.style.display = "block";
        } else {
          // Add normal classes
          cardRef.current.classList.remove(
            "transition-all",
            "duration-200",
            "ease-in-out",
            "fixed",
            "top-[4rem]",
            "left-0",
            "right-0",
            "z-30",
            "shadow-lg",
            "border-b",
            "animate-in",
            "fade-in",
            "slide-in-from-top-2"
          );
          cardRef.current.classList.add("relative", "rounded-2xl", "shadow-sm");
          spacerRef.current.style.display = "none";
        }
      } else if (cardRef.current) {
        // Reset to normal on desktop
        cardRef.current.classList.remove(
          "fixed",
          "top-[4rem]",
          "left-0",
          "right-0",
          "z-30",
          "shadow-lg",
          "border-b",
          "animate-in",
          "fade-in",
          "slide-in-from-top-2"
        );
        cardRef.current.classList.add(
          "relative",
          "rounded-2xl",
          "border",
          "shadow-sm"
        );
        if (spacerRef.current) spacerRef.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { cardRef, spacerRef };
};

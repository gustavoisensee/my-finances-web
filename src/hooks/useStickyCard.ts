import { useCallback, useEffect, useRef, useState } from "react";

export const useStickyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const cardTopRef = useRef(0);

  const handleScroll = useCallback(() => {
    if (!cardRef.current || window.innerWidth >= 640) {
      setIsSticky(false);
      return;
    }

    if (cardTopRef.current === 0) {
      cardTopRef.current = cardRef.current.offsetTop;
    }

    const triggerPoint = cardTopRef.current - 64;
    setIsSticky(window.scrollY > triggerPoint && triggerPoint > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return { cardRef, placeholderRef, isSticky };
};

import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({ children }: any) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // return () => {
    //     cleanup
    // }
  }, [pathname]);

  return children;
};

export default ScrollToTop;

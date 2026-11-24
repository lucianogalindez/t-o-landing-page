import { useLocation, useNavigate } from "react-router-dom";

/**
 * Navigation for the one-page sections (#home, #services, #contact…).
 * On the home page it scrolls to the section. On other pages (e.g. /203k) it goes
 * back to the home page at that section, except #contact, which every page has.
 */
export const useSectionNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (id: string) => {
    const el = document.getElementById(id);
    if (pathname === "/" || (id === "contact" && el)) {
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(id === "home" ? "/" : `/#${id}`);
    }
  };
};

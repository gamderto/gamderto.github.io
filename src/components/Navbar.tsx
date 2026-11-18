import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { navigation } from "../navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <NavLink className="brand" to="/" aria-label="J. F. home">
          <span className="brand-mark">JF<span> / </span>01</span>
          <span className="brand-name">J. F. <small>FIELD / CODE</small></span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
          <span className="nav-location"><i /> Slovakia / Europe</span>
        </nav>
      </div>
    </header>
  );
}


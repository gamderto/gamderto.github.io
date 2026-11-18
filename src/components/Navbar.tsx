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
        <NavLink className="brand" to="/" aria-label="Mattiás Pleš – domov">
          <span className="brand-mark">MP<span> / </span>01</span>
          <span className="brand-name">Mattiás Pleš <small>TERÉN / KÓD</small></span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Zavrieť navigáciu" : "Otvoriť navigáciu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={`main-nav${menuOpen ? " main-nav--open" : ""}`}
          id="primary-navigation"
          aria-label="Hlavná navigácia"
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
          <span className="nav-location"><i /> Slovensko / Európa</span>
        </nav>
      </div>
    </header>
  );
}


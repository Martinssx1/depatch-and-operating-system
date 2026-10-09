import { useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Activity, ArrowRight, Bell, Bike, ChevronDown, CircleHelp, Command, LayoutDashboard, Menu, MoreHorizontal, Search, Settings2, ShoppingBag, Store, Users } from "lucide-react";
import { DispatchPage } from "./pages/DispatchPage";
import { CustomerPage } from "./pages/CustomerPage";
import { BusinessPage } from "./pages/BusinessPage";
import { RiderPage } from "./pages/RiderPage";
import { BrowseRestaurantsPage } from "./pages/BrowseRestaurantsPage";
import { RestaurantMenuPage } from "./pages/RestaurantMenuPage";
import { CartPage } from "./pages/CartPage";


const roles = [
  { label: "Dispatch", path: "/admin/dispatch", icon: LayoutDashboard },
  { label: "Customer", path: "/customer/orders", icon: ShoppingBag },
  { label: "Business", path: "/business/orders", icon: Store },
  { label: "Rider", path: "/rider/deliveries", icon: Bike },
];
export default function App() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageTitle = location.pathname.startsWith("/customer")
    ? "Customer"
    : location.pathname.startsWith("/business")
      ? "Business"
      : location.pathname.startsWith("/rider")
        ? "Rider app"
        : "Operations";
  //const activeRole = roles.find(r => location.pathname.startsWith(r.path.split('/').slice(0, 2).join('/')))?.label ?? 'Dispatch'
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <Link to="/admin/dispatch" className="brand">
          <span className="brand-icon">
            <Command size={19} />
          </span>
          <span>
            relay<span className="brand-dot">.</span>
          </span>
          <span className="brand-tag">OPS</span>
        </Link>
        <div className="workspace">
          <div className="workspace-mark">R</div>
          <div className="workspace-copy">
            <strong>Relay Lagos</strong>
            <span>Operations workspace</span>
          </div>
          <ChevronDown size={15} className="muted" />
        </div>
        <div className="nav-caption">WORKSPACE</div>
        <nav className="main-nav">
          {roles.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} />
              <span>{label}</span>
              {label === "Dispatch" && <span className="nav-count">8</span>}
            </NavLink>
          ))}
        </nav>
        <div className="nav-caption tools-label">MANAGE</div>
        <nav className="main-nav">
          <a className="nav-link">
            <Users size={17} />
            <span>People</span>
          </a>
          <a className="nav-link">
            <Activity size={17} />
            <span>Activity</span>
          </a>
          <a className="nav-link">
            <Settings2 size={17} />
            <span>Settings</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">
              <CircleHelp size={16} />
            </div>
            <div>
              <strong>Need a hand?</strong>
              <span>Visit our help center</span>
            </div>
            <ArrowRight size={14} />
          </div>
          <div className="profile">
            <div className="avatar avatar-purple">JD</div>
            <div className="profile-copy">
              <strong>Jordan Davis</strong>
              <span>Administrator</span>
            </div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>
      <div className="mobile-scrim" onClick={() => setMobileOpen(false)}></div>
      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-btn mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={19} />
          </button>
          <div className="breadcrumbs">
            <span>Relay</span>
            <span className="crumb-slash">/</span>
            <strong>{pageTitle}</strong>
          </div>
          <div className="top-actions">
            <div className="live-indicator">
              <span className="pulse-dot"></span> Live operations
            </div>
            <button className="icon-btn">
              <Search size={18} />
            </button>
            <button className="icon-btn notification-btn">
              <Bell size={18} />
              <i></i>
            </button>
            <div className="top-divider"></div>
            <div className="avatar avatar-purple">JD</div>
            <ChevronDown size={14} className="muted" />
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dispatch" replace />} />
          <Route path="/admin/dispatch" element={<DispatchPage />} />
          <Route path="/customer/orders" element={<CustomerPage />} />
          <Route path="/customer/restaurants" element={<BrowseRestaurantsPage />} />
          <Route path="/customer/restaurants/:slug" element={<RestaurantMenuPage />} />
          <Route path="/customer/cart" element={<CartPage />} />
          <Route
            path="/customer/orders/:id"
            element={<CustomerPage detail />}
          />
          <Route path="/business/orders" element={<BusinessPage />} />
          <Route path="/rider/deliveries" element={<RiderPage />} />
          <Route path="*" element={<Navigate to="/admin/dispatch" replace />} />
        </Routes>
      </main>
    </div>
  );
}

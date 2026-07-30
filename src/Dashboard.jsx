import { useState, useEffect } from "react";
import { getMenuList } from "./api/DashBoardApi";
import logo from "./assets/logo.jpeg";
import "./assets/Dashboard.css";

const CATEGORY_ICONS = {
  pizza: "🍕",
  dosa: "🫓",
  maxican: "🌮",
  mexican: "🌮",
  soup: "🍲",
  "special soup": "🍲",
  sandwhich: "🥪",
  sandwich: "🥪",
  panjabi: "🍛",
  punjabi: "🍛",
  noodles: "🍜",
  rice: "🍚",
  vegetable: "🥦",
  default: "🍽️",
};

const getCategoryIcon = (name = "") => {
  const lower = name.toLowerCase();
  for (const key in CATEGORY_ICONS) {
    if (lower.includes(key)) return CATEGORY_ICONS[key];
  }
  return CATEGORY_ICONS.default;
};

const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function Dashboard() {
  const [menuData, setMenuData] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      setLoading(true);
      const response = await getMenuList();
      setMenuData(response?.data || {});
    } catch (err) {
      console.error(err);
      setError("Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = Object.keys(menuData);
  const tabs = ["all", ...categories];

  const visibleCategories =
    activeTab === "all"
      ? categories
      : categories.filter((c) => c === activeTab);

  return (
    <div className="dashboard-root">
      {/* Decorative background */}
      <div className="deco-top" />
      <div className="deco-bottom" />

      {/* Top strip */}
      <div className="top-strip">
        <span className="top-strip-text">
          ✦ OPEN 6:30 PM – 11:30 PM &nbsp;·&nbsp; Ajay Patel 94265 43835 || Jayesh Prajapati 97149 61622 ✦
        </span>
      </div>

      <div className="dashboard-container">
        {/* HERO HEADER */}
        <div className="hero-header">
          <div className="hero-line-left">
            <div className="hero-line" />
            <div className="hero-line hero-line-gap" />
          </div>
          <div className="hero-center">
            <img src={logo} alt="South Delights" className="hero-logo" />
          </div>
          <div className="hero-line-right">
            <div className="hero-line hero-line-reverse" />
            <div className="hero-line hero-line-reverse hero-line-gap" />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="state-center">
            <div className="spinner" />
            <div className="loading-text">Loading Menu...</div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="error-text">{error}</div>
        )}

        {/* MENU CONTENT */}
        {!loading && !error && (
          <>
            {/* TABS */}
            <div className="tab-scroll">
              <div className="tab-bar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? "tab-btn-active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {getCategoryIcon(tab)}{" "}
                    {tab === "all" ? "All" : capitalize(tab)}
                  </button>
                ))}
              </div>
            </div>

            {/* CATEGORY SECTIONS */}
            <div className="menu-layout">
              {/* Vertical label — hidden on mobile */}
              <div className="vertical-label">
                Good Food · Good Taste · Good Mood
              </div>

              <div className="menu-grid">
                {visibleCategories.map((categoryKey) => {
                  const category = menuData[categoryKey];
                  const items = category?.items || [];
                  return (
                    <div key={categoryKey} className="fade-in category-block">
                      {/* Category Header */}
                      <div className="category-header">
                        <span className="category-icon">
                          {getCategoryIcon(categoryKey)}
                        </span>
                        {capitalize(categoryKey)}
                      </div>

                      {/* Items */}
                      {items.length === 0 ? (
                        <div className="empty-items">Coming soon...</div>
                      ) : (
                        items.map((item) => (
                          <div key={item.id} className="menu-item-row">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="menu-img"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className="img-placeholder"
                              style={{ display: item.image ? "none" : "flex" }}
                            >
                              {getCategoryIcon(categoryKey)}
                            </div>

                            <div className="item-info">
                              <div className="item-name">{item.name}</div>
                              {item.description && (
                                <div className="item-desc">{item.description}</div>
                              )}
                            </div>

                            <div className="item-price">₹{item.price}</div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* FOOTER */}
        <div className="dashboard-footer">
          <div className="footer-address">📍 Your Address Here</div>
          <div className="footer-brand">South Delights</div>
          <div className="footer-web">www.yourmenu.com</div>
        </div>
      </div>
    </div>
  );
}
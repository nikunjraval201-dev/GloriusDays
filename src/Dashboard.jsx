import { useState, useEffect } from "react";
import { getMenuList } from "./api/DashBoardApi";

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
      setError("Menu load karvama error aavyo.");
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
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: "#f0e6d3",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .menu-item-row { transition: all 0.2s; }
        .menu-item-row:hover { background: #ffffff08; border-radius: 6px; }
        .tab-btn { cursor: pointer; transition: all 0.2s; letter-spacing: 2px; }
        .tab-btn:hover { color: #D4A017; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        .menu-img {
          width: 52px; height: 52px; border-radius: 6px;
          object-fit: cover; border: 1px solid #D4A01740;
          flex-shrink: 0;
        }
        .img-placeholder {
          width: 52px; height: 52px; border-radius: 6px;
          background: #1a1a1a; border: 1px dashed #D4A01730;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .tab-scroll {
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tab-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Decorative background */}
      <div
        style={{
          position: "fixed",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #D4A01720 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -150,
          left: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8B000020 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top strip */}
      <div
        style={{ background: "#D4A017", padding: "6px 0", textAlign: "center" }}
      >
        <span
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 11,
            letterSpacing: 4,
            color: "#0a0a0a",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          ✦ EST. 2022 &nbsp;&nbsp;·&nbsp;&nbsp; OPEN 08AM – 10PM
          &nbsp;&nbsp;·&nbsp;&nbsp; +123 456 789 ✦
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* HERO HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "40px 0 20px",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                height: 1,
                background: "linear-gradient(to right, transparent, #D4A017)",
              }}
            />
            <div
              style={{
                height: 1,
                background: "linear-gradient(to right, transparent, #D4A017)",
                marginTop: 6,
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 11,
                letterSpacing: 6,
                color: "#D4A017",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              The Authentic
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(52px, 8vw, 90px)",
                fontWeight: 900,
                fontStyle: "italic",
                lineHeight: 0.9,
                color: "#fff",
                textShadow: "0 0 60px #D4A01750",
              }}
            >
              Asian
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(52px, 8vw, 90px)",
                fontWeight: 900,
                lineHeight: 0.9,
                color: "#D4A017",
                letterSpacing: -2,
              }}
            >
              Food
            </div>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 11,
                letterSpacing: 8,
                color: "#f0e6d380",
                textTransform: "uppercase",
                marginTop: 10,
              }}
            >
              — Restaurant —
            </div>
          </div>
          <div>
            <div
              style={{
                height: 1,
                background: "linear-gradient(to left, transparent, #D4A017)",
              }}
            />
            <div
              style={{
                height: 1,
                background: "linear-gradient(to left, transparent, #D4A017)",
                marginTop: 6,
              }}
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid #D4A01730",
                borderTop: "2px solid #D4A017",
                borderRadius: "50%",
                margin: "0 auto 16px",
              }}
              className="spinner"
            />
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 13,
                color: "#f0e6d360",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Loading Menu...
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#ff6b6b",
              fontFamily: "'Lato', sans-serif",
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {/* MENU CONTENT */}
        {!loading && !error && (
          <>
            {/* TABS */}
            <div className="tab-scroll" style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  borderBottom: "1px solid #D4A01730",
                  width: "max-content",
                  minWidth: "100%",
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className="tab-btn"
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "10px 22px",
                      background: "none",
                      border: "none",
                      borderBottom:
                        activeTab === tab
                          ? "2px solid #D4A017"
                          : "2px solid transparent",
                      color: activeTab === tab ? "#D4A017" : "#f0e6d360",
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 11,
                      textTransform: "uppercase",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getCategoryIcon(tab)}{" "}
                    {tab === "all" ? "All" : capitalize(tab)}
                  </button>
                ))}
              </div>
            </div>

            {/* CATEGORY SECTIONS */}
            <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
              {/* Vertical label */}
              <div
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 10,
                  letterSpacing: 6,
                  color: "#D4A017",
                  textTransform: "uppercase",
                  padding: "0 16px 0 0",
                  borderRight: "1px solid #D4A01740",
                  marginRight: 24,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Good Food · Good Taste · Good Mood
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "28px 40px",
                  }}
                >
                  {visibleCategories.map((categoryKey) => {
                    const category = menuData[categoryKey];
                    const items = category?.items || [];
                    return (
                      <div key={categoryKey} className="fade-in">
                        {/* Category Header */}
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 22,
                            fontWeight: 700,
                            color: "#D4A017",
                            borderBottom: "1px solid #D4A01740",
                            paddingBottom: 8,
                            marginBottom: 16,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span style={{ fontSize: 18 }}>
                            {getCategoryIcon(categoryKey)}
                          </span>
                          {capitalize(categoryKey)}
                        </div>

                        {/* Items */}
                        {items.length === 0 ? (
                          <div
                            style={{
                              fontFamily: "'Lato', sans-serif",
                              fontSize: 13,
                              color: "#f0e6d330",
                              fontStyle: "italic",
                              padding: "12px 0",
                            }}
                          >
                            Coming soon...
                          </div>
                        ) : (
                          items.map((item) => (
                            <div
                              key={item.id}
                              className="menu-item-row"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 8px",
                                borderBottom: "1px dotted #ffffff12",
                              }}
                            >
                              {/* Image or placeholder */}
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
                                style={{
                                  display: item.image ? "none" : "flex",
                                }}
                              >
                                {getCategoryIcon(categoryKey)}
                              </div>

                              {/* Name + desc */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                  style={{
                                    fontFamily: "'Lato', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    color: "#fff",
                                    marginBottom: item.description ? 3 : 0,
                                  }}
                                >
                                  {item.name}
                                </div>
                                {item.description && (
                                  <div
                                    style={{
                                      fontFamily: "'Lato', sans-serif",
                                      fontSize: 11,
                                      color: "#f0e6d350",
                                      lineHeight: 1.4,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {item.description}
                                  </div>
                                )}
                              </div>

                              {/* Price */}
                              <div
                                style={{
                                  fontFamily: "'Playfair Display', serif",
                                  fontSize: 16,
                                  color: "#D4A017",
                                  whiteSpace: "nowrap",
                                  fontWeight: 700,
                                  flexShrink: 0,
                                }}
                              >
                                ₹{item.price}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* FOOTER */}
        <div
          style={{
            borderTop: "1px solid #D4A01740",
            padding: "20px 0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 12,
              color: "#f0e6d340",
              letterSpacing: 2,
            }}
          >
            📍 Your Address Here
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              fontStyle: "italic",
              color: "#D4A01780",
            }}
          >
            The Grand Asian
          </div>
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 12,
              color: "#f0e6d340",
              letterSpacing: 2,
            }}
          >
            www.yourmenu.com
          </div>
        </div>
      </div>
    </div>
  );
}

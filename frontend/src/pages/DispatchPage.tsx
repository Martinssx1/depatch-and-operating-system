import { ArrowRight, ArrowUpRight, Bike, ChevronDown, Clock3, MapPin, MoreHorizontal, Package, Plus, Search, SlidersHorizontal, Wallet } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "../state/DispatchContext";
import { Metric, OrderRow, SectionHeading, Zone } from "../components/ui";

export function DispatchPage() {
  const { orders } = useDispatch();
  const [filter, setFilter] = useState("All orders");
  const [query, setQuery] = useState("");
  const visible = orders.filter(
    (o) =>
      (filter === "All orders" || o.status === filter) &&
      `${o.id} ${o.customer} ${o.business}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="page-content">
      <SectionHeading
        eyebrow="WEDNESDAY, OCTOBER 9, 2026"
        title="Good afternoon, Jordan"
        description="Here's what's happening across your operation today."
        actions={
          <>
            <button className="button button-light">
              <Clock3 size={15} /> Last 24 hours <ChevronDown size={14} />
            </button>
            <button className="button button-dark">
              <Plus size={16} /> Create order
            </button>
          </>
        }
      />
      <div className="metric-grid">
        <Metric
          icon={<Package size={17} />}
          label="Active orders"
          value="24"
          delta="12%"
          positive
          detail="vs. yesterday"
          tone="green"
        />
        <Metric
          icon={<Bike size={17} />}
          label="Riders on the road"
          value="18"
          delta="3 online"
          detail="of 22 total"
          tone="blue"
        />
        <Metric
          icon={<Clock3 size={17} />}
          label="Avg. delivery time"
          value="28 min"
          delta="4 min"
          positive={false}
          detail="vs. yesterday"
          tone="amber"
        />
        <Metric
          icon={<Wallet size={17} />}
          label="Revenue today"
          value="₦842k"
          delta="18%"
          positive
          detail="vs. yesterday"
          tone="purple"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel orders-panel">
          <div className="panel-header">
            <div>
              <h2>
                Live orders <span className="live-small"></span>
              </h2>
              <p>Track every order as it happens</p>
            </div>
            <button className="icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="order-tools">
            <div className="tabs">
              {["All orders", "Preparing", "On the way", "Delivered"].map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`tab ${filter === t ? "selected" : ""}`}
                  >
                    {t}
                    {t === "All orders" && (
                      <span className="tab-count">24</span>
                    )}
                  </button>
                ),
              )}
            </div>
            <div className="table-actions">
              <label className="table-search">
                <Search size={14} />
                <input
                  placeholder="Search orders..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <button className="filter-button">
                <SlidersHorizontal size={14} /> Filter
              </button>
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>BUSINESS</th>
                  <th>STATUS</th>
                  <th>RIDER</th>
                  <th>TOTAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
            {visible.length === 0 && (
              <div className="empty-state">No orders match your search.</div>
            )}
          </div>
          <div className="panel-footer">
            <span>
              Showing{" "}
              <strong>
                {visible.length ? 1 : 0}–{visible.length}
              </strong>{" "}
              of <strong>24</strong> orders
            </span>
            <div className="pagination">
              <button disabled>←</button>
              <button className="page-current">1</button>
              <button>2</button>
              <button>3</button>
              <span>…</span>
              <button>8</button>
              <button>→</button>
            </div>
          </div>
        </section>
        <section className="panel map-panel">
          <div className="panel-header">
            <div>
              <h2>Rider activity</h2>
              <p>Live fleet across Lagos</p>
            </div>
            <button className="icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="map-wrap">
            <div className="map-grid"></div>
            <div className="map-road road-one"></div>
            <div className="map-road road-two"></div>
            <div className="map-road road-three"></div>
            <div className="map-river"></div>
            <span className="map-label label-vi">VICTORIA ISLAND</span>
            <span className="map-label label-ik">IKOYI</span>
            <span className="map-label label-lekki">LEKKI</span>
            <span className="map-label label-main">LAGOS ISLAND</span>
            <MapPin className="map-pin pin-1" size={23} />
            <MapPin className="map-pin pin-2" size={23} />
            <MapPin className="map-pin pin-3" size={23} />
            <MapPin className="map-pin pin-4" size={23} />
            <div className="map-legend">
              <span>
                <i className="legend-dot green-dot" />
                Available <b>18</b>
              </span>
              <span>
                <i className="legend-dot amber-dot" />
                On delivery <b>12</b>
              </span>
            </div>
            <span className="map-credit">VICTORIA ISLAND, LAGOS</span>
          </div>
          <div className="fleet-summary">
            <div>
              <span className="fleet-icon">
                <Bike size={15} />
              </span>
              <span>
                <strong>30 riders</strong>
                <small>across 4 zones</small>
              </span>
            </div>
            <a href="#fleet">
              View fleet <ArrowRight size={13} />
            </a>
          </div>
        </section>
      </div>
      <div className="bottom-grid">
        <section className="panel performance-panel">
          <div className="panel-header">
            <div>
              <h2>Delivery performance</h2>
              <p>Orders completed over the last 7 days</p>
            </div>
            <button className="button button-light small-button">
              This week <ChevronDown size={13} />
            </button>
          </div>
          <div className="chart-summary">
            <strong>1,284</strong>
            <span className="chart-change">
              <ArrowUpRight size={13} /> 8.2%
            </span>
            <span>compared to last week</span>
          </div>
          <div className="chart">
            <div className="chart-y">
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>
            <div className="chart-main">
              <div className="chart-lines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <svg
                viewBox="0 0 700 140"
                preserveAspectRatio="none"
                className="chart-svg"
              >
                <defs>
                  <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#5f9d79" stopOpacity=".24" />
                    <stop offset="1" stopColor="#5f9d79" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 105 C45 94 55 82 95 89 S150 110 193 72 S245 80 290 65 S341 78 386 52 S442 69 485 45 S543 55 580 30 S637 42 700 12 L700 140 L0 140Z"
                  fill="url(#fill)"
                />
                <path
                  d="M0 105 C45 94 55 82 95 89 S150 110 193 72 S245 80 290 65 S341 78 386 52 S442 69 485 45 S543 55 580 30 S637 42 700 12"
                  fill="none"
                  stroke="#4c8e69"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="chart-days">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </section>
        <section className="panel zones-panel">
          <div className="panel-header">
            <div>
              <h2>Top delivery zones</h2>
              <p>By completed orders today</p>
            </div>
            <button className="icon-btn">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="zone-list">
            <Zone
              name="Victoria Island"
              orders="142 orders"
              percent="78%"
              color="green"
            />
            <Zone
              name="Lekki Phase 1"
              orders="98 orders"
              percent="61%"
              color="blue"
            />
            <Zone name="Ikoyi" orders="76 orders" percent="48%" color="amber" />
            <Zone
              name="Surulere"
              orders="54 orders"
              percent="33%"
              color="purple"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

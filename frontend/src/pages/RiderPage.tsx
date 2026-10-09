import { Activity, ArrowRight, ArrowUpRight, Bike, Check, ChevronDown, Clock3, MapPin, ShieldCheck, SlidersHorizontal, Sparkles, Store } from "lucide-react";
import { useDispatch } from "../state/DispatchContext";
import { SectionHeading } from "../components/ui";

export function RiderPage() {
  const { orders, updateStatus, acceptOrder } = useDispatch();
  const jobs = orders.filter(
    (o) => o.status === "Ready for pickup" || o.rider === "You · online",
  );
  const completed = orders.filter((o) => o.status === "Delivered");
  return (
    <div className="page-content rider-page">
      <SectionHeading
        eyebrow="WEDNESDAY, OCTOBER 9 · VICTORIA ISLAND"
        title="Ready to ride, Tunde?"
        description="Stay safe out there. Your next delivery is waiting."
        actions={
          <div className="online-pill">
            <i /> Online <ChevronDown size={14} />
          </div>
        }
      />
      <div className="rider-hero">
        <div className="rider-hero-copy">
          <span className="eyebrow">TODAY'S EARNINGS</span>
          <strong>₦18,400</strong>
          <span>
            <ArrowUpRight size={14} /> 4 deliveries completed
          </span>
        </div>
        <div className="rider-hero-stats">
          <div>
            <strong>
              4.9 <span>★</span>
            </strong>
            <small>Rider rating</small>
          </div>
          <div>
            <strong>96%</strong>
            <small>On-time rate</small>
          </div>
          <div>
            <strong>12</strong>
            <small>Deliveries this week</small>
          </div>
        </div>
        <div className="hero-art">
          <Bike size={88} strokeWidth={1} />
        </div>
      </div>
      <div className="rider-columns">
        <section>
          <div className="section-title">
            <div>
              <h2>
                Available deliveries{" "}
                <span className="count-chip">{jobs.length || 1}</span>
              </h2>
              <p>Nearby orders ready for pickup</p>
            </div>
            <button className="icon-btn">
              <SlidersHorizontal size={16} />
            </button>
          </div>
          <div className="delivery-list">
            {(jobs.length ? jobs : orders.slice(1, 2)).map((o) => (
              <div className="panel delivery-card" key={o.id}>
                <div className="delivery-top">
                  <div className="delivery-business-icon">
                    {o.business === "Bun & Barrel" ? "🍔" : "🥗"}
                  </div>
                  <div className="delivery-heading">
                    <strong>{o.business}</strong>
                    <span>Order {o.id} · 0.8 km away</span>
                  </div>
                  <span className="delivery-pay">₦2,400</span>
                </div>
                <div className="delivery-route">
                  <span className="route-point pickup-point">
                    <Store size={14} />
                  </span>
                  <div>
                    <strong>Pickup</strong>
                    <span>{o.business} · 22 Akin Adesola St</span>
                  </div>
                  <i className="route-dash" />
                  <span className="route-point drop-point">
                    <MapPin size={14} />
                  </span>
                  <div>
                    <strong>Drop-off</strong>
                    <span>
                      {o.customer} · {o.address}
                    </span>
                  </div>
                </div>
                <div className="delivery-footer">
                  <span>
                    <Clock3 size={14} /> Est. 18 min <b>·</b> 3.2 km
                  </span>
                  {o.rider === "You · online" ? (
                    <button
                      className="button button-dark"
                      onClick={() => updateStatus(o.id, "On the way")}
                    >
                      Confirm pickup <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      className="button button-dark"
                      onClick={() => acceptOrder(o.id)}
                    >
                      Accept delivery <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside>
          <div className="panel rider-tips">
            <div className="panel-header">
              <div>
                <h2>Today's progress</h2>
                <p>Keep up the great work</p>
              </div>
              <span className="progress-icon">
                <Activity size={16} />
              </span>
            </div>
            <div className="progress-row">
              <div>
                <strong>
                  4 <small>/ 8</small>
                </strong>
                <span>Daily delivery goal</span>
              </div>
              <div className="progress-ring">
                <span>50%</span>
              </div>
            </div>
            <div className="progress-bar">
              <i />
            </div>
            <div className="next-milestone">
              <Sparkles size={14} />
              <span>
                <strong>₦3,000 bonus</strong> when you complete 8 deliveries
                today
              </span>
            </div>
            <div className="rider-history-title">
              <h3>Recent deliveries</h3>
              <button className="text-button">
                View all <ArrowRight size={13} />
              </button>
            </div>
            {completed.slice(0, 2).map((o) => (
              <div className="history-row" key={o.id}>
                <span className="history-check">
                  <Check size={13} />
                </span>
                <span>
                  <strong>{o.business}</strong>
                  <small>
                    {o.time} · {o.id}
                  </small>
                </span>
                <b>₦2,400</b>
              </div>
            ))}
          </div>
          <div className="safety-card">
            <ShieldCheck size={18} />
            <div>
              <strong>Ride safe</strong>
              <span>
                Need help on the road? Our operations team is available 24/7.
              </span>
            </div>
            <ArrowRight size={15} />
          </div>
        </aside>
      </div>
    </div>
  );
}

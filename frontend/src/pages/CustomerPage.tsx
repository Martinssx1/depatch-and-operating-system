import { ArrowRight, Bike, Clock3, MapPin, ShoppingBag, Sparkles, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "../state/DispatchContext";
import { SectionHeading, Status, TimelineItem } from "../components/ui";
import { money } from "../utils/format";

export function CustomerPage({ detail = false }: { detail?: boolean }) {
  const { orders, updateStatus } = useDispatch();
  const { id } = useParams();
  const order = (detail && orders.find(item => item.id === id)) || orders[0];
  return (
    <div className="page-content">
      <SectionHeading
        eyebrow="YOUR RELAY ACCOUNT"
        title={detail ? `Order ${order.id}` : "Good afternoon, Amara"}
        description={
          detail
            ? "Your order is on its way. Here’s the latest delivery update."
            : "Find your next favorite, and we’ll bring it to your door."
        }
        actions={
          <Link to="/customer/restaurants" className="button button-dark">
            <ShoppingBag size={16} /> Browse restaurants
          </Link>
        }
      />
      <div className="customer-layout">
        <div>
          <div className="section-title">
            <div>
              <h2>{detail ? "Order tracking" : "Your recent orders"}</h2>
              <p>
                {detail
                  ? "Live updates from the kitchen to your door"
                  : "Everything you’ve ordered, all in one place"}
              </p>
            </div>
            <button className="text-button">
              View all <ArrowRight size={14} />
            </button>
          </div>
          {detail ? (
            <div className="panel track-panel">
              <div className="track-top">
                <div>
                  <span className="eyebrow">
                    ORDER PLACED · TODAY, 12:42 PM
                  </span>
                  <h2>{order.business}</h2>
                  <span>{order.items}</span>
                </div>
                <Status status={order.status} />
              </div>
              <div className="route-card">
                <div className="route-map">
                  <div className="route-line" />
                  <span className="route-pin restaurant-pin">
                    <Store size={15} />
                  </span>
                  <span className="route-pin home-pin">
                    <MapPin size={16} />
                  </span>
                  <span className="route-rider">
                    <Bike size={16} />
                  </span>
                  <small>VICTORIA ISLAND</small>
                  <small className="route-destination">YOUR LOCATION</small>
                </div>
                <div className="eta-row">
                  <span>
                    <Clock3 size={16} /> Estimated arrival
                  </span>
                  <strong>
                    12:58 PM <em>· 8 min away</em>
                  </strong>
                </div>
              </div>
              <div className="timeline">
                <TimelineItem
                  done
                  title="Order confirmed"
                  time="12:42 PM · The Green Bowl accepted your order"
                />
                <TimelineItem
                  done
                  title="Being prepared"
                  time="12:47 PM · Fresh ingredients, made to order"
                />
                <TimelineItem
                  done
                  title="Picked up by Tunde"
                  time="12:54 PM · Your rider is on the way"
                />
                <TimelineItem
                  title="Delivered to you"
                  time="Estimated 12:58 PM"
                />
              </div>
              <button
                className="button button-light full-button"
                onClick={() => updateStatus(order.id, "Delivered")}
              >
                <MapPin size={15} /> Mark as delivered
              </button>
            </div>
          ) : (
            <div className="customer-order-list">
              {orders.map((o) => (
                <Link
                  to={`/customer/orders/${o.id}`}
                  className="panel customer-order"
                  key={o.id}
                >
                  <span className="restaurant-avatar">
                    {o.business === "The Green Bowl"
                      ? "🥗"
                      : o.business === "Bun & Barrel"
                        ? "🍔"
                        : "🍣"}
                  </span>
                  <div className="customer-order-copy">
                    <strong>{o.business}</strong>
                    <span>{o.items}</span>
                    <small>
                      {o.time} · {o.id}
                    </small>
                  </div>
                  <div className="customer-order-side">
                    <Status status={o.status} />
                    <strong>{money(o.total)}</strong>
                  </div>
                  <ArrowRight size={16} className="muted" />
                </Link>
              ))}
            </div>
          )}
        </div>
        <aside className="panel customer-side">
          <div className="customer-side-head">
            <span className="side-icon">
              <Sparkles size={17} />
            </span>
            <div>
              <h3>Made for you</h3>
              <p>Based on your favorites</p>
            </div>
          </div>
          {[
            ["🥑", "The Green Bowl", "Healthy bowls · 20–30 min"],
            ["🍣", "Sora Sushi", "Japanese · 30–40 min"],
            ["🍔", "Bun & Barrel", "Burgers · 20–35 min"],
          ].map((x) => (
            <div className="suggestion" key={x[1]}>
              <span className="suggestion-emoji">{x[0]}</span>
              <div>
                <strong>{x[1]}</strong>
                <span>{x[2]}</span>
                <small>
                  ★ 4.8 <b>·</b> Free delivery
                </small>
              </div>
              <ArrowRight size={15} />
            </div>
          ))}
          <button className="button button-light full-button">
            Explore restaurants <ArrowRight size={14} />
          </button>
        </aside>
      </div>
    </div>
  );
}

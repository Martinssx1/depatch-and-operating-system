import { ArrowRight, Check, ChevronDown, Clock3, Filter, Menu, MoreHorizontal, Package, Sparkles, Wallet } from "lucide-react";
import { useDispatch } from "../state/DispatchContext";
import { Metric, SectionHeading, Status } from "../components/ui";
import { money } from "../utils/format";

export function BusinessPage() {
  const { orders, updateStatus } = useDispatch();
  const incoming = orders.filter(
    (o) => o.business === "The Green Bowl" || o.business === "Sora Sushi",
  );
  return (
    <div className="page-content">
      <SectionHeading
        eyebrow="THE GREEN BOWL · VICTORIA ISLAND"
        title="Orders"
        description="Keep service moving. You have 2 orders that need attention."
        actions={
          <>
            <button className="button button-light">
              <Clock3 size={15} /> Today <ChevronDown size={14} />
            </button>
            <button className="button button-dark">
              <Menu size={16} /> Manage menu
            </button>
          </>
        }
      />
      <div className="metric-grid">
        <Metric
          icon={<Package size={17} />}
          label="New orders"
          value="2"
          delta="Needs attention"
          tone="amber"
          detail="Accept or decline"
        />
        <Metric
          icon={<Clock3 size={17} />}
          label="Preparing"
          value="6"
          delta="Across the kitchen"
          tone="blue"
          detail="Average prep: 18 min"
        />
        <Metric
          icon={<Check size={17} />}
          label="Completed today"
          value="38"
          delta="12%"
          positive
          detail="vs. last Wednesday"
          tone="green"
        />
        <Metric
          icon={<Wallet size={17} />}
          label="Today's sales"
          value="₦284k"
          delta="8.4%"
          positive
          detail="vs. last Wednesday"
          tone="purple"
        />
      </div>
      <div className="section-title business-section-title">
        <div>
          <h2>Incoming & active</h2>
          <p>Orders from your customers, updated live</p>
        </div>
        <div className="business-filters">
          <button className="filter-button selected-filter">
            All <span>8</span>
          </button>
          <button className="filter-button">
            Needs action <span>2</span>
          </button>
          <button className="filter-button">
            <Filter size={14} /> Filter
          </button>
        </div>
      </div>
      <div className="business-orders">
        {incoming.map((o, i) => (
          <div className="panel biz-order" key={o.id}>
            <div className="biz-order-top">
              <div>
                <div className="biz-order-id">
                  <strong>{o.id}</strong>
                  <span>·</span>
                  <span>{i === 0 ? "Just now" : "8 min ago"}</span>
                  {i === 0 && <span className="new-pill">NEW</span>}
                </div>
                <h3>{o.customer}</h3>
              </div>
              <button className="row-more">
                <MoreHorizontal size={17} />
              </button>
            </div>
            <div className="biz-items">
              <span>{o.items}</span>
              <span>{money(o.total)}</span>
            </div>
            <div className="biz-note">
              <span className="note-icon">i</span>Customer requested cutlery and
              napkins
            </div>
            <div className="biz-order-bottom">
              <Status status={o.status} />
              <div>
                {o.status === "Preparing" ? (
                  <button
                    className="button button-dark"
                    onClick={() => updateStatus(o.id, "Ready for pickup")}
                  >
                    <Check size={15} /> Mark ready
                  </button>
                ) : (
                  <>
                    <button
                      className="button button-light"
                      onClick={() => updateStatus(o.id, "Preparing")}
                    >
                      Decline
                    </button>
                    <button
                      className="button button-dark"
                      onClick={() => updateStatus(o.id, "Preparing")}
                    >
                      <Check size={15} /> Accept order
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="panel kitchen-tip">
        <span className="tip-icon">
          <Sparkles size={17} />
        </span>
        <span>
          <strong>Kitchen is running smoothly</strong>
          <small>
            Your average prep time is 18 minutes today, 3 minutes faster than
            your weekly average.
          </small>
        </span>
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

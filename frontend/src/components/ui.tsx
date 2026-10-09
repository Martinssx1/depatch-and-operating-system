import { ArrowDownRight, ArrowUpRight, Bike, Check, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Order, OrderStatus } from "../state/DispatchContext";
import { money } from "../utils/format";

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="heading-actions">{actions}</div>
    </div>
  );
}


export function Metric({
  icon,
  label,
  value,
  delta,
  positive = true,
  detail,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  detail: string;
  tone: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${tone}`}>{icon}</span>
        <button className="icon-btn metric-more">
          <MoreHorizontal size={17} />
        </button>
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-bottom">
        <strong>{value}</strong>
        <span className={`metric-delta ${positive ? "positive" : "negative"}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{" "}
          {delta}
        </span>
      </div>
      <div className="metric-detail">{detail}</div>
    </div>
  );
}


export function Status({ status }: { status: OrderStatus }) {
  const cls =
    status === "On the way" || status === "Picked up"
      ? "status-blue"
      : status === "Preparing"
        ? "status-amber"
        : status === "Delivered"
          ? "status-green"
          : "status-violet";
  return (
    <span className={`status ${cls}`}>
      <i />
      {status}
    </span>
  );
}


export function OrderRow({ order }: { order: Order }) {
  return (
    <tr>
      <td>
        <Link to={`/customer/orders/${order.id}`} className="order-id">
          {order.id}
        </Link>
        <span className="order-time">{order.time}</span>
      </td>
      <td>
        <div className="customer-cell">
          <span className="avatar avatar-green">{order.initials}</span>
          <span>{order.customer}</span>
        </div>
      </td>
      <td>
        <span className="business-name">{order.business}</span>
      </td>
      <td>
        <Status status={order.status} />
      </td>
      <td>
        <div className="rider-cell">
          <span className="mini-rider">
            <Bike size={12} />
          </span>
          {order.rider}
        </div>
      </td>
      <td className="total-cell">{money(order.total)}</td>
      <td>
        <button className="row-more">
          <MoreHorizontal size={16} />
        </button>
      </td>
    </tr>
  );
}


export function Zone({
  name,
  orders,
  percent,
  color,
}: {
  name: string;
  orders: string;
  percent: string;
  color: string;
}) {
  return (
    <div className="zone-row">
      <div className="zone-meta">
        <strong>{name}</strong>
        <span>{orders}</span>
      </div>
      <div className="zone-track">
        <i className={color} style={{ width: percent }} />
      </div>
      <span className="zone-percent">{percent}</span>
    </div>
  );
}


export function TimelineItem({
  done = false,
  title,
  time,
}: {
  done?: boolean;
  title: string;
  time: string;
}) {
  return (
    <div className={`timeline-item ${done ? "done" : ""}`}>
      <span className="timeline-marker">{done && <Check size={11} />}</span>
      <div>
        <strong>{title}</strong>
        <span>{time}</span>
      </div>
    </div>
  );
}

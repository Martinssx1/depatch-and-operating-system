import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OrderStatus =
  | "Preparing"
  | "Ready for pickup"
  | "Picked up"
  | "On the way"
  | "Delivered";
export type Order = {
  id: string;
  customer: string;
  initials: string;
  business: string;
  items: string;
  total: number;
  status: OrderStatus;
  rider: string;
  time: string;
  address: string;
  phone?: string;
};
export type CheckoutDetails = { name: string; phone: string; address: string };
export type CartProduct = { id: string; name: string; price: number; restaurant: string; description: string; emoji: string };
export type CartLine = CartProduct & { quantity: number };
type DispatchState = {
  orders: Order[];
  cart: CartLine[];
  updateStatus: (id: string, status: OrderStatus) => void;
  acceptOrder: (id: string) => void;
  addToCart: (product: CartProduct) => void;
  setCartQuantity: (id: string, quantity: number) => void;
  checkout: (details: CheckoutDetails) => Order | null;
};
const seed: Order[] = [
  {
    id: "RL-2048",
    customer: "Amara Okafor",
    initials: "AO",
    business: "The Green Bowl",
    items: "Harvest bowl, ginger shot",
    total: 8200,
    status: "On the way",
    rider: "Tunde A.",
    time: "12:42 PM",
    address: "14 Adeola Odeku, Victoria Island",
  },
  {
    id: "RL-2047",
    customer: "Daniel Mensah",
    initials: "DM",
    business: "Bun & Barrel",
    items: "Double smash burger  × 2",
    total: 12500,
    status: "Ready for pickup",
    rider: "Kelechi O.",
    time: "12:39 PM",
    address: "22 Akin Adesola, Victoria Island",
  },
  {
    id: "RL-2046",
    customer: "Zainab Yusuf",
    initials: "ZY",
    business: "Sora Sushi",
    items: "Salmon maki set, miso soup",
    total: 16800,
    status: "Preparing",
    rider: "Unassigned",
    time: "12:34 PM",
    address: "5 Bourdillon Rd, Ikoyi",
  },
  {
    id: "RL-2045",
    customer: "Chidi Eze",
    initials: "CE",
    business: "The Green Bowl",
    items: "Crispy chicken bowl",
    total: 7400,
    status: "Picked up",
    rider: "Mariam B.",
    time: "12:28 PM",
    address: "8 Adebayo Doherty, Lekki",
  },
  {
    id: "RL-2044",
    customer: "Ifeoma Nwosu",
    initials: "IN",
    business: "Bun & Barrel",
    items: "Truffle fries, vanilla shake",
    total: 6800,
    status: "Delivered",
    rider: "Tunde A.",
    time: "12:19 PM",
    address: "31 Kofo Abayomi St, Victoria Island",
  },
];
const DispatchContext = createContext<DispatchState | null>(null);
export function DispatchProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState(seed);
  const [cart, setCart] = useState<CartLine[]>([]);
  const updateStatus = (id: string, status: OrderStatus) =>
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  const acceptOrder = (id: string) =>
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, rider: "You · online", status: "Picked up" }
          : order,
      ),
    );
  const addToCart = (product: CartProduct) => setCart(current => {
    const existing = current.find(item => item.id === product.id);
    return existing ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  });
  const setCartQuantity = (id: string, quantity: number) => setCart(current => quantity < 1 ? current.filter(item => item.id !== id) : current.map(item => item.id === id ? { ...item, quantity } : item));
  const checkout = (details: CheckoutDetails) => {
    if (!cart.length) return null;
    const created: Order = { id: `RL-${2049 + orders.length - seed.length}`, customer: details.name.trim(), initials: details.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase()).join(""), phone: details.phone.trim(), business: [...new Set(cart.map(item => item.restaurant))].join(", "), items: cart.map(item => `${item.name} x ${item.quantity}`).join(", "), total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 500, status: "Preparing", rider: "Unassigned", time: new Date().toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }), address: details.address.trim() };
    setOrders(current => [created, ...current]);
    setCart([]);
    return created;
  };
  const value = useMemo(
    () => ({ orders, cart, updateStatus, acceptOrder, addToCart, setCartQuantity, checkout }),
    [orders, cart],
  );
  return (
    <DispatchContext.Provider value={value}>
      {children}
    </DispatchContext.Provider>
  );
}
export function useDispatch() {
  const context = useContext(DispatchContext);
  if (!context)
    throw new Error("useDispatch must be used inside DispatchProvider");
  return context;
}

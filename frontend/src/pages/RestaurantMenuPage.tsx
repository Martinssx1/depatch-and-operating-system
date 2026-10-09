import { ArrowLeft, ArrowRight, Clock3, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { formatNaira, restaurants } from "../data/restaurants";
import { useDispatch } from "../state/DispatchContext";

const artwork: Record<string, string> = {
  sage: "bg-gradient-to-br from-emerald-100 to-lime-50",
  sand: "bg-gradient-to-br from-amber-100 to-orange-50",
  blush: "bg-gradient-to-br from-rose-100 to-orange-50",
};

export function RestaurantMenuPage() {
  const { slug } = useParams();
  const restaurant = restaurants.find(item => item.slug === slug);
  const { cart, addToCart, setCartQuantity } = useDispatch();
  if (!restaurant) return <Navigate to="/customer/restaurants" replace/>;
  const quantity = (id: string) => cart.find(line => line.id === id)?.quantity ?? 0;
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  return <div className="page-content mx-auto max-w-6xl">
    <div className="mb-6 flex items-center justify-between"><Link to="/customer/restaurants" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-800"><ArrowLeft size={15}/> All restaurants</Link><Link to="/customer/cart" className="button button-dark"><ShoppingBag size={15}/> Cart{cartCount > 0 && <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{cartCount}</span>}</Link></div>
    <div className={`mb-7 flex items-center gap-5 rounded-2xl p-5 sm:gap-7 sm:p-7 ${artwork[restaurant.color]}`}><span className="grid size-20 shrink-0 place-items-center rounded-full border border-white/70 bg-white/60 text-5xl shadow-sm sm:size-24">{restaurant.emoji}</span><div><div className="eyebrow">NEIGHBORHOOD FAVORITE</div><h1 className="mt-1.5 font-[Manrope] text-2xl font-bold tracking-tight text-slate-800">{restaurant.name}</h1><p className="mt-1 text-xs text-slate-600">{restaurant.description}</p><div className="mt-3 flex flex-wrap gap-3 text-[10px] text-slate-600"><span className="inline-flex items-center gap-1 text-amber-700"><Star size={13} fill="currentColor"/>{restaurant.rating}</span><span className="inline-flex items-center gap-1"><Clock3 size={13}/>{restaurant.delivery}</span><span>{restaurant.fee}</span></div></div></div>
    <div className="mb-3 flex items-end justify-between"><div><h2 className="font-[Manrope] text-base font-bold text-slate-800">Our menu</h2><p className="mt-1 text-xs text-slate-500">Made fresh for you, every time</p></div><span className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-500">{restaurant.menu.length} favorites</span></div>
    <div className="grid gap-2.5">{restaurant.menu.map(product => <article className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:gap-4" key={product.id}><span className={`grid size-14 shrink-0 place-items-center rounded-lg text-3xl ${artwork[restaurant.color]}`}>{product.emoji}</span><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold text-slate-800">{product.name}</h3><p className="mt-1 text-xs leading-4 text-slate-500">{product.description}</p><strong className="mt-2 block text-xs text-emerald-800">{formatNaira(product.price)}</strong></div>{quantity(product.id) > 0 ? <div className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-1"><button className="grid size-7 place-items-center rounded text-emerald-800 hover:bg-emerald-50" aria-label="Remove one" onClick={() => setCartQuantity(product.id, quantity(product.id)-1)}><Minus size={14}/></button><strong className="min-w-4 text-center text-xs">{quantity(product.id)}</strong><button className="grid size-7 place-items-center rounded text-emerald-800 hover:bg-emerald-50" aria-label="Add one" onClick={() => addToCart(product)}><Plus size={14}/></button></div> : <button className="grid size-9 shrink-0 place-items-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-800 hover:bg-emerald-100" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)}><Plus size={17}/></button>}</article>)}</div>
    {cartCount > 0 && <Link to="/customer/cart" className="sticky bottom-4 mx-auto mt-4 flex max-w-lg items-center justify-between rounded-xl bg-emerald-950 px-4 py-3.5 text-white shadow-xl shadow-emerald-950/20"><span className="inline-flex items-center gap-2 text-xs"><ShoppingBag size={16}/>{cartCount} items in your cart</span><strong className="inline-flex items-center gap-2 text-xs">View cart <ArrowRight size={15}/></strong></Link>}
  </div>;
}

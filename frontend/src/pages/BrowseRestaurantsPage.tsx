import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, MapPin, Search, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import { useDispatch } from "../state/DispatchContext";

const artwork: Record<string, string> = {
  sage: "bg-gradient-to-br from-emerald-100 to-lime-50",
  sand: "bg-gradient-to-br from-amber-100 to-orange-50",
  blush: "bg-gradient-to-br from-rose-100 to-orange-50",
};

export function BrowseRestaurantsPage() {
  const { cart } = useDispatch();
  const [search, setSearch] = useState("");
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const visibleRestaurants = useMemo(() => restaurants.filter(restaurant => `${restaurant.name} ${restaurant.cuisine} ${restaurant.menu.map(item => item.name).join(" ")}`.toLowerCase().includes(search.toLowerCase())), [search]);
  return (
    <div className="page-content mx-auto max-w-6xl">
      <div className="mb-7 flex items-center justify-between">
        <Link to="/customer/orders" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-800"><ArrowLeft size={15}/> My orders</Link>
        <Link to="/customer/cart" className="button button-dark"><ShoppingBag size={15}/> Cart{cartCount > 0 && <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">{cartCount}</span>}</Link>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><div className="eyebrow">GOOD FOOD, ON ITS WAY</div><h1 className="mt-2 font-[Manrope] text-3xl font-bold tracking-tight text-slate-800">What sounds good?</h1><p className="mt-1 text-sm text-slate-500">Local favorites, made fresh and delivered to you.</p></div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-emerald-800"><MapPin size={16}/><span><small className="block text-[9px] font-bold tracking-wider text-slate-400">DELIVERING TO</small><strong className="text-xs text-slate-700">14 Adeola Odeku, Victoria Island</strong></span></div>
      </div>
      <label className="my-6 flex h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 text-slate-400 focus-within:border-emerald-700"><Search size={17}/><input className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search restaurants or dishes" value={search} onChange={event => setSearch(event.target.value)}/><span className="rounded bg-slate-100 px-1.5 py-1 text-[10px]">⌘ K</span></label>
      <div className="mb-4 flex items-end justify-between"><div><h2 className="font-[Manrope] text-base font-bold text-slate-800">Popular near you</h2><p className="mt-1 text-xs text-slate-500">Neighborhood favorites, picked for you</p></div><span className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] text-slate-500">{visibleRestaurants.length} restaurants</span></div>
      {visibleRestaurants.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleRestaurants.map(restaurant => <Link key={restaurant.slug} to={`/customer/restaurants/${restaurant.slug}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/5">
        <div className={`relative grid h-40 place-items-center overflow-hidden ${artwork[restaurant.color]}`}><div className="absolute size-44 rounded-full border border-white/60"/><div className="absolute size-56 rounded-full border border-white/60"/><span className="relative text-7xl drop-shadow-md transition group-hover:scale-105">{restaurant.emoji}</span><span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-emerald-800"><i className="size-1.5 rounded-full bg-emerald-500"/>Open</span><span className="absolute bottom-3 right-3 rounded bg-white/80 px-2 py-1 text-[9px] font-bold tracking-wide text-slate-600">LOCAL FAVORITE</span></div>
        <div className="p-4"><div className="flex items-center justify-between gap-2"><h3 className="font-[Manrope] text-sm font-bold text-slate-800">{restaurant.name}</h3><span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700"><Star size={13} fill="currentColor"/>{restaurant.rating}</span></div><p className="mt-1 text-xs text-slate-500">{restaurant.cuisine}</p><p className="mt-3 min-h-8 text-[11px] leading-4 text-slate-400">{restaurant.description}</p><div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-500"><span className="inline-flex items-center gap-1"><Clock3 size={13}/>{restaurant.delivery}</span><i className="size-1 rounded-full bg-slate-300"/><span>{restaurant.fee}</span><ArrowRight size={15} className="ml-auto text-emerald-800 transition group-hover:translate-x-0.5"/></div></div>
      </Link>)}</div> : <div className="panel py-12 text-center text-sm text-slate-500">No restaurants match “{search}”.</div>}
      <div className="mt-5 flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-emerald-800"><span className="text-lg">✦</span><div><strong className="block text-xs">Good things travel well.</strong><small className="text-[10px] text-slate-500">Every order is packed with care and tracked from kitchen to door.</small></div></div>
    </div>
  );
}

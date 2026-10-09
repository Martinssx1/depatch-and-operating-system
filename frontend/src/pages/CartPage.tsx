import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatNaira } from "../data/restaurants";
import { useDispatch } from "../state/DispatchContext";

export function CartPage() {
  const { cart, setCartQuantity, checkout } = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const delivery = cart.length ? 500 : 0;
  const phoneDigits = details.phone.replace(/\D/g, "").length;
  const phoneValid = /^\+?[0-9 ()-]{10,20}$/.test(details.phone.trim()) && phoneDigits >= 10 && phoneDigits <= 15;
  const canCheckout = details.name.trim().length >= 2 && phoneValid && details.address.trim().length >= 8;
  const onCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canCheckout) return;
    const order = checkout(details);
    if (order) navigate(`/customer/orders/${order.id}`, { state: { justPlaced: true } });
  };
  const fieldClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10";

  return (
    <div className="page-content mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/customer/restaurants" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-800"><ArrowLeft size={15}/> Keep browsing</Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800"><Check size={14}/> Secure checkout</span>
      </div>
      <div className="mb-6">
        <div className="eyebrow">YOUR ORDER</div>
        <h1 className="mt-2 flex items-center gap-2 font-[Manrope] text-3xl font-bold tracking-tight text-slate-800">Your cart <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-sans text-xs font-semibold text-emerald-800">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></h1>
        <p className="mt-1 text-sm text-slate-500">Add your delivery details before placing your order.</p>
      </div>

      {!cart.length ? (
        <div className="panel px-5 py-14 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-800"><ShoppingBag size={23}/></span>
          <h2 className="mt-4 font-[Manrope] text-base font-bold text-slate-800">Your cart is waiting</h2>
          <p className="mt-1 text-sm text-slate-500">Pick a restaurant and add something delicious.</p>
          <Link className="button button-dark mt-4" to="/customer/restaurants">Browse restaurants <ArrowRight size={14}/></Link>
        </div>
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,.85fr)]">
          <section className="panel px-4 sm:px-5">
            <div className="flex items-center justify-between border-b border-slate-100 py-4">
              <div><h2 className="font-[Manrope] text-sm font-bold text-slate-800">Items</h2><p className="mt-1 text-xs text-slate-500">{cart.length} delicious choice{cart.length === 1 ? "" : "s"}</p></div>
              <Link to="/customer/restaurants" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">Add more <Plus size={14}/></Link>
            </div>
            {cart.map(line => (
              <article className="flex min-h-20 items-center gap-2.5 border-b border-slate-100 py-3 last:border-0 sm:gap-3" key={line.id}>
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-amber-50 text-2xl">{line.emoji}</span>
                <div className="min-w-0 flex-1"><strong className="block truncate text-xs font-semibold text-slate-800">{line.name}</strong><span className="mt-0.5 block text-[11px] text-slate-500">{line.restaurant}</span><b className="mt-1 block text-[11px] text-emerald-800">{formatNaira(line.price)}</b></div>
                <div className="flex h-8 items-center gap-1 rounded-lg bg-slate-50 px-1"><button className="grid size-6 place-items-center rounded text-emerald-800 hover:bg-emerald-50" aria-label="Remove one" onClick={() => setCartQuantity(line.id, line.quantity - 1)}><Minus size={13}/></button><strong className="min-w-4 text-center text-xs">{line.quantity}</strong><button className="grid size-6 place-items-center rounded text-emerald-800 hover:bg-emerald-50" aria-label="Add one" onClick={() => setCartQuantity(line.id, line.quantity + 1)}><Plus size={13}/></button></div>
                <strong className="hidden min-w-16 text-right text-xs text-slate-800 sm:block">{formatNaira(line.price * line.quantity)}</strong>
                <button className="p-1 text-slate-400 hover:text-rose-600" aria-label={`Remove ${line.name}`} onClick={() => setCartQuantity(line.id, 0)}><Trash2 size={14}/></button>
              </article>
            ))}
          </section>

          <form className="panel p-4 sm:p-5" onSubmit={onCheckout}>
            <h2 className="font-[Manrope] text-sm font-bold text-slate-800">Delivery details</h2>
            <p className="mt-1 text-xs text-slate-500">Where should we bring your order?</p>
            <div className="mt-4 space-y-3">
              <label className="block text-xs font-semibold text-slate-700">Full name <span className="text-rose-500">*</span><input className={fieldClass} autoComplete="name" placeholder="e.g. Amara Okafor" value={details.name} onChange={event => setDetails({ ...details, name: event.target.value })} required minLength={2}/></label>
              <label className="block text-xs font-semibold text-slate-700">Phone number <span className="text-rose-500">*</span><input className={fieldClass} type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 080 1234 5678" value={details.phone} onChange={event => setDetails({ ...details, phone: event.target.value })} required pattern="[+]?[0-9 ()-]{10,20}" title="Enter a valid phone number with 10 to 20 digits and optional +, spaces, hyphens, or parentheses."/></label>
              <label className="block text-xs font-semibold text-slate-700">Delivery address <span className="text-rose-500">*</span><textarea className={`${fieldClass} min-h-20 resize-y`} autoComplete="street-address" placeholder="Street, building, area, and any helpful directions" value={details.address} onChange={event => setDetails({ ...details, address: event.target.value })} required minLength={8}/></label>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-3">
              <div className="flex justify-between py-1.5 text-xs text-slate-500"><span>Subtotal</span><strong className="text-slate-700">{formatNaira(subtotal)}</strong></div>
              <div className="flex justify-between py-1.5 text-xs text-slate-500"><span>Delivery</span><strong className="text-slate-700">{formatNaira(delivery)}</strong></div>
              <div className="mt-2 flex justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-800"><span>Total</span><span>{formatNaira(subtotal + delivery)}</span></div>
            </div>
            <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-900 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300" type="submit" disabled={!canCheckout}>Checkout & place order <ArrowRight size={15}/></button>
            <p className="mt-2 text-center text-[10px] text-slate-400">Your name, phone, and address are required to continue.</p>
          </form>
        </div>
      )}
    </div>
  );
}

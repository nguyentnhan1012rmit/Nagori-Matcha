import { useState, useEffect } from 'react';
import { X, Calendar, Users, Mail, Phone, User, MessageSquare, CheckCircle, ChevronDown, Loader2, AlertCircle } from 'lucide-react';

// ─── EmailJS credentials ─────────────────────────────────────────────────────
// Sign up free at https://emailjs.com → Service ID, Template ID, Public Key
const EMAILJS_SERVICE_ID  = 'service_nsxlkrc';
const EMAILJS_TEMPLATE_ID = 'template_046no0u';
const EMAILJS_PUBLIC_KEY  = 'M2nkz6196_l5g3Nvc';
// ─────────────────────────────────────────────────────────────────────────────

const roomOptions = [
  { name: 'Standard',    price: '2,300,000 VND / night', image: '/images/accommodation1.png', capacity: '2 guests' },
  { name: 'Deluxe',      price: '2,800,000 VND / night', image: '/images/accommodation2.png', capacity: '2 guests' },
  { name: 'Suite',       price: '3,200,000 VND / night', image: '/images/accommodation3.png', capacity: '2 guests' },
  { name: 'Family Suite',price: '6,500,000 VND / night', image: '/images/accommodation4.png', capacity: '4 guests' },
];

export default function BookingModal({ isOpen, onClose, preselectedRoom }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    room: preselectedRoom || 'Standard',
    checkin: '', checkout: '', guests: '2', requests: '',
  });
  const [status, setStatus]   = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedRoom) setForm(f => ({ ...f, room: preselectedRoom }));
  }, [preselectedRoom]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 400);
  }, [isOpen]);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const currentRoom = roomOptions.find(r => r.name === form.room) || roomOptions[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            to_name:    form.name,
            to_email:   form.email,
            room_type:  form.room,
            room_price: currentRoom.price,
            checkin:    form.checkin,
            checkout:   form.checkout,
            guests:     `${form.guests} Guest${form.guests !== '1' ? 's' : ''}`,
            phone:      form.phone || 'Not provided',
            requests:   form.requests || 'None',
          },
        }),
      });

      if (res.status === 200) {
        setStatus('success');
      } else {
        const msg = await res.text();
        throw new Error(msg || 'Failed to send. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  const inputCls = 'w-full pl-9 pr-3 py-3 rounded-xl border border-charred/15 bg-white text-charred text-sm placeholder-charred/30 focus:outline-none focus:border-forest transition-colors duration-200';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-charred/80 backdrop-blur-md" />

      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-linen shadow-2xl flex flex-col md:flex-row animate-fade-in-up"
        style={{ animationDuration: '0.4s' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ─── Left panel: room preview ─── */}
        <div className="hidden md:flex md:w-5/12 relative flex-col overflow-hidden">
          <img
            src={currentRoom.image}
            alt={currentRoom.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charred via-charred/50 to-charred/10" />
          <div className="relative z-10 mt-auto p-8 pb-10">
            <p className="text-amber text-xs tracking-[0.3em] uppercase mb-3">Selected Room</p>
            <h3 className="font-heading text-white text-3xl mb-1">{form.room}</h3>
            <p className="text-white/60 text-sm mb-4">From {currentRoom.price}</p>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Users size={12} />
              {currentRoom.capacity}
            </div>
          </div>
        </div>

        {/* ─── Right panel: form ─── */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Sticky header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-charred/8 bg-linen">
            <div>
              <p className="text-amber text-xs tracking-[0.3em] uppercase mb-0.5">Mangrover Retreat</p>
              <h2 className="font-heading text-charred text-2xl">Reserve Your Stay</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-charred/15 text-charred-light hover:border-charred/40 hover:text-charred transition-all duration-300"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1">
            {status === 'success' ? (
              /* ── Success screen ── */
              <div className="flex flex-col items-center justify-center text-center px-8 py-16">
                <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mb-6">
                  <CheckCircle className="text-forest" size={38} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-charred text-3xl mb-3">Request Received!</h3>
                <p className="text-charred-light leading-relaxed mb-2 max-w-xs">
                  Thank you, <strong className="text-charred">{form.name}</strong>. A confirmation has been sent to
                </p>
                <p className="font-heading text-forest text-lg mb-6">{form.email}</p>
                <p className="text-charred-light text-sm leading-relaxed mb-8 max-w-xs">
                  We'll confirm your <strong className="text-charred">{form.room}</strong> reservation within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-forest text-linen text-sm tracking-widest uppercase rounded-full hover:bg-forest-light transition-colors duration-300"
                >
                  Done
                </button>
              </div>
            ) : (
              /* ── Booking form ── */
              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">{errorMsg}</p>
                  </div>
                )}

                {/* Room picker */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Room Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roomOptions.map(room => (
                      <button
                        type="button"
                        key={room.name}
                        onClick={() => setForm(f => ({ ...f, room: room.name }))}
                        className={`text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                          form.room === room.name
                            ? 'border-forest bg-forest text-linen shadow-md'
                            : 'border-charred/15 bg-white text-charred hover:border-forest/40'
                        }`}
                      >
                        <div className="font-medium">{room.name}</div>
                        <div className={`text-xs mt-0.5 ${form.room === room.name ? 'text-linen/70' : 'text-charred-light'}`}>
                          {room.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                      <input type="date" required value={form.checkin} min={new Date().toISOString().split('T')[0]}
                        onChange={set('checkin')} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                      <input type="date" required value={form.checkout}
                        min={form.checkin || new Date().toISOString().split('T')[0]}
                        onChange={set('checkout')} className={inputCls} />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Number of Guests</label>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                    <select value={form.guests} onChange={set('guests')} className={inputCls + ' appearance-none pr-8'}>
                      {['1','2','3','4'].map(n => <option key={n} value={n}>{n} Guest{n !== '1' ? 's' : ''}</option>)}
                    </select>
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Full Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                      <input type="text" required placeholder="Your name" value={form.name}
                        onChange={set('name')} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                      <input type="email" required placeholder="your@email.com" value={form.email}
                        onChange={set('email')} className={inputCls} />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">
                    Phone <span className="normal-case opacity-50">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charred-light pointer-events-none" />
                    <input type="tel" placeholder="+84 90 000 0000" value={form.phone}
                      onChange={set('phone')} className={inputCls} />
                  </div>
                </div>

                {/* Special requests */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-charred-light mb-2">Special Requests</label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3.5 text-charred-light pointer-events-none" />
                    <textarea rows={3} placeholder="Dietary needs, celebrations, accessibility..." value={form.requests}
                      onChange={set('requests')}
                      className="w-full pl-9 pr-3 py-3 rounded-xl border border-charred/15 bg-white text-charred text-sm placeholder-charred/30 focus:outline-none focus:border-forest transition-colors duration-200 resize-none" />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-forest text-linen text-sm tracking-widest uppercase rounded-xl hover:bg-forest-light hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    'Request Reservation'
                  )}
                </button>
                <p className="text-center text-charred/35 text-xs pb-2">
                  No payment required now · Confirmation sent to your email
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

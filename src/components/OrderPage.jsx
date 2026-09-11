import { useState, useMemo, useCallback } from 'react';
import { Minus, Plus, ShoppingBag, X, ArrowLeft, Check, Trash2 } from 'lucide-react';

/* ── Full menu with real prices ── */
const ORDER_MENU = [
  {
    group: 'Signature',
    emoji: '✦',
    items: [
      { id: 's1', name: 'Toasted Brûlée Matcha', price: 155000, desc: 'Crème brûlée foam · strawberry', tag: 'Best seller' },
      { id: 's2', name: 'Lemon Veil', price: 135000, desc: 'Matcha · lemon zest · cream', tag: null },
      { id: 's3', name: 'Secret Garden', price: 135000, desc: 'Matcha · jasmine tea · lychee · rose', tag: 'Staff pick' },
      { id: 's4', name: 'Tropical Velvet Brew', price: 115000, desc: 'Cold brew · mango · apricot', tag: null },
      { id: 's5', name: 'Amber Cloud', price: 115000, desc: 'Oolong · coconut · apricot', tag: null },
    ]
  },
  {
    group: 'Matcha',
    emoji: '🍵',
    items: [
      { id: 'm1', name: 'Nagori Matcha', price: 85000, desc: 'Classic milk matcha', tag: null },
      { id: 'm2', name: 'Nagori Silken Whisk', price: 95000, desc: 'Silky milk · hand-whisked matcha', tag: 'Signature' },
      { id: 'm3', name: 'Coconut Matcha', price: 95000, desc: 'Coconut water · matcha', tag: null },
      { id: 'm4', name: 'Cloud Coconut Matcha', price: 105000, desc: 'Coconut · cream · matcha', tag: null },
      { id: 'm5', name: 'Mango Echo', price: 105000, desc: 'Matcha · mango · cream', tag: 'New' },
      { id: 'm6', name: 'Afterglow', price: 105000, desc: 'Strawberry · coconut · matcha', tag: null },
    ]
  },
  {
    group: 'Cold Brew & Tea',
    emoji: '🧊',
    items: [
      { id: 'c1', name: 'Zesty Lemon Coldbrew', price: 85000, desc: 'Cold brew · lemon', tag: null },
      { id: 'c2', name: 'Coldcnut', price: 85000, desc: 'Cold brew · coconut', tag: null },
      { id: 'c3', name: 'Midnight Lychee', price: 95000, desc: 'Cold brew · lychee', tag: null },
      { id: 'c4', name: 'Golden Hour', price: 95000, desc: 'Jasmine tea · strawberry · lemon', tag: 'Popular' },
      { id: 'c5', name: 'Lychee Petal', price: 95000, desc: 'Jasmine tea · lychee · rose', tag: null },
      { id: 'c6', name: 'Sunbeam', price: 95000, desc: 'Oolong · mango · lemon', tag: null },
    ]
  },
  {
    group: 'Waffle',
    emoji: '🧇',
    items: [
      { id: 'w1', name: 'Crème Brûlée Strawberry', price: 115000, desc: 'Brûlée cream · strawberry', tag: 'Best seller' },
      { id: 'w2', name: 'Lemon Cream Waffle', price: 95000, desc: 'Lemon zest · cream', tag: null },
      { id: 'w3', name: 'Coconut Cream Waffle', price: 95000, desc: 'Coconut cream', tag: null },
      { id: 'w4', name: 'Mango Cream Waffle', price: 95000, desc: 'Mango · cream', tag: null },
      { id: 'w5', name: 'Matcha Waffle', price: 95000, desc: 'Matcha cream', tag: null },
      { id: 'w6', name: 'Sakura Cream Waffle', price: 105000, desc: 'Seasonal sakura cream', tag: 'Seasonal' },
    ]
  },
  {
    group: 'Seasonal',
    emoji: '🌸',
    items: [
      { id: 'se1', name: 'Hanami Blossom', price: 135000, desc: 'Sakura · strawberry · matcha', tag: '春 Spring' },
      { id: 'se2', name: 'Natsu Oasis', price: 135000, desc: 'Mango · sticky rice · matcha', tag: '夏 Summer' },
      { id: 'se3', name: 'Aki Violet', price: 135000, desc: 'Ube · lavender · matcha', tag: '秋 Autumn' },
      { id: 'se4', name: 'Hatsuyuki Haze', price: 135000, desc: 'Raffaello · coconut · matcha', tag: '冬 Winter' },
    ]
  }
];

const SIZE_OPTIONS = [
  { id: 'regular', label: '360ml', extra: 0 },
  { id: 'large', label: '460ml', extra: 15000 },
];

const MILK_OPTIONS = [
  { id: 'default', label: 'Sữa tươi', extra: 0 },
  { id: 'meiji', label: 'Meiji', extra: 10000 },
  { id: 'almond', label: 'Hạnh nhân', extra: 10000 },
  { id: 'oat', label: 'Yến mạch', extra: 15000 },
];

const COPY_ORDER = {
  vi: {
    title: 'Đặt nước',
    subtitle: 'Chọn thức uống yêu thích của bạn',
    cart: 'Giỏ hàng',
    cartEmpty: 'Giỏ hàng trống',
    cartEmptyDesc: 'Thêm thức uống để bắt đầu',
    total: 'Tổng cộng',
    checkout: 'Đặt hàng',
    back: 'Quay lại',
    size: 'Kích cỡ',
    milk: 'Loại sữa',
    addToCart: 'Thêm vào giỏ',
    items: 'món',
    note: 'Ghi chú',
    notePlaceholder: 'Ít đường, nhiều đá...',
    name: 'Họ tên',
    phone: 'Số điện thoại',
    table: 'Số bàn (nếu có)',
    placeOrder: 'Xác nhận đặt hàng',
    orderSuccess: 'Đã nhận đơn hàng!',
    orderSuccessDesc: 'Nagori sẽ chuẩn bị thức uống cho bạn.',
    orderAnother: 'Đặt thêm',
    remove: 'Xoá',
    customise: 'Tuỳ chỉnh',
    orderSummary: 'Tóm tắt đơn hàng',
  },
  en: {
    title: 'Order Drinks',
    subtitle: 'Choose your favourite drinks',
    cart: 'Cart',
    cartEmpty: 'Cart is empty',
    cartEmptyDesc: 'Add drinks to get started',
    total: 'Total',
    checkout: 'Checkout',
    back: 'Back',
    size: 'Size',
    milk: 'Milk',
    addToCart: 'Add to cart',
    items: 'items',
    note: 'Note',
    notePlaceholder: 'Less sugar, extra ice...',
    name: 'Name',
    phone: 'Phone',
    table: 'Table number (optional)',
    placeOrder: 'Place order',
    orderSuccess: 'Order received!',
    orderSuccessDesc: 'Nagori will prepare your drinks.',
    orderAnother: 'Order more',
    remove: 'Remove',
    customise: 'Customise',
    orderSummary: 'Order summary',
  }
};

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

export default function OrderPage({ lang, onBack }) {
  const t = COPY_ORDER[lang];
  const [activeGroup, setActiveGroup] = useState('Signature');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customising, setCustomising] = useState(null); // item being customised
  const [customSize, setCustomSize] = useState('regular');
  const [customMilk, setCustomMilk] = useState('default');
  const [customNote, setCustomNote] = useState('');

  const currentItems = useMemo(
    () => ORDER_MENU.find(g => g.group === activeGroup)?.items || [],
    [activeGroup]
  );

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.totalPrice * item.qty, 0),
    [cart]
  );

  const addToCart = useCallback((item, size, milk, note) => {
    const sizeOpt = SIZE_OPTIONS.find(s => s.id === size);
    const milkOpt = MILK_OPTIONS.find(m => m.id === milk);
    const totalPrice = item.price + (sizeOpt?.extra || 0) + (milkOpt?.extra || 0);
    const cartKey = `${item.id}-${size}-${milk}`;

    setCart(prev => {
      const existing = prev.find(c => c.cartKey === cartKey);
      if (existing) {
        return prev.map(c => c.cartKey === cartKey ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, {
        cartKey,
        id: item.id,
        name: item.name,
        price: item.price,
        totalPrice,
        size: sizeOpt?.label || '360ml',
        milk: milkOpt?.label || 'Sữa tươi',
        note,
        qty: 1,
      }];
    });
  }, []);

  const updateQty = useCallback((cartKey, delta) => {
    setCart(prev =>
      prev
        .map(c => c.cartKey === cartKey ? { ...c, qty: c.qty + delta } : c)
        .filter(c => c.qty > 0)
    );
  }, []);

  const removeItem = useCallback((cartKey) => {
    setCart(prev => prev.filter(c => c.cartKey !== cartKey));
  }, []);

  const handleAddToCart = (item) => {
    setCustomising(item);
    setCustomSize('regular');
    setCustomMilk('default');
    setCustomNote('');
  };

  const confirmAdd = () => {
    if (customising) {
      addToCart(customising, customSize, customMilk, customNote);
      setCustomising(null);
      setCartOpen(true);
    }
  };

  const quickAdd = (item) => {
    addToCart(item, 'regular', 'default', '');
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setCheckoutOpen(false);
    setCart([]);
  };

  // ── Success Screen ──
  if (orderSuccess) {
    return (
      <div className="order-page">
        <div className="order-success-screen">
          <div className="order-success-icon"><Check size={48} strokeWidth={1.5} /></div>
          <h2>{t.orderSuccess}</h2>
          <p>{t.orderSuccessDesc}</p>
          <div className="order-success-actions">
            <button className="btn btn-light order-btn-filled" onClick={() => setOrderSuccess(false)}>
              {t.orderAnother}
            </button>
            <button className="btn btn-outline order-btn-outline" onClick={onBack}>
              {t.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      {/* ── Header ── */}
      <header className="order-header">
        <button className="order-back-btn" onClick={onBack} aria-label={t.back}>
          <ArrowLeft size={20} />
          <span>{t.back}</span>
        </button>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="wordmark order-wordmark">Nagori</a>
        <button
          className="order-cart-toggle"
          onClick={() => setCartOpen(!cartOpen)}
          aria-label={t.cart}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="order-cart-badge">{cartCount}</span>}
        </button>
      </header>

      {/* ── Page Title ── */}
      <div className="order-title-area">
        <p className="kicker">{t.subtitle}</p>
        <h1>{t.title}</h1>
      </div>

      {/* ── Category Tabs ── */}
      <div className="order-tabs">
        {ORDER_MENU.map(({ group, emoji }) => (
          <button
            key={group}
            className={`order-tab ${activeGroup === group ? 'active' : ''}`}
            onClick={() => setActiveGroup(group)}
          >
            <span className="order-tab-emoji">{emoji}</span>
            <span>{group}</span>
          </button>
        ))}
      </div>

      {/* ── Items Grid ── */}
      <div className="order-grid">
        {currentItems.map((item) => (
          <article className="order-card" key={item.id}>
            {item.tag && <span className="order-card-tag">{item.tag}</span>}
            <div className="order-card-body">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="order-card-footer">
                <strong>{formatVND(item.price)}</strong>
                <div className="order-card-actions">
                  <button
                    className="order-card-customise"
                    onClick={() => handleAddToCart(item)}
                    title={t.customise}
                  >
                    {t.customise}
                  </button>
                  <button
                    className="order-card-add"
                    onClick={() => quickAdd(item)}
                    aria-label={t.addToCart}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Customise Modal ── */}
      {customising && (
        <div className="order-modal-overlay" onClick={() => setCustomising(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <button className="order-modal-close" onClick={() => setCustomising(null)}>
              <X size={20} />
            </button>
            <h3>{customising.name}</h3>
            <p className="order-modal-desc">{customising.desc}</p>

            <div className="order-option-group">
              <label className="order-option-label">{t.size}</label>
              <div className="order-option-row">
                {SIZE_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`order-option-btn ${customSize === opt.id ? 'active' : ''}`}
                    onClick={() => setCustomSize(opt.id)}
                  >
                    {opt.label}
                    {opt.extra > 0 && <span className="order-option-extra">+{formatVND(opt.extra)}</span>}
                  </button>
                ))}
              </div>
            </div>

            {activeGroup !== 'Waffle' && (
              <div className="order-option-group">
                <label className="order-option-label">{t.milk}</label>
                <div className="order-option-row">
                  {MILK_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      className={`order-option-btn ${customMilk === opt.id ? 'active' : ''}`}
                      onClick={() => setCustomMilk(opt.id)}
                    >
                      {opt.label}
                      {opt.extra > 0 && <span className="order-option-extra">+{formatVND(opt.extra)}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="order-option-group">
              <label className="order-option-label">{t.note}</label>
              <input
                className="order-note-input"
                placeholder={t.notePlaceholder}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
              />
            </div>

            <div className="order-modal-footer">
              <strong>
                {formatVND(
                  customising.price +
                  (SIZE_OPTIONS.find(s => s.id === customSize)?.extra || 0) +
                  (activeGroup !== 'Waffle' ? (MILK_OPTIONS.find(m => m.id === customMilk)?.extra || 0) : 0)
                )}
              </strong>
              <button className="order-btn-filled" onClick={confirmAdd}>
                {t.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className="order-modal-overlay" onClick={() => setCartOpen(false)}>
          <div className="order-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="order-cart-header">
              <h3><ShoppingBag size={20} /> {t.cart} ({cartCount} {t.items})</h3>
              <button className="order-modal-close" onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="order-cart-empty">
                <ShoppingBag size={40} strokeWidth={1} />
                <p>{t.cartEmpty}</p>
                <span>{t.cartEmptyDesc}</span>
              </div>
            ) : (
              <>
                <div className="order-cart-items">
                  {cart.map((item) => (
                    <div className="order-cart-item" key={item.cartKey}>
                      <div className="order-cart-item-info">
                        <h4>{item.name}</h4>
                        <span>{item.size} · {item.milk}</span>
                        {item.note && <span className="order-cart-item-note">"{item.note}"</span>}
                        <strong>{formatVND(item.totalPrice)}</strong>
                      </div>
                      <div className="order-cart-item-controls">
                        <div className="order-qty-controls">
                          <button onClick={() => updateQty(item.cartKey, -1)}><Minus size={14} /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.cartKey, 1)}><Plus size={14} /></button>
                        </div>
                        <button className="order-cart-remove" onClick={() => removeItem(item.cartKey)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-cart-footer">
                  <div className="order-cart-total">
                    <span>{t.total}</span>
                    <strong>{formatVND(cartTotal)}</strong>
                  </div>
                  <button
                    className="order-btn-filled order-checkout-btn"
                    onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
                  >
                    {t.checkout}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Checkout Modal ── */}
      {checkoutOpen && (
        <div className="order-modal-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="order-modal order-checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="order-modal-close" onClick={() => setCheckoutOpen(false)}>
              <X size={20} />
            </button>
            <h3>{t.orderSummary}</h3>

            <div className="order-checkout-items">
              {cart.map(item => (
                <div className="order-checkout-line" key={item.cartKey}>
                  <span>{item.qty}× {item.name}</span>
                  <span>{formatVND(item.totalPrice * item.qty)}</span>
                </div>
              ))}
              <div className="order-checkout-line order-checkout-total">
                <span>{t.total}</span>
                <strong>{formatVND(cartTotal)}</strong>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="order-checkout-form">
              <label>
                <span>{t.name}</span>
                <input required name="name" />
              </label>
              <label>
                <span>{t.phone}</span>
                <input required type="tel" name="phone" />
              </label>
              <label>
                <span>{t.table}</span>
                <input name="table" />
              </label>
              <button className="order-btn-filled order-checkout-btn" type="submit">
                {t.placeOrder}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Floating Cart Button (mobile) ── */}
      {cartCount > 0 && !cartOpen && !checkoutOpen && (
        <button className="order-floating-cart" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={20} />
          <span>{cartCount} {t.items} · {formatVND(cartTotal)}</span>
        </button>
      )}
    </div>
  );
}

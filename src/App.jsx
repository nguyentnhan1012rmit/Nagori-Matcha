import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, Clock3, MapPin, Menu as MenuIcon, ShoppingBag, Users, X } from 'lucide-react';
import OrderPage from './components/OrderPage';

/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger-children'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}

const COPY = {
  vi: {
    nav: { story: 'Câu chuyện', menu: 'Thực đơn', workshop: 'Workshop', space: 'Không gian', contact: 'Liên hệ' },
    reserve: 'Đặt chỗ', heroEyebrow: 'Japanese Matcha Lounge · Phú Mỹ Hưng', heroTitle1: 'A matcha kind', heroTitle2: 'of day.',
    heroText: 'Matcha Nhật Bản, những mùa vị mới và một khoảng lặng vừa đủ giữa nhịp sống thành phố.',
    exploreMenu: 'Khám phá thực đơn', bookWorkshop: 'Đặt workshop', storyKicker: 'Nagori · なごり', storyTitle: 'Một dư vị còn ở lại.',
    storyText: 'Nagori bắt nguồn từ một khái niệm Nhật Bản về dấu vết hay cảm giác còn lưu lại sau một khoảnh khắc hoặc một mùa đã qua. Tinh thần ấy hiện diện trong từng chén matcha, từng nguyên liệu theo mùa và những trải nghiệm được cùng nhau tạo nên tại quầy.',
    menuKicker: 'Menu', menuTitle: 'Matcha là trung tâm.', menuText: 'Bốn cấp matcha Nhật Bản, signature drinks, cold brew, trà và waffle được thiết kế quanh sự cân bằng giữa vị, kết cấu và trải nghiệm thị giác.', seasonal: 'Bộ sưu tập theo mùa', addOns: 'Tuỳ chọn & phụ thu',
    workshopKicker: 'Nagori Matcha Workshop', workshopTitle: 'Tự tay whisk, foam & finish.', workshopText: 'Workshop 2 giờ tại quầy matcha mở 12 chỗ. Barista hướng dẫn cách đánh matcha, tạo foam và hoàn thiện ly theo phong cách riêng.', duration: '2 giờ', capacity: 'Tối đa 12 khách', schedule: 'Mỗi ngày', price: 'Giá workshop', priceBlank: '— / khách', reserveWorkshop: 'Đặt workshop',
    spaceKicker: 'The Space', spaceTitle: 'Hai tầng, hai nhịp trải nghiệm.', spaceText1: 'Tầng 1 là quầy matcha mở, khu ngồi café và Zen garden trung tâm — năng động, sáng và giàu tương tác.', spaceText2: 'Tầng 2 yên tĩnh hơn với bàn thấp kiểu Nhật, phù hợp cho gia đình, nhóm nhỏ và những buổi ngồi lâu.',
    bookingKicker: 'Reservations', bookingTitle: 'Giữ chỗ tại Nagori.', bookingText: 'Đặt bàn cho café hoặc giữ slot workshop trực tiếp trên website.', tableTab: 'Đặt bàn', workshopTab: 'Workshop', submitTable: 'Gửi yêu cầu đặt bàn', submitWorkshop: 'Gửi yêu cầu workshop', name: 'Họ tên', phone: 'Số điện thoại', email: 'Email', date: 'Ngày', time: 'Giờ', guests: 'Số khách', note: 'Ghi chú', formSuccess: 'Đã nhận yêu cầu. Nagori sẽ xác nhận lại với bạn sớm nhất.',
    contactKicker: 'Visit Nagori', contactTitle: 'Một khoảng dừng ở Phú Mỹ Hưng.', address: 'Nguyễn Đức Cảnh, Phú Mỹ Hưng, Quận 7, TP.HCM', hours: 'Mở cửa mỗi ngày · 08:30–21:30', phoneValue: '0901 234 567', emailValue: 'hello@nagori.vn', instagramValue: '@nagori.matcha', workshopPolicy: 'Workshop theo slot 2 giờ. Cọc 50% để giữ chỗ. Đổi lịch miễn phí trước 24 giờ; huỷ trong 24 giờ không hoàn cọc.', footer: 'Japanese matcha · seasonal moments · Phú Mỹ Hưng'
  },
  en: {
    nav: { story: 'Story', menu: 'Menu', workshop: 'Workshop', space: 'Space', contact: 'Contact' },
    reserve: 'Reserve', heroEyebrow: 'Japanese Matcha Lounge · Phu My Hung', heroTitle1: 'A matcha kind', heroTitle2: 'of day.', heroText: 'Japanese matcha, seasonal flavours, and a quiet pause in the middle of the city.', exploreMenu: 'Explore the menu', bookWorkshop: 'Book a workshop', storyKicker: 'Nagori · なごり', storyTitle: 'A lingering trace.', storyText: 'Nagori comes from a Japanese idea: the trace or feeling that remains after a moment or season has passed. That spirit lives in every bowl of matcha, every seasonal ingredient and every experience created together at the bar.',
    menuKicker: 'Menu', menuTitle: 'Matcha at the centre.', menuText: 'Four Japanese matcha grades, signature drinks, cold brew, tea and waffles built around flavour, texture and visual expression.', seasonal: 'Seasonal collection', addOns: 'Options & add-ons',
    workshopKicker: 'Nagori Matcha Workshop', workshopTitle: 'Whisk, foam & finish your own.', workshopText: 'A two-hour guided session at our 12-seat open matcha bar. Learn whisking, foam styling and finishing your drink with a barista.', duration: '2 hours', capacity: 'Up to 12 guests', schedule: 'Daily', price: 'Workshop price', priceBlank: '— / guest', reserveWorkshop: 'Book workshop',
    spaceKicker: 'The Space', spaceTitle: 'Two floors, two rhythms.', spaceText1: 'Floor 1 centres on the open matcha bar, café seating and a Zen garden — bright, social and interactive.', spaceText2: 'Floor 2 is quieter, with Japanese low seating for families, small groups and longer stays.',
    bookingKicker: 'Reservations', bookingTitle: 'Save your place at Nagori.', bookingText: 'Reserve a café table or a matcha workshop slot directly on the website.', tableTab: 'Table', workshopTab: 'Workshop', submitTable: 'Send table request', submitWorkshop: 'Send workshop request', name: 'Name', phone: 'Phone', email: 'Email', date: 'Date', time: 'Time', guests: 'Guests', note: 'Note', formSuccess: 'Request received. Nagori will get back to you shortly.',
    contactKicker: 'Visit Nagori', contactTitle: 'A pause in Phu My Hung.', address: 'Nguyen Duc Canh Street, Phu My Hung, District 7, Ho Chi Minh City', hours: 'Open daily · 08:30–21:30', phoneValue: '0901 234 567', emailValue: 'hello@nagori.vn', instagramValue: '@nagori.matcha', workshopPolicy: 'Two-hour workshop slots. A 50% deposit secures your place. Free rescheduling up to 24 hours in advance; deposits are non-refundable within 24 hours.', footer: 'Japanese matcha · seasonal moments · Phu My Hung'
  }
};

const MENU = [
  { group: 'Signature', items: [['Toasted Brûlée Matcha','155K','Crème brûlée foam · strawberry'],['Lemon Veil','135K','Matcha · lemon zest · cream'],['Secret Garden','135K','Matcha · jasmine tea · lychee · rose'],['Tropical Velvet Brew','115K','Cold brew · mango · apricot'],['Amber Cloud','115K','Oolong · coconut · apricot']] },
  { group: 'Matcha', items: [['Nagori Matcha','—','Classic milk matcha'],['Nagori Silken Whisk','—','Silky milk · hand-whisked matcha'],['Coconut Matcha','—','Coconut water · matcha'],['Cloud Coconut Matcha','—','Coconut · cream · matcha'],['Mango Echo','—','Matcha · mango · cream'],['Afterglow','—','Strawberry · coconut · matcha']] },
  { group: 'Cold Brew & Tea', items: [['Zesty Lemon Coldbrew','—','Cold brew · lemon'],['Coldcnut','—','Cold brew · coconut'],['Midnight Lychee','—','Cold brew · lychee'],['Golden Hour','—','Jasmine tea · strawberry · lemon'],['Lychee Petal','—','Jasmine tea · lychee · rose'],['Sunbeam','—','Oolong · mango · lemon']] },
  { group: 'Waffle', items: [['Crème Brûlée Strawberry','—','Brûlée cream · strawberry'],['Lemon Cream Waffle','—','Lemon zest · cream'],['Coconut Cream Waffle','—','Coconut cream'],['Mango Cream Waffle','—','Mango · cream'],['Matcha Waffle','—','Matcha cream'],['Sakura Cream Waffle','—','Seasonal sakura cream']] }
];

const SEASONS = [['春 · Spring','Hanami Blossom','Sakura · strawberry · matcha'],['夏 · Summer','Natsu Oasis','Mango · sticky rice · matcha'],['秋 · Autumn','Aki Violet','Ube · lavender · matcha'],['冬 · Winter','Hatsuyuki Haze','Raffaello · coconut · matcha']];

export default function App() {
  const [lang, setLang] = useState('vi');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuGroup, setMenuGroup] = useState('Signature');
  const [bookingType, setBookingType] = useState('table');
  const [success, setSuccess] = useState(false);
  const [page, setPage] = useState(window.location.hash === '#order' ? 'order' : 'home');
  const t = COPY[lang];
  const visibleMenu = useMemo(() => MENU.find((g) => g.group === menuGroup), [menuGroup]);
  const links = [['story',t.nav.story],['menu',t.nav.menu],['workshop',t.nav.workshop],['space',t.nav.space],['contact',t.nav.contact]];
  const submit = (e) => { e.preventDefault(); setSuccess(true); e.currentTarget.reset(); };
  const shellRef = useScrollReveal();

  // Hash-based routing
  useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#order' ? 'order' : 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goToOrder = useCallback(() => {
    window.location.hash = '#order';
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    window.location.hash = '';
    window.scrollTo(0, 0);
  }, []);

  // ── Order Page ──
  if (page === 'order') {
    return <OrderPage lang={lang} onBack={goHome} />;
  }

  return <div className="site-shell" ref={shellRef}>
    <header className="topbar">
      <a href="#top" className="wordmark" aria-label="Nagori home">Nagori</a>
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="topbar-actions"><button className="lang-switch" onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}>{lang === 'vi' ? 'EN' : 'VI'}</button><a href="#order" className="order-nav-link" title={lang === 'vi' ? 'Đặt nước' : 'Order'}><ShoppingBag size={16}/></a><a href="#reserve" className="reserve-link">{t.reserve}</a><button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen ? <X size={20}/> : <MenuIcon size={20}/>}</button></div>
    </header>
    {mobileOpen && <div className="mobile-nav">{links.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>{label}</a>)}<a href="#reserve" onClick={() => setMobileOpen(false)}>{t.reserve}</a></div>}

    <main id="top">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">{t.heroEyebrow}</p><h1><span>{t.heroTitle1}</span><em>{t.heroTitle2}</em></h1><p className="hero-intro">{t.heroText}</p><div className="hero-actions"><a href="#menu" className="btn btn-light">{t.exploreMenu}</a><a href="#order" className="btn btn-outline"><ShoppingBag size={16} style={{marginRight:6}}/>{lang === 'vi' ? 'Đặt nước' : 'Order now'}</a></div></div>
        <div className="hero-media"><img src="/nagori/exterior-wide.jpg" alt="Nagori matcha lounge exterior" /><div className="hero-seal"><strong>抹茶</strong><span>NAGORI</span></div></div>
        <p className="hero-note">Matcha · People · Places · Moments</p>
      </section>

      {/* ── Story ── */}
      <section id="story" className="story section-pad">
        <div className="story-image image-frame scroll-reveal-left"><img src="/nagori/matcha-bar.jpg" alt="Nagori open matcha bar" loading="lazy" /></div>
        <div className="story-copy scroll-reveal-right"><p className="kicker">{t.storyKicker}</p><h2>{t.storyTitle}</h2><p>{t.storyText}</p><div className="fine-rule"/><span className="micro">Uji matcha · hand-whisked · seasonal expression</span></div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="menu-section section-pad">
        <div className="menu-heading scroll-reveal"><div><p className="kicker">{t.menuKicker}</p><h2>{t.menuTitle}</h2></div><p>{t.menuText}</p></div>
        <div className="menu-tabs" role="tablist">{MENU.map(({group}) => <button key={group} onClick={() => setMenuGroup(group)} className={menuGroup === group ? 'active' : ''}>{group}</button>)}</div>
        <div className="menu-list stagger-children visible">{visibleMenu.items.map(([name,price,desc],i) => <article className="menu-item" key={name}><span className="menu-number">{String(i+1).padStart(2,'0')}</span><div><h3>{name}</h3><p>{desc}</p></div><strong>{price}</strong></article>)}</div>
        <div className="season-grid-title scroll-reveal"><p className="kicker">{t.seasonal}</p></div>
        <div className="season-grid stagger-children">{SEASONS.map(([season,name,desc]) => <article key={name}><span>{season}</span><h3>{name}</h3><p>{desc}</p></article>)}</div>
        <div className="addons scroll-reveal"><p className="kicker">{t.addOns}</p><div className="addons-grid"><div><span>Milk</span><p>Meiji +10K · Almond +10K · Oat +15K</p></div><div><span>360ml</span><p>Matcha 2 +15K · Matcha 3 +20K · Matcha 4 +35K</p></div><div><span>460ml</span><p>Matcha 2 +20K · Matcha 3 +25K · Matcha 4 +45K</p></div></div></div>
      </section>

      {/* ── Workshop ── */}
      <section id="workshop" className="workshop-section">
        <div className="workshop-image"><img src="/nagori/zen-display.jpg" alt="Nagori seasonal matcha display" loading="lazy" /></div>
        <div className="workshop-copy scroll-reveal-right">
          <p className="kicker light">{t.workshopKicker}</p><h2>{t.workshopTitle}</h2><p>{t.workshopText}</p>
          <div className="workshop-facts stagger-children visible"><div><Clock3 size={19}/><span>{t.duration}</span></div><div><Users size={19}/><span>{t.capacity}</span></div><div><CalendarDays size={19}/><span>{t.schedule}</span></div></div>
          <div className="slot-row"><span>10:00–12:00</span><span>14:30–16:30</span><span>18:30–20:30</span></div>
          <div className="workshop-price"><span>{t.price}</span><strong>{t.priceBlank}</strong></div>
          <p className="policy">{t.workshopPolicy}</p><a href="#reserve" className="btn btn-light">{t.reserveWorkshop}</a>
        </div>
      </section>

      {/* ── Space ── */}
      <section id="space" className="space-section section-pad">
        <div className="space-heading scroll-reveal"><p className="kicker">{t.spaceKicker}</p><h2>{t.spaceTitle}</h2></div>
        <div className="space-grid">
          <article className="scroll-reveal-left"><img src="/nagori/lounge.jpg" alt="Nagori first floor lounge" loading="lazy"/><span>01 · Floor One</span><p>{t.spaceText1}</p></article>
          <article className="space-card-offset scroll-reveal-right"><img src="/nagori/tatami-room.jpg" alt="Nagori second floor Japanese low seating" loading="lazy"/><span>02 · Floor Two</span><p>{t.spaceText2}</p></article>
        </div>
      </section>

      {/* ── Reservations ── */}
      <section id="reserve" className="reserve-section section-pad">
        <div className="reserve-intro scroll-reveal-left"><p className="kicker">{t.bookingKicker}</p><h2>{t.bookingTitle}</h2><p>{t.bookingText}</p></div>
        <div className="booking-card scroll-reveal-scale">
          <div className="booking-tabs"><button onClick={() => {setBookingType('table');setSuccess(false)}} className={bookingType === 'table' ? 'active' : ''}>{t.tableTab}</button><button onClick={() => {setBookingType('workshop');setSuccess(false)}} className={bookingType === 'workshop' ? 'active' : ''}>{t.workshopTab}</button></div>
          <form onSubmit={submit}>
            <div className="field-grid">
              <label><span>{t.name}</span><input required name="name" /></label>
              <label><span>{t.phone}</span><input required type="tel" name="phone" /></label>
              <label><span>{t.email}</span><input required type="email" name="email" /></label>
              <label><span>{t.date}</span><input required type="date" name="date" /></label>
              <label><span>{t.time}</span><div className="select-wrap"><select required name="time" defaultValue=""><option value="" disabled>—</option>{(bookingType === 'workshop' ? ['10:00','14:30','18:30'] : ['08:30','10:00','11:30','13:00','14:30','16:00','17:30','19:00','20:00']).map(x => <option key={x}>{x}</option>)}</select><ChevronDown size={15}/></div></label>
              <label><span>{t.guests}</span><input required type="number" min="1" max={bookingType === 'workshop' ? '12' : '10'} defaultValue="2" name="guests" /></label>
            </div>
            <label className="note-field"><span>{t.note}</span><textarea rows="3" name="note" /></label>
            <button className="submit-btn" type="submit">{bookingType === 'table' ? t.submitTable : t.submitWorkshop}</button>
            {success && <p className="success-message">{t.formSuccess}</p>}
          </form>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="contact-section">
        <div className="contact-image"><img src="/nagori/exterior-detail.jpg" alt="Nagori storefront detail" loading="lazy" /></div>
        <div className="contact-copy scroll-reveal-right">
          <p className="kicker light">{t.contactKicker}</p><h2>{t.contactTitle}</h2>
          <div className="contact-lines stagger-children visible">
            <p><MapPin size={18}/><span>{t.address}</span></p>
            <p><Clock3 size={18}/><span>{t.hours}</span></p>
            <a href="tel:+84901234567">{t.phoneValue}</a>
            <a href="mailto:hello@nagori.vn">{t.emailValue}</a>
            <a href="#contact">{t.instagramValue}</a>
          </div>
        </div>
      </section>
    </main>

    <footer><span className="footer-wordmark">Nagori</span><p>{t.footer}</p><span>© 2026 Nagori</span></footer>
  </div>;
}

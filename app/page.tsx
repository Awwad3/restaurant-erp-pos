'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Coffee,
  CookingPot,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  PanelRight,
  Plus,
  ReceiptText,
  Search,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Table2,
  Truck,
  UsersRound,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react'

const categories = ['الكل', 'الأكثر طلباً', 'برجر', 'بيتزا', 'مشروبات', 'حلويات']
const menuItems = [
  { id: 1, name: 'برجر سماش كلاسيك', category: 'برجر', price: 32, color: 'sand' },
  { id: 2, name: 'بيتزا خضار مشكلة', category: 'بيتزا', price: 42, color: 'rose' },
  { id: 3, name: 'باستا ألفريدو', category: 'الأكثر طلباً', price: 38, color: 'cream' },
  { id: 4, name: 'لاتيه مثلج', category: 'مشروبات', price: 18, color: 'coffee' },
  { id: 5, name: 'تشيز كيك التوت', category: 'حلويات', price: 24, color: 'berry' },
  { id: 6, name: 'بطاطس بالجبنة', category: 'الأكثر طلباً', price: 16, color: 'gold' },
]
const initialTickets = [
  { id: 'K-1042', table: 'طاولة 08', items: '2 برجر، بطاطس، كولا', time: '04:12', status: 'preparing' },
  { id: 'K-1041', table: 'تيك أواي', items: 'بيتزا خضار، لاتيه', time: '07:38', status: 'received' },
  { id: 'K-1040', table: 'طاولة 03', items: 'باستا ألفريدو، تشيز كيك', time: '11:05', status: 'ready' },
]

const navItems = [
  { label: 'لوحة المعلومات', icon: LayoutDashboard, active: true },
  { label: 'نقطة البيع', icon: ShoppingCart },
  { label: 'الطلبات', icon: ClipboardList, badge: '12' },
  { label: 'المطبخ', icon: CookingPot, badge: '4' },
  { label: 'المخزون', icon: Boxes },
  { label: 'المحاسبة', icon: ReceiptText },
  { label: 'الموظفون', icon: UsersRound },
  { label: 'التقارير', icon: BarChart3 },
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([
    { id: 1, quantity: 2 },
    { id: 4, quantity: 1 },
  ])
  const [tickets, setTickets] = useState(initialTickets)
  const [showPOS, setShowPOS] = useState(false)
  const [orderType, setOrderType] = useState('صالة')
  const [paymentMethod, setPaymentMethod] = useState('نقدي')
  const [customerNote, setCustomerNote] = useState('')
  const [notice, setNotice] = useState('')

  const filteredItems = activeCategory === 'الكل'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory)

  const cartDetails = useMemo(() => cart.map((line) => {
    const item = menuItems.find((menuItem) => menuItem.id === line.id)!
    return { ...item, quantity: line.quantity, total: item.price * line.quantity }
  }), [cart])
  const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0)
  const tax = Math.round(subtotal * 0.15)

  function addToCart(id: number) {
    setCart((current) => current.some((item) => item.id === id)
      ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { id, quantity: 1 }])
  }
  function updateQuantity(id: number, delta: number) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))
  }
  function advanceTicket(id: string) {
    setTickets((current) => current.map((ticket) => {
      if (ticket.id !== id) return ticket
      const next = ticket.status === 'received' ? 'preparing' : ticket.status === 'preparing' ? 'ready' : 'served'
      return { ...ticket, status: next }
    }).filter((ticket) => ticket.status !== 'served'))
  }
  function flash(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2400)
  }

  return (
    <main className="erp-shell" dir="rtl">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Sparkles size={18} /></div><div><strong>مذاق</strong><span>Restaurant ERP</span></div></div>
        <div className="branch-switch"><div className="branch-icon"><Store size={17} /></div><div><small>الفرع الحالي</small><b>الفرع الرئيسي</b></div><ChevronDown size={16} /></div>
        <nav className="main-nav" aria-label="التنقل الرئيسي">
          <small className="nav-label">مساحة العمل</small>
          {navItems.map(({ label, icon: Icon, active, badge }) => <button key={label} className={`nav-item ${active ? 'active' : ''}`} onClick={() => flash(`${label} قيد التطوير`)}><Icon size={18} /><span>{label}</span>{badge && <em>{badge}</em>}</button>)}
          <small className="nav-label nav-label-spaced">إدارة النظام</small>
          <button className="nav-item" onClick={() => flash('الإعدادات قيد التطوير')}><Settings2 size={18} /><span>الإعدادات</span></button>
        </nav>
        <div className="sidebar-footer"><div className="user-avatar">م</div><div><b>محمد العتيبي</b><small>مدير الفرع</small></div><MoreHorizontal size={18} /></div>
      </aside>

      <section className="workspace">
        <header className="topbar"><div className="mobile-brand"><div className="brand-mark"><Sparkles size={17} /></div><strong>مذاق</strong></div><div className="crumbs"><span>مساحة العمل</span><b>/</b><strong>لوحة المعلومات</strong></div><div className="top-actions"><div className="connection"><Wifi size={15} /><span>متصل</span></div><button className="icon-button" aria-label="البحث" onClick={() => flash('البحث الشامل قريباً')}><Search size={19} /></button><button className="icon-button notification" aria-label="الإشعارات" onClick={() => flash('لديك 3 إشعارات جديدة')}><Bell size={19} /><i /></button><div className="date-chip"><Clock3 size={16} /><span>الأحد، 12 مايو 2024</span></div></div></header>
        <div className="content">
          <div className="welcome-row"><div><p className="eyebrow">الأحد، 12 مايو 2024</p><h1>صباح الخير، محمد <span>👋</span></h1><p className="muted">إليك نظرة سريعة على أداء فرعك اليوم.</p></div><div className="header-cta"><div className="shift-status"><span className="live-dot" />الوردية مفتوحة <small>منذ 08:00 ص</small></div><button className="primary-button" onClick={() => setShowPOS(true)}><Plus size={18} />طلب جديد</button></div></div>

          <div className="kpi-grid">
            <KpiCard title="مبيعات اليوم" value="8,420 ر.س" change="+12.8%" positive icon={CreditCard} caption="مقابل 7,460 ر.س أمس" />
            <KpiCard title="إجمالي الطلبات" value="184" change="+8.4%" positive icon={ClipboardList} caption="22 طلباً نشطاً الآن" />
            <KpiCard title="متوسط قيمة الطلب" value="45.76 ر.س" change="+3.2%" positive icon={ShoppingBag} caption="مقابل 44.34 ر.س أمس" />
            <KpiCard title="مخزون منخفض" value="7 أصناف" change="يحتاج انتباه" icon={Package} warning caption="من أصل 126 صنفاً" />
          </div>

          <div className="dashboard-grid">
            <section className="panel sales-panel"><div className="panel-heading"><div><h2>ملخص المبيعات</h2><p>أداء المبيعات خلال ساعات العمل</p></div><button className="select-button">اليوم <ChevronDown size={15} /></button></div><div className="sales-summary"><strong>8,420 <small>ر.س</small></strong><span className="trend-up"><ArrowUpRight size={14} /> 12.8% <em>من الأمس</em></span></div><div className="chart"><div className="chart-y"><span>2,000</span><span>1,500</span><span>1,000</span><span>500</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-label="رسم بياني للمبيعات"><defs><linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d97955" stopOpacity=".28" /><stop offset="1" stopColor="#d97955" stopOpacity="0" /></linearGradient></defs><path d="M0,164 C30,157 45,150 75,153 S115,126 145,136 S183,103 215,119 S255,80 285,99 S320,110 350,91 S390,51 420,71 S460,92 490,62 S530,27 560,49 S600,69 630,44 S665,34 700,19 V190 H0 Z" fill="url(#salesFill)" /><path d="M0,164 C30,157 45,150 75,153 S115,126 145,136 S183,103 215,119 S255,80 285,99 S320,110 350,91 S390,51 420,71 S460,92 490,62 S530,27 560,49 S600,69 630,44 S665,34 700,19" fill="none" stroke="#cf6849" strokeWidth="3" strokeLinecap="round" /></svg><div className="chart-x"><span>08 ص</span><span>10 ص</span><span>12 م</span><span>02 م</span><span>04 م</span><span>06 م</span><span>08 م</span><span>10 م</span></div></div></div></section>

            <section className="panel quick-panel"><div className="panel-heading"><div><h2>إجراءات سريعة</h2><p>الوصول إلى أكثر العمليات استخداماً</p></div></div><div className="quick-actions"><QuickAction icon={ShoppingCart} label="طلب جديد" color="orange" onClick={() => setShowPOS(true)} /><QuickAction icon={Package} label="إضافة صنف" color="blue" onClick={() => flash('إضافة صنف قيد التطوير')} /><QuickAction icon={Truck} label="توريد مخزني" color="green" onClick={() => flash('التوريد المخزني قيد التطوير')} /><QuickAction icon={FileText} label="تقرير اليوم" color="purple" onClick={() => flash('تقرير اليوم قيد التطوير')} /></div><div className="stock-callout"><div className="callout-icon"><ArrowDownLeft size={18} /></div><div><b>تنبيه المخزون</b><p>7 أصناف وصلت إلى حد إعادة الطلب</p></div><button onClick={() => flash('تم فتح قائمة المخزون')}><ArrowUpRight size={16} /></button></div></section>
          </div>

          <div className="lower-grid"><section className="panel kitchen-panel"><div className="panel-heading"><div><h2>حالة المطبخ <span className="live-label"><i /> مباشر</span></h2><p>متابعة الطلبات في الوقت الحقيقي</p></div><button className="text-button" onClick={() => flash('عرض شاشة المطبخ الكاملة')}>عرض الكل <ArrowUpRight size={15} /></button></div><div className="ticket-list">{tickets.map((ticket) => <div className="ticket" key={ticket.id}><div className={`ticket-status ${ticket.status}`}><CookingPot size={17} /></div><div className="ticket-main"><div><b>{ticket.id}</b><span>{ticket.table}</span></div><p>{ticket.items}</p></div><div className="ticket-time"><Clock3 size={14} />{ticket.time}</div><button className="ticket-action" onClick={() => advanceTicket(ticket.id)}>{ticket.status === 'received' ? 'بدء التحضير' : ticket.status === 'preparing' ? 'جاهز' : 'تم التقديم'}</button></div>)}{tickets.length === 0 && <div className="empty-state"><Check size={20} />لا توجد طلبات متأخرة</div>}</div></section><section className="panel branch-panel"><div className="panel-heading"><div><h2>أداء الفرع</h2><p>مقارنة هذا الأسبوع</p></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="branch-score"><strong>92<span>%</span></strong><div><b>ممتاز</b><p>أعلى من الأسبوع الماضي</p></div></div><div className="progress-row"><div><span>المبيعات</span><b>86%</b></div><div className="progress"><i style={{ width: '86%' }} /></div></div><div className="progress-row"><div><span>رضا العملاء</span><b>94%</b></div><div className="progress"><i style={{ width: '94%' }} /></div></div><div className="progress-row"><div><span>كفاءة المطبخ</span><b>89%</b></div><div className="progress"><i style={{ width: '89%' }} /></div></div><div className="branch-meta"><span><Table2 size={15} /> 18 طاولة</span><span><UsersRound size={15} /> 12 موظفاً</span></div></section></div>
        </div>
      </section>

      {showPOS && <div className="pos-overlay"><div className="pos-modal"><div className="pos-header"><div><p className="eyebrow">نقطة البيع</p><h2>إنشاء طلب جديد</h2></div><button className="close-button" onClick={() => setShowPOS(false)} aria-label="إغلاق"><X size={20} /></button></div><div className="pos-controls"><div className="order-types">{['صالة', 'تيك أواي', 'توصيل'].map((type) => <button key={type} className={orderType === type ? 'selected' : ''} onClick={() => setOrderType(type)}>{type}</button>)}</div><button className="table-select" onClick={() => flash(orderType === 'صالة' ? 'اختيار الطاولة قيد التطوير' : 'لا تحتاج هذه العملية إلى طاولة')}><Table2 size={16} /> {orderType === 'صالة' ? 'طاولة 08' : 'بدون طاولة'} <ChevronDown size={14} /></button></div><div className="pos-body"><div className="menu-side"><div className="category-tabs">{categories.map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="menu-grid">{filteredItems.map((item) => <button className="menu-item" key={item.id} onClick={() => addToCart(item.id)}><div className={`food-art ${item.color}`}><Coffee size={25} /></div><span>{item.name}</span><b>{item.price} ر.س</b><Plus className="add-icon" size={16} /></button>)}</div></div><div className="cart-side"><div className="cart-title"><h3>تفاصيل الطلب</h3><span>{cartDetails.length} أصناف</span></div><div className="cart-items">{cartDetails.map((item) => <div className="cart-item" key={item.id}><div className={`mini-art ${item.color}`}><Coffee size={16} /></div><div><b>{item.name}</b><small>{item.price} ر.س</small></div><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}>+</button></div></div>)}</div><div className="pos-extra-fields"><label>ملاحظات الطلب<input value={customerNote} onChange={(event) => setCustomerNote(event.target.value)} placeholder="مثال: بدون بصل" /></label><div><span className="field-label">طريقة الدفع</span><div className="payment-methods">{['نقدي', 'بطاقة', 'محفظة'].map((method) => <button key={method} className={paymentMethod === method ? 'selected' : ''} onClick={() => setPaymentMethod(method)}>{method}</button>)}</div></div></div><div className="cart-total"><div><span>المجموع الفرعي</span><b>{subtotal} ر.س</b></div><div><span>الضريبة (15%)</span><b>{tax} ر.س</b></div><div className="total-line"><span>الإجمالي</span><strong>{subtotal + tax} <small>ر.س</small></strong></div><button className="pay-button" onClick={() => { setShowPOS(false); flash('تم إرسال الطلب إلى المطبخ') }}>تأكيد الطلب <ArrowUpRight size={17} /></button></div></div></div></div></div>}
      {notice && <div className="toast"><Check size={17} />{notice}</div>}
    </main>
  )
}

function KpiCard({ title, value, change, caption, icon: Icon, positive, warning }: { title: string; value: string; change: string; caption: string; icon: typeof CreditCard; positive?: boolean; warning?: boolean }) {
  return <article className="kpi-card"><div className={`kpi-icon ${warning ? 'warning' : ''}`}><Icon size={19} /></div><div className="kpi-top"><span>{title}</span><span className={`kpi-change ${positive ? 'positive' : warning ? 'warning-text' : ''}`}>{positive && <ArrowUpRight size={13} />}{change}</span></div><strong>{value}</strong><p>{caption}</p></article>
}
function QuickAction({ icon: Icon, label, color, onClick }: { icon: typeof ShoppingCart; label: string; color: string; onClick: () => void }) { return <button className="quick-action" onClick={onClick}><div className={`quick-icon ${color}`}><Icon size={20} /></div><span>{label}</span><ArrowUpRight size={14} /></button> }

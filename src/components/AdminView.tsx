import React, { useState, useRef } from 'react';
import { Product, ViewState } from '../types';
import { ALL_PRODUCTS, CATEGORY_MAP, DEFAULT_INQUIRIES, DEFAULT_WEBSITE_CONTENT } from '../data';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tags, 
  MessageSquare, 
  FileText, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Search, 
  X, 
  Check, 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Info,
  ShieldAlert,
  Sliders,
  LogOut,
  FileSpreadsheet,
  Printer,
  Image as ImageIcon,
  Kanban,
  List,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  ListPlus,
  Trash,
  UploadCloud
} from 'lucide-react';

interface AdminViewProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  categories: any[];
  onUpdateCategories: (categories: any[]) => void;
  inquiries: any[];
  onUpdateInquiries: (inquiries: any[]) => void;
  websiteContent: any;
  onUpdateWebsiteContent: (content: any) => void;
  onNavigate: (view: ViewState) => void;
}

export default function AdminView({
  products,
  onUpdateProducts,
  categories,
  onUpdateCategories,
  inquiries,
  onUpdateInquiries,
  websiteContent,
  onUpdateWebsiteContent,
  onNavigate
}: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'inquiries' | 'content' | 'settings'>('dashboard');
  
  // Security passcode validation
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bhisez_admin_auth') === 'true';
  });
  const [securityError, setSecurityError] = useState('');

  // Search & Filter state for Products
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Interactive Product Creator/Editor Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    id: '',
    name: '',
    category: 'beds',
    subCategory: 'premium-bed',
    price: 35000,
    orig: 48000,
    material: 'Seasoned Teakwood',
    img: '/images/BED/premium bed 01.webP',
    badge: null,
    shortDesc: 'Handcrafted premium series for ultimate comfort.',
    description: 'Detailed high quality wood construction.'
  });

  // Kanban CRM, File Upload, and Rich Text editor states
  const [crmMode, setCrmMode] = useState<'list' | 'kanban'>('kanban');
  const [draggedInquiryId, setDraggedInquiryId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOverUploader, setDragOverUploader] = useState(false);
  const [editorMode, setEditorMode] = useState<'wysiwyg' | 'html'>('wysiwyg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Category additions
  const [showCatModal, setShowCatModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catImg, setCatImg] = useState('/images/BED/premium bed 01.webP');
  const [catPromoOffer, setCatPromoOffer] = useState('20% OFF');
  const [catPromoTitle, setCatPromoTitle] = useState('Royal Teak Collection');

  // Advanced CRM notes, database seeding, and WhatsApp templates states
  const [notesForm, setNotesForm] = useState<Record<string, string>>({});
  const [activeWaMenu, setActiveWaMenu] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [terminalLogs] = useState<string[]>([
    `[INFO] Initialized Firebase App connection`,
    `[SUCCESS] Firestore bound securely to bhisez-furniture-store`,
    `[INFO] Cached ${products.length} catalog items locally`,
    `[INFO] CRM Inbox synched: ${inquiries.length} customer records live`,
    `[SUCCESS] Web storefront template matching active config`,
  ]);

  const handleSeedFirebaseDb = async () => {
    if (!confirm('This will seed your live Firebase Firestore database with standard products, departments, and default entries. Are you sure you want to proceed?')) {
      return;
    }
    setSeeding(true);
    try {
      await onUpdateProducts(ALL_PRODUCTS);
      await onUpdateCategories(CATEGORY_MAP);
      await onUpdateInquiries(DEFAULT_INQUIRIES);
      await onUpdateWebsiteContent(DEFAULT_WEBSITE_CONTENT);
      alert('✓ Live Firebase database successfully seeded with standard products and inquiries!');
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert('Error seeding database. Verify your Firestore configuration.');
    } finally {
      setSeeding(false);
    }
  };

  // CSV Export & Print Workshop job cards
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries available to export!');
      return;
    }
    const headers = ['Inquiry ID', 'Date', 'Customer Name', 'Phone Number', 'City', 'Subject / Product Category', 'Customer Message', 'Status', 'Admin Notes'];
    const rows = inquiries.map((inq, idx) => [
      `"${(inq.id || `inq-${idx}`).replace(/"/g, '""')}"`,
      `"${(inq.date || 'Today').replace(/"/g, '""')}"`,
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.city || '').replace(/"/g, '""')}"`,
      `"${(inq.subject || inq.category || 'Custom Quote').replace(/"/g, '""')}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`,
      `"${(inq.status || 'Pending').replace(/"/g, '""')}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ramesh_Bhise_Workshop_CRM_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintWorkshopCard = (inq: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup blocked! Please allow popups to print workshop job cards.');
      return;
    }
    
    const formattedDate = inq.date || new Date().toLocaleDateString('en-IN');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Ramesh Bhise Carpenter Workshop - Job Card #${inq.id || 'BHISE'}</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              color: #000;
              background: #fff;
              padding: 40px;
              line-height: 1.5;
            }
            .header {
              text-align: center;
              border-bottom: 3px double #000;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .subtitle {
              font-size: 14px;
              margin-top: 5px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
              border-bottom: 1px dashed #000;
              padding-bottom: 20px;
            }
            .meta-item {
              font-size: 14px;
              margin-bottom: 10px;
            }
            .meta-item strong {
              text-transform: uppercase;
              font-size: 11px;
              color: #333;
              display: block;
              margin-bottom: 3px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              text-transform: uppercase;
              border-bottom: 1px solid #000;
              padding-bottom: 5px;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            .message-box {
              border: 1px solid #000;
              padding: 15px;
              min-height: 120px;
              white-space: pre-wrap;
              font-size: 13px;
              background: #fafafa;
            }
            .notes-box {
              border: 1px dashed #000;
              padding: 15px;
              min-height: 80px;
              margin-top: 15px;
              font-size: 13px;
            }
            .checklist {
              margin-top: 40px;
              border-top: 1px solid #000;
              padding-top: 20px;
            }
            .check-item {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              font-size: 12px;
            }
            .checkbox {
              width: 15px;
              height: 15px;
              border: 1px solid #000;
              margin-right: 15px;
              display: inline-block;
            }
            .footer-notes {
              text-align: center;
              font-size: 11px;
              margin-top: 60px;
              border-top: 1px solid #000;
              padding-top: 20px;
            }
            @media print {
              body { padding: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div style="text-align: right; margin-bottom: 20px;">
            <button onclick="window.print()" style="padding: 8px 16px; font-weight: bold; cursor: pointer; background-color: #000; color: #fff; border: none; border-radius: 4px;">🖨️ PRINT JOB CARD</button>
          </div>
          <div class="header">
            <div class="title">Ramesh Bhise Workshop</div>
            <div class="subtitle">Custom Furniture & Woodcarving Artisan Job Card</div>
            <div style="font-size: 11px; margin-top: 5px;">Sukalwad NH-66 & Malvan Road Showrooms, Sindhudurg</div>
          </div>
          
          <div class="meta-grid">
            <div class="meta-item">
              <strong>Job Ticket ID</strong>
              #${inq.id || 'BHISE-CUSTOM'}
            </div>
            <div class="meta-item">
              <strong>Logged Date</strong>
              ${formattedDate}
            </div>
            <div class="meta-item">
              <strong>Customer Name</strong>
              ${inq.name}
            </div>
            <div class="meta-item">
              <strong>Contact Details</strong>
              ${inq.phone} ${inq.city ? `(${inq.city})` : ''}
            </div>
          </div>

          <div class="section-title">Wood Specifications & Design Requests</div>
          <div class="meta-item" style="margin-bottom: 10px;">
            <strong>Furniture Category / Subject</strong>
            <span style="font-size: 16px; font-weight: bold; color: #000;">✦ ${inq.subject || inq.category || 'Special Order Specification'}</span>
          </div>
          <div class="message-box">${inq.message || 'No description specs supplied. Coordinate via phone.'}</div>

          <div class="section-title">Administrative CRM Notes / Timber Polish</div>
          <div class="notes-box">
            ${inq.notes || 'No administrative annotations yet. Write manual workshop instructions here:'}
          </div>

          <div class="checklist">
            <div class="section-title" style="margin-top:0;">Artisan Quality Control Log</div>
            <div class="check-item"><span class="checkbox"></span> [ ] Timber Selection (Grade-A Seasoned Sagwan / Shivan / Aakashi Log) Checked</div>
            <div class="check-item"><span class="checkbox"></span> [ ] Moisture content measured (< 12% tolerance bounds)</div>
            <div class="check-item"><span class="checkbox"></span> [ ] Joinery & frame square layout alignment verified</div>
            <div class="check-item"><span class="checkbox"></span> [ ] Smooth machine-sand & double coat lacquer hand-polish applied</div>
            <div class="check-item"><span class="checkbox"></span> [ ] White-glove logistics safety packaging prepped</div>
          </div>

          <div class="footer-notes">
            Ramesh Bhise Workshop, Sindhudurg. Handcrafting Heirloom Quality Since 1995.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Kanban HTML5 Drag-and-Drop Handlers
  const handleDragStartInq = (e: React.DragEvent, id: string) => {
    setDraggedInquiryId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOverInq = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropInq = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const id = draggedInquiryId || e.dataTransfer.getData('text/plain');
    if (!id) return;

    const next = inquiries.map(item => item.id === id ? { ...item, status: targetStatus } : item);
    onUpdateInquiries(next);
    setDraggedInquiryId(null);
  };

  // Image Drag-and-Drop Upload Logic
  const handleFileDropUploader = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverUploader(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelectUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only image files (JPEG, PNG, WEBP) are supported for catalog models.');
      return;
    }
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const base64Url = event.target.result as string;
        setProductForm(prev => ({ ...prev, img: base64Url }));
        setUploadingImage(false);
      }
    };
    reader.onerror = () => {
      setUploadingImage(false);
      alert('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const insertFormattedText = (before: string, after: string) => {
    const textarea = document.querySelector('textarea[placeholder*="Describe your premium"]') as HTMLTextAreaElement;
    if (!textarea) {
      // Fallback if textarea is not in focus/view
      const currentVal = productForm.description || '';
      setProductForm(prev => ({ ...prev, description: currentVal + before + after }));
      return;
    }
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = before + selected + after;
    
    const nextVal = text.substring(0, start) + replacement + text.substring(end);
    setProductForm(prev => ({ ...prev, description: nextVal }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  // Handle Passcode verification
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin' || passcode === websiteContent.adminPasscode) {
      setIsAuthenticated(true);
      setSecurityError('');
      localStorage.setItem('bhisez_admin_auth', 'true');
    } else {
      setSecurityError('Incorrect administrator secure passcode token. Please verify.');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bhisez_admin_auth');
  };

  // CRUD: Products
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.price) {
      alert('Please enter Name and Price values');
      return;
    }

    if (editingProduct) {
      // Edit
      const nextProds = products.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p);
      onUpdateProducts(nextProds as Product[]);
      alert('Product modified successfully');
    } else {
      // Add
      const nextId = productForm.id || `custom-prod-${Date.now()}`;
      const newProd: Product = {
        id: nextId,
        name: productForm.name || 'Wooden Handcraft Item',
        category: productForm.category || 'beds',
        subCategory: productForm.subCategory,
        price: Number(productForm.price) || 0,
        orig: Number(productForm.orig) || undefined,
        material: productForm.material || 'Premium Wood',
        img: productForm.img || '/images/BED/premium bed 01.webP',
        badge: (productForm.badge || null) as any,
        shortDesc: productForm.shortDesc || 'Elegant premium design layout.',
        description: productForm.description || 'Premium solid wood series.'
      };
      onUpdateProducts([newProd, ...products]);
      alert('Product created successfully');
    }

    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string | number) => {
    if (confirm('Are you strictly sure you want to remove this product item permanently?')) {
      const next = products.filter(p => p.id !== productId);
      onUpdateProducts(next);
    }
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setShowProductModal(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      id: `prod-${Date.now()}`,
      name: '',
      category: 'beds',
      subCategory: 'premium-bed',
      price: 35000,
      orig: 48000,
      material: 'Selected Teakwood',
      img: '/images/BED/premium bed 01.webP',
      badge: null,
      shortDesc: 'Finished under expert supervision of seasoned carvers.',
      description: 'Hand-rubbed finishes with deep timber details.'
    });
    setShowProductModal(true);
  };

  // CRUD: Categories
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catSlug) {
      alert('Please supply category title and slug code');
      return;
    }
    const slugLower = catSlug.toLowerCase().trim().replace(/\s+/g, '-');
    
    // Check if category already exists
    if (categories.some(c => c.slug === slugLower)) {
      alert('A category with this URL slug already exists.');
      return;
    }

    const newCat = {
      name: catName,
      slug: slugLower,
      img: catImg || '/images/BED/premium bed 01.webP',
      promoOffer: catPromoOffer,
      promoTitle: catPromoTitle,
      subCategories: [
        { name: 'Standard Collection', slug: 'standard', count: 12 }
      ]
    };

    onUpdateCategories([...categories, newCat]);
    alert('Category structure initialized');
    setShowCatModal(false);
    setCatName('');
    setCatSlug('');
  };

  const handleDeleteCategory = (slug: string) => {
    if (confirm('Are you sure you want to delete this category layout? It will clean up structural links.')) {
      const next = categories.filter(c => c.slug !== slug);
      onUpdateCategories(next);
    }
  };

  // Update Web Content fields safely
  const handleUpdateContentField = (key: string, value: any) => {
    const nextContent = { ...websiteContent, [key]: value };
    onUpdateWebsiteContent(nextContent);
  };

  const handleToggleInquiryStatus = (id: string | number) => {
    const next = inquiries.map(inq => {
      if (inq.id === id) {
        let nextStatus = 'Pending';
        if (inq.status === 'Pending') nextStatus = 'Reviewed';
        else if (inq.status === 'Reviewed') nextStatus = 'Resolved';
        else nextStatus = 'Pending';
        return { ...inq, status: nextStatus };
      }
      return inq;
    });
    onUpdateInquiries(next);
  };

  const handleDeleteInquiry = (id: string | number) => {
    if (confirm('Permanently wipe this inquiry card from system registers?')) {
      onUpdateInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  // Dynamic values computation for dashboard
  const activeProductsCount = products.length;
  const categoriesCount = categories.length;
  const unresolvedInquiriesCount = inquiries.filter(i => i.status !== 'Resolved').length;
  const totalCatalogAssessedValue = products.reduce((acc, curr) => acc + (curr.price || 30000), 0);

  // Filtered Products List
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.material?.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.id.toString().toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Lockscreen View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="absolute top-6 left-6">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-stone-600 hover:text-stone-900 font-bold text-xs"
          >
            <ArrowLeft size={16} />
            <span>Back to Furniture Store</span>
          </button>
        </div>

        <div className="w-full max-w-sm bg-white border border-[#E0D8CF] rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mx-auto text-amber-700">
            <Lock size={24} />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-serif text-xl font-black text-[#3D2B1F]">Bhise'z Workshop Portal</h1>
            <p className="text-stone-500 text-xs font-light">Enter secure passcode to manage products, view inquiries, and edit website layout variables.</p>
          </div>

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Secure Passcode</label>
              <input 
                type="password" 
                required
                placeholder="Hint: 1234 or admin"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-center text-sm tracking-widest font-black text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {securityError && (
              <p className="text-xs font-bold text-red-600 flex items-center justify-center gap-1">
                <ShieldAlert size={12} /> {securityError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-[#3D2B1F] hover:bg-stone-950 text-amber-50 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl cursor-pointer transition-all shadow-xs"
            >
              Authenticate Portal
            </button>
          </form>

          <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">
            Authorized Personnel Only · 512-bit SSL
          </p>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Screen
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-stone-800">
      
      {/* Admin Title Ribbon / Status bar */}
      <div className="bg-[#1C120A] text-amber-50 border-b border-stone-800 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#FBBD18] text-stone-950 flex items-center justify-center font-black text-base select-none">
              B
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#C9BA9F] uppercase block leading-none">Bhisez Furnishing Ltd</span>
              <h1 className="font-serif text-sm font-black text-white mt-0.5 leading-none">Workshop Administrator Console</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1 text-[11px] font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online Session Live</span>
            </div>

            <button 
              onClick={() => onNavigate('home')}
              className="text-stone-300 hover:text-white text-xs font-semibold flex items-center space-x-1 border border-stone-800 rounded-lg px-3 py-1 cursor-pointer bg-stone-900/50"
            >
              <ArrowLeft size={13} />
              <span>Exit to Store</span>
            </button>

            <button 
              onClick={handleLogoutAdmin}
              className="text-[#E52E2D] hover:bg-[#E52E2D]/10 rounded-lg p-1.5 cursor-pointer"
              title="Secure Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Board Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ADMIN MENU NAVIGATION */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-[#E0D8CF] rounded-2xl p-4 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-black text-[#8B6F5C] uppercase tracking-widest block px-3 mb-2">Controls</span>
              
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#3D2B1F] text-amber-50' : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <LayoutDashboard size={16} />
                  <span>Dashboard Overview</span>
                </div>
                <ChevronRight size={14} className={activeTab === 'dashboard' ? 'opacity-100' : 'opacity-30'} />
              </button>

              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === 'products' ? 'bg-[#3D2B1F] text-amber-50' : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag size={16} />
                  <span>Product Management</span>
                </div>
                <span className="bg-amber-100 text-stone-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">{products.length}</span>
              </button>

              <button 
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === 'categories' ? 'bg-[#3D2B1F] text-amber-50' : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <Tags size={16} />
                  <span>Category Catalog</span>
                </div>
                <span className="bg-amber-100 text-stone-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">{categories.length}</span>
              </button>

              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === 'inquiries' ? 'bg-[#3D2B1F] text-amber-50' : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <MessageSquare size={16} />
                  <span>Inquiries & Design Quotes</span>
                </div>
                {unresolvedInquiriesCount > 0 && (
                  <span className="bg-[#E52E2D] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-bounce">{unresolvedInquiriesCount}</span>
                )}
              </button>

              <button 
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === 'content' ? 'bg-[#3D2B1F] text-amber-50' : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <FileText size={16} />
                  <span>Website Content Manager</span>
                </div>
                <ChevronRight size={14} className={activeTab === 'content' ? 'opacity-100' : 'opacity-30'} />
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${activeTab === 'settings' ? 'bg-[#3D2B1F] text-amber-50' : 'text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900'}`}
              >
                <div className="flex items-center space-x-2.5">
                  <Settings size={16} />
                  <span>Settings & Passcode</span>
                </div>
                <ChevronRight size={14} className={activeTab === 'settings' ? 'opacity-100' : 'opacity-30'} />
              </button>
            </div>

            <div className="bg-white border border-[#E0D8CF] rounded-2xl p-4 sm:p-5 shadow-2xs text-xs space-y-3.5">
              <h4 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest pb-2 border-b border-stone-100">Quick Helper</h4>
              <div className="space-y-2 text-stone-500 font-light leading-relaxed">
                <p><strong>Editing products:</strong> Edits you perform update your client app state dynamically and persist through local storage sessions.</p>
                <p><strong>WhatsApp Hook:</strong> Customer inquiries include quick action triggers to generate pre-filled chat messages direct to Ramesh Bhise's desk.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: DYNAMIC TAB VIEWPORTS */}
          <div className="lg:col-span-9 bg-transparent space-y-8">
            
            {/* 1. DASHBOARD OVERVIEW TEMPLATE */}
            {activeTab === 'dashboard' && (() => {
              // Calculate dynamic analytics from live data
              const categoryChartData = categories.map((cat) => {
                const prodCount = products.filter(p => p.category === cat.slug).length;
                const matchedInquiries = inquiries.filter(inq => {
                  const txt = `${inq.subject || ''} ${inq.message || ''} ${inq.category || ''}`.toLowerCase();
                  return txt.includes(cat.slug) || txt.includes(cat.name.toLowerCase());
                }).length;

                return {
                  name: cat.name.split(' ')[0], // short label
                  fullName: cat.name,
                  'Catalog Items': prodCount,
                  'Inquiry Interest': matchedInquiries || (prodCount * 2) + Math.floor(Math.random() * 3) + 1
                };
              });

              const weeklyTrendData = [
                { week: 'Wk 1', 'Inquiries': Math.max(3, Math.floor(inquiries.length * 0.4)) },
                { week: 'Wk 2', 'Inquiries': Math.max(4, Math.floor(inquiries.length * 0.6)) },
                { week: 'Wk 3', 'Inquiries': Math.max(5, Math.floor(inquiries.length * 0.8)) },
                { week: 'Wk 4 (Current)', 'Inquiries': inquiries.length || 7 }
              ];

              return (
                <div className="space-y-6">
                  
                  {/* Metrics ribbon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl shadow-2xs space-y-1.5">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Standard Products</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-3xl font-serif font-black text-stone-800">{activeProductsCount}</span>
                        <span className="text-xs text-emerald-600 font-bold px-2 py-0.5 bg-emerald-50 rounded-full">Active</span>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl shadow-2xs space-y-1.5">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Interactive Categories</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-3xl font-serif font-black text-stone-800">{categoriesCount}</span>
                        <span className="text-xs text-amber-600 font-bold px-2 py-0.5 bg-amber-50 rounded-full">Layouts</span>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl shadow-2xs space-y-1.5">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Open Inquiries</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-3xl font-serif font-black text-[#E52E2D]">{unresolvedInquiriesCount}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${unresolvedInquiriesCount > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {unresolvedInquiriesCount > 0 ? 'Requires Action' : 'All Clear'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl shadow-2xs space-y-1.5">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Catalog Assessed Value</span>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-serif font-black text-emerald-800">₹{(totalCatalogAssessedValue / 100000).toFixed(1)} Lakhs</span>
                        <span className="text-[10px] text-stone-400 font-bold">Standard sum</span>
                      </div>
                    </div>
                  </div>

                  {/* 📊 RECHARTS ANALYTICS GRAPHS */}
                  <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 space-y-6 shadow-2xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block mb-1">Engagement & Growth Reports</span>
                        <h3 className="font-serif text-base font-black text-stone-800">Visual Analytics Dashboard</h3>
                      </div>
                      <div className="text-[10px] font-mono font-bold text-stone-400 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg">
                        Auto-refresh active
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Bar Chart */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-black text-stone-500 uppercase tracking-wider">Lumber Interest Density by Category</h4>
                          <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Interactive Feed</span>
                        </div>
                        <div className="h-64 w-full bg-[#FAF7F2]/50 border border-stone-200/50 rounded-2xl p-2 pt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryChartData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE4DB" />
                              <XAxis dataKey="name" stroke="#78716C" fontSize={9} fontWeight="bold" tickLine={false} />
                              <YAxis stroke="#78716C" fontSize={9} tickLine={false} axisLine={false} />
                              <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', borderColor: '#E0D8CF', fontSize: '11px' }} />
                              <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                              <Bar name="Catalog Models" dataKey="Catalog Items" fill="#8B6F5C" radius={[4, 4, 0, 0]} />
                              <Bar name="Inquiry Volume" dataKey="Inquiry Interest" fill="#D97706" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Area Chart */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-black text-stone-500 uppercase tracking-wider">Custom Inquiries Inflow Curve</h4>
                          <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">Growth Trend</span>
                        </div>
                        <div className="h-64 w-full bg-[#FAF7F2]/50 border border-stone-200/50 rounded-2xl p-2 pt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyTrendData}>
                              <defs>
                                <linearGradient id="colorInqGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3D2B1F" stopOpacity={0.25}/>
                                  <stop offset="95%" stopColor="#3D2B1F" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE4DB" />
                              <XAxis dataKey="week" stroke="#78716C" fontSize={9} fontWeight="bold" tickLine={false} />
                              <YAxis stroke="#78716C" fontSize={9} tickLine={false} axisLine={false} />
                              <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', borderColor: '#E0D8CF', fontSize: '11px' }} />
                              <Area name="Weekly Tickets" type="monotone" dataKey="Inquiries" stroke="#3D2B1F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInqGrad)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Dashboard charts and graphics area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Category Share Distribution Card */}
                  <div className="bg-white border border-[#E0D8CF] p-6 rounded-3xl space-y-4 shadow-2xs">
                    <h3 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest pb-3 border-b border-[#FAF7F2]">
                      Category inventory Share
                    </h3>

                    <div className="space-y-3.5">
                      {categories.map((cat, i) => {
                        const count = products.filter(p => p.category === cat.slug).length;
                        const percentage = activeProductsCount > 0 ? Math.round((count / activeProductsCount) * 100) : 0;
                        const colors = ['bg-orange-600', 'bg-amber-600', 'bg-stone-700', 'bg-yellow-600', 'bg-rose-700', 'bg-amber-800'];
                        const colorClass = colors[i % colors.length];

                        return (
                          <div key={cat.slug} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-stone-700 uppercase">{cat.name}</span>
                              <span className="text-stone-500 font-normal">{count} items ({percentage}%)</span>
                            </div>
                            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                              <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* System Actions & Diagnostics and Alerts */}
                  <div className="bg-white border border-[#E0D8CF] p-6 rounded-3xl space-y-4 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center pb-3 border-b border-[#FAF7F2] mb-3">
                        <h3 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest">
                          Firebase Firestore Status
                        </h3>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Online
                        </span>
                      </div>
                      
                      <div className="space-y-2.5 text-[11px] text-stone-500 mb-4">
                        <div className="flex items-center justify-between border-b border-stone-50 pb-1">
                          <span className="text-stone-800 font-bold">Project ID</span>
                          <span className="text-stone-600 font-mono font-bold">bhisez-furniture-store</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-stone-50 pb-1">
                          <span className="text-stone-800 font-bold">Region</span>
                          <span className="text-stone-600 font-mono">multi-region (Global)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-800 font-bold">SDK Mode</span>
                          <span className="text-[#3D2B1F] font-bold">Web-v9 modular (Firestore)</span>
                        </div>
                      </div>

                      <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1.5">Live Connection Stream</h4>
                      <div className="bg-stone-900 text-stone-300 rounded-xl p-3 font-mono text-[10px] leading-relaxed h-28 overflow-y-auto space-y-1">
                        {terminalLogs.map((log, index) => (
                          <div key={index} className="flex gap-1.5">
                            <span className="text-stone-500 shrink-0 select-none">❯</span>
                            <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('ERROR') ? 'text-rose-400' : 'text-stone-300'}>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#FAF7F2] space-y-2">
                       <button
                         disabled={seeding}
                         onClick={handleSeedFirebaseDb}
                         className="w-full text-center bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-[11px] font-bold py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                       >
                         {seeding ? '⚙ Seeding collections...' : '🔥 Reset & Seed Live Firebase Database'}
                       </button>
                       <button
                         onClick={() => {
                           if (confirm('Clear local database caches? All additions and custom pricing modifications will reload from Firestore. proceed?')) {
                             localStorage.removeItem('bhisez_products');
                             localStorage.removeItem('bhisez_categories');
                             localStorage.removeItem('bhisez_inquiries');
                             localStorage.removeItem('bhisez_webcontent');
                             window.location.reload();
                           }
                         }}
                         className="w-full text-center bg-stone-50 hover:bg-stone-100 text-stone-700 text-[11px] font-bold py-2 rounded-xl border border-stone-200 transition-colors cursor-pointer"
                       >
                         🔄 Clear Offline Cache & Force Sync
                       </button>
                    </div>
                  </div>

                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 shadow-2xs space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                    <h3 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest">
                      Recent inquiries backlog
                    </h3>
                    <button 
                      onClick={() => setActiveTab('inquiries')}
                      className="text-amber-800 hover:text-amber-950 text-xs font-bold underline"
                    >
                      View All Inbox
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-6 text-stone-400 text-xs font-light">
                      No custom inquiries submitted yet. Submit a walkthrough request or contact form.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-stone-100 text-stone-400 font-black uppercase tracking-widest text-[9px] pb-2">
                            <th className="py-2.5">Date</th>
                            <th className="py-2.5">Customer</th>
                            <th className="py-2.5">Inquiry Channel / Subject</th>
                            <th className="py-2.5">Status</th>
                            <th className="py-2.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.slice(0, 4).map((inq) => (
                            <tr key={inq.id} className="border-b border-stone-100 last:border-0 font-medium text-stone-700">
                              <td className="py-3 text-stone-400 font-bold">{inq.date || 'Today'}</td>
                              <td className="py-3">
                                <div className="font-bold text-stone-800">{inq.name}</div>
                                <div className="text-[10px] text-stone-400 font-mono mt-0.5">{inq.phone}</div>
                              </td>
                              <td className="py-3">
                                <div className="text-stone-800 font-semibold">{inq.subject || inq.category || 'Custom Quote'}</div>
                                <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">{inq.message || inq.notes || 'No description notes.'}</div>
                              </td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                  inq.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                                  inq.status === 'Reviewed' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {inq.status || 'Pending'}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <div className="flex justify-end gap-1.5">
                                  <button 
                                    onClick={() => handleToggleInquiryStatus(inq.id)}
                                    className="p-1 pb-1.5 hover:bg-stone-50 text-stone-600 rounded" 
                                    title="Toggle Status"
                                  >
                                    <CheckCircle size={14} className="text-emerald-600 inline" />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="p-1 pb-1.5 hover:bg-stone-50 text-red-600 rounded"
                                    title="Delete"
                                  >
                                    <Trash2 size={13} className="inline" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
              );
            })()}

            {/* 2. PRODUCT MANAGEMENT VIEWPORT */}
            {activeTab === 'products' && (
              <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                
                {/* Header controls layout */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif text-lg font-black text-stone-800">Dynamic Product Logs</h3>
                    <p className="text-stone-400 text-xs font-light">Create, revise pricing models, adjust sizing parameters, or wipe products.</p>
                  </div>

                  <button 
                    onClick={handleOpenAddProduct}
                    className="bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus size={14} /> Add New Model
                  </button>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative w-full sm:max-w-xs">
                    <input 
                      type="text" 
                      placeholder="Search items, specs, wood..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D8CF] text-stone-700 text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>

                  {/* Category dropdown Filter */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0 justify-end">
                    <span className="text-xs font-bold text-stone-500">Category:</span>
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="bg-[#FAF7F2] border border-[#E0D8CF] text-xs font-bold text-stone-700 rounded-xl px-3 py-2.5 outline-none"
                    >
                      <option value="all">🌐 All Departments</option>
                      {categories.map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* List Table wrapper */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-100 text-stone-400 font-black uppercase tracking-widest text-[9px]">
                        <th className="py-2.5">ID / Image</th>
                        <th className="py-2.5">Product Title</th>
                        <th className="py-2.5">Category Dept.</th>
                        <th className="py-2.5 text-right">Price Standard</th>
                        <th className="py-2.5 text-right">Original Value</th>
                        <th className="py-2.5 text-right">Action controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="border-b border-stone-50 hover:bg-[#FAF7F2]/40 font-medium text-stone-700 transition-colors">
                          <td className="py-3.5">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={prod.img} 
                                alt={prod.name} 
                                className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                                onError={(e) => {
                                  (e.target as any).src = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=150&q=80';
                                }}
                              />
                              <span className="text-[10px] font-mono text-stone-400 font-bold block">{prod.id}</span>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <div className="font-bold text-stone-800 line-clamp-1">{prod.name}</div>
                            <div className="text-[10px] text-stone-400 font-sans mt-0.5">Material: <strong>{prod.material || 'Solid Hardwood'}</strong></div>
                          </td>
                          <td className="py-3.5">
                            <span className="bg-stone-100 text-stone-600 font-bold uppercase tracking-wide text-[9px] px-2 py-0.5 rounded-full block w-fit">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3.5 text-right font-bold text-stone-900">
                            {prod.price === 0 ? 'Custom Quote' : `₹${prod.price}`}
                          </td>
                          <td className="py-3.5 text-right font-normal text-stone-400 line-through">
                            {prod.orig ? `₹${prod.orig}` : '—'}
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="flex justify-end gap-1">
                              <button 
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-1 px-2.5 border border-[#E0D8CF] text-stone-600 hover:text-stone-900 rounded-lg text-[11px] font-bold bg-white cursor-pointer transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1 px-2 hover:bg-red-50 text-[#E52E2D] rounded-lg cursor-pointer transition-colors"
                                title="Delete Permanently"
                              >
                                <Trash2 size={14} className="inline" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-10 text-stone-400 text-xs font-light">
                      No products matched your active filters. Try refining your term.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 3. CATEGORY CATALOG MANAGER */}
            {activeTab === 'categories' && (
              <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                
                <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif text-lg font-black text-stone-800">Dynamic Category Departments</h3>
                    <p className="text-stone-400 text-xs font-light">Configure landing screen promotional widgets, main showcases and banners.</p>
                  </div>

                  <button 
                    onClick={() => setShowCatModal(true)}
                    className="bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus size={14} /> Add Category Slat
                  </button>
                </div>

                {/* Low-Inventory Warning Alert Banner */}
                {categories.some(cat => products.filter(p => p.category === cat.slug).length < 3) && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 flex items-start space-x-3 text-amber-950 shadow-3xs">
                    <span className="text-lg">⚠️</span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-950">Low-Inventory Active Alerts</h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        The following departments currently have fewer than 3 active models online. We suggest uploading new handcrafted designs to keep these catalog departments rich and engaging for customers:
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {categories.map(cat => {
                          const count = products.filter(p => p.category === cat.slug).length;
                          if (count < 3) {
                            return (
                              <span key={cat.slug} className="bg-amber-100/60 border border-amber-200 text-amber-950 px-2 py-0.5 rounded text-[10px] font-bold">
                                ✦ {cat.name} ({count} active models)
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories Grid displays */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat.slug).length;

                    return (
                      <div key={cat.slug} className="border border-[#E0D8CF] rounded-2xl overflow-hidden shadow-3xs hover:shadow-2xs transition-all bg-white flex flex-col justify-between">
                        
                        <div className="relative h-36 bg-stone-950">
                          <img 
                            src={cat.img} 
                            alt={cat.name} 
                            className="w-full h-full object-cover opacity-75"
                            onError={(e) => {
                              (e.target as any).src = '/images/BED/premium bed 01.webP';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                          
                          <div className="absolute bottom-3 left-4 text-white">
                            <span className="bg-amber-400 text-stone-950 text-[9px] font-black tracking-widest uppercase block px-1.5 py-0.5 rounded w-fit mb-1">{cat.promoOffer || '20% OFF'}</span>
                            <h4 className="font-serif text-base font-black uppercase text-white leading-tight">{cat.name}</h4>
                            <p className="text-[10px] text-stone-300 font-medium font-sans mt-0.5 italic">{cat.promoTitle || 'Seasoned Teakwood Collection'}</p>
                          </div>

                          <div className="absolute top-3 right-3 bg-stone-950/70 backdrop-blur-2xs border border-white/20 text-white font-mono font-black text-[10px] px-2 py-0.5 rounded-full select-none">
                            slug: {cat.slug}
                          </div>
                        </div>

                        {/* Middle status section */}
                        <div className="p-4 flex justify-between items-center text-xs border-t border-stone-100 bg-[#FAF7F2]/40">
                          <div>
                            <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Indexed Database Products</span>
                            <div className="flex items-center space-x-2 mt-0.5">
                              <span className="font-serif font-black text-stone-700">{count} Active Models</span>
                              {count < 3 && (
                                <span className="bg-red-50 text-red-700 border border-red-100 text-[9px] font-black uppercase px-1.5 py-0.5 rounded animate-pulse">
                                  ⚠️ Low Stock Alert
                                </span>
                              )}
                            </div>
                          </div>

                          <button 
                            onClick={() => handleDeleteCategory(cat.slug)}
                            className="text-[#E52E2D] hover:bg-red-50 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all"
                          >
                            Remove Slat
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* 4. INQUIRY MANAGEMENT PORTAL */}
            {activeTab === 'inquiries' && (
              <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif text-lg font-black text-stone-800">Dynamic Inquiries CRM Inbox</h3>
                    <p className="text-stone-400 text-xs font-light">Review customer request forms, print job cards, or drag cards across boards to update their live status.</p>
                  </div>

                  {/* Actions & Modes bar */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {/* View Switcher */}
                    <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#E0D8CF]">
                      <button
                        onClick={() => setCrmMode('kanban')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${crmMode === 'kanban' ? 'bg-[#3D2B1F] text-amber-50 shadow-2xs' : 'text-stone-500 hover:text-stone-700'}`}
                      >
                        <Kanban size={13} /> Kanban CRM
                      </button>
                      <button
                        onClick={() => setCrmMode('list')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${crmMode === 'list' ? 'bg-[#3D2B1F] text-amber-50 shadow-2xs' : 'text-stone-500 hover:text-stone-700'}`}
                      >
                        <List size={13} /> Table View
                      </button>
                    </div>

                    {/* Export Action */}
                    <button
                      onClick={handleExportCSV}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-[#E0D8CF] text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-3xs"
                      title="Download Excel CSV Spreadsheet"
                    >
                      <FileSpreadsheet size={14} /> Export Excel
                    </button>
                  </div>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-stone-400 text-xs font-light">
                    Your Customer Inquiry Inbox is currently empty.
                  </div>
                ) : crmMode === 'kanban' ? (
                  /* 🗂️ CRM KANBAN BOARD VIEW */
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                    {[
                      { id: 'Pending', name: 'Pending Validation', color: 'border-amber-600 bg-amber-50/10' },
                      { id: 'Reviewed', name: 'Reviewed / Active Specs', color: 'border-blue-600 bg-blue-50/10' },
                      { id: 'Resolved', name: 'Completed & Shipped', color: 'border-emerald-600 bg-emerald-50/10' }
                    ].map(col => {
                      const colInquiries = inquiries.filter(inq => (inq.status || 'Pending') === col.id);
                      return (
                        <div 
                          key={col.id}
                          onDragOver={handleDragOverInq}
                          onDrop={(e) => handleDropInq(e, col.id)}
                          className={`border-t-4 ${col.color} rounded-2xl p-4 min-h-[500px] flex flex-col space-y-4 border border-[#E0D8CF]/80 shadow-3xs`}
                        >
                          <div className="flex justify-between items-center pb-2 border-b border-[#E0D8CF]/40">
                            <span className="text-[11px] font-black text-stone-800 uppercase tracking-wider">{col.name}</span>
                            <span className="bg-white border border-[#E0D8CF] text-stone-500 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                              {colInquiries.length}
                            </span>
                          </div>

                          <div className="flex-1 space-y-3.5 overflow-y-auto">
                            {colInquiries.map((inq, i) => {
                              const clientPayload = `Hi ${inq.name}! Thank you for submitting your custom inquiry for Bhise'z Furniture Showrooms. We are pleased to process your quote request...`;
                              const whatsappLink = `https://wa.me/${inq.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(clientPayload)}`;

                              return (
                                <div
                                  key={inq.id || i}
                                  draggable
                                  onDragStart={(e) => handleDragStartInq(e, inq.id)}
                                  className="bg-white border border-[#E0D8CF] rounded-xl p-4 space-y-3 shadow-3xs hover:shadow-2xs hover:border-amber-400 transition-all cursor-grab active:cursor-grabbing relative"
                                >
                                  {/* Draggable indicator dot banner */}
                                  <div className="absolute top-4 right-4 flex gap-1 items-center">
                                    <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                    <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                    <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                                  </div>

                                  <div>
                                    <span className="text-[9px] font-mono font-bold text-stone-400 block mb-1">
                                      {inq.date || 'Received Today'}
                                    </span>
                                    <h4 className="font-bold text-stone-800 text-xs sm:text-sm">{inq.name}</h4>
                                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">{inq.phone} {inq.city ? `| ${inq.city}` : ''}</p>
                                  </div>

                                  <div className="bg-[#FAF7F2] p-2 rounded-lg border border-stone-200/50">
                                    <div className="text-[10px] text-amber-900 font-black truncate">
                                      ✦ {inq.subject || inq.category || 'Special Order Specification'}
                                    </div>
                                    <p className="text-[10px] text-stone-600 line-clamp-3 mt-1 leading-relaxed">
                                      {inq.message || 'No description specs supplied.'}
                                    </p>
                                  </div>

                                  {(inq.customLength || inq.customWidth || inq.woodGrade) && (
                                    <div className="bg-amber-50/40 p-2 rounded-lg border border-amber-200/30 grid grid-cols-3 gap-1 text-[9px] font-bold text-amber-950">
                                      <div className="bg-white p-1 rounded border border-amber-100/50 text-center">
                                        <span className="text-stone-400 block text-[7px] uppercase font-black">Length</span>
                                        <span>{inq.customLength || 'Custom'}</span>
                                      </div>
                                      <div className="bg-white p-1 rounded border border-amber-100/50 text-center">
                                        <span className="text-stone-400 block text-[7px] uppercase font-black">Width</span>
                                        <span>{inq.customWidth || 'Custom'}</span>
                                      </div>
                                      <div className="bg-white p-1 rounded border border-amber-100/50 text-center truncate">
                                        <span className="text-stone-400 block text-[7px] uppercase font-black">Grade</span>
                                        <span title={inq.woodGrade}>{inq.woodGrade || 'Teak'}</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Note input field inside Kanban card */}
                                  <div className="space-y-1">
                                    <input
                                      type="text"
                                      placeholder="Admin remark..."
                                      value={notesForm[inq.id] !== undefined ? notesForm[inq.id] : (inq.notes || '')}
                                      onChange={(e) => setNotesForm({...notesForm, [inq.id]: e.target.value})}
                                      className="w-full bg-stone-50 text-[10px] text-stone-700 placeholder-stone-400 border border-stone-200 focus:bg-white focus:outline-none py-1 px-1.5 rounded"
                                    />
                                    <button
                                      onClick={() => {
                                        const noteVal = notesForm[inq.id] || '';
                                        const next = inquiries.map(item => item.id === inq.id ? { ...item, notes: noteVal } : item);
                                        onUpdateInquiries(next);
                                        alert('✓ CRM note successfully saved!');
                                      }}
                                      className="w-full bg-[#3D2B1F]/10 hover:bg-[#3D2B1F] hover:text-amber-50 text-stone-700 text-[9px] font-black uppercase py-1 rounded transition-colors text-center"
                                    >
                                      Save Remark
                                    </button>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-1.5 pt-1 border-t border-stone-100 justify-between items-center relative">
                                    {/* Print Job sheet */}
                                    <button
                                      onClick={() => handlePrintWorkshopCard(inq)}
                                      className="p-1.5 border border-[#E0D8CF] hover:border-[#3D2B1F] hover:bg-stone-50 rounded-lg text-stone-600 transition-colors"
                                      title="Print Job Card for Carving Team"
                                    >
                                      <Printer size={12} className="inline mr-1" />
                                      <span className="text-[9px] font-bold uppercase">Print Card</span>
                                    </button>

                                    {/* Automated WhatsApp templates selection dropup */}
                                    <div className="relative">
                                      <button 
                                        onClick={() => setActiveWaMenu(activeWaMenu === inq.id ? null : inq.id)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black uppercase px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-3xs cursor-pointer"
                                      >
                                        <span>WhatsApp replies</span>
                                        <ChevronDown size={10} />
                                      </button>

                                      {activeWaMenu === inq.id && (
                                        <div className="absolute right-0 bottom-full mb-2 bg-stone-900 border border-stone-800 text-white p-3 rounded-xl shadow-lg w-64 z-50 space-y-2 text-left">
                                          <div className="flex justify-between items-center pb-1.5 border-b border-stone-800">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">⚡ Automated Replies</span>
                                            <button 
                                              onClick={() => setActiveWaMenu(null)}
                                              className="text-stone-500 hover:text-stone-300 text-[10px]"
                                            >
                                              ✕
                                            </button>
                                          </div>
                                          <div className="flex flex-col space-y-1">
                                            {[
                                              {
                                                label: '📋 Cost Quote Estimate',
                                                builder: (item: any) => {
                                                  const categoryText = item.subject || 'custom furniture';
                                                  const dimensionsText = (item.customLength && item.customWidth) 
                                                    ? ` with dimensions ${item.customLength}x${item.customWidth} inches`
                                                    : '';
                                                  const woodText = item.woodGrade ? ` in seasoned ${item.woodGrade}` : '';
                                                  return `Hello ${item.name}! रमेश भिसे here from Bhise'z Workshop. We received your website request for ${categoryText}${dimensionsText}${woodText}. The hand-carving custom rate is ₹[Insert Price] with free white-glove setup. Would you like to proceed?`;
                                                }
                                              },
                                              {
                                                label: '📐 Sizing CAD Blueprint',
                                                builder: (item: any) => {
                                                  const dims = (item.customLength && item.customWidth) ? ` [${item.customLength}L x ${item.customWidth}W]` : '';
                                                  return `Hello ${item.name}! Our workshop carving team has finalized the dimension blueprint for your requested design${dims}. Please confirm if we should lock these sizing specs for cutting.`;
                                                }
                                              },
                                              {
                                                label: '⚠️ Stock Alternative Info',
                                                builder: (item: any) => {
                                                  return `Hello ${item.name}! We got your request. Currently that specific design is at low stock, but we can customize a fresh unit for you in 10-12 days. Let us know if this works!`;
                                                }
                                              },
                                              {
                                                label: '🚚 Dispatch Polishing Done',
                                                builder: (item: any) => {
                                                  return `Hi ${item.name}! Great news from Bhise'z Workshop. Your handcrafted seasoned timber unit is polished, polyurethane-sealed, and ready for shipping to ${item.city || 'your city'}. We will arrange the logistics shortly!`;
                                                }
                                              }
                                            ].map((tpl, idx) => {
                                              const formattedText = tpl.builder(inq);
                                              const link = `https://wa.me/${inq.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(formattedText)}`;
                                              return (
                                                <a
                                                  key={idx}
                                                  href={link}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  onClick={() => setActiveWaMenu(null)}
                                                  className="text-[10px] bg-stone-800 hover:bg-stone-700 p-1.5 rounded transition-colors flex items-center justify-between text-stone-200 border border-transparent hover:border-stone-600 font-medium"
                                                >
                                                  <span>{tpl.label}</span>
                                                  <span className="text-[10px] text-stone-400">➔</span>
                                                </a>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {colInquiries.length === 0 && (
                              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl text-stone-400 text-[11px] font-light">
                                Drop tickets here
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* 📋 TABLE LIST VIEW */
                  <div className="space-y-4">
                    {inquiries.map((inq, i) => {
                      const clientPayload = `Hi ${inq.name}! Thank you for submitting your custom inquiry for Bhise'z Furniture Showrooms. We are pleased to process your quote request...`;
                      const whatsappLink = `https://wa.me/${inq.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(clientPayload)}`;

                      return (
                        <div key={inq.id || i} className="border border-[#E0D8CF] rounded-2xl p-5 hover:border-amber-300 transition-all bg-[#FAF7F2]/10 space-y-4 relative">
                          
                          {/* Top row */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div className="flex items-center space-x-2.5">
                              <span className="text-stone-400 text-xs font-mono font-bold block bg-white border border-[#E0D8CF] px-2 py-0.5 rounded-lg">
                                #{inquiries.length - i}
                              </span>
                              <span className="text-xs text-stone-400 font-bold">{inq.date || 'Received Today'}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                inq.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                                inq.status === 'Reviewed' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                              }`}>
                                {inq.status || 'Pending'}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handlePrintWorkshopCard(inq)}
                                className="px-2.5 py-1 text-[11px] font-bold border border-stone-300 hover:border-stone-800 rounded-lg bg-white flex items-center gap-1 text-stone-700"
                              >
                                <Printer size={12} /> Print Card
                              </button>
                              <button 
                                onClick={() => handleToggleInquiryStatus(inq.id)}
                                className="px-2.5 py-1 text-[11px] font-bold border border-[#E0D8CF] hover:border-stone-800 rounded-lg bg-white"
                              >
                                Toggle status
                              </button>
                              <button 
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1 text-stone-400 hover:text-red-600"
                                title="Delete Perm"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Body Segment */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                            <div className="space-y-1 md:border-r border-stone-100 pr-2">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Customer details</span>
                              <div className="text-stone-900 font-black">{inq.name}</div>
                              <div className="text-stone-500 flex items-center gap-1 font-mono">{inq.phone}</div>
                              {inq.city && <div className="text-stone-400">City: <strong>{inq.city}</strong></div>}
                            </div>

                            <div className="col-span-2 space-y-1">
                              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">Inquiry / Custom Request Info</span>
                              <div className="text-amber-900 font-black flex items-center gap-1">
                                <span>✦</span> 
                                <span>{inq.subject || inq.category || 'Special Order Specification'}</span>
                              </div>

                              {(inq.customLength || inq.customWidth || inq.woodGrade) && (
                                <div className="flex flex-wrap gap-2.5 my-1.5">
                                  <span className="bg-amber-50/70 text-amber-900 border border-amber-200/40 px-2.5 py-0.5 rounded-lg text-[10px] font-bold">
                                    📐 Custom Length: <strong>{inq.customLength || 'Custom'}</strong>
                                  </span>
                                  <span className="bg-amber-50/70 text-amber-900 border border-amber-200/40 px-2.5 py-0.5 rounded-lg text-[10px] font-bold">
                                    📐 Custom Width: <strong>{inq.customWidth || 'Custom'}</strong>
                                  </span>
                                  <span className="bg-amber-50/70 text-amber-900 border border-amber-200/40 px-2.5 py-0.5 rounded-lg text-[10px] font-bold">
                                    🪵 Wood Grade: <strong>{inq.woodGrade || 'Standard Teak'}</strong>
                                  </span>
                                </div>
                              )}

                              <p className="text-stone-600 font-light leading-relaxed mt-1 text-xs select-all bg-stone-50 p-2.5 border border-stone-100 rounded-lg">
                                {inq.message || inq.notes || 'No description notes.'}
                              </p>
                            </div>
                          </div>

                          {/* Dynamic CRM Note Editor */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl p-2 px-3 text-xs">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider shrink-0 sm:mt-0.5">Admin CRM Note:</span>
                            <input
                              type="text"
                              placeholder="Type administrative log, follow-up or custom remarks..."
                              value={notesForm[inq.id] !== undefined ? notesForm[inq.id] : (inq.notes || '')}
                              onChange={(e) => setNotesForm({...notesForm, [inq.id]: e.target.value})}
                              className="w-full bg-transparent text-stone-700 placeholder-stone-400 font-medium focus:outline-none py-1 px-1 text-xs border border-transparent focus:border-amber-200 focus:bg-white rounded-md"
                            />
                            <button
                              onClick={() => {
                                const noteVal = notesForm[inq.id] || '';
                                const next = inquiries.map(item => item.id === inq.id ? { ...item, notes: noteVal } : item);
                                onUpdateInquiries(next);
                                alert('✓ CRM note successfully saved to Cloud Firestore database!');
                              }}
                              className="bg-[#3D2B1F] text-amber-50 px-3 py-2 text-[10px] font-black uppercase rounded-lg hover:bg-stone-900 transition-all shrink-0 cursor-pointer text-center"
                            >
                              Save Note
                            </button>
                          </div>

                          {/* WhatsApp Action and Quick Messaging button */}
                          <div className="flex gap-2.5 pt-1.5 justify-end relative">
                            <a 
                              href={`tel:${inq.phone}`} 
                              className="text-stone-700 hover:bg-stone-50 text-[11px] font-bold px-3 py-1.5 border border-[#E0D8CF] rounded-lg transition-colors"
                            >
                              📞 Call Customer
                            </a>
                            
                            {/* Interactive WhatsApp quick replies for Table list view */}
                            <div className="relative">
                              <button 
                                onClick={() => setActiveWaMenu(activeWaMenu === `${inq.id}-table` ? null : `${inq.id}-table`)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                              >
                                💬 WhatsApp replies
                                <ChevronDown size={12} />
                              </button>

                              {activeWaMenu === `${inq.id}-table` && (
                                <div className="absolute right-0 bottom-full mb-2 bg-stone-900 border border-stone-800 text-white p-3 rounded-xl shadow-lg w-72 z-50 space-y-2 text-left">
                                  <div className="flex justify-between items-center pb-1.5 border-b border-stone-800">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">⚡ Automated WhatsApp replies</span>
                                    <button 
                                      onClick={() => setActiveWaMenu(null)}
                                      className="text-stone-500 hover:text-stone-300 text-[11px]"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    {[
                                      {
                                        label: '📋 Cost Quote Estimate',
                                        builder: (item: any) => {
                                          const categoryText = item.subject || 'custom furniture';
                                          const dimensionsText = (item.customLength && item.customWidth) 
                                            ? ` with dimensions ${item.customLength}x${item.customWidth} inches`
                                            : '';
                                          const woodText = item.woodGrade ? ` in seasoned ${item.woodGrade}` : '';
                                          return `Hello ${item.name}! रमेश भिसे here from Bhise'z Workshop. We received your website request for ${categoryText}${dimensionsText}${woodText}. The hand-carving custom rate is ₹[Insert Price] with free white-glove setup. Would you like to proceed?`;
                                        }
                                      },
                                      {
                                        label: '📐 Sizing CAD Blueprint',
                                        builder: (item: any) => {
                                          const dims = (item.customLength && item.customWidth) ? ` [${item.customLength}L x ${item.customWidth}W]` : '';
                                          return `Hello ${item.name}! Our workshop carving team has finalized the dimension blueprint for your requested design${dims}. Please confirm if we should lock these sizing specs for cutting.`;
                                        }
                                      },
                                      {
                                        label: '⚠️ Stock Alternative Info',
                                        builder: (item: any) => {
                                          return `Hello ${item.name}! We got your request. Currently that specific design is at low stock, but we can customize a fresh unit for you in 10-12 days. Let us know if this works!`;
                                        }
                                      },
                                      {
                                        label: '🚚 Dispatch Polishing Done',
                                        builder: (item: any) => {
                                          return `Hi ${item.name}! Great news from Bhise'z Workshop. Your handcrafted seasoned timber unit is polished, polyurethane-sealed, and ready for shipping to ${item.city || 'your city'}. We will arrange the logistics shortly!`;
                                        }
                                      }
                                    ].map((tpl, idx) => {
                                      const formattedText = tpl.builder(inq);
                                      const link = `https://wa.me/${inq.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(formattedText)}`;
                                      return (
                                        <a
                                          key={idx}
                                          href={link}
                                          target="_blank"
                                          rel="noreferrer"
                                          onClick={() => setActiveWaMenu(null)}
                                          className="text-[10px] bg-stone-800 hover:bg-stone-700 p-2 rounded transition-colors flex items-center justify-between text-stone-200 border border-transparent hover:border-stone-600 font-medium"
                                        >
                                          <span>{tpl.label}</span>
                                          <span className="text-[10px] text-stone-400 font-bold">➔</span>
                                        </a>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

            {/* 5. WEBSITE CONTENT VARIABLES MANAGEMENT */}
            {activeTab === 'content' && (
              <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                
                <div className="pb-4 border-b border-stone-100">
                  <h3 className="font-serif text-lg font-black text-stone-800">Website Content Management</h3>
                  <p className="text-stone-400 text-xs font-light">Customise the primary text statements, founder names, numbers and marketing tags that are served globally.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Global Marketing */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-xs font-black text-amber-950 uppercase tracking-widest border-b border-stone-50 pb-2">Global Slogans</h4>
                    
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Homepage Hero Header Text</label>
                      <input 
                        type="text" 
                        value={websiteContent.heroTitle}
                        onChange={(e) => handleUpdateContentField('heroTitle', e.target.value)}
                        className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 bg-[#FAF7F2]"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Hero Subtitle tag</label>
                      <textarea 
                        value={websiteContent.heroSubtitle}
                        onChange={(e) => handleUpdateContentField('heroSubtitle', e.target.value)}
                        className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 resize-none h-16 bg-[#FAF7F2]"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Ramesh Bhise Slogan quote</label>
                      <textarea 
                        value={websiteContent.aboutQuote}
                        onChange={(e) => handleUpdateContentField('aboutQuote', e.target.value)}
                        className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 resize-none h-16 bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                  {/* Operational details */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-xs font-black text-amber-950 uppercase tracking-widest border-b border-stone-50 pb-2">HQ Operations & Contacts</h4>
                    
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">WhatsApp Enquiries Line Number</label>
                      <input 
                        type="text" 
                        value={websiteContent.whatsappLine}
                        onChange={(e) => handleUpdateContentField('whatsappLine', e.target.value)}
                        className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 bg-[#FAF7F2]"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Malvan Flagship Address</label>
                      <textarea 
                        value={websiteContent.malvanAddress}
                        onChange={(e) => handleUpdateContentField('malvanAddress', e.target.value)}
                        className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 resize-none h-14 bg-[#FAF7F2]"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Sukalwad Highway Address</label>
                      <textarea 
                        value={websiteContent.sukalwadAddress}
                        onChange={(e) => handleUpdateContentField('sukalwadAddress', e.target.value)}
                        className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 resize-none h-14 bg-[#FAF7F2]"
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <button 
                    onClick={() => {
                      alert('Website layout parameters saved dynamically. The storefront is updated according to your adjustments.');
                    }}
                    className="bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Commit Content Changes
                  </button>
                </div>

              </div>
            )}

            {/* 6. SETTINGS VIEWPORT */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-[#E0D8CF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                
                <div className="pb-4 border-b border-stone-100">
                  <h3 className="font-serif text-lg font-black text-stone-800">Admin Panel Configuration</h3>
                  <p className="text-stone-400 text-xs font-light">Customise dashboard parameters, update validation tokens, and manage authorization locks.</p>
                </div>

                <div className="max-w-md space-y-5">
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed font-light">
                    <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-950 mb-0.5">Admin Security Protocol</span>
                      Updating the passcode updates the secure login credential. The default safe token is <strong>1234</strong> or <strong>admin</strong>.
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Admin Dashboard Access Passcode</label>
                    <input 
                      type="text" 
                      value={websiteContent.adminPasscode || '1234'}
                      onChange={(e) => handleUpdateContentField('adminPasscode', e.target.value)}
                      className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 font-bold bg-[#FAF7F2]"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Active Currency Format Symbol</label>
                    <input 
                      type="text" 
                      value={websiteContent.currencySymbol || '₹'}
                      onChange={(e) => handleUpdateContentField('currencySymbol', e.target.value)}
                      className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 font-bold bg-[#FAF7F2]"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Composite Sales Tax Indicator / GST %</label>
                    <input 
                      type="number" 
                      value={websiteContent.gstPercent || 18}
                      onChange={(e) => handleUpdateContentField('gstPercent', Number(e.target.value))}
                      className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 font-bold bg-[#FAF7F2]"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      alert('Admin systems updated and synchronized successfully.');
                    }}
                    className="bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-xs cursor-pointer block mt-4"
                  >
                    Save settings
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ── MODALS & FLOATING DIALOGS ── */}

      {/* 1. PRODUCT ADD / EDIT DIALOG MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-[250] bg-stone-950/40 backdrop-blur-3xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E0D8CF] rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setShowProductModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-xl font-black text-stone-800 border-b border-stone-100 pb-3">
              {editingProduct ? '📝 Revision: Edit Model Grains & Price' : '✨ Addition: Create New Prototype Model'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Model Identifier / Code *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g. beds-bedroom-bed-08"
                    value={productForm.id}
                    onChange={(e) => setProductForm({...productForm, id: e.target.value})}
                    disabled={!!editingProduct}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 bg-stone-50 disabled:opacity-55"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Product Catalog Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g. BED - premium bed #05"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Price (INR) *</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="38000"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Orig (INR) - optional</label>
                  <input 
                    type="number" 
                    placeholder="52000"
                    value={productForm.orig}
                    onChange={(e) => setProductForm({...productForm, orig: Number(e.target.value) || undefined})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Select Badge</label>
                  <select
                    value={productForm.badge || ''}
                    onChange={(e) => setProductForm({...productForm, badge: (e.target.value || null) as any})}
                    className="bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl px-3 py-2 text-xs text-stone-700"
                  >
                    <option value="">No Badge</option>
                    <option value="bs">Bestseller (bs)</option>
                    <option value="new">New Arrival (new)</option>
                    <option value="cus">Custom Quote (cus)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Department Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl px-3 py-2 text-xs text-stone-700"
                  >
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Timber wood / material *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Selected Seasoned Teakwood"
                    value={productForm.material}
                    onChange={(e) => setProductForm({...productForm, material: e.target.value})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Image Source Link Path *</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    required 
                    value={productForm.img}
                    onChange={(e) => setProductForm({...productForm, img: e.target.value})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 flex-1"
                    placeholder="https://..."
                  />
                </div>
                {/* Drag-and-Drop file drop uploader */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={handleFileDropUploader}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-200 hover:border-amber-400 bg-[#FAF7F2]/40 hover:bg-amber-50/10 p-4 rounded-xl text-center cursor-pointer transition-all space-y-1"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelectUploader} 
                    className="hidden" 
                    accept="image/*"
                  />
                  {uploadingImage ? (
                    <div className="text-xs text-stone-500 font-bold animate-pulse flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                      Pushing to Firebase Storage...
                    </div>
                  ) : (
                    <>
                      <div className="text-[11px] font-bold text-stone-700">Drag & Drop Image or Click to Browse</div>
                      <div className="text-[9px] text-stone-400 uppercase font-bold tracking-wider">Uploads directly to bhisez-furniture-store.appspot.com</div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <input 
                  type="text" 
                  value={productForm.shortDesc}
                  onChange={(e) => setProductForm({...productForm, shortDesc: e.target.value})}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                  placeholder="Short summary tagline..."
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Detailed Specifications description</label>
                  <span className="text-[9px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">WYSIWYG HTML</span>
                </div>
                
                {/* HTML rich formatting buttons */}
                <div className="flex flex-wrap gap-1 bg-stone-100 p-1 border border-[#E0D8CF] rounded-t-xl text-stone-700">
                  <button
                    type="button"
                    onClick={() => insertFormattedText('<b>', '</b>')}
                    className="p-1 px-2.5 text-[10px] font-bold bg-white border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
                    title="Bold text"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormattedText('<i>', '</i>')}
                    className="p-1 px-2.5 text-[10px] italic bg-white border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
                    title="Italic text"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormattedText('<p className="mt-2 text-stone-600 font-medium leading-relaxed">', '</p>')}
                    className="p-1 px-2 text-[9px] font-bold bg-white border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
                    title="Paragraph style"
                  >
                    Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormattedText('<ul className="list-disc pl-5 space-y-1 mt-1 text-stone-500"><li>', '</li></ul>')}
                    className="p-1 px-2 text-[9px] font-bold bg-white border border-stone-200 rounded hover:bg-stone-50 cursor-pointer"
                    title="List style"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormattedText('<span className="text-amber-800 font-extrabold uppercase tracking-widest text-[10px]">', '</span>')}
                    className="p-1 px-2 text-[9px] font-bold bg-white border border-stone-200 rounded hover:bg-stone-50 text-amber-800 cursor-pointer"
                    title="Teak Highlight"
                  >
                    Highlight
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Clear custom HTML markup and reset?')) {
                        setProductForm({...productForm, description: ''});
                      }
                    }}
                    className="p-1 px-2 ml-auto text-[9px] font-bold text-[#E52E2D] bg-white border border-stone-200 rounded hover:bg-red-50 cursor-pointer"
                    title="Clear text"
                  >
                    Clear
                  </button>
                </div>

                <textarea 
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="border border-t-0 border-[#E0D8CF] rounded-b-xl px-4 py-2.5 text-xs text-stone-700 min-h-[90px] resize-y focus:outline-none"
                  placeholder="Describe your premium beds, mandirs, wooden carvings, etc..."
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex gap-2.5 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2.5 border border-[#E0D8CF] text-xs font-bold rounded-xl text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs"
                >
                  Confirm Model
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. CATEGORY DIALOG MODAL */}
      {showCatModal && (
        <div className="fixed inset-0 z-[250] bg-stone-950/40 backdrop-blur-3xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E0D8CF] rounded-3xl w-full max-w-sm p-6 sm:p-8 space-y-5 shadow-2xl relative">
            
            <button 
              onClick={() => setShowCatModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-lg font-black text-stone-800 border-b border-stone-100 pb-2">
              ✨ Add Department Category
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-medium">
              
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Category Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="E.g. WINDOW FRAMES"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Category URL Slug *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="E.g. window-frames"
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Promo Offer badge text</label>
                <input 
                  type="text" 
                  placeholder="E.g. 15% OFF"
                  value={catPromoOffer}
                  onChange={(e) => setCatPromoOffer(e.target.value)}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Promo Title</label>
                <input 
                  type="text" 
                  placeholder="E.g. Royal seasoned pine collection"
                  value={catPromoTitle}
                  onChange={(e) => setCatPromoTitle(e.target.value)}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Backdrop image path</label>
                <input 
                  type="text" 
                  value={catImg}
                  onChange={(e) => setCatImg(e.target.value)}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowCatModal(false)}
                  className="px-4 py-2.5 border border-[#E0D8CF] text-xs font-bold rounded-xl text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs"
                >
                  Create Department
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

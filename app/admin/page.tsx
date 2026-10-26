'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { PROJECTS_DATA, SERVICES_DATA } from '@/data/siteData';
import { LOCAL_SERVICE_PHOTOS } from '@/data/uploadedPhotos';

type Section = 'services' | 'portfolio';
type AdminSection = Section | 'inspiration';
type AdminMediaItem = {
  id: string; section: AdminSection; kind: 'image' | 'video'; category: string; serviceId?: string;
  fileName: string; src: string; alt: string; createdAt: string; size: number; mimeType: string;
  sourceType?: 'site-image'; removed?: boolean; title?: string;
};
const INSPIRATION_LABELS: Record<string, string> = {
  bedroom: 'Bedroom', 'crockery-units': 'Crockery Units', 'dining-room': 'Dining Room', 'false-ceiling': 'False Ceiling',
  'living-room': 'Living Room', 'modular-kitchen': 'Modular Kitchen', office: 'Office', 'safety-doors': 'Safety Doors',
  'study-room': 'Study Room', 'tv-unit': 'TV Unit', wardrobe: 'Wardrobe',
};
const PORTFOLIO_CATEGORIES = [
  { id: 'living', title: 'Living Rooms' },
  { id: 'kitchens', title: 'Kitchens' },
  { id: 'bedrooms', title: 'Bedrooms & Wardrobes' },
  { id: 'bespoke', title: 'Bespoke Furniture' },
  { id: 'commercial', title: 'Workspaces & Commercial' },
];
const serviceTitles = new Map(SERVICES_DATA.map((service) => [service.id, service.title]));
const portfolioTitles = new Map(PORTFOLIO_CATEGORIES.map((item) => [item.id, item.title]));
const categoryTitle = (item: AdminMediaItem) => item.title ?? (item.section === 'services' ? serviceTitles.get(item.category) ?? item.category : item.section === 'portfolio' ? portfolioTitles.get(item.category) ?? item.category : INSPIRATION_LABELS[item.category] ?? item.category);
const readableSize = (bytes: number) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export default function AdminPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [section, setSection] = useState<Section>('services');
  const [category, setCategory] = useState(SERVICES_DATA[0]?.id ?? '');
  const [altText, setAltText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [media, setMedia] = useState<AdminMediaItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const categories = section === 'services' ? SERVICES_DATA.map((item) => ({ id: item.id, title: item.title })) : PORTFOLIO_CATEGORIES;

  async function loadMedia() {
    const response = await fetch('/api/admin/images', { cache: 'no-store' });
    if (response.status === 401) { setAuthenticated(false); return false; }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? 'Could not load your media library.');
    setMedia(data.media ?? []);
    setAuthenticated(true);
    return true;
  }

  useEffect(() => {
    let active = true;
    fetch('/api/admin/images', { cache: 'no-store' })
      .then(async (response) => {
        if (response.status === 401) return null;
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? 'Could not check the admin session.');
        return data.media as AdminMediaItem[];
      })
      .then((loaded) => { if (active && loaded) { setMedia(loaded); setAuthenticated(true); } })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Could not connect to the website.'); })
      .finally(() => { if (active) setCheckingSession(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => { if (!categories.some((item) => item.id === category)) setCategory(categories[0]?.id ?? ''); }, [section]);
  const visibleMedia = useMemo(() => {
    if (filter === 'removed') return media.filter((item) => item.removed === true);
    if (filter === 'all') return media.filter((item) => !item.removed);
    if (filter === 'services') {
      const serviceSources = new Set(Object.values(LOCAL_SERVICE_PHOTOS).flat().map((photo) => photo.src));
      return media.filter((item) => !item.removed && (item.section === 'services' || (item.section === 'inspiration' && item.sourceType === 'site-image' && serviceSources.has(item.src))));
    }
    if (filter === 'portfolio' || filter === 'inspiration') return media.filter((item) => !item.removed && item.section === filter);
    const [group, id] = filter.split(':');
    if (group === 'services') {
      const serviceSources = new Set((LOCAL_SERVICE_PHOTOS[id] ?? []).map((photo) => photo.src));
      return media.filter((item) => !item.removed && ((item.section === 'services' && item.category === id) || (item.section === 'inspiration' && item.sourceType === 'site-image' && serviceSources.has(item.src))));
    }
    return media.filter((item) => !item.removed && item.section === group && item.category === id);
  }, [filter, media]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Could not sign in.');
      setPassword(''); await loadMedia(); setNotice('Signed in. Your photo and video library is ready.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not sign in.'); }
    finally { setBusy(false); }
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFiles.length) { setError('Choose photos or videos first.'); return; }
    setBusy(true); setError(''); setNotice(''); let uploadedCount = 0;
    try {
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        setProgress(`Uploading ${index + 1} of ${selectedFiles.length}: ${file.name}`);
        const formData = new FormData(); formData.set('file', file); formData.set('section', section); formData.set('category', category); formData.set('alt', altText);
        const response = await fetch('/api/admin/images', { method: 'POST', body: formData });
        const data = await response.json();
        if (!response.ok) { if (response.status === 401) setAuthenticated(false); throw new Error(`${file.name}: ${data.error ?? 'Upload failed.'}`); }
        setMedia((current) => [data.media as AdminMediaItem, ...current]); uploadedCount += 1;
      }
      const dest = categories.find((item) => item.id === category)?.title ?? category;
      setNotice(`${uploadedCount} file${uploadedCount === 1 ? '' : 's'} added to ${dest}. Refresh the website to see them.`);
      setSelectedFiles([]); setAltText(''); if (fileInput.current) fileInput.current.value = '';
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'One or more files could not be uploaded.'); }
    finally { setBusy(false); setProgress(''); }
  }

  async function removeMedia(item: AdminMediaItem) {
    const isSiteImage = item.sourceType === 'site-image';
    const restore = isSiteImage && item.removed === true;
    const message = isSiteImage
      ? restore ? 'Restore this image to every gallery where it appears?' : 'Remove this image from every gallery where it appears? The original file will stay in the project folder.'
      : `Permanently delete this ${item.kind} from ${categoryTitle(item)}?`;
    if (!window.confirm(message)) return;
    setError(''); setNotice('');
    try {
      const response = await fetch('/api/admin/images', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, action: restore ? 'restore' : 'remove' }) });
      const data = await response.json();
      if (!response.ok) { if (response.status === 401) setAuthenticated(false); throw new Error(data.error ?? 'Could not update this item.'); }
      if (isSiteImage) {
        setMedia((current) => current.map((entry) => entry.sourceType === 'site-image' && entry.src === item.src ? { ...entry, removed: !restore } : entry));
        setNotice(restore ? 'Image restored to the website.' : 'Image removed from the website galleries.');
      } else {
        setMedia((current) => current.filter((entry) => entry.id !== item.id));
        setNotice(`${item.kind === 'video' ? 'Video' : 'Photo'} permanently deleted.`);
      }
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not update this item.'); }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' }); setAuthenticated(false); setMedia([]); setNotice('You have signed out.');
  }

  return (
    <main className="min-h-screen bg-[#FAF7F1] px-4 py-8 text-[#272720] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between gap-4 border-b border-[#DED6CA] pb-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Back to home"><Image src="/sharma-logo.png" alt="Sharma Furnitures & Interiors" width={54} height={54} className="h-12 w-12 rounded-full object-contain" /><span className="font-serif text-lg sm:text-xl">Sharma <span className="text-[#53694D]">Admin</span></span></Link>
          {authenticated && <button onClick={handleLogout} className="rounded-full border border-[#C5A47E] px-4 py-2 text-sm hover:bg-white">Sign out</button>}
        </header>

        {checkingSession ? <div className="rounded-2xl border border-[#E9DFD0] bg-white p-8 text-center text-sm text-[#62645D]">Checking your admin session…</div> : !authenticated ? (
          <section className="mx-auto max-w-md rounded-3xl border border-[#E9DFD0] bg-white p-7 shadow-sm sm:p-9">
            <span className="text-xs font-semibold uppercase tracking-[.18em] text-[#687A61]">Private website tools</span><h1 className="mt-3 font-serif text-3xl">Sign in to manage your media</h1><p className="mt-3 text-sm leading-6 text-[#6B6B64]">Upload and organize photos and videos for service categories and the portfolio.</p>
            <form onSubmit={handleLogin} className="mt-7 space-y-4"><label className="block text-sm font-medium" htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-xl border border-[#D9D2C7] px-4 py-3 outline-none focus:border-[#53694D] focus:ring-2 focus:ring-[#B9C9B1]/50" /><button disabled={busy} className="w-full rounded-xl bg-[#53694D] px-5 py-3 font-semibold text-white transition hover:bg-[#41553C] disabled:cursor-wait disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button></form>
            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
          </section>
        ) : <>
          <section className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><span className="text-xs font-semibold uppercase tracking-[.18em] text-[#687A61]">Photo &amp; video library</span><h1 className="mt-2 font-serif text-3xl sm:text-4xl">Manage your website media</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B6B64]">Upload, organize, and remove media in every service gallery or portfolio category.</p></div><Link href="/" className="text-sm font-semibold text-[#53694D] underline underline-offset-4">View the website</Link></section>

          <section className="mb-10 rounded-3xl border border-[#E9DFD0] bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-serif text-2xl">Add photos or videos</h2><p className="mt-2 text-sm text-[#6B6B64]">Photos: JPG, PNG, WebP up to 10 MB each. Videos: MP4 or WebM up to 100 MB each.</p>
            <form onSubmit={handleUpload} className="mt-6 grid gap-5 lg:grid-cols-[.8fr_.9fr_1.1fr_1.4fr_auto] lg:items-end">
              <label className="block text-sm font-medium">Where to add<select value={section} onChange={(event) => setSection(event.target.value as Section)} className="mt-2 w-full rounded-xl border border-[#D9D2C7] bg-white px-3 py-3 outline-none focus:border-[#53694D]"><option value="services">Service gallery</option><option value="portfolio">Portfolio</option></select></label>
              <label className="block text-sm font-medium">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-[#D9D2C7] bg-white px-3 py-3 outline-none focus:border-[#53694D]">{categories.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
              <label className="block text-sm font-medium">Description <span className="font-normal text-[#77786F]">(optional)</span><input value={altText} onChange={(event) => setAltText(event.target.value)} maxLength={140} placeholder="e.g. Walnut TV unit with concealed storage" className="mt-2 w-full rounded-xl border border-[#D9D2C7] px-3 py-3 outline-none focus:border-[#53694D]" /></label>
              <label className="block text-sm font-medium">Choose photos and videos<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" multiple onChange={(event) => setSelectedFiles(Array.from(event.target.files ?? []))} className="mt-2 block w-full rounded-xl border border-dashed border-[#C5A47E] bg-[#FAF7F1] p-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#E9DFD0] file:px-3 file:py-2 file:font-medium" /></label>
              <button type="submit" disabled={busy || selectedFiles.length === 0} className="rounded-xl bg-[#53694D] px-6 py-3 font-semibold text-white transition hover:bg-[#41553C] disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Uploading…' : `Upload ${selectedFiles.length || ''} files`}</button>
            </form>
            {selectedFiles.length > 0 && <p className="mt-3 text-xs text-[#6B6B64]">Selected {selectedFiles.length} file{selectedFiles.length === 1 ? '' : 's'} · uploading one at a time.</p>}{progress && <p role="status" className="mt-4 text-sm font-medium text-[#53694D]">{progress}</p>}{error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}{notice && <p role="status" className="mt-4 rounded-xl bg-[#EEF3EA] px-4 py-3 text-sm text-[#40543A]">{notice}</p>}
          </section>

          <section><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="font-serif text-2xl">Choose an image to remove</h2><p className="mt-1 text-sm text-[#6B6B64]">{visibleMedia.length} item{visibleMedia.length === 1 ? '' : 's'} in this view.</p></div>
              <select aria-label="Filter uploads" value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-[#D9D2C7] bg-white px-4 py-2.5 text-sm"><option value="all">All website media</option><option value="removed">Removed from website · Restore</option><option value="services">All service galleries</option>{SERVICES_DATA.map((item) => <option key={item.id} value={`services:${item.id}`}>Service: {item.title}</option>)}<option value="portfolio">Portfolio photos and videos</option><option value="inspiration">All existing inspiration photos</option>{PORTFOLIO_CATEGORIES.map((item) => <option key={item.id} value={`portfolio:${item.id}`}>Portfolio: {item.title}</option>)}</select>
            </div>
            {visibleMedia.length === 0 ? <div className="rounded-2xl border border-dashed border-[#D9D2C7] bg-white/60 px-6 py-14 text-center text-sm text-[#6B6B64]">No photos or videos appear in this view yet.</div> : <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{visibleMedia.map((item) => <article key={item.id} className={`overflow-hidden rounded-2xl border border-[#E9DFD0] bg-white shadow-sm ${item.removed ? 'opacity-55' : ''}`}><div className="relative aspect-[4/3] bg-[#EEE8DE]">{item.kind === 'video' ? <video src={item.src} controls playsInline preload="metadata" className="h-full w-full object-cover" aria-label={item.alt} /> : <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover" />}</div><div className="p-3"><p className="truncate text-sm font-medium">{filter.startsWith('services:') ? `Service: ${serviceTitles.get(filter.split(':')[1]) ?? 'Gallery'}` : item.section === 'services' ? 'Service' : item.section === 'portfolio' ? 'Portfolio' : 'Inspiration'} · {categoryTitle(item)}</p><p className="mt-1 truncate text-xs text-[#77786F]">{item.alt}</p><p className="mt-1 text-xs text-[#77786F]">{item.sourceType === 'site-image' ? 'Existing website photo' : `${item.kind === 'video' ? 'Video' : 'Photo'} · ${readableSize(item.size)}`}</p><button onClick={() => removeMedia(item)} className={`mt-3 text-xs font-semibold underline underline-offset-2 ${item.removed ? 'text-[#53694D]' : 'text-red-700'}`}>{item.removed ? 'Restore image' : item.sourceType === 'site-image' ? 'Remove from website' : `Delete ${item.kind}`}</button></div></article>)}</div>}
          </section>
        </>}
      </div>
    </main>
  );
}
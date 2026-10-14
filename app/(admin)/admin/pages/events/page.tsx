"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, Clock3, Edit3, ImagePlus, LoaderCircle, MapPin, MonitorPlay, Plus, Search, Trash2, X } from "lucide-react";
import axiosInstance from "@/app/lib/axios";
import { uploadImage } from "@/app/services/api";

type EventRecord = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  image: string;
  category: string;
  eventType: string;
  mode: string;
  startDate: string;
  startTime: string;
  endTime: string;
  location: string;
  isFeatured: boolean;
  isPublished: boolean;
};

type EventForm = {
  title: string; slug: string; summary: string; description: string; image: string; category: string;
  eventType: string; mode: string; startDate: string; endDate: string; startTime: string; endTime: string;
  timezone: string; location: string; registrationUrl: string; capacity: string; isFeatured: boolean; isPublished: boolean;
};

const emptyForm: EventForm = {
  title: "", slug: "", summary: "", description: "", image: "", category: "", eventType: "Workshop", mode: "Online",
  startDate: "", endDate: "", startTime: "", endTime: "", timezone: "Asia/Kolkata", location: "",
  registrationUrl: "", capacity: "", isFeatured: false, isPublished: true,
};

function localDateTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function displayDate(value?: string) {
  if (!value) return "Date not set";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date not set" : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EventRecord | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "9", includeDrafts: "1", time: "all" });
      if (search.trim()) params.set("search", search.trim());
      if (category) params.set("category", category);
      if (mode) params.set("mode", mode);
      if (status) params.set("status", status);
      const response = await axiosInstance.get(`/admin/events?${params.toString()}`);
      setEvents(response.data?.data || []);
      setCategories(response.data?.categories || []);
      setPagination(response.data?.pagination || { total: 0, totalPages: 1 });
    } catch (error) {
      console.error("Unable to load events", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, category, mode, status]);

  useEffect(() => { void fetchEvents(); }, [fetchEvents]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (event: EventRecord) => {
    setEditing(event);
    setForm({
      ...emptyForm,
      ...event,
      startDate: localDateTime(event.startDate),
      endDate: localDateTime((event as any).endDate),
      description: (event as any).description || "",
      timezone: (event as any).timezone || "Asia/Kolkata",
      registrationUrl: (event as any).registrationUrl || "",
      capacity: (event as any).capacity || "",
    });
    setModalOpen(true);
  };

  const update = (key: keyof EventForm, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const handleUpload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const result = await uploadImage(data);
      if (!result?.success || !result?.url) throw new Error(result?.error || "Image upload failed");
      update("image", result.url);
    } catch (error: any) {
      alert(error?.message || "Could not upload the image.");
    } finally {
      setUploading(false);
    }
  };

  const saveEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, slug: form.slug.trim(), startDate: new Date(form.startDate).toISOString(), endDate: form.endDate ? new Date(form.endDate).toISOString() : "" };
    try {
      if (editing) await axiosInstance.put(`/admin/events/${editing._id}`, payload);
      else await axiosInstance.post("/admin/events", payload);
      setModalOpen(false);
      await fetchEvents();
    } catch (error: any) {
      alert(error?.response?.data?.error || "Unable to save this event.");
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (event: EventRecord) => {
    if (!window.confirm(`Delete “${event.title}”? This cannot be undone.`)) return;
    try {
      await axiosInstance.delete(`/admin/events/${event._id}`);
      if (events.length === 1 && page > 1) setPage((current) => current - 1);
      else await fetchEvents();
    } catch (error: any) {
      alert(error?.response?.data?.error || "Unable to delete this event.");
    }
  };

  const inputClass = "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-[#F36D45] focus:ring-4 focus:ring-[#F36D45]/10";
  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#F36D45]">Learning calendar</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-[#071b38] sm:text-4xl">Study Events</h1><p className="mt-1 text-sm text-[#687b95]">Create and manage workshops, webinars, and student sessions.</p></div>
          <button onClick={openCreate} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#F36D45] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#df5b35]"><Plus size={18} /> Create event</button>
        </header>

        <section className="mb-5 rounded-2xl border border-[#e0e4e9] bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <label className="relative block"><span className="sr-only">Search events</span><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search events, category, location..." className={`${inputClass} mt-0 pl-10`} /></label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className={`${inputClass} mt-0`}><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={mode} onChange={(e) => { setMode(e.target.value); setPage(1); }} className={`${inputClass} mt-0`}><option value="">All formats</option><option>Online</option><option>In person</option><option>Hybrid</option></select>
            <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className={`${inputClass} mt-0`}><option value="">All status</option><option value="published">Published</option><option value="draft">Draft</option></select>
          </div>
        </section>

        <div className="mb-3 flex items-center justify-between text-sm text-slate-500"><span>{pagination.total} event{pagination.total === 1 ? "" : "s"}</span><span>Page {page} of {pagination.totalPages}</span></div>
        {loading ? <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500"><LoaderCircle className="mx-auto mb-3 animate-spin text-[#F36D45]" />Loading events…</div> : events.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {events.map((event) => (
              <article key={event._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-48 shrink-0 overflow-hidden bg-[#FFF0BE] sm:h-auto sm:w-56">
                    {event.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={event.image} alt={event.title} className="h-full w-full object-cover" /> : <div className="flex h-full min-h-40 items-center justify-center text-[#F36D45]"><CalendarDays size={42} /></div>}
                    {event.isFeatured && <span className="absolute left-3 top-3 rounded-full bg-[#F36D45] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Featured</span>}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#FFF0BE] px-2.5 py-1 text-xs font-bold text-[#79502D]">{event.category}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{event.eventType}</span><span className={`ml-auto rounded-full px-2.5 py-1 text-xs font-bold ${event.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{event.isPublished ? "Published" : "Draft"}</span></div>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-[#182438]">{event.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{event.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500"><span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{displayDate(event.startDate)}</span>{event.startTime && <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{event.startTime}</span>}<span className="inline-flex items-center gap-1.5"><MonitorPlay size={14} />{event.mode}</span>{event.location && <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{event.location}</span>}</div>
                    <div className="mt-auto flex justify-end gap-2 pt-5"><button onClick={() => openEdit(event)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#F36D45] hover:text-[#F36D45]"><Edit3 size={15} /> Edit</button><button onClick={() => void deleteEvent(event)} aria-label={`Delete ${event.title}`} className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center"><CalendarDays className="mx-auto text-[#F36D45]" size={38} /><h2 className="mt-4 text-lg font-bold text-slate-800">No events match these filters</h2><p className="mt-1 text-sm text-slate-500">Try another search or create your first study event.</p><button onClick={openCreate} className="mt-5 rounded-xl bg-[#F36D45] px-4 py-2.5 text-sm font-bold text-white">Create event</button></div>}

        {pagination.totalPages > 1 && <nav aria-label="Events pagination" className="mt-7 flex items-center justify-center gap-2"><button disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold disabled:opacity-40">Previous</button>{Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold ${page === number ? "bg-[#F36D45] text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{number}</button>)}<button disabled={page >= pagination.totalPages} onClick={() => setPage((value) => Math.min(pagination.totalPages, value + 1))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold disabled:opacity-40">Next</button></nav>}
      </div>

      {modalOpen && <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#152136]/55 p-3 backdrop-blur-sm sm:p-6"><section role="dialog" aria-modal="true" aria-labelledby="event-form-title" className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7"><div><h2 id="event-form-title" className="text-xl font-bold text-[#10233f]">{editing ? "Edit event" : "Create event"}</h2><p className="mt-0.5 text-sm text-slate-500">Add the details students need to join.</p></div><button type="button" onClick={() => setModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close"><X size={20} /></button></header>
        <form onSubmit={saveEvent} className="max-h-[calc(100vh-130px)] overflow-y-auto px-5 py-5 sm:px-7">
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <label className={labelClass}>Event title<input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="e.g. SAT strategy workshop" /></label>
            <label className={labelClass}>URL slug<input value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} placeholder="Auto-generated from title when empty" /></label>
            <label className={`${labelClass} sm:col-span-2`}>Short summary<textarea required rows={2} maxLength={300} value={form.summary} onChange={(e) => update("summary", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#F36D45] focus:ring-4 focus:ring-[#F36D45]/10" placeholder="A clear, student-friendly summary" /></label>
            <label className={`${labelClass} sm:col-span-2`}>Event details<textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-[#F36D45] focus:ring-4 focus:ring-[#F36D45]/10" placeholder="Agenda, takeaways, and who should attend" /></label>
            <label className={labelClass}>Category<input required value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass} placeholder="SAT, IELTS, Admissions…" /></label>
            <label className={labelClass}>Event type<select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className={inputClass}><option>Workshop</option><option>Webinar</option><option>Live class</option><option>Mock test</option><option>Info session</option><option>Open house</option></select></label>
            <label className={labelClass}>Format<select value={form.mode} onChange={(e) => update("mode", e.target.value)} className={inputClass}><option>Online</option><option>In person</option><option>Hybrid</option></select></label>
            <label className={labelClass}>Timezone<input value={form.timezone} onChange={(e) => update("timezone", e.target.value)} className={inputClass} placeholder="Asia/Kolkata" /></label>
            <label className={labelClass}>Starts<input required type="datetime-local" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Ends (optional)<input type="datetime-local" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} className={inputClass} /></label>
            <label className={labelClass}>Start time label<input value={form.startTime} onChange={(e) => update("startTime", e.target.value)} className={inputClass} placeholder="4:00 PM" /></label>
            <label className={labelClass}>End time label<input value={form.endTime} onChange={(e) => update("endTime", e.target.value)} className={inputClass} placeholder="5:30 PM" /></label>
            <label className={labelClass}>Venue / location<input value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} placeholder="Online or venue address" /></label>
            <label className={labelClass}>Seat availability<input value={form.capacity} onChange={(e) => update("capacity", e.target.value)} className={inputClass} placeholder="Limited seats" /></label>
            <label className={`${labelClass} sm:col-span-2`}>Registration URL<input value={form.registrationUrl} onChange={(e) => update("registrationUrl", e.target.value)} className={inputClass} placeholder="https://… or /contact" /></label>
            <div className="sm:col-span-2"><label className={labelClass}>Event cover image</label><div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center">{form.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={form.image} alt="Event preview" className="h-24 w-40 rounded-lg object-cover" />}<label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:border-[#F36D45]">{uploading ? <LoaderCircle size={16} className="animate-spin" /> : <ImagePlus size={17} />} {uploading ? "Uploading…" : "Upload image"}<input type="file" accept="image/*" className="sr-only" onChange={(e) => void handleUpload(e.target.files?.[0])} /></label><input value={form.image} onChange={(e) => update("image", e.target.value)} className={`${inputClass} mt-0 flex-1`} placeholder="Or paste an image URL" /></div></div>
            <div className="flex flex-wrap gap-5 border-t border-slate-100 pt-4 sm:col-span-2"><label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={form.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="h-4 w-4 accent-[#F36D45]" /> Publish event</label><label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="h-4 w-4 accent-[#F36D45]" /> Feature this event</label></div>
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button type="submit" disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-xl bg-[#F36D45] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{saving && <LoaderCircle size={16} className="animate-spin" />}{editing ? "Save changes" : "Create event"}</button></div>
        </form>
      </section></div>}
    </main>
  );
}

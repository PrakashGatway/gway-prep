"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ImagePlus, LoaderCircle, Plus, Trash2, X } from "lucide-react";
import axiosInstance from "@/app/lib/axios";

type BannerAction = "contact-page" | "popup-form" | "route" | "none";
type BannerDirection = "center" | "bottom-right" | "both";
type BannerRecord = {
  _id: string;
  image: string;
  slug: string;
  action: BannerAction;
  direction: BannerDirection;
  route: string;
  closeButton: boolean;
  isActive: boolean;
};
type BannerForm = Omit<BannerRecord, "_id">;

const emptyForm: BannerForm = {
  image: "",
  slug: "",
  action: "none",
  direction: "bottom-right",
  route: "",
  closeButton: true,
  isActive: true,
};

const actionLabels: Record<BannerAction, string> = {
  "contact-page": "Contact page",
  "popup-form": "Open popup form",
  route: "Custom route",
  none: "No action",
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BannerRecord | null>(null);
  const [form, setForm] = useState<BannerForm>(emptyForm);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/banners");
      setBanners(response.data?.data || []);
    } catch (error) {
      console.error("Unable to load banners", error);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchBanners(); }, [fetchBanners]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (banner: BannerRecord) => {
    setEditing(banner);
    setForm({
      image: banner.image || "",
      slug: banner.slug || "",
      action: banner.action || "none",
      direction: banner.direction || "bottom-right",
      route: banner.route || "",
      closeButton: banner.closeButton !== false,
      isActive: banner.isActive !== false,
    });
    setModalOpen(true);
  };

  const update = <K extends keyof BannerForm>(key: K, value: BannerForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const uploadBannerImage = async (file?: File) => {
    if (!file) return;
    if (file.type !== "image/webp" || !file.name.toLowerCase().endsWith(".webp")) {
      window.alert("Only WebP images are accepted.");
      return;
    }
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/admin/banners/upload", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok || !result?.success || !result?.url) {
        throw new Error(result?.error || "Image upload failed");
      }
      update("image", result.url);
    } catch (error: any) {
      window.alert(error?.message || "Could not upload the image.");
    } finally {
      setUploading(false);
    }
  };

  const saveBanner = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      slug: `/${form.slug.trim().replace(/^\/+|\/+$/g, "")}`,
      route: form.route.trim(),
    };
    try {
      if (editing) await axiosInstance.put(`/admin/banners/${editing._id}`, payload);
      else await axiosInstance.post("/admin/banners", payload);
      setModalOpen(false);
      await fetchBanners();
    } catch (error: any) {
      window.alert(error?.response?.data?.error || "Unable to save this banner.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBanner = async (banner: BannerRecord) => {
    if (!window.confirm(`Delete the banner for ${banner.slug}?`)) return;
    try {
      await axiosInstance.delete(`/admin/banners/${banner._id}`);
      await fetchBanners();
    } catch (error: any) {
      window.alert(error?.response?.data?.error || "Unable to delete this banner.");
    }
  };

  const inputClass = "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-[#F36D45] focus:ring-4 focus:ring-[#F36D45]/10";
  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[#F36D45]">Website promotion</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#071b38] sm:text-4xl">Page banners</h1>
            <p className="mt-1 text-sm text-[#687b95]">Show a WebP banner after a visitor has been on a matching page for 10 seconds.</p>
          </div>
          <button onClick={openCreate} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#F36D45] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#df5b35]"><Plus size={18} /> Create banner</button>
        </header>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500"><LoaderCircle className="mx-auto mb-3 animate-spin text-[#F36D45]" />Loading banners…</div>
        ) : banners.length ? (
          <div className="grid gap-4 md:grid-cols-4">
            {banners.map((banner) => (
              <article key={banner._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
               
<div className="flex h-32 w-full items-center justify-center overflow-hidden bg-slate-100">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src={banner.image}
    alt={`Banner for ${banner.slug}`}
    className="h-full w-full object-contain"
  />
</div>

                <div className="p-2">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="truncate font-bold text-[#182438]">{banner.slug}</h2>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${banner.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{banner.isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Action: {actionLabels[banner.action] || actionLabels.none}</p>
                  <p className="mt-1 text-xs text-slate-500">Display: {banner.direction === "center" ? "Centered" : banner.direction === "both" ? "Centered + bottom-right" : "Bottom-right notification"}</p>
                  {banner.action === "route" && <p className="mt-1 truncate text-sm text-slate-500">Route: {banner.route}</p>}
                  <div className="mt-4 flex justify-end gap-2">
                    <button onClick={() => openEdit(banner)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-[#F36D45] hover:text-[#F36D45]">Edit</button>
                    <button onClick={() => void deleteBanner(banner)} aria-label={`Delete banner for ${banner.slug}`} className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <ImagePlus className="mx-auto text-[#F36D45]" size={38} />
            <h2 className="mt-4 text-lg font-bold text-slate-800">No page banners yet</h2>
            <p className="mt-1 text-sm text-slate-500">Create a banner and choose which page path should display it.</p>
            <button onClick={openCreate} className="mt-5 rounded-xl bg-[#F36D45] px-4 py-2.5 text-sm font-bold text-white">Create banner</button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#152136]/55 p-3 backdrop-blur-sm sm:p-6">
          <section role="dialog" aria-modal="true" aria-labelledby="banner-form-title" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div><h2 id="banner-form-title" className="text-xl font-bold text-[#10233f]">{editing ? "Edit banner" : "Create banner"}</h2><p className="mt-0.5 text-sm text-slate-500">Configure the page, image, and click action.</p></div>
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close"><X size={20} /></button>
            </header>
            <form onSubmit={saveBanner} className="space-y-5 px-5 py-5 sm:px-7">
              <label className={labelClass}>Page slug / path<input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} placeholder="/contact or /events/my-event" /><span className="mt-1 block text-xs font-normal text-slate-500">Use the exact website path where this banner should appear.</span></label>

              <div>
                <label className={labelClass}>Banner image (WebP only)</label>
                <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {form.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={form.image} alt="Banner preview" className="h-28 w-full rounded-xl bg-slate-100 object-contain sm:w-48" />}
                  <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:border-[#F36D45]">
                    {uploading ? <LoaderCircle size={16} className="animate-spin" /> : <ImagePlus size={17} />}
                    {uploading ? "Uploading…" : form.image ? "Replace WebP image" : "Upload WebP image"}
                    <input required={!form.image} type="file" accept="image/webp,.webp" className="sr-only" onChange={(e) => void uploadBannerImage(e.target.files?.[0])} />
                  </label>
                  {form.image && <button type="button" onClick={() => update("image", "")} className="text-sm font-semibold text-red-600 hover:text-red-700">Remove image</button>}
                </div>
                <p className="mt-1 text-xs text-slate-500">Uploaded to Cloudinary. Maximum file size: 10 MB.</p>
              </div>

              <label className={labelClass}>Click action<select value={form.action} onChange={(e) => update("action", e.target.value as BannerAction)} className={inputClass}>
                <option value="contact-page">Contact page</option>
                <option value="popup-form">Open popup form</option>
                <option value="route">Custom route</option>
                <option value="none">No action</option>
              </select></label>
              <label className={labelClass}>Display direction<select value={form.direction} onChange={(e) => update("direction", e.target.value as BannerDirection)} className={inputClass}>
                <option value="center">Centered banner</option>
                <option value="bottom-right">Bottom-right notification</option>
                <option value="both">Show both</option>
              </select></label>
              {form.action === "route" && <label className={labelClass}>Route<input required value={form.route} onChange={(e) => update("route", e.target.value)} className={inputClass} placeholder="/courses or /contact" /></label>}

              <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-4">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={form.closeButton} onChange={(e) => update("closeButton", e.target.checked)} className="h-4 w-4 accent-[#F36D45]" /> Show close button</label>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={form.isActive} onChange={(e) => update("isActive", e.target.checked)} className="h-4 w-4 accent-[#F36D45]" /> Banner is active</label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button type="submit" disabled={saving || uploading || !form.image} className="inline-flex items-center gap-2 rounded-xl bg-[#F36D45] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{saving && <LoaderCircle size={16} className="animate-spin" />}{editing ? "Save changes" : "Create banner"}</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

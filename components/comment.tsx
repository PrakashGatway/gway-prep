import axiosInstance from "@/app/lib/axios";
import { GlobalProvider, useGlobal } from "@/hooks/AppStateContext";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className=" max-w-2xl ">
      {/* <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${dark ? "bg-orange-400/10 text-orange-300" : "bg-orange-50 text-orange-500"}`}>
        {eyebrow}
      </span> */}
      <h2
        className={`mt-3 text-2xl font-extrabold leading-tight sm:text-3xl ${dark ? "text-white" : "text-[#0b1e3f]"}`}
      >
        <span>{title.split("&")[0]}</span>
        {/* <span className="text-[#f36d45]">&{title.split("&")[1]}</span> */}
      </h2>
      {/* <EditorContent content_data={description} /> */}
      <p
        className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {/* {description}
      </p> */}
    </div>
  );
}

function QuestionsSection({
  page = "calculator",
  heading,
  css,
  user,
  slug,
}: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const route = useRouter();

  const approvedComments = comments?.filter(
    (comment) =>
      comment.status === "approved" &&
      comment.page === page &&
      comment.refrenceSlug === slug,
  );

  const storeUserDetails = () => {
    const userDetails = {
      name,
      email,
      phone,
    };

    localStorage.setItem("commentUser", JSON.stringify(userDetails));
    handleSubmit();
  };

  const visibleComments = isExpand
    ? approvedComments
    : approvedComments?.slice(0, 5);

  // const page = window.location.href;

  // Get comments
  const fetchComments = async () => {
    try {
      const data = await axiosInstance.get("/comments", { params: { page } });
      setComments(data?.data?.data || []);
    } catch (error) {
      console.error("Fetch comments error:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Add comment
  const handleSubmit = async (
    e?: React.FormEvent,
    savedUser?: {
      name: string;
      email: string;
      phone: string;
    },
  ) => {
    e?.preventDefault();

    if (!comment.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const userData = savedUser || {
        name,
        email,
        phone,
      };

      const data = await axiosInstance.post("/comments", {
        name: userData.name,
        email: userData.email,
        comment,
        page,
        Score,
        phone: userData.phone,
        status: "approved",
        refrenceSlug: slug || null,
      });

      toast.success("Comment Post Successfully");

      fetchComments();

      setName("");
      setEmail("");
      setComment("");
      setPhone("");
    } catch (error) {
      console.error("Post comment error:", error);
      alert("Failed to post comment");
    } finally {
      setLoading(false);
      setOpenForm(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("commentUser");

    if (savedUser) {
      const userDetails = JSON.parse(savedUser);
      console.log("User details from localStorage:", userDetails);

      // User already filled details before
      handleSubmit(undefined, {
        name: userDetails.name || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
      });

      return;
    }

    // New user → open details form
    setOpenForm(true);
  };

  return (
    <section className={css || "bg-[#fcf3ed] px-4 py-12"}>
      <div className=" max-w-7xl mx-auto bg-white rounded-2xl p-6 rounded-2xl">
        <SectionHeading
          eyebrow="COMMUNITY"
          title={heading || "Student Questions & Comments"}
          description="Have a question about your score? Ask our team and community."
        />

        {/* Comment Form */}
        {/* ================= COMMENT BOX ================= */}
        <form
          onSubmit={handleCommentSubmit}
          className="mt-6 bg-orange-50 p-6 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            {/* Current User Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-xs font-semibold text-[#F36C45]">
              {name
                ?.split(" ")
                .map((word: string) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "U"}
            </div>

            {/* Comment Input */}
            <div className="relative flex-1">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={3}
                className="
          w-full
          resize-none
          bg-white
          rounded-xl
          border
          border-slate-200
          bg-slate-50/50
          px-4
          py-3
          pr-14
          text-sm
          text-gray-700
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-200
          focus:border-[#F36C45]/50
          focus:bg-white
          focus:ring-2
          focus:ring-[#F36C45]/10
        "
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={loading || !comment.trim()}
                className="
          absolute
          bottom-3
          right-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-[#F36C45]
          text-white
          shadow-sm
          transition-all
          duration-200
          hover:bg-[#e55d37]
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
                aria-label="Post comment"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        {/* ================= COMMENTS ================= */}
        <div className="mt-7">
          {/* Header */}
          <div className="mb-5 flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">Comments</h3>

            <span className="text-xs text-gray-400">
              ({visibleComments?.length || 0})
            </span>
          </div>

          {/* Comments List */}
          {
            <div className="space-y-2">
              {visibleComments?.map((item: any) => {
                const formattedDate = new Date(
                  item.createdAt,
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={item._id}
                    className="flex w-full min-w-0 items-start gap-1 border border-orange-200 rounded-xl p-4 shadow-md shadow-orange-500/10"
                  >
                    {/* User Avatar */}
                    <div
                      className="
      flex h-9 w-9 shrink-0 items-center justify-center
      rounded-full bg-[#FFF1EC]
      text-xs font-semibold text-[#F36C45]
    "
                    >
                      {name
                        ?.split(" ")
                        .map((word: string) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "U"}
                    </div>

                    {/* Comment Content */}
                    <div className="min-w-0 flex-1">
                      {/* User + Date */}
                      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                        <h4 className="min-w-0 max-w-full truncate text-sm font-semibold text-gray-900">
                          {item?.name}
                        </h4>

                        <span className="shrink-0 text-[11px] text-gray-400">
                          {formattedDate}
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="mt-1 break-words text-sm leading-6 text-gray-600">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          }

          {/* Expand / Collapse */}
          {visibleComments?.length > 5 && (
            <button
              type="button"
              onClick={() => setIsExpand(!isExpand)}
              className="mt-4 text-sm font-semibold text-[#F36C45] hover:underline"
            >
              {isExpand ? "Show Less" : "Show All Comments"}
            </button>
          )}
        </div>
      </div>
      {openForm && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/10 px-4 py-6">
          <div className="relative flex max-h-[100vh] w-full max-w-xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rounded-full bg-[#f36d45]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[#f36d45]/10 blur-3xl" />

            {/* Close */}
            <button
              type="button"
              onClick={() => {
                setOpenForm(false);
              }}
              className="absolute right-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-gray-500 shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:bg-[#f36d45]/10 hover:text-[#f36d45]"
            >
              ×
            </button>

            {/* Scrollable Content */}
            <div className="relative overflow-y-auto scrollbar-hide">
              {/* ================= HEADER ================= */}
              <div className="px-7 pt-2  sm:px-9">
                {/* Logo */}
                <div className="mb-2 flex justify-center">
                  <img
                    src="/image/logo.png"
                    alt="OoshaS Prep"
                    className="h-14 w-auto object-contain sm:h-16"
                  />
                </div>

                <h2 className="text-[26px]  font-bold tracking-tight text-[#17213b] sm:text-xl">
                  Add Your <span className="text-[#f36d45]">Details</span>
                </h2>
              </div>

              {/* ================= FEATURED SERVICES ================= */}
              <div className="px-7 pt-3 sm:px-9">
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Live Classes */}
                  <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#f36d45]/30 hover:shadow-md">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f36d45] text-white shadow-sm shadow-[#f36d45]/20">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-[#17213b]">
                      Live Classes
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-gray-500">
                      Learn with expert instructors.
                    </p>
                  </div>

                  {/* 1 on 1 */}
                  <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#f36d45]/30 hover:shadow-md">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#17213b] text-white">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>

                    <h4 className="text-xs font-bold text-[#17213b]">
                      1-on-1 Mentoring
                    </h4>

                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-gray-500">
                      Personalized expert guidance.
                    </p>
                  </div>

                  {/* AI Tutor */}
                  <div className="group cursor-pointer rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50 to-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#f36d45]/30 hover:shadow-md">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f36d45] text-white shadow-sm shadow-[#f36d45]/20">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 3.75h4.5m-6.75 3h9m-10.5 3h12M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    <h4 className="text-xs font-bold text-[#17213b]">
                      AI Learning
                    </h4>

                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-gray-500">
                      Smart self-paced preparation.
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= FORM ================= */}
              <form className="relative space-y-3.5 px-7 pb-5 pt-4 sm:px-9">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#26334d]">
                    Full Name
                  </label>

                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#f36d45] focus:bg-white focus:ring-4 focus:ring-[#f36d45]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#26334d]">
                    Phone Number
                  </label>

                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    required
                    minLength={10}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="Enter your phone number"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#26334d]">
                    Email Address
                  </label>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#f36d45] focus:bg-white focus:ring-4 focus:ring-[#f36d45]/10"
                  />
                </div>

                {/* Continue */}
                <button
                  disabled={loading}
                  onClick={() => storeUserDetails()}
                  className="mt-2 h-12 w-full rounded-xl bg-[#f36d45] px-5 text-sm font-bold text-white shadow-lg shadow-[#f36d45]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e85f38] hover:shadow-xl hover:shadow-[#f36d45]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Continue"}
                </button>
              </form>

              {/* ================= LOGIN / SIGNUP ================= */}
              <div className="border-t border-gray-100 bg-gray-50/70 px-7 pb-2 sm:px-9">
                <p className=" text-center text-[11px] text-orange-500">
                  <span
                    className="cursor-pointer underline"
                    onClick={() => route.push("/auth")}
                  >
                    Login or Signup
                  </span>{" "}
                  <span className="text-gray-500">to save your progress.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default QuestionsSection;

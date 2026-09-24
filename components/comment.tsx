import axiosInstance from "@/app/lib/axios";
import { useGlobal } from "@/hooks/AppStateContext";
import { Send } from "lucide-react";
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
        {title}
      </h2>
      {/* <EditorContent content_data={description} /> */}
      <p
        className={`mt-3 text-xm leading-5 sm:text-sm ${dark ? "text-blue-100/60" : "text-slate-500"}`}
        dangerouslySetInnerHTML={{__html : description}}
      />
        {/* {description}
      </p> */}
    </div>
  );
}


function QuestionsSection({page = "calculator", heading, css }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const {userInfo,user} = useGlobal()

  // const page = window.location.href;
console.log(user)
  // Get comments
  const fetchComments = async () => {
    try {
      const data = await axiosInstance.get("/comments", { params: { page } });
      setComments( data?.data?.data || []);
    } catch (error) {
      console.error("Fetch comments error:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Add comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await axiosInstance.post('/comments',{
          name,
          email,
          comment,
          page,
          Score,
          status : true
      })
      toast.success("Comment Post Successfully")
      
    //   if (data?.data?.comment) {
    //     setComments((prev) => [data?.data?.comment, ...prev]);
    //   }

      fetchComments();
      setName("");
      setEmail("");
      setComment("");

    } catch (error) {
      console.error("Post comment error:", error);
      alert("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <section className={css || "bg-[#fcf3ed] px-4 py-12"}>
      <div className=" max-w-3xl">
        <SectionHeading
          eyebrow="COMMUNITY"
          title={heading || "Student Questions & Comments"}
          description="Have a question about your score? Ask our team and community."
        />

        {/* Comment Form */}
       {/* ================= COMMENT BOX ================= */}
<form
  onSubmit={handleSubmit}
  className="mt-6"
>
  <div className="flex items-start gap-3">
    {/* Current User Avatar */}
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFF1EC] text-xs font-semibold text-[#F36C45]">
      {user?.name
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
    <h3 className="text-base font-semibold text-gray-900">
      Comments
    </h3>

    <span className="text-xs text-gray-400">
      ({comments?.length || 0})
    </span>
  </div>

  {/* Comments List */}
  <div className="space-y-5">
    {comments?.map((item: any) => {
    
      const formattedDate = new Date(
        item.createdAt
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return (
        <div
          key={item._id}
          className="flex items-start gap-3"
        >
          {/* User Avatar */}
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#FFF1EC]
              text-xs
              font-semibold
              text-[#F36C45]
            "
          >
            {user?.name
        ?.split(" ")
        .map((word: string) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"}
          </div>

          {/* Comment Content */}
          <div className="min-w-0 flex-1">
            {/* User + Date */}
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-gray-900">
                {user?.name}
              </h4>

              <span className="text-[11px] text-gray-400">
                {formattedDate}
              </span>
            </div>

            {/* Comment */}
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {item.comment}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>

   
      </div>
    </section>
  );
}


export default QuestionsSection;
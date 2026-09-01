import axiosInstance from "@/app/lib/axios";
import { useEffect, useState } from "react";


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
    <div className="mx-auto max-w-2xl text-center">
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
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // const page = window.location.href;

  // Get comments
  const fetchComments = async () => {
    try {
      const data = await axiosInstance.get("/comments", { params: { page } });

        console.log(data?.data.data,"comments")
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

    if (!name.trim() || !email.trim() || !comment.trim()) {
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
          status : true
      })

      
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
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="COMMUNITY"
          title={heading || "Student Questions & Comments"}
          description="Have a question about your score? Ask our team and community."
        />

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-orange-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-orange-400"
            />
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            className="mt-3 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-orange-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 rounded-lg bg-[#0b1e3f] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {/* Comments */}
        <div className="mt-4 space-y-3">
          {comments.length > 0 ? (
            comments.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b1e3f] text-xs font-bold text-white">
                    {item.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {item.comment}
                    </p>

                    {item.createdAt && (
                      <p className="mt-2 text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-400">
              No comments yet. Be the first to ask a question.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


export default QuestionsSection;
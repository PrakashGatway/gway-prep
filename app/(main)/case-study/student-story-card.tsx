import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { getStudentCaseStudySlug } from "@/app/lib/studentCaseStudy";

const palette = ["#FFF4EF", "#FFF0BE", "#FFD7A7", "#FFB09D", "#FF907F", "#F36D45"];

function plainText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim();
}

type Props = { student: any; index?: number };

export default function StudentStoryCard({ student, index = 0 }: Props) {
  const hasCaseStudySlug =
    typeof student?.slug === "string" && student.slug.trim().length > 0;
  const slug = hasCaseStudySlug ? getStudentCaseStudySlug(student) : "";
  const accent = student?.colorCode || palette[index % palette.length];
  const excerpt = plainText(student?.message || student?.about || student?.outcome);
  const cardClassName = "group flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl border border-[#F0D8CC] shadow-[0_12px_30px_rgba(243,109,69,.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(243,109,69,.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F36D45]/25";

  const cardContent = (
      <div className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden rounded-xl bg-white text-[#292522]">
        <div className="relative flex-1 px-5 pb-12 pt-5 sm:px-6 sm:pt-6">
          <p className="line-clamp-5 pr-2 text-sm leading-6 text-[#727681] sm:text-[15px]">
            {excerpt || "A determined learner, a focused plan, and steady progress. Discover more about this student’s journey."}
          </p>
          <Quote size={31} aria-hidden="true" className="absolute bottom-4 right-5 fill-[#FFE2D8] text-[#FFE2D8]" />
        </div>
        <div className="relative min-h-[124px] bg-gradient-to-r from-[#F36D45] to-[#D95C39] px-4 pb-4 pt-10 text-center text-white">
          <div className="absolute left-1/2 top-0 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#FFF0BE] shadow-[0_5px_16px_rgba(243,109,69,.24)]">
            {student?.image ? (
              // Student photos are managed through the existing upload flow.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={student.image} alt={student.name || "Ooshas Prep student"} className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-3xl font-black text-white" style={{ backgroundColor: accent }}>
                {String(student?.name || "S").charAt(0)}
              </span>
            )}
          </div>
          <h3 className="truncate text-sm font-extrabold uppercase tracking-[.08em] sm:text-base">{student?.name || "Student success story"}</h3>
          <p className="mt-1 truncate text-[10px] font-semibold tracking-wide text-white/80 sm:text-xs">
            {student?.course || student?.university || "Ooshas Prep learner"}{student?.score ? ` · ${student.score}` : ""}
          </p>
          {hasCaseStudySlug && (
            <span className="mt-3 inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#292522] px-4 text-[11px] font-extrabold text-white shadow-md transition group-hover:bg-[#171717] group-hover:shadow-lg sm:text-xs">
              View Case Study <ArrowUpRight size={14} />
            </span>
          )}
        </div>
      </div>
  );

  return hasCaseStudySlug ? (
    <Link href={`/case-study/${slug}`} className={cardClassName}>
      {cardContent}
    </Link>
  ) : (
    <div className={cardClassName}>{cardContent}</div>
  );
}

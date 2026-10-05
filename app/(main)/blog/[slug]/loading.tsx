const Skeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#e8e6e4] ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.7s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
};

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">

      {/* ================================================= */}
      {/* ARTICLE PAGE */}
      {/* ================================================= */}

      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-10 sm:px-8 lg:px-10">

        {/* ================= BREADCRUMB ================= */}

        <div className="mb-7 flex items-center gap-3">
          <Skeleton className="h-4 w-14 rounded-md" />

          <span className="text-gray-300">/</span>

          <Skeleton className="h-4 w-14 rounded-md" />

          <span className="text-gray-300">/</span>

          <Skeleton className="h-4 w-20 rounded-md" />
        </div>


        {/* ================= MAIN GRID ================= */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_435px]">

          {/* ================================================= */}
          {/* LEFT ARTICLE */}
          {/* ================================================= */}

          <div className="min-w-0">

            {/* Hero Image */}

            <div className="overflow-hidden rounded-[20px]">
              <Skeleton className="h-[430px] w-full bg-[#dfe4e1] sm:h-[500px] lg:h-[525px]" />
            </div>


            {/* Article Heading */}

            <div className="mt-8">

              <Skeleton className="h-11 w-[92%] rounded-lg sm:h-12" />

              <Skeleton className="mt-3 h-11 w-[55%] rounded-lg sm:h-12" />

            </div>


            {/* Small article meta */}

            <div className="mt-5 flex items-center gap-4">

              <Skeleton className="h-8 w-8 rounded-full" />

              <Skeleton className="h-4 w-28 rounded-md" />

              <Skeleton className="h-4 w-24 rounded-md" />

            </div>


            {/* Article content */}

            <div className="mt-8 space-y-4">

              <Skeleton className="h-4 w-full rounded-md" />

              <Skeleton className="h-4 w-[96%] rounded-md" />

              <Skeleton className="h-4 w-[90%] rounded-md" />

              <Skeleton className="h-4 w-[75%] rounded-md" />

            </div>


            <div className="mt-8 space-y-4">

              <Skeleton className="h-7 w-[55%] rounded-lg" />

              <Skeleton className="h-4 w-full rounded-md" />

              <Skeleton className="h-4 w-[94%] rounded-md" />

              <Skeleton className="h-4 w-[84%] rounded-md" />

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT CONTACT FORM */}
          {/* ================================================= */}

          <aside className="lg:sticky lg:top-6">

            <div className="relative overflow-hidden rounded-[32px] border border-[#f36d45] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)]">

              {/* Top orange corner */}

              <div
                className="absolute right-0 top-0 h-[54px] w-[195px] bg-[#f36d45]"
                style={{
                  clipPath:
                    "polygon(14% 0,100% 0,100% 100%,0 100%)",
                }}
              />

              {/* Free counselling text skeleton */}

              <div className="absolute right-5 top-4 z-10">
                <Skeleton className="h-5 w-32 rounded-md bg-white/40" />
              </div>


              {/* Form Content */}

              <div className="relative px-6 pb-7 pt-7 sm:px-7">

                {/* Title */}

                <Skeleton className="h-7 w-40 rounded-lg bg-[#f7b79a]" />

                <Skeleton className="mt-3 h-5 w-[88%] rounded-md" />


                {/* Name */}

                <div className="mt-6">
                  <Skeleton className="mb-2 h-4 w-20 rounded-md" />

                  <div className="relative">
                    <Skeleton className="h-[50px] w-full rounded-xl border border-[#f7c8b7] bg-white" />

                    <Skeleton className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f7b79a]" />
                  </div>
                </div>


                {/* Mobile */}

                <div className="mt-4">
                  <Skeleton className="mb-2 h-4 w-28 rounded-md" />

                  <div className="relative">
                    <Skeleton className="h-[50px] w-full rounded-xl border border-[#f7c8b7] bg-white" />

                    <Skeleton className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f7b79a]" />
                  </div>
                </div>


                {/* Email */}

                <div className="mt-4">
                  <Skeleton className="mb-2 h-4 w-20 rounded-md" />

                  <div className="relative">
                    <Skeleton className="h-[50px] w-full rounded-xl border border-[#f7c8b7] bg-white" />

                    <Skeleton className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded bg-[#f7b79a]" />
                  </div>
                </div>


                {/* Interested */}

                <div className="mt-4">
                  <Skeleton className="mb-2 h-4 w-24 rounded-md" />

                  <Skeleton className="h-[50px] w-full rounded-xl border border-[#f7c8b7] bg-white" />
                </div>


                {/* City */}

                <div className="mt-4">
                  <Skeleton className="mb-2 h-4 w-20 rounded-md" />

                  <div className="relative">
                    <Skeleton className="h-[50px] w-full rounded-xl border border-[#f7c8b7] bg-white" />

                    <Skeleton className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f7b79a]" />
                  </div>
                </div>


                {/* Button */}

                <Skeleton className="mt-5 h-[48px] w-[215px] rounded-none bg-[#f7a88a]" />

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}
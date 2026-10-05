const Skeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#e7e5e2] ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.7s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
};

export default function Loading() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-white">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative min-h-[510px] overflow-hidden bg-[#fff7f1]">

        {/* Background decoration */}
        <div className="absolute -left-20 -top-32 h-[420px] w-[420px] rounded-full bg-[#f36d45]/5 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-[430px] w-[430px] rounded-full bg-[#f36d45]/5 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-[510px] max-w-[1300px] items-center px-6 py-16 sm:px-10 lg:px-8">

          <div className="grid w-full items-center gap-12 lg:grid-cols-2">

            {/* ================= LEFT ================= */}

            <div>

              {/* Heading */}
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-[52px] w-[285px] rounded-lg sm:h-[58px] sm:w-[330px]" />

                <Skeleton
                  className="h-[52px] w-[125px] rounded-lg bg-[#f7b79a] sm:h-[58px] sm:w-[145px]"
                />
              </div>

              {/* Description */}
              <div className="mt-6 space-y-3">
                <Skeleton className="h-5 w-[92%] max-w-[570px] rounded-md" />
                <Skeleton className="h-5 w-[82%] max-w-[520px] rounded-md" />
              </div>

              {/* Search */}
              <div className="mt-9 flex h-[58px] w-full max-w-[480px] items-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_25px_rgba(0,0,0,0.10)]">

                <Skeleton className="ml-5 h-4 flex-1 rounded-md" />

                <Skeleton className="mr-1.5 h-[50px] w-[62px] rounded-xl bg-[#f7b79a]" />

              </div>

            </div>


            {/* ================= RIGHT IMAGE ================= */}

            <div className="flex justify-center lg:justify-end">

              <div className="relative w-full max-w-[550px]">

                {/* Main illustration skeleton */}
                <Skeleton className="h-[300px] w-full rounded-3xl bg-[#f5d2c3] sm:h-[330px]" />

            
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================================================= */}
      {/* LATEST BLOGS */}
      {/* ================================================= */}

      <section className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10 lg:px-8">

        {/* Heading */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-[145px] rounded-lg sm:h-11 sm:w-[175px]" />

          <Skeleton
            className="h-10 w-[95px] rounded-lg bg-[#f7b79a] sm:h-11 sm:w-[110px]"
          />
        </div>


        {/* Categories */}
        <div className="mt-7 flex items-center gap-3 overflow-hidden">

          {/* Active category */}
          <Skeleton className="h-11 w-[135px] shrink-0 rounded-full bg-[#f7b79a]" />

          <Skeleton className="h-11 w-[95px] shrink-0 rounded-full" />

          <Skeleton className="h-11 w-[105px] shrink-0 rounded-full" />

          <Skeleton className="h-11 w-[95px] shrink-0 rounded-full" />

          <Skeleton className="h-11 w-[95px] shrink-0 rounded-full" />

          <Skeleton className="h-11 w-[105px] shrink-0 rounded-full" />

          <Skeleton className="h-11 w-[105px] shrink-0 rounded-full" />

          <Skeleton className="h-11 w-[100px] shrink-0 rounded-full" />

          {/* Arrow */}
          <Skeleton className="ml-auto h-10 w-10 shrink-0 rounded-full" />

        </div>


        {/* Blog cards skeleton */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >

              <Skeleton className="h-[210px] w-full rounded-none bg-[#f3e5de]" />

              <div className="p-5">

                <Skeleton className="h-3 w-20" />

                <Skeleton className="mt-4 h-6 w-[85%]" />

                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-[80%]" />

                <Skeleton className="mt-5 h-9 w-28 rounded-lg" />

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}
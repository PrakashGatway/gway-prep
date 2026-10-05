const Skeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#e9e7e4] ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[skeletonShimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
};

export default function Loading() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fffaf6]">

      {/* ================= BACKGROUND SHAPES ================= */}

      {/* Left top large shape */}
      <div
        className="absolute left-0 top-0 h-[55vh] w-[22vw] min-w-[220px] bg-gradient-to-br from-[#ff9b5c]/60 via-[#ffd0b1]/50 to-transparent"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 58% 45%, 100% 100%, 0 100%)",
        }}
      />

      {/* Left top inner shape */}
      <div
        className="absolute left-[8vw] top-0 h-[25vh] w-[24vw] min-w-[250px] bg-gradient-to-br from-[#ffd7bd]/70 to-transparent"
        style={{
          clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)",
        }}
      />

      {/* Right top shape */}
      <div
        className="absolute right-0 top-0 h-[12vh] w-[15vw] min-w-[150px] bg-gradient-to-bl from-[#ffb27d]/40 to-transparent"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 25% 100%, 0 0)",
        }}
      />

      {/* Right bottom shape */}
      <div
        className="absolute bottom-0 right-0 h-[27vh] w-[42vw] bg-gradient-to-tl from-[#ff9b5c]/45 via-[#ffd0b1]/30 to-transparent"
        style={{
          clipPath: "polygon(100% 100%, 100% 0, 45% 0, 0 100%)",
        }}
      />

      {/* Bottom left shape */}
      <div
        className="absolute bottom-0 left-0 h-[35px] w-[180px] bg-[#ffd8c2]/60"
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
        }}
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 w-full px-5 sm:px-8">

        <div className="mx-auto w-full max-w-[1250px] text-center">

          {/* ================= HEADING ================= */}

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">

            {/* Dark heading */}
            <Skeleton className="h-[48px] w-[360px] rounded-lg sm:h-[55px] sm:w-[420px] lg:h-[58px] lg:w-[450px]" />

            {/* Orange heading */}
            <Skeleton
              className="h-[48px] w-[430px] rounded-lg bg-[#f7b79a] sm:h-[55px] sm:w-[520px] lg:h-[58px] lg:w-[580px]"
            />

          </div>

          {/* ================= SECOND LINE ================= */}

          <div className="mt-2 flex justify-center">
            <Skeleton
              className="h-[48px] w-[170px] rounded-lg bg-[#f7b79a] sm:h-[54px] sm:w-[200px] lg:h-[58px] lg:w-[220px]"
            />
          </div>


          {/* ================= DESCRIPTION ================= */}

          <div className="mx-auto mt-7 w-full max-w-[1200px] space-y-3">

            <Skeleton className="mx-auto h-5 w-[92%] rounded-md sm:h-6" />

            <Skeleton className="mx-auto h-5 w-[78%] rounded-md sm:h-6" />

          </div>

        </div>

      </div>

    </section>
  );
}
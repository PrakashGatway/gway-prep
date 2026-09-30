// components/HomeCountUp.tsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

interface HomeCountUpProps {
  data: {
    fields?: {
      experience?: string;
      Happystudent?: string;
      Rating?: string;
      Lectured?: string;
      [key: string]: string | undefined;
    };
  };
  className?: string;
  items?: Array<{
    key: string;
    label?: string;
    value?: number;
    suffix?: string;
  }>;
}

export const HomeCountUp: React.FC<HomeCountUpProps> = ({
  data,
  className = "",
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [counterKey, setCounterKey] = useState(0);

  /*
   * Detect when stats section enters viewport
   */
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.2,
  });

  /*
   * Start / stop counter animation
   */
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  /*
   * Restart CountUp whenever section becomes visible
   */
  useEffect(() => {
    if (isVisible) {
      setCounterKey((prev) => prev + 1);
    }
  }, [isVisible]);

  /*
   * -----------------------------------------
   * GET STATS FROM API RESPONSE
   * -----------------------------------------
   *
   * data.fields:
   *
   * Happystudent: "Happy Students ||50,000+"
   * Lectured: "Total Hours Lectured ||25,000+"
   * Rating: "Overall Rating ||5"
   * experience: "Years of Experience ||16+"
   */

  const defaultStats = [
    { key: "experience" },
    { key: "Happystudent" },
    { key: "Rating" },
    { key: "Lectured" },
  ];

  /*
   * If custom items are passed, use them.
   * Otherwise use stats from API response.
   */
  const countItems = items?.length ? items : defaultStats;

  /*
   * -----------------------------------------
   * PARSE API STAT DATA
   * -----------------------------------------
   */
  const getItemData = (item: {
    key: string;
    label?: string;
    value?: number;
    suffix?: string;
  }) => {
    /*
     * If custom items are provided
     */
    if (items?.length) {
      return {
        label: item.label || item.key,
        value: item.value || 0,
        suffix:
          item.suffix ||
          (item.key === "Rating" ? "/5" : "+"),
      };
    }

    /*
     * Get value from API
     */
    const rawValue = data?.fields?.[item.key] || "";

    /*
     * Example:
     *
     * "Happy Students ||50,000+"
     *
     * becomes:
     *
     * ["Happy Students ", "50,000+"]
     */
    const parts = rawValue.split("||");

    const label = parts[0]?.trim() || item.key;

    /*
     * Remove commas, +, %, etc.
     *
     * "50,000+" -> "50000"
     * "25,000+" -> "25000"
     * "16+"     -> "16"
     * "5"       -> "5"
     */
    const numericValue = Number(
      parts[1]?.replace(/[^\d.]/g, "") || 0
    );

    return {
      label,
      value: numericValue,
      suffix: item.key === "Rating" ? "/5" : "+",
    };
  };

  console.log("HomeCountUp data:", data);

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        ref={containerRef}
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
        className="
          mx-4
          grid
          grid-cols-2
          justify-center
          gap-6
          rounded-[20px]
          bg-white
          p-4
          shadow-sm
          md:mx-0
          md:gap-16
          md:rounded-[26px]
          md:p-6
          lg:grid-cols-4
        "
      >
        {countItems.map((item, idx) => {
          const {
            label,
            value,
            suffix,
          } = getItemData(item);

          return (
            <div
              key={`${item.key}-${idx}`}
              className="
                relative
                w-full
                sm:w-[15rem]
                md:min-w-[18rem]
              "
            >
              <div className="relative text-center">
                {/* Number */}
                <p
                  className="
                    mb-1
                    text-2xl
                    font-bold
                    text-[#F36C45]
                    sm:text-3xl
                    md:mb-2
                    md:text-4xl
                  "
                >
                  {isVisible ? (
                    <CountUp
                      key={`${item.key}-${counterKey}`}
                      end={value}
                      duration={1.5}
                      startOnMount={true}
                      delay={0.1 * idx}
                      preserveValue={false}
                      separator=","
                    />
                  ) : (
                    <span>0</span>
                  )}

                  {suffix}
                </p>

                {/* Label */}
                <p
                  className="
                    text-sm
                    capitalize
                    text-gray-600
                    sm:text-base
                    md:text-xl
                  "
                >
                  {label}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
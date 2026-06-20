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
  items 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counterKey, setCounterKey] = useState(0);

  // Track if container is in view
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.2 
  });

  // Control animation state
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

  // Force re-render when visibility changes
  useEffect(() => {
    if (isVisible) {
      setCounterKey(prev => prev + 1);
    }
  }, [isVisible]);

  // Default items if not provided
  const defaultItems = [
    { key: 'experience' },
    { key: 'Happystudent' },
    { key: 'Rating' },
    { key: 'Lectured' }
  ];

  const countItems = items || defaultItems;

  // Helper function to get value from data
  const getItemData = (key: string) => {
    if (items) {
      // If custom items are provided, use their values directly
      const item = items.find(item => item.key === key);
      return {
        label: item?.label || key,
        value: item?.value || 0,
        suffix: item?.suffix || (key === "Rating" ? '/5' : '+')
      };
    } else {
      // Use data from props
      const rawValue = data?.fields?.[key] || "";
      const parts = rawValue.split("||");
      return {
        label: parts[0] || key,
        value: parseInt(parts[1]) || 0,
        suffix: key === "Rating" ? '/5' : '+'
      };
    }
  };

  return (
    <div className={className}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center  mx-4 md:mx-16 gap-6 md:gap-16"
      >
        {countItems.map((item, idx) => {
          const { label, value, suffix } = getItemData(item.key);
          
          return (
            <div key={idx} className="relative w-full sm:w-[15rem] md:min-w-[18rem]">
              {/* <div className="absolute w-full h-full border-2 border-[#F36C45] rounded-[20px] md:rounded-[26px] -rotate-3 md:-rotate-5" /> */}
              <div className="bg-white p-4 md:p-6 rounded-[20px] md:rounded-[26px] text-center shadow-sm relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F36C45] mb-1 md:mb-2">
                  {isVisible ? (
                    <CountUp 
                      key={`${item.key}-${counterKey}`}
                      end={value} 
                      duration={1.5}
                      startOnMount={true}
                      delay={0.1 * idx}
                      preserveValue={false}
                    />
                  ) : (
                    <span>0</span>
                  )}
                  {suffix}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-xl capitalize">
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
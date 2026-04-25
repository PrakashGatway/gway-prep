// "use client"

// import * as React from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { ChevronDown, Menu, X, GraduationCap, BookOpen, MessageSquare, Target, FileText, Briefcase, Phone, Headset, HeadsetIcon } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"


// export function Navbar({Data}: any) {

// const navItems = [
//   { name: "Home", href: "/" },
//   { 
//     name: "About Us", 
//     href: "/about", 
//     icon: GraduationCap,
   
//   },
//   { 
//     name: "Services", 
//     href: "#", 
//     hasDropdown: false,
//     icon: MessageSquare,
 
//   },
//   { 
//     name: "Test Prep", 
//     href: "#", 
//     hasDropdown: true,
//     icon: Target,
//     dropdownItems:
//     [
//       { name: "IELTS Preparation", slug: "ielts", description: "Comprehensive IELTS coaching" },
//       { name: "GMAT Preparation", slug: "gmat", description: "Score high in GMAT" },
//       { name: "PTE Academic", slug: "pte", description: "Pearson Test of English" },
//       { name: "GRE Preparation", slug: "gre" , description: "Regular practice tests and mock exams" }
//     ]
//   },
//   { 
//     name: "Blogs", 
//     href: "/blog", 
//     hasDropdown: false,
//     icon: FileText,
   
//   },
//   { 
//     name: "Career", 
//     href: "/career", 
//     hasDropdown: false,
//     icon: Briefcase,
//     dropdownItems: [
//       { name: "Job Opportunities", href: "#jobs", description: "Join our team" },
//       { name: "Internships", href: "#internships", description: "Gain practical experience" },
//       { name: "Teacher Training", href: "#training", description: "Become an instructor" },
//       { name: "Career Guidance", href: "#guidance", description: "Plan your future" }
//     ]
//   },
//   { 
//     name: "Contact Us", 
//     href: "/contact",
//     icon: Phone
//   },
// ]
//   const [isOpen, setIsOpen] = React.useState(false)
//   const [scrolled, setScrolled] = React.useState(false)
//   const [hoveredDropdown, setHoveredDropdown] = React.useState<string | null>(null)

//   React.useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <nav className={`sticky top-0 z-1000  transition-all duration-300  ${
//       scrolled ? "shadow py-2 backdrop-blur-[10px] bg-white/45 w-full opacity-100 will-change-auto" : "py-2 bg-white"
//     }`}>
//       {/* ===== Container ===== */}
//       <div className="max-w-7xl px-4 mx-auto">
//         <div className={`flex items-center justify-between transition-all duration-300 ${
//           scrolled ? "h-14" : "h-16"
//         }`}>

//           {/* Logo with scaling effect */}
//           <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
//             <Image
//               src="/image/logo.png"
//               alt="Gaway Prep"
//               width={scrolled ? 160 : 160}
//               height={scrolled ? 40 : 50}
//               className="h-auto object-contain transition-all duration-300 p-4"
//               priority
//             />
//           </Link>

//           {/* ===== Desktop Nav ===== */}
//           <div className="hidden lg:flex items-center  gap-2">
//             {navItems.map((item) => (
//               <div 
//                 key={item.name} 
//                 className="relative group"
//                 onMouseEnter={() => setHoveredDropdown(item.name)}
//                 onMouseLeave={() => setHoveredDropdown(null)}
//               >
//                 <Link
//                   href={item.href}
//                   className="flex items-center gap-2 text-sm font-medium  text-gray-800 cursor-pointer
//                   hover:text-[#F36C45] transition-all duration-200 px-3 py-2 rounded-lg "
//                 >
//                   {/* {item.icon && <item.icon size={16} />} */}
//                   <span>{item.name}</span>
//                   {item.hasDropdown && (
//                     <motion.div
//                       animate={{ rotate: hoveredDropdown === item.name ? 180 : 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <ChevronDown size={14} className="mt-[2px]" />
//                     </motion.div>
//                   )}
//                 </Link>

//                 {/* Enhanced Dropdown */}
//                 {item.hasDropdown && (
//                   <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                     <motion.div 
//                       initial={{ y: -10, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ duration: 0.2 }}
//                       className="w-64 rounded-xl bg-white border border-gray-100 shadow-2xl py-4 overflow-hidden"
//                     >
//                       {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#F36C45]" /> */}
                      
//                       {item.dropdownItems?.map((dropdownItem, index) => (
//                         <motion.div
//                           key={dropdownItem.name}
//                           initial={{ x: -20, opacity: 0 }}
//                           animate={{ x: 0, opacity: 1 }}
//                           transition={{ delay: index * 0.05 }}
//                         >
//                           <Link
//                           key={dropdownItem.slug}
//                             href={`/preparation/${dropdownItem.slug}`}
//                             className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 group/item transition-all duration-200 border-l-2 border-transparent hover:border-orange-400"
//                           >
//                             <div className="font-semibold text-gray-800 group-hover/item:text-orange-600 transition-colors">
//                               {dropdownItem.name}
//                             </div>
//                             <div className="text-xs text-gray-500 mt-1 group-hover/item:text-gray-600">
//                               {dropdownItem.description}
//                             </div>
//                           </Link>
//                         </motion.div>
//                       ))}
                      
                    
//                     </motion.div>
//                   </div>
//                 )}
//               </div>
//             ))}


//           </div>

//             <div className="hidden lg:flex items-center gap-2">
              
//           <button
//             className=" text-gray-700 px-4 py-2 rounded-lg hover:text-[#F36C45] text-sm transition-colors flex items-center gap-2"
//           >
//             <HeadsetIcon size={24} /> +91 9887120429
//           </button>

//            <button
//             className="cursor-pointer text-gray-700 hover:bg-orange-100 hover:text-[#F36C45] transition-colors border-2 rounded-lg px-4 py-2 border-[#F36C45]"
//             onClick={() => setIsOpen(true)}
//           >
//             Login/Signup
//           </button>

//             </div>            

//           {/* ===== Mobile Menu Button ===== */}
//           <button
//             className="lg:hidden text-gray-700 hover:text-[#F36C45] transition-colors"
//             onClick={() => setIsOpen(true)}
//           >
//             <Menu size={28} />
//           </button>
//         </div>
//       </div>

//       {/* ===== Mobile Drawer ===== */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
//             />

//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] p-6 shadow-2xl"
//             >
//               {/* Mobile Header */}
//               <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-200">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-orange-100 rounded-lg">
//                     <GraduationCap size={24} className="text-[#F36C45]" />
//                   </div>
//                   <div>
//                     <Image
//                       src="/images/gaway-20prep-20final-202.jpg"
//                       alt="Gaway Prep"
//                       width={100}
//                       height={35}
//                       className="h-8 w-auto object-contain"
//                     />
//                     <div className="text-xs text-gray-500">Educational Excellence</div>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Mobile Navigation */}
//               <div className="flex flex-col gap-2">
//                 {navItems.map((item) => (
//                   <div key={item.name} className="border-b border-gray-100 last:border-0">
//                     <Link
//                       href={item.href}
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center justify-between py-4 text-lg font-semibold text-gray-800 hover:text-[#F36C45] transition-colors"
//                     >
//                       <div className="flex items-center gap-3">
//                         {item.icon && <item.icon size={18} />}
//                         <span>{item.name}</span>
//                       </div>
//                       {item.hasDropdown && <ChevronDown size={16} />}
//                     </Link>
                    
//                     {/* Mobile Dropdown */}
//                     {item.hasDropdown && item.dropdownItems && (
//                       <motion.div 
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="overflow-hidden pl-8"
//                       >
//                         {item.dropdownItems.map((dropdownItem) => (
//                           <Link
//                             key={dropdownItem.name}
//                             href={"/preparation/" + dropdownItem.slug}
//                             onClick={() => setIsOpen(false)}
//                             className="block py-3 text-gray-600 hover:text-[#F36C45] border-l-2 border-gray-200 hover:border-orange-400 pl-4"
//                           >
//                             <div className="font-medium">{dropdownItem.name}</div>
//                             <div className="text-sm text-gray-400">{dropdownItem.description}</div>
//                           </Link>
//                         ))}
//                       </motion.div>
//                     )}
//                   </div>
//                 ))}
//               </div>

                

//           <button
//             className=" text-gray-700 hover:text-[#F36C45] transition-colors flex gap-2"
//             onClick={() => setIsOpen(true)}
//           >
//             <HeadsetIcon size={28} /> +91 9887120429
//           </button>

//            <button
//             className=" text-gray-700 hover:bg- transition-colors border-2 rounded-lg px-4 py-2 border-[#F36C45]"
//             onClick={() => setIsOpen(true)}
//           >
//             Login/Signup
//           </button>

//               {/* Mobile CTA */}
//               <div className="mt-10 pt-6 border-t border-gray-200">
//                 <button className="w-full py-3.5 bg-gradient-to-r from-[#F36C45] to-orange-600 text-white font-semibold rounded-lg shadow-lg">
//                   Start Free Trial
//                 </button>
//                 <div className="text-center text-xs text-gray-500 mt-3">
//                   No credit card required
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//   )
// }







"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  MessageSquare,
  Target,
  FileText,
  Briefcase,
  Phone,
  HeadsetIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar({ Data }: any) {
  const NAVDATA =
    Data?.filter(
      (item: any) =>
        item?.seoMeta?.template?.toLowerCase() === "preparation"
    ) || []

  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    {
      name: "Test Prep",
      href: "#",
      hasDropdown: true,
      dropdownItems: NAVDATA.map((item: any) => ({
        name: item.seoMeta.title,
        slug: item.seoMeta.canonicalUrl,
        description: item.seoMeta.description,
      })),
    },
    { name: "Blogs", href: "/blog" },
    { name: "Career", href: "/career" },
    { name: "Contact Us", href: "/contact" },
  ]

  React.useEffect(() => {
    scrolled && setIsOpen(false);
  },[scrolled]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300  ${
        scrolled
          ? "bg-white/60 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/image/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="w-auto h-10 sm:h-12"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#F36C45] transition"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={16} />}
                </Link>

                {/* {item.hasDropdown && (
                  <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-3">
                    <div className="w-72 rounded-xl bg-white shadow-xl border border-gray-100 py-2">
                      {item.dropdownItems?.map((subItem: any) => (
                        <Link
                          key={subItem.slug}
                          href={`/preparation/${subItem.slug}`}
                          className="block px-4 py-3 hover:bg-orange-50 transition"
                        >
                          <div className="font-medium text-gray-800">
                            {subItem.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {subItem.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )} */}

                 {item.hasDropdown && (
                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <motion.div 
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-64 rounded-xl bg-white border border-gray-100 shadow-2xl py-4 overflow-hidden"
                    >
                      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#F36C45]" /> */}
                      
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <motion.div
                          key={dropdownItem.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                          key={dropdownItem.slug}
                            href={`/preparation/${dropdownItem.slug}`}
                            className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 group/item transition-all duration-200 border-l-2 border-transparent hover:border-orange-400"
                          >
                            <div className="font-semibold text-gray-800 group-hover/item:text-orange-600 transition-colors">
                              {dropdownItem.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 group-hover/item:text-gray-600">
                              {dropdownItem.description}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                      
                    
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#F36C45]">
              <HeadsetIcon size={18} />
              +91 9887120429
            </button>

            <button className="border border-[#F36C45] text-[#F36C45] px-4 py-2 rounded-lg hover:bg-orange-50 transition">
              Login / Signup
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-white z-50 shadow-xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src="/image/logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                  <button onClick={() => setIsOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-3">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.name
                              ? null
                              : item.name
                          )
                        }
                        className="w-full flex justify-between items-center py-3 text-left font-medium"
                      >
                        <span>{item.name}</span>
                        {item.hasDropdown && <ChevronDown size={16} />}
                      </button>

                      {item.hasDropdown &&
                        mobileDropdown === item.name && (
                          <div className="pl-4 pb-3 space-y-2">
                            {item.dropdownItems?.map((subItem: any) => (
                              <Link
                                key={subItem.slug}
                                href={`/preparation/${subItem.slug}`}
                                className="block text-sm text-gray-600"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <button className="w-full border border-[#F36C45] text-[#F36C45] py-3 rounded-lg">
                    Login / Signup
                  </button>

                  <button className="w-full bg-[#F36C45] text-white py-3 rounded-lg">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}



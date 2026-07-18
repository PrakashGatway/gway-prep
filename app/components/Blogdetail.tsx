// app/blog/[id]/page.tsx
"use client"

import { Calendar, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";

// Types
interface BlogData {
  _id?: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedDate: string;
  excerpt?: string;
  slug?: string;
  tags?: string[];
}

interface BlogDetailPageProps {
  blog: {
    data: BlogData;
  } | null;
  loading: boolean;
  res: BlogData[];
}

// Lead Form Component
const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    interest: '',
    city: '',
    consent: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API call to submit lead
      // await submitLead(formData);
      console.log('Lead form submitted:', formData);
      
      // Show success message
      alert('Thank you! We will contact you shortly.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
      <h3 className="text-center text-lg md:text-xl font-semibold mb-6 text-neutral-900">
        Speak to an Expert
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
        />
        <div className="flex">
          <div className="w-20 md:w-24 border border-neutral-300 rounded-l-lg flex items-center justify-center gap-1 md:gap-2 bg-neutral-50 text-sm text-neutral-700">
            🇮🇳 +91
          </div>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="flex-1 border border-l-0 border-neutral-300 rounded-r-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Id"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
        />
        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          required
          className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] bg-white text-sm text-neutral-600 transition-colors appearance-none"
        >
          <option value="">Interested in?</option>
          <option value="GRE">GRE</option>
          <option value="IELTS">IELTS</option>
          <option value="GMAT">GMAT</option>
          <option value="TOEFL">TOEFL</option>
        </select>
        <input
          type="text"
          name="city"
          placeholder="City Name"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 md:py-3 outline-none focus:border-[#F86C43] focus:ring-1 focus:ring-[#F86C43] text-sm transition-colors"
        />
        <label className="flex items-start gap-2 text-xs text-neutral-500 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="accent-[#F86C43] mt-0.5"
          />
          <span>Stay informed via SMS & WhatsApp</span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#F86C43] hover:bg-[#e55a2f] active:bg-[#d14d24] transition-all text-white font-semibold py-2.5 md:py-3 rounded-lg text-sm md:text-base shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Schedule a Call'}
        </button>
      </form>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ post, onClick }: { post: BlogData; onClick: () => void }) => (
  <article 
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative mb-3 h-40 w-full overflow-hidden rounded-md">
      <span className="absolute left-2 top-2 z-10 rounded bg-[#F0642C] px-2 py-0.5 text-[10px] font-semibold text-white">
        {post.category || "Blog"}
      </span>
      <Image
        src={post.image || "/placeholder-blog.jpg"}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#1f2430] group-hover:text-[#F0642C]">
      {post.title}
    </h3>
    <p className="mb-3 text-[13px] leading-relaxed text-gray-500">{post.excerpt}</p>
    <div className="flex items-center gap-4 text-[11px] text-gray-400">
      <span className="flex items-center gap-1">
        <Calendar size={11} /> 
        {post.publishedDate?.split('T')[0] || "2026-07-07"}
      </span>
    </div>
  </article>
);

// Table of Contents Component
const TableOfContents = ({ headings, activeHeading, open }: { headings: string[], activeHeading: string , open ?: any}) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHeadingClick = (heading: string) => {
    const element = document.getElementById(`heading-${heading}`);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <Menu size={20} className="text-[#F86C43]" />
          Table of Contents
        </h3>
        <span className="text-[#F86C43] text-sm">
          {isOpen ? '▼' : '▶'}
        </span>
      </div>

      <div className={`mt-4 space-y-2 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => handleHeadingClick(heading)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-neutral-50 hover:text-[#F86C43] ${
              activeHeading === heading 
                ? 'bg-[#F86C43]/10 text-[#F86C43] font-medium border-l-2 border-[#F86C43]' 
                : 'text-neutral-600'
            }`}
          >
            {heading}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function BlogDetailPage({ blog, loading, res }: BlogDetailPageProps) {
  const router = useRouter();
  const [headings, setHeadings] = useState<string[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings from content and add IDs
  useEffect(() => {
    if (blog?.data?.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = blog.data.content;
      
      // Find all h2 tags and extract text
      const h2Elements = tempDiv.querySelectorAll('h2');
      const headingTexts: string[] = [];
      
      h2Elements.forEach((h2, index) => {
        const text = h2.textContent?.trim() || `Section ${index + 1}`;
        headingTexts.push(text);
        
        // Add ID to h2 for scrolling
        const id = `heading-${text}`;
        h2.id = id;
      });
      
      setHeadings(headingTexts);
      
      // Update content with new IDs
      if (contentRef.current) {
        contentRef.current.innerHTML = tempDiv.innerHTML;
      }
    }
  }, [blog]);

  // Intersection Observer for active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const heading = id.replace('heading-', '');
            setActiveHeading(heading);
          }
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0.1
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(`heading-${heading}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F86C43]"></div>
      </div>
    );
  }

  // Not found state
  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h2 className="text-2xl font-semibold text-neutral-700">Blog not found</h2>
        <button 
          onClick={() => router.push('/blog')}
          className="text-[#F86C43] hover:underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const data = blog.data;

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-6">
          <span 
            className="hover:text-[#F86C43] cursor-pointer transition-colors" 
            onClick={() => router.push('/')}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span 
            className="hover:text-[#F86C43] cursor-pointer transition-colors" 
            onClick={() => router.push('/blog')}
          >
            Blog
          </span>
          <span className="mx-2">/</span>
          <span className="text-neutral-800 font-medium">{data.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Blog Content */}
          <div className="lg:col-span-8">
            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-108 rounded-2xl overflow-hidden mb-8 shadow-sm">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Title & Meta */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
                  {data.author?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <span className="font-medium text-neutral-700">{data.author || "Anonymous"}</span>
              </div>
              <span>•</span>
              <span>
                {data.publishedDate 
                  ? new Date(data.publishedDate).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })
                  : "Date not available"
                }
              </span>
            </div>

            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <div className="mb-8 ">
                <TableOfContents headings={headings} activeHeading={activeHeading}  open={true}/>
              </div>
            )}

            {/* Blog Content */}
            <article
              ref={contentRef}
              className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
            />

            {/* Related Posts Section */}
            {res && res.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {res.map((post) => (
                    <BlogCard 
                      key={post._id} 
                      post={post} 
                      onClick={() => router.push(`/blog/${post.slug}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-34 space-y-6">
              {/* Table of Contents - Desktop */}
              {headings.length > 0 && (
                <div className="hidden lg:block">
                  <TableOfContents headings={headings} activeHeading={activeHeading} />
                </div>
              )}
              
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
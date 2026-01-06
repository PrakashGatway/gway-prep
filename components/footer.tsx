import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-1">
            <Image
              src="/images/gaway-20prep-20final-202.jpg"
              alt="Gaway Prep"
              width={140}
              height={50}
              className="mb-6 h-12 w-auto"
              style={{ objectFit: "contain", objectPosition: "left top" }}
            />
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Your trusted partner for global education, university admissions, and international study planning.
            </p>
            <button className="flex items-center gap-2 bg-brand-orange text-white px-6 py-2 rounded-full font-bold shadow-md hover:opacity-90 transition-all text-sm">
              Get in touch
            </button>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-orange">Study Destinations</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link href="#">USA Universities</Link>
              </li>
              <li>
                <Link href="#">UK Universities</Link>
              </li>
              <li>
                <Link href="#">Germany Public Universities</Link>
              </li>
              <li>
                <Link href="#">Italy & France</Link>
              </li>
              <li>
                <Link href="#">Canada & Australia</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-orange">Our Services</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link href="#">Profile Evaluation</Link>
              </li>
              <li>
                <Link href="#">University Shortlisting</Link>
              </li>
              <li>
                <Link href="#">SOP & LOR Guidance</Link>
              </li>
              <li>
                <Link href="#">Visa Assistance</Link>
              </li>
              <li>
                <Link href="#">Scholarship Support</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-orange">Resources</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <Link href="#">Blogs</Link>
              </li>
              <li>
                <Link href="#">Case Studies</Link>
              </li>
              <li>
                <Link href="#">Student Testimonials</Link>
              </li>
              <li>
                <Link href="#">FAQs</Link>
              </li>
              <li>
                <Link href="#">Events & Webinars</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-orange">Connect</h4>
            <ul className="space-y-3 text-gray-600 text-sm mb-6">
              <li className="flex items-center gap-2">
                <Instagram size={16} /> Instagram
              </li>
              <li className="flex items-center gap-2">
                <Facebook size={16} /> Facebook
              </li>
              <li className="flex items-center gap-2">
                <Linkedin size={16} /> LinkedIn
              </li>
              <li className="flex items-center gap-2">
                <Youtube size={16} /> YouTube
              </li>
              <li className="flex items-center gap-2">
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-100 text-xs text-gray-400">
          <p>© 2026 Gaway Prep. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

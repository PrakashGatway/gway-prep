
interface BlogDetailsProps {
    slug: string;

}

export default function BlogDetails({ slug }: BlogDetailsProps) {

    const formatSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>

    
    
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-16 bg-[url('/image/bg-test-pre.jpg')]
    bg-cover
    bg-center
    bg-no-repeat" >
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center gap-2 text-sm">
          <a href="/" className="text-primary hover:underline">
            Home
          </a>
          <span className="text-muted-foreground">/</span>
          <a href="/blog" className="text-primary hover:underline">
            Blog
          </a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{formatSlug(slug)}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          {formatSlug(slug)}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-foreground">📅 January 15, 2024</span>
          <span className="px-3 py-1 bg-primary/20 text-primary font-medium rounded-full text-xs">Web Development</span>
          <span className="text-primary font-medium">By Alex Johnson</span>
        </div>
      </div>
    </section>


     <div className="container w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Featured Image */}
          <div className="mb-8  rounded-lg h-96 flex items-center justify-center   bg-[url('https://media.licdn.com/dms/image/v2/D4E12AQEpENyH_S4q4A/article-cover_image-shrink_720_1280/B4EZokCk7iHcAI-/0/1761541247426?e=2147483647&v=beta&t=twMGTZiot0hL0i5Xre79FL0Z1G67-e23L_XpaYVKOpE')]
    bg-cover
    bg-center
    bg-no-repeat" >
            
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Web development has evolved dramatically over the past decade. Today's developers must understand not just
              HTML and CSS, but also JavaScript frameworks, backend technologies, and deployment strategies. This
              comprehensive guide will walk you through everything you need to know to become a modern web developer.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Getting Started with the Fundamentals</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Before diving into complex frameworks, it's crucial to understand the core technologies that power the
              web. HTML provides the structure, CSS handles styling, and JavaScript adds interactivity. Mastering these
              three languages is the foundation of everything else you'll learn.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-6 mb-3">1. Understanding HTML Structure</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              HTML5 introduced semantic elements that make your code more meaningful. Using tags like {"<header>"},{" "}
              {"<main>"}, {"<article>"}, and {"<footer>"} helps both developers and search engines understand your
              content structure.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-6 mb-3">2. CSS for Modern Design</h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Modern CSS provides powerful features like CSS Grid, Flexbox, and CSS Variables. These tools allow you to
              create responsive, maintainable stylesheets that work across all devices. Tailwind CSS has also
              revolutionized how many developers approach styling.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">JavaScript and Beyond</h2>
            <p className="text-base text-foreground leading-relaxed mb-6">
              JavaScript is the programming language of the web. From vanilla JavaScript to frameworks like React, Vue,
              and Angular, there are many ways to build interactive applications. The key is to understand the
              underlying principles before jumping into frameworks.
            </p>

            <div className="my-8 p-6 bg-primary/10 border-l-4 border-primary rounded">
              <p className="text-foreground font-semibold mb-2">💡 Pro Tip</p>
              <p className="text-foreground">
                Before learning a new framework, make sure you understand vanilla JavaScript thoroughly. This will make
                learning any framework much easier.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">Best Practices for Development</h2>
            <p className="text-base text-foreground leading-relaxed mb-4">
              Following best practices will make your code more maintainable and help you build scalable applications.
              This includes writing clean code, using version control, testing your applications, and following
              accessibility standards.
            </p>
          </article>

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-semibold text-foreground mb-4">Share this article:</p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center text-sm font-bold">
                f
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition flex items-center justify-center text-sm font-bold">
                𝕏
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition flex items-center justify-center text-sm font-bold">
                in
              </button>
              <button className="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center text-sm font-bold">
                ✉
              </button>
            </div>
          </div>

            <section className="mt-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Leave a Reply</h2>

      <form className="space-y-6">
        <div>
          <label className="block text-foreground font-semibold mb-2">Your Comment *</label>
          <textarea
            rows={6}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground font-semibold mb-2">Name *</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-2">Email *</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">Your email address will not be published.</p>

        <button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Post Comment
        </button>
      </form>

      {/* Sample Comments */}
      <div className="mt-12 space-y-8">
        <h3 className="text-2xl font-bold text-foreground">Comments</h3>
        {[1, 2].map((i) => (
          <div key={i} className="pb-8 border-b border-border last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {i}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">Sarah Anderson</h4>
                <p className="text-sm text-muted-foreground mb-2">January 16, 2024</p>
                <p className="text-foreground">
                  Great article! This really helped me understand the concepts better. I especially appreciated the
                  practical examples throughout.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1">
      {/* Search */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4">Search</h3>
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Latest Posts */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4">Latest Posts</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="pb-4 border-b border-border last:border-b-0">
              <h4 className="font-semibold text-foreground hover:text-primary cursor-pointer transition mb-1">
                How to Build a React App from Scratch
              </h4>
              <p className="text-sm text-muted-foreground">January 12, 2024</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {["JavaScript", "React", "CSS", "Web Design", "Backend", "DevOps"].map((cat) => (
            <button
              key={cat}
              className="px-3 py-1 bg-primary/20 border border-border text-foreground text-sm rounded transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["tutorial", "coding", "web", "javascript", "frontend", "learning"].map((tag) => (
            <a key={tag} href="#" className="text-xs text-primary hover:underline">
              #{tag}
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
        <h3 className="font-bold text-foreground mb-3">Subscribe</h3>
        <p className="text-sm text-foreground mb-4">Get the latest articles delivered to your inbox.</p>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2 border border-border rounded mb-2 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold hover:bg-primary/90 transition text-sm">
          Subscribe
        </button>
      </div>
    </aside>
      </div>
    </div>
    

    </>

    
  );
}

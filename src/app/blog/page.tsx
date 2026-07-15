import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { Clock, User, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function BlogPage() {
  const settings = await prisma.setting.findFirst() || {};
  const blogs = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero */}
      <section className="relative bg-neutral-900 pt-36 pb-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Spiritual travel guides India"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Travel Insights
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            The Enchanting Travel Blog
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-sm md:text-base leading-relaxed">
            Read expert guidelines on temple darshans, pilgrimage requirements, packing lists, and local cultural history.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-12 text-neutral">
              No blog articles published yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group border border-neutral/10 rounded-3xl overflow-hidden bg-background flex flex-col hover:shadow-lg transition-smooth"
                >
                  <div className="relative h-64 overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-4">
                    <div className="flex items-center gap-4 text-xs text-neutral font-semibold">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-foreground text-2xl tracking-tight line-clamp-1 group-hover:text-primary transition-smooth">
                      {blog.title}
                    </h2>

                    <p className="text-neutral text-xs md:text-sm leading-relaxed line-clamp-3">
                      {blog.content}
                    </p>

                    <div className="border-t border-neutral/10 pt-4 flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-neutral">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>By {blog.authorName}</span>
                      </div>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}

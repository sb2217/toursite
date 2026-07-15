import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { InquiryForm } from "@/components/public/InquiryForm";
import { Clock, User, Calendar, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch blog details
  const blog = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!blog) {
    notFound();
  }

  const settings = await prisma.setting.findFirst() || {};
  const paragraphs = blog.content.split("\n\n");

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end bg-neutral-900 overflow-hidden pb-12 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover opacity-35 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-white space-y-4">
          <span className="text-xs font-bold bg-primary text-secondary px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            {blog.category}
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary shrink-0" />
              <span>By {blog.authorName}</span>
            </span>
            <span className="text-neutral-600">|</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Published: {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}</span>
            </span>
            <span className="text-neutral-600">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>{blog.readTime} Read</span>
            </span>
          </div>
        </div>
      </section>

      {/* Content & Inquiries */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Blog Body */}
          <div className="lg:col-span-8 space-y-8">
            <article className="prose prose-neutral max-w-none space-y-6">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-neutral text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                  {p}
                </p>
              ))}
            </article>

            {blog.tags && (
              <div className="flex flex-wrap gap-2 border-t border-neutral/10 pt-6 mt-12">
                <span className="text-xs text-neutral font-bold uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-primary" /> Tags:
                </span>
                {blog.tags.split(",").map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-background border border-neutral/10 text-neutral px-3.5 py-1 rounded-full font-medium"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <InquiryForm />
          </div>

        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}

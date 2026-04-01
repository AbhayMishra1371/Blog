import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedPost from '@/components/FeaturedPost';
import BlogCard from '@/components/BlogCard';
import clientPromise from '@/lib/db';

export const dynamic = "force-dynamic";

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("Studzee_Database");

  // Fetch real blogs from the 'content' collection using the native driver
  const blogsData = await db
    .collection("content")
    .find({})
    .sort({ updatedAt: -1 })
    .toArray();

  // Map database documents to UI component props
  const formattedBlogs = blogsData.map((blog: any) => ({
    id: blog._id.toString(),
    image: blog.imageUrl || 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80',
    date: blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }) : 'Just now',
    category: 'Analysis',
    title: blog.title || 'Untitled Blog',
    description: blog.summary || 'Read more about this topic in our detailed article.',
    pdfUrl: blog.pdfUrl || []
  }));

  const featuredBlog = formattedBlogs[0];
  const otherBlogs = formattedBlogs.slice(1);

  return (
    <div className="min-h-screen bg-[#f1f7fc] font-sans antialiased">
      <Navbar />
      <Hero />

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Real Blog Display */}
        {featuredBlog ? (
          <>
            <section className="mb-20">
              <FeaturedPost {...featuredBlog} />
            </section>

            {otherBlogs.length > 0 && (
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                {otherBlogs.map((blog) => (
                  <BlogCard key={blog.id} {...blog} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-bold text-brand-navy">No blogs found</h2>
            <p className="mt-2 text-slate-500">Check back later for new content from your database.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-slate-500">© {new Date().getFullYear()} Studzee Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

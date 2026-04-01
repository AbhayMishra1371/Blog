import React from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import clientPromise from '@/lib/db';

const renderBlock = (block: any, index: number) => {
  switch (block.type) {
    case 'text':
      return <p key={index} className="text-xl leading-relaxed text-slate-600 mb-6">{block.value}</p>;
    
    case 'list':
      return (
        <ul key={index} className="mb-8 space-y-4">
          {block.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-lg text-slate-600">
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    
    case 'code':
      return (
        <div key={index} className="group relative mb-8 overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
          <div className="flex items-center justify-between bg-slate-800 px-4 py-2 text-xs font-mono text-slate-400">
            <span>PYTHON</span>
            <button className="hover:text-white">Copy</button>
          </div>
          <pre className="overflow-x-auto p-6 text-sm font-mono leading-relaxed text-sky-300">
            <code>{block.value}</code>
          </pre>
        </div>
      );
    
    case 'table':
      return (
        <div key={index} className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {block.headers.map((header: string, i: number) => (
                  <th key={i} className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-brand-navy">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {block.rows.map((row: string[], i: number) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-6 py-4 text-base text-slate-600">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
    default:
      return null;
  }
};

export default async function BlogPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const client = await clientPromise;
  const db = client.db("Studzee_Database");
  const blog = await db.collection("content").findOne({ _id: new ObjectId(id) });

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f1f7fc]">
        <h1 className="text-3xl font-bold text-brand-navy">Blog Not Found</h1>
        <Link href="/" className="mt-4 text-brand-blue hover:underline">Back to Home</Link>
      </div>
    );
  }

  // Handle both the single-array and the nested-section formats
  const contentSections = Array.isArray(blog.content) ? blog.content : [];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      
      <article className="mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center gap-4">
            <span className="rounded-full bg-brand-orange/10 px-4 py-1 text-xs font-bold text-brand-orange uppercase tracking-widest">
              Analysis
            </span>
            <span className="text-slate-400 font-medium">
              {blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              }) : 'April 2026'}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl lg:text-7xl leading-tight">
            {blog.title}
          </h1>
        </div>

        {blog.imageUrl && (
          <div className="relative mb-16 aspect-video overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-slate-200">
            <img src={blog.imageUrl} alt={blog.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="mx-auto max-w-3xl">
          {blog.summary && (
            <p className="mb-16 text-2xl font-medium leading-relaxed text-slate-700 italic border-l-8 border-brand-orange pl-8">
              {blog.summary}
            </p>
          )}

          <div className="space-y-16">
            {contentSections.map((section: any, idx: number) => (
              <section key={idx} className="scroll-mt-32">
                {section.title && (
                  <h2 className="mb-8 text-3xl font-black tracking-tight text-brand-navy uppercase">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-6">
                  {Array.isArray(section.content) && section.content.map((block: any, bIdx: number) => 
                    renderBlock(block, bIdx)
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* PDF Downloads */}
        {blog.pdfUrl && blog.pdfUrl.length > 0 && (
          <div className="mt-16 rounded-[2rem] bg-brand-navy p-8 lg:p-12 text-white shadow-2xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-full bg-brand-orange p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Learning Resources</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {blog.pdfUrl.map((pdf: any, i: number) => (
                <a 
                  key={i} 
                  href={pdf.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-black p-4 transition-all hover:bg-slate-800 group"
                >
                  <span className="font-bold truncate pr-4 text-white">{pdf.name || 'Download PDF'}</span>
                  <svg className="h-5 w-5 text-brand-orange group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 border-t border-slate-100 pt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-3 text-xl font-black text-brand-navy hover:text-brand-orange transition-all">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            BACK TO ALL STORIES
          </Link>
        </div>
      </article>
    </div>
  );
}

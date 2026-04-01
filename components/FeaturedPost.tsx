import React from 'react';
import Link from 'next/link';

interface FeaturedPostProps {
  id: string;
  image: string;
  date: string;
  category: string;
  title: string;
  description: string;
  pdfUrl?: any[];
}

const FeaturedPost = ({
  id,
  image,
  date,
  category,
  title,
  description,
  pdfUrl = [],
}: FeaturedPostProps) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-[3rem] bg-white p-12 lg:p-20 text-brand-navy shadow-2xl shadow-sky-500/5 transition-all hover:shadow-2xl">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Side: Title */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{date}</span>
            <span className="rounded-full bg-slate-100 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              {category}
            </span>
          </div>
          <Link href={`/blog/${id}`} className="block group">
            <h2 className="text-4xl font-black leading-[1.1] text-black transition-all group-hover:text-slate-600 lg:text-7xl">
              {title}
            </h2>
          </Link>
        </div>

        {/* Right Side: Summary & Actions */}
        <div className="flex flex-col gap-8">
          <p className="text-xl leading-relaxed text-slate-500 lg:text-2xl">
            {description}
          </p>
          
          {pdfUrl && pdfUrl.length > 0 && (
            <div>
              <a 
                href={pdfUrl[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-black px-8 py-4 text-sm font-black text-white uppercase tracking-widest transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Guide
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;

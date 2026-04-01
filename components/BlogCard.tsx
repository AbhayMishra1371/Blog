import Link from 'next/link';

interface BlogCardProps {
  id: string;
  image: string;
  date: string;
  category: string;
  title: string;
  description: string;
  pdfUrl?: any[];
}

const BlogCard = ({
  id,
  image,
  date,
  category,
  title,
  description,
  pdfUrl = [],
}: BlogCardProps) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-sky-500/5 transition-all hover:-translate-y-2 hover:shadow-2xl">
      <Link href={`/blog/${id}`} className="block">
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500">{date}</span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-600">
            {category}
          </span>
        </div>
        <Link href={`/blog/${id}`} className="block group">
          <h3 className="mb-4 text-xl font-bold leading-tight text-black group-hover:text-slate-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="mb-8 line-clamp-3 text-slate-600">
          {description}
        </p>
        
        {pdfUrl && pdfUrl.length > 0 && (
          <div className="mt-auto border-t border-slate-100 pt-6">
            <a 
              href={pdfUrl[0].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-bold text-white transition-all hover:bg-slate-800"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

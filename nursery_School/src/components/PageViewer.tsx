import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageViewerProps {
  pages: string[];
  alt: string;
}

export default function PageViewer({ pages, alt }: PageViewerProps) {
  const [index, setIndex] = useState(0);

  if (pages.length === 0) return null;

  const isFirst = index === 0;
  const isLast = index === pages.length - 1;

  const next = () => setIndex((i) => Math.min(i + 1, pages.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={pages[index]}
        alt={`${alt} - page ${index + 1}`}
        className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-xl"
      />
      <div className="flex items-center gap-6">
        <button
          onClick={prev}
          disabled={isFirst}
          aria-label="Previous page"
          className="rounded-full bg-[#FF70A6] p-3 text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-gray-700 dark:text-gray-200">
          {index + 1} / {pages.length}
        </span>
        <button
          onClick={next}
          disabled={isLast}
          aria-label="Next page"
          className="rounded-full bg-[#FF70A6] p-3 text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
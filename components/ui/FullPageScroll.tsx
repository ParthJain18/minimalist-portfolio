"use client";
import React, { useRef, useEffect, useState, ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
  heightRatio?: number;
  widthRatio?: number;
  id?: string;
};

const Page: React.FC<PageProps> = ({
  children,
  heightRatio = 1,
  widthRatio = 1,
  id,
}) => {
  return (
    <div id={id} className="snap-start h-screen w-screen flex justify-center items-start overflow-hidden">
      <div
        className="flex justify-center items-start overflow-hidden"
        style={{
          height: `${heightRatio * 100}vh`,
          width: `${widthRatio * 100}vw`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

type FullPageScrollProps = {
  children: React.ReactElement<PageProps>[];
};

const FullPageScroll: React.FC<FullPageScrollProps> & { Page: typeof Page } = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pages = React.Children.toArray(children) as React.ReactElement<PageProps>[];

  useEffect(() => {
    if (!containerRef.current) return;

    const items = Array.from(containerRef.current.children);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            if (idx !== -1) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    items.forEach((el) => observer.observe(el));
    return () => {
      items.forEach((el) => observer.unobserve(el));
    };
  }, [pages]);

  return (
    <div className="relative">
      <div
        id="fullpage-container"
        ref={containerRef}
        className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar"
      >
        {pages.map((page, idx) =>
          React.cloneElement(page, { key: idx })
        )}
      </div>
      <div className="hidden lg:flex fixed top-1/2 right-4 transform -translate-y-1/2 flex-col items-center space-y-2 z-10">
        {pages.map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all ${activeIndex === idx
              ? 'w-3 h-3 bg-indigo-600'
              : 'w-2 h-2 bg-gray-400'
              }`}
            style={{ marginLeft: activeIndex === idx ? '-0.5px' : '0' }}
          />
        ))}
      </div>
    </div>
  );
};

FullPageScroll.Page = Page;
export default FullPageScroll;

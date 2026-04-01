import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 gradient-hero"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Blog Insights
        </h1>
        <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto">
          Explore Our Latest Articles and Industry Insights
        </p>
      </div>
      <div className="absolute -bottom-1 w-full h-12 bg-[#f1f7fc] rounded-t-[3rem]"></div>
    </section>
  );
};

export default Hero;

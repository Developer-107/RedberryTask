"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selected, setSelected] = useState(0);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    update();

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
  }, [emblaApi]);

  const slides = [
    {
      title: "Start learning something new today",
      desc: "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
      buttonName: "Browse Courses",
      image: "/carousel-imgs/carousel1.png",
      href: "",
    },
    {
      title: "Pick up where you left off",
      desc: "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
      buttonName: "Start Learning",
      image: "/carousel-imgs/carousel2.png",
      href: "",
    },
    {
      title: "Learng togehter, grow faster",
      desc: "",
      buttonName: "Learn More",
      image: "/carousel-imgs/carousel3.png",
      href: "",
    },
  ];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative w-full my-16">
      {/* Carousel */}
      <div className="overflow-hidden rounded-4xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full h-105 flex py-14 px-10 text-white bg-cover bg-center`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="">
                <div className="h-41 mb-5">
                  <h2 className="text-5xl font-bold mb-5">{slide.title}</h2>
                  <p className="text-2xl font-light max-w-7xl">{slide.desc}</p>
                </div>
                <Link
                  href={slide.href}
                  className=" bg-indigo-600 font-medium text-[20px] p-5 px-7 rounded-lg hover:opacity-90"
                >
                  {slide.buttonName}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        disabled={!canPrev}
        className={`absolute right-37 bottom-16 w-12 h-12 p-2.25 text-white rounded-full border-3 border-white flex ${
          !canPrev ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20 cursor-pointer"
        }`}
      >
        <svg className="embla__button__svg mr-0.5" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          ></path>
        </svg>
      </button>

      <button
        onClick={scrollNext}
        disabled={!canNext}
        className={`absolute right-16 bottom-16 w-12 h-12 p-2.25 text-white rounded-full border-3 border-white flex ${
          !canNext ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20 cursor-pointer"
        }`}
      >
        <svg className="embla__button__svg ml-0.5" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
          ></path>
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-14 h-1.75 rounded-full ${
              selected === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TileCard from "./TileCard";
import { Tile } from "@/lib/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface FeaturedTilesProps {
  tiles: Tile[];
}

export default function FeaturedTiles({ tiles }: FeaturedTilesProps) {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Featured Tiles
      </h2>
      <p className="text-center text-base-content/70 mb-10 max-w-2xl mx-auto">
        Handpicked selections from our finest collection
      </p>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {tiles.map((tile) => (
          <SwiperSlide key={tile.id}>
            <TileCard tile={tile} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

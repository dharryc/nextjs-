"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import type { CardDTO } from "@/public/models/card";

type Props = { card: CardDTO };

export default function Card({ card }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const [isHover, setIsHover] = useState(false);

  const maxTilt = 8; // degrees
  const lift = 12; // px

  // Rarity -> border and badge styles
  const rarity = (card.card_rarity ?? "common") as string;
  const rarityMap: Record<
    string,
    { border: string; badge: string }
  > = {
    common: {
      border: "border-zinc-200 dark:border-zinc-700",
      badge: "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
    },
    uncommon: {
      border: "border-emerald-300 dark:border-emerald-700",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    },
    rare: {
      border: "border-sky-300 dark:border-sky-700",
      badge: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    },
    legendary: {
      border: "border-amber-300 dark:border-amber-700",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    },
  };

  const rarityBorderClass = rarityMap[rarity]?.border ?? rarityMap.common.border;
  const rarityBadgeClass = rarityMap[rarity]?.badge ?? rarityMap.common.badge;

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    if (raf.current) cancelAnimationFrame(raf.current);

    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const px = dx / (rect.width / 2); // -1 .. 1
    const py = dy / (rect.height / 2);

    const rotY = px * maxTilt; // rotateY (horizontal mouse -> Y rotation)
    const rotX = -py * maxTilt; // rotateX (vertical mouse -> X rotation)

    raf.current = requestAnimationFrame(() => {
      if (!el) return;
      el.style.transform = `perspective(1200px) translateZ(0px) translateY(-${lift}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  }

  function onMouseEnter() {
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    if (ref.current) {
      ref.current.style.transform = "";
    }
  }

  return (
    <div className="card-tilt-wrapper">
      <div
        ref={ref}
        className={`group card-tilt w-[260px] sm:w-[300px] md:w-[340px] bg-white dark:bg-zinc-900 rounded-lg shadow-sm transition-shadow will-change-transform border-2 ${rarityBorderClass}`}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full aspect-[5/6] rounded-t-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={card.path_to_image ?? "/next.svg"}
            alt={card.card_name}
            fill
            className={`object-cover card-image`}
            sizes="260px"
          />
          {/* Holographic overlay for legendary cards */}
          {rarity === "legendary" && (
            <div className="holographic-overlay" />
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                {card.card_name}
              </h2>
              {card.blurb ? (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-h-24 overflow-hidden">
                  {card.blurb}
                </p>
              ) : null}
            </div>

            <span className={`whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-full ${rarityBadgeClass}`}>
              {card.card_rarity ?? "common"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
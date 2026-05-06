"use client";

import Image from "next/image";

export function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/custom-seal.png"
        alt="Печать"
        fill
        className="object-contain"
        sizes="(max-width: 640px) 42vw, 220px"
        priority
      />
    </div>
  );
}

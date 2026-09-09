import Image from "next/image";

export default function Logo({ className = "w-11", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo-icon.png"
      alt=""
      width={632}
      height={192}
      priority={priority}
      className={`${className} h-auto object-contain`}
    />
  );
}

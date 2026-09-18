import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import heroAsset from "@/assets/f1-creators-hero.png.asset.json";
import { creatorImages } from "@/lib/creator-assets";
import { getCreators } from "@/lib/creators.functions";

export const Route = createFileRoute("/")({
  loader: () => getCreators(),
  head: () => ({
    meta: [
      { title: "F1 Creators — The New Grid" },
      { name: "description", content: "Meet the independent voices defining Formula 1, racing, technology, and track culture." },
      { property: "og:title", content: "F1 Creators — The New Grid" },
      { property: "og:description", content: "Meet the independent voices defining Formula 1, racing, technology, and track culture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: HomeError,
  component: HomePage,
});

function HomeError() {
  return <main className="grid min-h-screen place-items-center bg-background px-6 text-center"><div><p className="font-mono text-xs uppercase text-primary">Pit stop</p><h1 className="mt-3 font-display text-5xl">The roster is reloading.</h1></div></main>;
}

function HomePage() {
  const creators = Route.useLoaderData();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const carY = useTransform(smooth, [0, 1], [0, 150]);
  const titleX = useTransform(smooth, [0, 1], [0, -180]);
  const titleXReverse = useTransform(smooth, [0, 1], [0, 180]);
  const heroScale = useTransform(smooth, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(smooth, [0, .9], [1, .12]);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section ref={heroRef} className="relative h-[115svh] min-h-[760px] bg-paper">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="sticky top-0 h-svh overflow-hidden">
          <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
            <Link to="/" className="font-mono text-[11px] font-bold uppercase tracking-normal">F1C® / 2026</Link>
            <a href="mailto:hello@f1creators.agency" className="group flex items-center gap-2 border-b border-foreground pb-1 font-mono text-[11px] font-bold uppercase tracking-normal">Book a creator <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </header>

          <div className="absolute inset-x-0 top-[14%] z-20 select-none md:top-[10%]">
            <motion.div style={{ x: titleX }} className="whitespace-nowrap font-display text-[26vw] leading-[.72] tracking-normal text-foreground md:text-[17vw]">F1 CREATORS</motion.div>
            <motion.div style={{ x: titleXReverse }} className="ml-[-16vw] whitespace-nowrap font-display text-[26vw] leading-[.72] tracking-normal text-stroke md:text-[17vw]">F1 CREATORS</motion.div>
          </div>

          <motion.img style={{ y: carY }} src={heroAsset.url} alt="Formula race car framed by checkered flags" className="absolute inset-0 z-10 size-full object-cover object-center" />
          <div className="absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-8 left-5 z-30 max-w-[250px] md:bottom-10 md:left-10 md:max-w-sm">
            <p className="font-mono text-[10px] uppercase leading-relaxed text-foreground/65">Talent management for the voices accelerating motorsport culture.</p>
          </div>
          <div className="absolute bottom-8 right-5 z-30 flex items-center gap-2 font-mono text-[10px] uppercase md:bottom-10 md:right-10">
            Scroll to grid <ArrowDown className="size-3 animate-bounce" />
          </div>
        </motion.div>
      </section>

      <section className="relative bg-foreground px-5 pb-24 pt-20 text-background md:px-10 md:pb-36 md:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .8, ease: [.16, 1, .3, 1] }} className="mb-16 grid gap-8 border-b border-background/20 pb-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8"><p className="font-mono text-[10px] uppercase text-primary">01 / The roster</p><h2 className="mt-4 font-display text-[15vw] leading-[.82] tracking-normal md:text-[8vw]">NEW GRID</h2></div>
            <p className="max-w-sm text-sm leading-relaxed text-background/60 md:col-span-4 md:justify-self-end">Six independent voices. Millions of fans. One shared obsession with what happens at the limit.</p>
          </motion.div>

          <div className="border-t border-background/20">
            {creators.map((creator, index) => (
              <CreatorRow creator={creator} index={index} key={creator.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CreatorRow({ creator, index }: { creator: Awaited<ReturnType<typeof getCreators>>[number]; index: number }) {
  const image = creatorImages[creator.image_key];
  return (
    <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: .75, delay: Math.min(index * .04, .2), ease: [.16, 1, .3, 1] }}>
      <Link to="/creators/$slug" params={{ slug: creator.slug }} className="creator-row group relative grid min-h-44 grid-cols-12 items-center gap-3 border-b border-background/20 py-5 md:min-h-56 md:gap-8 md:py-7">
        <span className="col-span-1 self-start pt-2 font-mono text-[10px] text-background/40">{String(index + 1).padStart(2, "0")}</span>
        <div className="col-span-3 h-28 overflow-hidden md:col-span-2 md:h-44"><img src={image} alt={creator.full_name} loading="lazy" width={896} height={1152} className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" /></div>
        <div className="col-span-7 md:col-span-8">
          <p className="mb-2 font-mono text-[9px] uppercase text-primary">{creator.category}</p>
          <h3 className="break-words font-display text-[9vw] leading-[.85] tracking-normal transition-transform duration-500 group-hover:translate-x-3 md:text-[5.8vw]">{creator.handle}</h3>
          <div className="mt-3 flex gap-5 text-xs text-background/50"><span>{creator.follower_count} audience</span><span className="hidden sm:inline">{creator.location}</span></div>
        </div>
        <ArrowUpRight className="col-span-1 size-5 justify-self-end transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 md:size-9" />
      </Link>
    </motion.div>
  );
}

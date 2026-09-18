import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { creatorImages } from "@/lib/creator-assets";
import { getCreator } from "@/lib/creators.functions";

export const Route = createFileRoute("/creators/$slug")({
  loader: async ({ params }) => {
    const creator = await getCreator({ data: { slug: params.slug } });
    if (!creator) throw notFound();
    return creator;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.handle} — F1 Creators` },
      { name: "description", content: loaderData.bio },
      { property: "og:title", content: `${loaderData.handle} — F1 Creators` },
      { property: "og:description", content: loaderData.bio },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ] : [{ title: "Creator unavailable — F1 Creators" }, { name: "robots", content: "noindex" }],
  }),
  errorComponent: ProfileError,
  notFoundComponent: ProfileNotFound,
  component: CreatorProfile,
});

function ProfileError() { return <ProfileMessage title="Profile temporarily off-track." />; }
function ProfileNotFound() { return <ProfileMessage title="This creator left the grid." />; }
function ProfileMessage({ title }: { title: string }) {
  return <main className="grid min-h-screen place-items-center bg-background px-6 text-center"><div><p className="font-mono text-xs uppercase text-primary">404 / Pit lane</p><h1 className="mt-4 font-display text-5xl md:text-7xl">{title}</h1><Link to="/" className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 font-mono text-xs uppercase"><ArrowLeft className="size-3" /> Back to roster</Link></div></main>;
}

function CreatorProfile() {
  const creator = Route.useLoaderData();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  const image = creatorImages[creator.image_key];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference text-paper md:px-10 md:py-7">
        <Link to="/" className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase"><ArrowLeft className="size-3" /> The grid</Link>
        <span className="font-mono text-[10px] font-bold uppercase">F1C® / Talent</span>
      </header>

      <section className="grid min-h-svh lg:grid-cols-2">
        <div ref={mediaRef} className="relative h-[68svh] overflow-hidden bg-foreground lg:sticky lg:top-0 lg:h-svh">
          <motion.img style={{ y: imageY }} src={image} alt={creator.full_name} width={896} height={1152} className="absolute -inset-y-20 h-[calc(100%+10rem)] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-5 font-mono text-[9px] uppercase text-paper/70 md:bottom-10 md:left-10">{creator.location} / Available worldwide</div>
        </div>

        <div className="flex min-h-svh flex-col justify-between px-5 pb-10 pt-16 md:px-10 lg:px-14 lg:pb-14 lg:pt-32">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>
            <p className="font-mono text-[10px] uppercase text-primary">{creator.category}</p>
            <h1 className="mt-5 break-words font-display text-[17vw] leading-[.78] tracking-normal lg:text-[7vw]">{creator.handle}</h1>
            <div className="mt-8 flex items-end justify-between border-t border-foreground/15 pt-5"><div><p className="font-medium">{creator.full_name}</p><p className="text-sm text-muted-foreground">{creator.role}</p></div><span className="font-mono text-[9px] uppercase text-muted-foreground">Managed talent</span></div>
            <p className="mt-16 max-w-xl text-2xl font-light leading-snug md:text-3xl">{creator.bio}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24">
            <div className="grid grid-cols-2 border-y border-foreground/15 md:grid-cols-4">
              {[['Audience', creator.follower_count], ['Monthly reach', creator.reach_count], ['Engagement', creator.engagement_rate], ['Campaigns', creator.campaign_count]].map(([label, value]) => <div key={label} className="border-foreground/15 px-3 py-7 odd:border-r md:border-r md:last:border-r-0"><p className="font-display text-3xl md:text-4xl">{value}</p><p className="mt-1 font-mono text-[8px] uppercase text-muted-foreground">{label}</p></div>)}
            </div>
            <div className="mt-10 flex flex-wrap gap-5 font-mono text-[10px] font-bold uppercase">
              {creator.instagram_url && <a href={creator.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 border-b border-foreground pb-1">Instagram <ArrowUpRight className="size-3" /></a>}
              {creator.youtube_url && <a href={creator.youtube_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 border-b border-foreground pb-1">YouTube <ArrowUpRight className="size-3" /></a>}
              {creator.x_url && <a href={creator.x_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 border-b border-foreground pb-1">X <ArrowUpRight className="size-3" /></a>}
            </div>
            <a href={`mailto:hello@f1creators.agency?subject=Campaign with ${creator.handle}`} className="group mt-20 flex items-center justify-between border-t border-foreground pt-6 font-display text-4xl uppercase md:text-6xl">Build a campaign <ArrowUpRight className="size-9 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 md:size-12" /></a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const creatorFields = "id, slug, handle, full_name, role, location, category, bio, image_key, instagram_url, youtube_url, x_url, follower_count, reach_count, engagement_rate, campaign_count, sort_order" as const;

function publicClient() {
  return createClient<Database>(
    process.env['SUPABASE_URL']!,
    process.env['SUPABASE_PUBLISHABLE_KEY']!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const getCreators = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("creators")
    .select(creatorFields)
    .eq("is_published", true)
    .order("sort_order");

  if (error) throw new Error(error.message);
  return data;
});

export const getCreator = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data: input }) => {
    const { data, error } = await publicClient()
      .from("creators")
      .select(creatorFields)
      .eq("slug", input.slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  });

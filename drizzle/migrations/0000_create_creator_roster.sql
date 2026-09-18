CREATE TABLE public.creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  handle TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'India',
  category TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_key TEXT NOT NULL,
  instagram_url TEXT,
  youtube_url TEXT,
  x_url TEXT,
  follower_count TEXT NOT NULL,
  reach_count TEXT NOT NULL,
  engagement_rate TEXT NOT NULL,
  campaign_count TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.creators TO anon, authenticated;
GRANT ALL ON public.creators TO service_role;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published creators are publicly readable"
ON public.creators
FOR SELECT
TO anon, authenticated
USING (is_published = true);
CREATE INDEX creators_published_order_idx ON public.creators (is_published, sort_order);
CREATE INDEX creators_slug_idx ON public.creators (slug);
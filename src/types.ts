import { z } from '@builder.io/qwik-city';

const primaryArtistSchema = z.object({
  api_path: z.string(),
  header_image_url: z.string(),
  id: z.number(),
  image_url: z.string(),
  name: z.string(),
  slug: z.string(),
  url: z.string(),
});

export type PrimaryArtist = z.infer<typeof primaryArtistSchema>;

const searchHitSchema = z.object({
  api_path: z.string(),
  artist_names: z.union([z.string(), z.array(z.string())]),
  full_title: z.string(),
  header_image_thumbnail_url: z.string(),
  header_image_url: z.string(),
  id: z.number(),
  path: z.string(),
  song_art_image_thumbnail_url: z.string(),
  song_art_image_url: z.string(),
  title: z.string(),
  title_with_featured: z.string(),
  url: z.string(),
  primary_artist: primaryArtistSchema,
});

export type SearchHit = z.infer<typeof searchHitSchema>;

export const searchResultSchema = z.object({
  hits: z.array(
    z.object({
      result: searchHitSchema,
    }),
  ),
});

export type ErrorMessage = {
  statusCode?: number;
  errorMessage: string;
};

export const songLyricSchema = z.object({
  lyrics: z.object({
    _type: z.string(),
    api_path: z.string(),
    lyrics: z.object({
      body: z.object({
        html: z.string(),
      }),
    }),
    path: z.string(),
    song_id: z.number(),
    tracking_data: z.object({
      song_id: z.number(),
      title: z.string(),
      primary_artist: z.string(),
      primary_artist_id: z.number(),
      primary_album: z.string(),
      primary_album_id: z.number(),
      release_date: z.string(),
      has_youtube_url: z.boolean(),
    }),
  }),
});

export type SongLyric = z.infer<typeof songLyricSchema>;

export const releaseDateSchema = z.object({
  year: z.number(),
  month: z.number().min(1).max(12),
  day: z.number().min(1).max(31),
});

export type ReleaseDate = z.infer<typeof releaseDateSchema>;

export const albumSchema = z.object({
  api_path: z.string(),
  cover_art_thumbnail_url: z.string(),
  cover_art_url: z.string(),
  full_title: z.string(),
  id: z.number(),
  name: z.string(),
  name_with_artist: z.string(),
  release_date_components: releaseDateSchema,
  release_date_for_display: z.string(),
  url: z.string(),
});

export const artistSchema = z.object({
  api_path: z.string(),
  header_image_url: z.string(),
  id: z.number(),
  image_url: z.string(),
  name: z.string(),
  slug: z.string(),
  url: z.string(),
});

export const songDetailsSchema = z.object({
  song: z.object({
    title: z.string(),
    album: albumSchema,
    primary_artist: artistSchema,
    title_with_featured: z.string(),
    artist_names: z.string(),
    custom_header_image_url: z.union([z.string(), z.null()]),
    custom_song_art_image_url: z.union([z.string(), z.null()]),
    header_image_url: z.union([z.string(), z.null()]),
    header_image_thumbnail_url: z.union([z.string(), z.null()]),
    song_art_image_thumbnail_url: z.union([z.string(), z.null()]),
    song_art_image_url: z.union([z.string(), z.null()]),
    spotify_uuid: z.optional(z.union([z.string(), z.null()])),
    soundcloud_url: z.optional(z.union([z.string(), z.null()])),
    youtube_url: z.optional(z.union([z.string(), z.null()])),
    description: z.object({
      html: z.string(),
    }),
    description_preview: z.string(),
    full_title: z.string(),
    id: z.number(),
    release_date_components: releaseDateSchema,
  }),
});

// If desired, derive the TypeScript type from the Zod schema
export type SongDetails = z.infer<typeof songDetailsSchema>;

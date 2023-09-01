import { z } from '@builder.io/qwik-city';

const primaryArtistSchema = z.object({
  image_url: z.string(),
  name: z.string(),
});

export type PrimaryArtist = z.infer<typeof primaryArtistSchema>;

const searchHitSchema = z.object({
  id: z.number(),
  primary_artist: primaryArtistSchema,
  full_title: z.string(),
  header_image_thumbnail_url: z.union([z.string(), z.null()]),
  header_image_url: z.union([z.string(), z.null()]),
  song_art_image_thumbnail_url: z.string(),
  song_art_image_url: z.union([z.string(), z.null()]),
  title: z.string(),
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
  }),
});

export type SongLyric = z.infer<typeof songLyricSchema>;

export const releaseDateSchema = z.object({
  year: z.union([z.number(), z.null()]),
  month: z.union([z.number().min(1).max(12), z.null()]),
  day: z.union([z.number().min(1).max(31), z.null()]),
});

export type ReleaseDate = z.infer<typeof releaseDateSchema>;

export const albumSchema = z.object({
  api_path: z.union([z.string(), z.null()]),
  cover_art_thumbnail_url: z.union([z.string(), z.null()]),
  cover_art_url: z.union([z.string(), z.null()]),
  full_title: z.union([z.string(), z.null()]),
  id: z.number(),
  name: z.string(),
  name_with_artist: z.union([z.string(), z.null()]),
  release_date_components: releaseDateSchema,
  release_date_for_display: z.union([z.string(), z.null()]),
  url: z.union([z.string(), z.null()]),
});

export const artistSchema = z.object({
  api_path: z.string(),
  header_image_url: z.union([z.string(), z.null()]),
  id: z.number(),
  image_url: z.union([z.string(), z.null()]),
  name: z.string(),
  slug: z.union([z.string(), z.null()]),
  url: z.union([z.string(), z.null()]),
});

export const songDetailsSchema = z.object({
  song: z.object({
    title: z.string(),
    album: albumSchema,
    primary_artist: artistSchema,
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
      html: z.union([z.string(), z.null()]),
    }),
    description_preview: z.union([z.string(), z.null()]),
    full_title: z.string(),
    id: z.number(),
    release_date_components: releaseDateSchema,
  }),
});

// If desired, derive the TypeScript type from the Zod schema
export type SongDetails = z.infer<typeof songDetailsSchema>;

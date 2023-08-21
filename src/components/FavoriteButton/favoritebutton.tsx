import { component$ } from '@builder.io/qwik';

export interface FavoritebuttonProps {
  id: number;
  artist: string;
  title: string;
  thumbnailUrl: string;
  initialFavoriteState?: boolean;
  refresh?: boolean;
}

export const Favoritebutton = component$<FavoritebuttonProps>(
  ({
    id,
    artist,
    title,
    thumbnailUrl,
    initialFavoriteState,
    refresh,
  }: FavoritebuttonProps) => {
    return <div>🩶</div>;
  },
);

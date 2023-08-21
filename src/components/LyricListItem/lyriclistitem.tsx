import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import { Favoritebutton } from '../FavoriteButton/favoritebutton';

export interface LyricListItemProps {
  id: number;
  thumbnailUrl: string;
  title: string;
  artistName: string;
  initialFavoriteState?: boolean;
  refresh?: boolean;
}

export const Lyriclistitem = component$<LyricListItemProps>(
  ({
    id,
    thumbnailUrl,
    title,
    artistName,
    initialFavoriteState,
    refresh,
  }: LyricListItemProps) => {
    return (
      <a
        class="grid w-full gap-4 p-2 rounded border border-gray bg-dark justify-between items-center min-w-0 hover:border-secondary"
        style={{
          gridTemplateAreas: '"thumbnail title favorite"',
          gridTemplateColumns: '3.125rem 1fr 24px',
        }}
        href={`/song/${id}`}
      >
        <Image
          alt="Lyric thumbnail"
          src={thumbnailUrl}
          width={50}
          height={50}
          style={{
            gridArea: 'thumbnail',
            borderRadius: '0.25rem',
            width: '3.125rem',
            height: '3.125rem',
          }}
        />
        <div
          class="flex flex-col gap-1"
          style={{
            gridArea: 'title',
            overflow: 'hidden',
          }}
        >
          <h5 class="text-lg font-medium whitespace-normal md:whitespace-nowrap overflow-hidden min-w-0 text-ellipsis">
            {title}
          </h5>
          <p class="text-lightGray whitespace-nowrap overflow-hidden min-w-0 text-ellipsis">
            {artistName}
          </p>
        </div>
        <div class="flex" style={{ gridArea: 'favorite' }}>
          <Favoritebutton
            id={id}
            title={title}
            artist={artistName}
            thumbnailUrl={thumbnailUrl}
            initialFavoriteState={!!initialFavoriteState}
            refresh={refresh}
          />
        </div>
      </a>
    );
  },
);

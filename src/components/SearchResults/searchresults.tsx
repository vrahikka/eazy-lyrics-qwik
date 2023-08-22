import { component$ } from '@builder.io/qwik';
import { SearchHit } from '~/types';
import { Lyriclistitem } from '../LyricListItem/lyriclistitem';

export interface SearchresultsProps {
  hits: SearchHit[];
}

export const Searchresults = component$<SearchresultsProps>(({ hits }) => {
  return (
    <ul class="flex w-full flex-col gap-2">
      {hits.map((hit) => (
        <Lyriclistitem
          key={hit.id}
          id={hit.id}
          artistName={hit.primary_artist.name}
          thumbnailUrl={hit.song_art_image_thumbnail_url}
          title={hit.title}
        />
      ))}
    </ul>
  );
});

import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { songDetails, songLyric } from '~/api/genius';
import { Error } from '~/components/Error/error';
import { Favoritebutton } from '~/components/FavoriteButton/favoritebutton';
import { Infobox } from '~/components/InfoBox/infobox';
import { Lyric } from '~/components/Lyric/lyric';
import { PageTemplate } from '~/components/PageTemplate/pagetemplate';
import { isError } from '~/guards';
import { getReleaseDateString } from '~/utils';

export const useSongData = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const songId = requestEvent.params.id ?? '';

  const lyricData = await songLyric(+songId ?? '');
  const details = await songDetails(+songId ?? '');

  return { lyricData, details };
});

export default component$(() => {
  const loc = useLocation();
  const id = loc.params.id;

  const { lyricData, details } = useSongData().value;

  let error = false;
  if (isError(lyricData) || isError(details) || !lyricData || !details) {
    return <Error text="Something went wrong while fetching data" />;
  }

  return (
    <PageTemplate>
      <div
        class="flex flex-col md:grid justify-center"
        style={{
          gridTemplateAreas: '"lyric info"',
          gridTemplateColumns: '1fr 15rem',
        }}
      >
        <div class="flex flex-col items-center" style={{ gridArea: 'lyric' }}>
          <div class="flex items-center">
            <h2 class="text-center">
              {lyricData?.lyrics?.tracking_data.title}
            </h2>
            <Favoritebutton
              id={+id}
              artist={details?.song?.primary_artist.name ?? ''}
              title={details?.song?.title ?? ''}
              thumbnailUrl={details?.song?.song_art_image_thumbnail_url ?? ''}
            />
          </div>
          <div class="md:hidden">
            <Infobox
              album={details?.song?.album.name ?? ''}
              artist={details?.song?.primary_artist.name ?? ''}
              imageUrl={details?.song?.song_art_image_url ?? ''}
              releaseDate={getReleaseDateString(
                details?.song?.release_date_components,
              )}
              title={details?.song?.title ?? ''}
              youtubeUrl={details?.song?.youtube_url}
            />
          </div>
          <Lyric htmlText={lyricData?.lyrics?.lyrics.body.html ?? ''} />
        </div>
        <div class="hidden md:flex">
          <Infobox
            album={details?.song?.album.name ?? ''}
            artist={details?.song?.primary_artist.name ?? ''}
            imageUrl={details?.song?.song_art_image_url ?? ''}
            releaseDate={getReleaseDateString(
              details?.song?.release_date_components,
            )}
            title={details?.song?.title ?? ''}
            youtubeUrl={details?.song?.youtube_url}
          />
        </div>
      </div>
    </PageTemplate>
  );
});

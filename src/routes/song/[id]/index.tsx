import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { songDetails, songLyric } from '~/api/genius';
import { Error } from '~/components/Error/error';
import { Infobox } from '~/components/InfoBox/infobox';
import { Lyric } from '~/components/Lyric/lyric';
import { PageTemplate } from '~/components/PageTemplate/pagetemplate';
import { isError } from '~/guards';
import { getReleaseDateString } from '~/utils';

export const useSongData = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const songId = requestEvent.params.id;
  const apiKey = requestEvent.env.get('API_KEY') ?? '';

  const lyricData = await songLyric(+songId, apiKey);
  const details = await songDetails(+songId, apiKey);

  return { lyricData, details };
});

export default component$(() => {
  const { lyricData, details } = useSongData().value;

  let errorMessage = '';
  if (isError(lyricData) || isError(details)) {
    if (isError(lyricData)) {
      errorMessage = lyricData.errorMessage;
    }
    if (isError(lyricData) && isError(details)) {
      errorMessage += ' and ';
    }
    if (isError(details)) {
      errorMessage += details.errorMessage;
    }

    return (
      <PageTemplate>
        <Error text={errorMessage} />
      </PageTemplate>
    );
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
            <h2 class="text-center">{lyricData?.lyrics.tracking_data.title}</h2>
          </div>
          <div class="md:hidden">
            <Infobox
              album={details.song.album.name}
              artist={details.song.primary_artist.name}
              imageUrl={details.song.song_art_image_url ?? ''}
              releaseDate={getReleaseDateString(
                details.song.release_date_components,
              )}
              title={details.song.title}
              youtubeUrl={details.song.youtube_url}
              spotifyUUID={details.song.spotify_uuid}
              soundcloudUrl={details.song.soundcloud_url}
            />
          </div>
          <Lyric htmlString={lyricData.lyrics.lyrics.body.html} />
        </div>
        <div class="hidden md:flex">
          <Infobox
            album={details.song.album.name}
            artist={details.song.primary_artist.name}
            imageUrl={details.song.song_art_image_url ?? ''}
            releaseDate={getReleaseDateString(
              details.song.release_date_components,
            )}
            title={details.song.title}
            youtubeUrl={details.song.youtube_url}
            spotifyUUID={details.song.spotify_uuid}
            soundcloudUrl={details.song.soundcloud_url}
          />
        </div>
      </div>
    </PageTemplate>
  );
});

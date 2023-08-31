import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';

import YoutubeLogo from '~/images/youtube.png?jsx';
import SpotifyLogo from '~/images/spotify.png?jsx';
import SoundCloudLogo from '~/images/soundcloud.png?jsx';

import { Externallink } from '../ExternalLink/externallink';

export interface InfoboxProps {
  artist: string;
  title: string;
  imageUrl: string;
  album: string;
  releaseDate: string;
  youtubeUrl?: string | null;
  spotifyUUID?: string | null;
  soundcloudUrl?: string | null;
}

export const Infobox = component$<InfoboxProps>(
  ({
    album,
    artist,
    imageUrl,
    releaseDate,
    title,
    youtubeUrl,
    spotifyUUID,
    soundcloudUrl,
  }) => {
    return (
      <div class="flex md:flex-col h-fit items-start gap-2 md:w-60 [grid-area:info] border border-white rounded p-4">
        <Image
          src={imageUrl}
          alt={`${title} album cover`}
          width={96}
          height={96}
          class="rounded-md w-[6rem] h-[6rem] md:w-full md:h-auto"
        />
        <div class="flex flex-col gap-1">
          <p class="text-gray">{`By: ${artist}`}</p>
          <p class="text-gray">{`Album: ${album}`}</p>
          <p class="text-gray">{`Released: ${releaseDate}`}</p>
          {youtubeUrl && (
            <Link
              class="flex gap-2 hover:underline pt-1 items-center"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div class="w-4 relative">
                <YoutubeLogo class="w-full h-auto block" />
              </div>
              <p class="text-gray">Youtube</p>
              <Externallink height={16} />
            </Link>
          )}
          {spotifyUUID && (
            <Link
              class="flex gap-2 hover:underline pt-1 items-center"
              href={`spotify://track/${spotifyUUID}`}
              target="_blank"
              rel="noreferrer"
            >
              <div class="w-4 relative">
                <SpotifyLogo class="w-full h-auto block" />
              </div>
              <p class="text-gray">Spotify</p>
              <Externallink height={16} />
            </Link>
          )}
          {soundcloudUrl && (
            <Link
              class="flex gap-2 hover:underline pt-1 items-center"
              href={soundcloudUrl}
              target="_blank"
              rel="noreferrer"
            >
              <div class="w-4 relative">
                <SoundCloudLogo class="w-full h-auto block" />
              </div>
              <p class="text-gray">SoundCloud</p>
              <Externallink height={16} />
            </Link>
          )}
        </div>
      </div>
    );
  },
);

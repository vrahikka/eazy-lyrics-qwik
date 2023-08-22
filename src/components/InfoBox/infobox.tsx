import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import { Youtubelogo } from '../YoutubeLogo/youtubelogo';
import { Externallink } from '../ExternalLink/externallink';

export interface InfoboxProps {
  artist: string;
  title: string;
  imageUrl: string;
  album: string;
  releaseDate: string;
  description: string;
  youtubeUrl?: string;
}

export const Infobox = component$<InfoboxProps>(
  ({
    album,
    artist,
    imageUrl,
    releaseDate,
    title,
    description,
    youtubeUrl,
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
              class="flex gap-2 hover:underline pt-1"
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Youtubelogo height={16} />
              <Externallink height={16} />
            </Link>
          )}
          <p class="text-gray">{`Released: ${releaseDate}`}</p>
        </div>
      </div>
    );
  },
);

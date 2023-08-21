import { component$ } from '@builder.io/qwik';
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { search } from '~/api/genius';
import { Error } from '~/components/Error/error';
import { PageTemplate } from '~/components/PageTemplate/pagetemplate';
import { Searchresults } from '~/components/SearchResults/searchresults';
import { isError } from '~/guards';

export const useSongSearch = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const songId = requestEvent.query.get('search') ?? '';
  const res = await search(songId);
  return res;
});

export default component$(() => {
  const location = useLocation();

  const searchString = location.url.searchParams.get('search') ?? '';
  const data = useSongSearch().value;

  const error = isError(data);

  return (
    <PageTemplate>
      <div class="flex flex-col items-center gap-8">
        <h2 class="text-center">{`Search hits for: ${searchString}`}</h2>
        {error ? (
          <Error text={data.message} />
        ) : (
          <Searchresults hits={data?.hits ?? []} />
        )}
      </div>
    </PageTemplate>
  );
});

import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import { Background } from '~/components/Background/background';
import { Footer } from '~/components/Footer/footer';
import { Navigation } from '~/components/Navigation/navigation';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <Navigation />
      <Background />
      <div class="flex flex-col items-center w-full h-full fixed md:pt-20 pt-40 overflow-y-auto overflow-x-hidden">
        <div class="flex flex-col items-center w-full max-w-[90rem] flex-grow flex-shrink md:m-8 m-4 px-8">
          <Slot />
        </div>
        <Footer />
      </div>
    </>
  );
});

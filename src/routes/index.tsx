import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PageTemplate } from '~/components/PageTemplate/pagetemplate';
import { Recentchips } from '~/components/RecentChips/recentchips';

export default component$(() => {
  return (
    <PageTemplate>
      <main class="flex flex-col items-center gap-8 md:gap-16 w-full">
        <Recentchips />
      </main>
    </PageTemplate>
  );
});

export const head: DocumentHead = {
  title: 'Easy Lyrics',
  meta: [
    {
      name: 'description',
      content: 'Easy and simple lyrics browser',
    },
  ],
};

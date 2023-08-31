import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Recentchip } from './recentchip';
import { getRecentSearches } from '~/localStorage';
import { Editbutton } from '../EditButton/editbutton';

export const Recentchips = component$(() => {
  const recentSearches = useSignal<string[]>();
  const editOn = useSignal(false);

  useVisibleTask$(async () => {
    console.log('useVisibleTask');
    recentSearches.value = getRecentSearches();
  });

  const onClick = $(() => {
    editOn.value = !editOn.value;
  });

  return (
    <div class="flex w-full flex-col items-center gap-8 bg-red-700">
      <div class="flex items-center">
        <h2 class="text-center">Recent searches</h2>
        <div class="md:hidden flex h-fit">
          <Editbutton onClick$={onClick} stateOn={editOn.value} />
        </div>
      </div>
      <div class="flex flex-wrap justify-center w-full gap-4">
        {recentSearches.value && recentSearches.value.length > 0 ? (
          <>
            {recentSearches.value.map((value) => (
              <Recentchip key={value} value={value} editOn={editOn.value} />
            ))}
          </>
        ) : (
          <p class="text-gray">No recent searches</p>
        )}
      </div>
    </div>
  );
});

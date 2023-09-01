import type { PropFunction } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { BsX } from '@qwikest/icons/bootstrap';

export interface ClosebuttonProps {
  onClick$: PropFunction<() => void>;
  parentClass?: string;
}

export const Closebutton = component$<ClosebuttonProps>((props) => {
  return (
    <button
      aria-label="Close"
      onClick$={props.onClick$}
      class={twMerge(
        'border border-white rounded-full bg-dark p-1 hover:border-secondary w-fit',
        props.parentClass,
      )}
    >
      <BsX class="w-4 h-4" />
    </button>
  );
});

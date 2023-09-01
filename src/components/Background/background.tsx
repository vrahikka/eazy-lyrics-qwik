import { component$ } from '@builder.io/qwik';
import BackgroundImage from '~/images/background.jpg?jsx';

export const Background = component$(() => {
  return (
    <div class="w-full h-full object-cover fixed top-0 left-0 z-[-1]">
      <BackgroundImage
        class="w-full h-full object-cover fixed top-0 left-0 z-[-1]"
        alt="Background"
        loading="eager"
        decoding="sync"
      />
    </div>
  );
});

import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';

export const Background = component$(() => {
  return (
    <div class="w-full h-full object-cover fixed top-0 left-0 z-[-1]">
      <Image
        class="w-full h-full object-cover fixed top-0 left-0 z-[-1]"
        src="/images/background.jpg"
        layout="constraint"
        width="4217"
        height="2758"
        alt="Background"
      />
    </div>
  );
});

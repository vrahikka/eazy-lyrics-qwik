import { Image } from '@unpic/qwik';
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Search } from '../Search/search';

export const Navigation = component$(() => {
  return (
    <nav
      style={{
        gridTemplateAreas: '"logo extra" "search search"',
        background:
          'linear-gradient(240deg, rgba(50, 50, 50, 0.70) 0%, rgba(66, 66, 66, 0.50) 100%)',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
      class="w-full md:flex md:justify-between md:gap-8 p-2 md:h-[5rem] [display:grid] grid-rows-[4rem_4rem] justify-items-start grid-cols-[2fr_1fr]  items-center  bg-dark text-white sticky top-0 z-10"
    >
      <Link
        href="/"
        class="text-4xl flex flex-shrink-0 [grid-area:logo]"
        aria-label="Home"
      >
        <div class="flex items-center gap-4 uppercase">
          <Image
            class="w-auto h-[50px]"
            src="/images/logo.png"
            layout="constraint"
            width="448"
            height="124"
            alt="Background"
          />
        </div>
      </Link>
      <Search />
      <div class="flex gap-4 justify-self-end [grid-area:extra]">
        {/* <FavoriteLinkButton /> */}
        {/* <LoginButton /> */}
      </div>
    </nav>
  );
});

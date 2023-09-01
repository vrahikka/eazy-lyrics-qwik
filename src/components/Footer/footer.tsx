import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { BsEnvelope, BsLinkedin } from '@qwikest/icons/bootstrap';

export interface FooterProps {}

export const Footer = component$<FooterProps>(() => {
  return (
    <footer
      class="flex flex-col gap-4 items-center justify-center w-full p-8 relative"
      style={{
        background:
          'linear-gradient(240deg, rgba(50, 50, 50, 0.70) 0%, rgba(66, 66, 66, 0.50) 100%)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
    >
      <div class="flex gap-4 items-center">
        <a
          href="http://www.linkedin.com/in/ville-rahikka-728707b1"
          target="_blank"
          rel="noreferrer"
          class="text-gray"
          aria-label="Mail"
        >
          <BsLinkedin class="fill-white h-5 w-5" />
        </a>
        <a
          href="mailto:ville.a.rahikka@gmail.com"
          class="text-gray"
          aria-label="Contact"
        >
          <BsEnvelope class="fill-white h-5 w-5" />
        </a>
      </div>
      <div class="flex gap-4">
        <Link href="/" class="text-gray" aria-label="Home">
          Home
        </Link>
        <Link href="/favorites" class="text-gray" aria-label="Favorites">
          Favorites
        </Link>
        <Link href="/login" class="text-gray" aria-label="Login">
          Login
        </Link>
      </div>
      <p class="text-xs">©2023 Ville Rahikka. All rights reserved.</p>
    </footer>
  );
});

import { component$ } from '@builder.io/qwik';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export interface LyricProps {
  htmlText: string;
}

export const Lyric = component$<LyricProps>(({ htmlText }) => {
  const { window } = new JSDOM('');
  const purify = DOMPurify(window);
  const sanitizedLyrics = purify
    .sanitize(htmlText)
    .replace(/\[(.*?)](?:<br>|<p>)/g, (match, p1) => {
      let className = '';
      if ((p1.toLowerCase() as string).includes('pre-chorus')) {
        className = 'other special';
      } else if ((p1.toLowerCase() as string).includes('chorus')) {
        className = 'chorus special';
      } else {
        className = 'other special';
      }

      return `<p class="${className}">${match}</p>`;
    })
    .replace(/\[|\]/g, '');

  const doc = new window.DOMParser().parseFromString(
    sanitizedLyrics,
    'text/html',
  );

  doc.querySelectorAll('a').forEach((anchor) => {
    const p = doc.createElement('p');
    p.innerHTML = anchor.innerHTML;
    anchor.replaceWith(p);
  });
  doc.querySelectorAll('i').forEach((anchor) => {
    anchor.remove();
  });
  return (
    <div
      class="flex-col pb-[20rem] items-center text-center [&_.special]:underline [&_.special]:text-lightGray [&_.special]:mb-4 [&_.special]:decoration-2 [&_.chorus]:decoration-primary [&_.other]:decoration-secondary"
      dangerouslySetInnerHTML={doc.body.innerHTML}
    />
  );
});

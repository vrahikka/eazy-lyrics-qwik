import * as cheerio from 'cheerio';
import { component$ } from '@builder.io/qwik';

export interface LyricProps {
  htmlString: string;
}

export const Lyric = component$<LyricProps>(({ htmlString }) => {
  const $ = cheerio.load(htmlString);

  $('a').each(() => {
    const content = $(this).html(); // You can use .text() if you want just the text content
    const pElement = $('<p></p>').html(content ?? '');
    $(this).replaceWith(pElement);
  });

  $('p').each(() => {
    let textContent = $(this).html() ?? '';

    textContent = textContent
      .replace(/\[(.*?)](?:<br>|<p>)/g, (match, p1) => {
        let className = '';
        if (p1.toLowerCase().includes('pre-chorus')) {
          className = 'other special';
        } else if (p1.toLowerCase().includes('chorus')) {
          className = 'chorus special';
        } else {
          className = 'other special';
        }

        return `<p class="${className}">${match}</p>`;
      })
      .replace(/\[|\]/g, '');

    $(this).html(textContent);
  });

  const newHtmlText = $.html();

  return (
    <div
      class="flex-col pb-[20rem] items-center text-center [&_.special]:underline [&_.special]:text-lightGray [&_.special]:mb-4 [&_.special]:decoration-2 [&_.chorus]:decoration-primary [&_.other]:decoration-secondary"
      dangerouslySetInnerHTML={newHtmlText}
    />
  );
});

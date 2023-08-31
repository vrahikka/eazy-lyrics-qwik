import { component$, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { deleteRecentSearch } from '~/localStorage';
import { Closebutton } from '../CloseButton/closebutton';
import { twMerge } from 'tailwind-merge';

export interface RecentchipProps {
  value: string;
  editOn?: boolean;
}

export const Recentchip = component$<RecentchipProps>((props) => {
  const nav = useNavigate();

  const onClick = $(async () => {
    await nav(`/search?search=${props.value}`);
  });

  const onCloseClick = $(async () => {
    deleteRecentSearch(props.value);
    nav();
  });

  const closeStyle = props.editOn ? 'visible' : 'invisible';

  return (
    <div class="[&_.close]:hover:visible relative">
      <button
        aria-label={`${props.value} recent`}
        onClick$={onClick}
        class="bg-dark border hover:border-secondary  border-primary rounded-full p-2 relative"
      >
        {props.value}
      </button>
      <Closebutton
        onClick$={onCloseClick}
        parentClass={twMerge(
          'close invisible absolute -top-2 -right-2',
          closeStyle,
        )}
      />
    </div>
  );
});

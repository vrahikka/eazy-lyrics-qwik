import { component$ } from '@builder.io/qwik';

export interface ErrorProps {
  text: string;
}

export const Error = component$<ErrorProps>(({ text }) => {
  return (
    <div class="flex-col text-center">
      <p>{text}</p>
    </div>
  );
});

import type { PropFunction } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';

export interface InputfieldProps {
  onChange$: PropFunction<() => void>;
  placeholder: string;
  value: string;
  id: string;
  type?: string;
  label?: string;
  className?: string;
}

export const Inputfield = component$<InputfieldProps>(
  ({
    onChange$,
    value,
    label,
    placeholder,
    id,
    className,
    type = 'text',
  }: InputfieldProps) => {
    return (
      <label class="flex flex-col flex-grow justify-center w-full">
        {label}
        <input
          type={type}
          id={id}
          value={value}
          onChange$={onChange$}
          class={twMerge(
            'flex flex-shrink p-2 rounded text-white w-full bg-black focus:outline-none focus:ring-1 focus:ring-secondary',
            className,
          )}
          placeholder={placeholder}
        />
      </label>
    );
  },
);

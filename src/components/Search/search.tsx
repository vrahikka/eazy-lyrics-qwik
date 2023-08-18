import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form, useLocation, useNavigate } from '@builder.io/qwik-city';

export const Search = component$(() => {
  const inputValue = useSignal('');
  const nav = useNavigate();
  const location = useLocation();

  const onSearch = $(async () => {
    if (
      (inputValue &&
        inputValue.value !== location.url.searchParams.get('search')) ||
      ''
    ) {
      // setRecentSearch(inputValue);
      console.log(inputValue.value);
      await nav(`/search?search=${inputValue.value}`);
    }
  });

  return (
    <Form
      class="flex justify-center gap-4 w-full flex-basis-[38rem] md:max-w-[38rem] [grid-area:search]"
      onSubmit$={onSearch}
    >
      <label class="flex flex-col flex-grow justify-center w-full">
        <input
          type="text"
          id="search"
          value={inputValue.value}
          onChange$={(e) => (inputValue.value = e.target.value)}
          class="flex flex-shrink p-2 rounded text-white w-full bg-black focus:outline-none focus:ring-1 focus:ring-secondary"
          placeholder="Search"
        />
      </label>
      <input
        type="button"
        onClick$={onSearch}
        value="Search"
        class="p-2 rounded ring-1 ring-primary hover:cursor-pointer hover:ring-secondary"
      />
    </Form>
  );
});

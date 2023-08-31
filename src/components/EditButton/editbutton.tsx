import { PropFunction, component$ } from '@builder.io/qwik';
import { BsPencil } from '@qwikest/icons/bootstrap';

export interface EditbuttonProps {
  stateOn: boolean;
  onClick$: PropFunction<() => void>;
}

export const Editbutton = component$<EditbuttonProps>((props) => {
  return (
    <button onClick$={props.onClick$} aria-label="Edit">
      <BsPencil
        class={`w-6 h-6 ${
          props.stateOn ? 'fill-secondary' : 'fill-white'
        } hover:fill-button-hoverBackgroundGray`}
      />
    </button>
  );
});

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cellCss } from 'src/board';
  import type { Board, Cell, Pos } from 'src/board';
  import { char_mark, show_hidden } from 'src/utils/constants';

  export let text: Cell['text'];
  export let status: Cell['status'] = 'hidden';
  export let type: Cell['type'];

  export let board: Board;
  export let pos: Pos;

  let cellText = '';
  $: {
    if (status == 'marked') cellText = char_mark;
    else if ((status == 'hidden' || text == '0') && show_hidden) cellText = '';
    else cellText = text;
  }

  let dispatch =
    createEventDispatcher<{
      mark: void;
    }>();
  function handleMark() {
    dispatch('mark');
  }
</script>

<div
  class={`
  cell
  w-8 h-8
  md:(w-12 h-12)
  group
  ${status == 'open' && 'bg-white'}
  ${status != 'open' && 'bg-gray-100 text-gray-300'}
`}
>
  <div
    on:click
    on:contextmenu|preventDefault={handleMark}
    class={`
      w-full h-full 
      text-xl
      grid place-items-center
      ${status == 'open' && 'bg-gray-100'}
      ${
        status != 'open' &&
        'bg-white text-gray-300 border-purple-300 group-hover:(border-1) cursor-pointer'
      }
      ${cellCss(board, pos)}
      rounded-tr-0 rounded-br-0 rounded-bl-0 rounded-tl-0
    `}
  >
    {cellText}
  </div>
</div>

<style>
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { GameEndStatus } from 'src/board';

  let status: GameEndStatus = 'win';
  let isVisible = false;

  let dispatch = createEventDispatcher();

  function handleRetry() {
    isVisible = false;
    dispatch('retry');
  }

  export function show(_status: GameEndStatus) {
    isVisible = true;
    status = _status;
  }
</script>

<div
  class={`
    bg-white
    rounded-xl
    h-40
    transition-opacity
    ${
      isVisible
        ? 'overflow-visible px-6 py-4 ml-40 w-80 opacity-100'
        : 'overflow-hidden px-0 py-0 ml-0 w-0 opacity-0'
    }
  `}
>
  <div class="">
    <h1 class="mb-2 text-xl font-bold">Game over!</h1>
    <div class="mb-4">You {status == 'win' ? 'win!! 🎉🎉' : 'lose 😭💔'}</div>
    <button
      on:click={handleRetry}
      class="
      px-6 py-3
      w-full
      bg-purple-400
      text-white
      font-semibold
      tracking-wide
      rounded-xl">One more time!</button
    >
  </div>
</div>

<script lang="ts">
  import EndMessage from 'src/lib/EndMessage.svelte';
  import Game from 'src/lib/Game.svelte';
  import type { GameEndStatus } from 'src/board';

  let game: Game;
  function handleRetry() {
    game.retry();
  }

  let endMessage: EndMessage;
  function handleGameEnd({ detail: status }: CustomEvent<GameEndStatus>) {
    endMessage.show(status);
  }
</script>

<main class="bg-gray-100 flex">
  <div class={`flex-grow h-screen flex items-center justify-center transition-all`}>
    <Game bind:this={game} on:end={handleGameEnd} />
    <EndMessage bind:this={endMessage} on:retry={handleRetry} />
  </div>
</main>

<style>
</style>

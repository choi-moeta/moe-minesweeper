<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Cell from 'src/lib/Cell.svelte';
  import {
    clickBoard,
    createBoard,
    isLose as isLoseBoard,
    isWon as isWonBoard,
    markBoard,
    showAllBombs,
  } from 'src/board';
  import type { Pos, GameEndStatus } from 'src/board';
  import { board_size, bombs_count } from 'src/utils/constants';

  export let size = board_size;
  export let bombs = bombs_count;

  let dispatch =
    createEventDispatcher<{
      end: GameEndStatus;
    }>();

  let board = createBoard(size, bombs);

  let isGameEnd = false;

  function handleClick(pos: Pos) {
    if (isGameEnd) return;

    if (isLoseBoard(board, pos)) {
      endGame('lose');
      board = showAllBombs(board);
    }

    board = clickBoard(board, pos);

    if (isWonBoard(board)) {
      endGame('win');
    }
  }

  function handleMark(pos: Pos) {
    board = markBoard(board, pos);
  }

  function endGame(status: GameEndStatus) {
    isGameEnd = true;
    dispatch('end', status);
  }

  export function retry() {
    isGameEnd = false;
    board = createBoard(11, 11);
  }
</script>

<div class="flex flex-col rounded-xl overflow-hidden">
  {#each board as row, y}
    <div class="flex flex-row">
      {#each row as cell, x}
        <Cell
          on:click={e => handleClick([x, y])}
          on:mark={() => handleMark([x, y])}
          {...cell}
          {board}
          pos={[x, y]}
        />
      {/each}
    </div>
  {/each}
</div>

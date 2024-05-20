<script lang="ts">
  import { onMount } from 'svelte';
  import { classNames } from '@/tools/classNames';
  import Clickable from '@/board/lib/Clickable.svelte';
  import type { TBoard } from '@/board/types';
  import type { TGraph } from '@/graph/types';
  import Link from './Link.svelte';
  import Node from './Node.svelte';

  const block = 'fnx-graph';

  export let graph: TGraph;
  export let board: TBoard;

  // let target: HTMLElement;

  $: links = graph.store.linkIds;
  $: nodes = graph.store.nodeIds;

  $: position = board.store.position;
  $: size = board.store.size;
  $: scale = board.store.scale;

  onMount(() => {
    // Keyboard(board);
    // Mouse(target, board);
  });
</script>

<section class={block}>
  <Clickable
    className={classNames({ block, element: 'container' })}
    onClick={board.selected.clear}
  >
    <div
      class={classNames({ block, element: 'content' })}
      style={[
        `left: -${$position.x}px; top: -${$position.y}px;`,
        `width: ${$size.width}px; height: ${$size.height}px;`,
        `transform: scale(${$scale})`,
      ].join(' ')}
    >
      {#each $links ?? [] as id}
        <Link {board} {graph} {id} />
      {/each}
      {#each $nodes ?? [] as id}
        <Node {board} {graph} {id} />
      {/each}
    </div>
  </Clickable>
</section>

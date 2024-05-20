<script lang="ts">
  import { readable } from 'svelte/store';
  import { classNames } from '@/tools/classNames';
  import Clickable from '@/board/lib/Clickable.svelte';
  import type { TBoard } from '@/board/types';
  import type { TGraph } from '@/graph';

  const block = 'fnx-link';

  export let board: TBoard;
  export let graph: TGraph;
  export let id: string;

  $: link = graph.links.get(id);
  $: selected = board.selected.watch(id);
  $: temp = link?.store.temp;
  $: points = link?.connections.list().map((conn) => conn.store.position);
  $: [origin, destination] = points ?? [
    readable({ x: 0, y: 0 }),
    readable({ x: 0, y: 0 }),
  ];
</script>

<Clickable
  className={classNames({ block, element: 'container' })}
  onClick={() => {
    board.selected.set(id, true);
  }}
>
  {#if origin && destination}
    <svg class={block}>
      <path
        class={classNames({
          block,
          element: 'path',
          modifiers: [
            {
              hoverable: !temp,
              selected: $selected,
            },
          ],
        })}
        d={`
  M ${$origin.x} ${$origin.y}
  C ${$origin.x + 80} ${$origin.y},
    ${$destination.x - 80} ${$destination.y},
    ${$destination.x} ${$destination.y}
`}
      />
      <!-- <line
    class="stroke-current"
    x1={$source.x}
    y1={$source.y}
    x2={$target.x}
    y2={$target.y}
    stroke-width="2"
  /> -->
    </svg>
  {/if}
</Clickable>

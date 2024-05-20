<script lang="ts">
  import { classNames } from '@/tools/classNames';
  import Clickable from '@/board/lib/Clickable.svelte';
  import Draggable from '@/board/lib/Draggable.svelte';
  import type { TBoard } from '@/board/types';
  import type { TGraph } from '@/graph';
  import Port from './Port.svelte';

  const block = 'fnx-node';

  export let id: string;
  export let board: TBoard;
  export let graph: TGraph;

  $: node = graph.nodes.get(id);
  $: position = node?.store.position;
  $: selected = board.selected.watch(id);
</script>

{#if node && $position}
  <Draggable position={$position}>
    <Clickable
      className={classNames({ block, element: 'container' })}
      onClick={() => {
        board.selected.set(id, true);
      }}
    >
      <div
        {id}
        class={classNames(
          { block, modifiers: [{ selected: $selected }] },
          'fnx-graph__draggable',
        )}
        data-type="node"
      >
        <!-- HEADER -->
        <div class={classNames({ block, element: 'header' })}>
          <div class={classNames({ block, element: 'title' })}>
            {node.schema.title}
          </div>
        </div>

        <!-- BODY -->
        <div class={classNames({ block, element: 'body' })}>
          {#each node.ports.list() as port}
            <Port {port} />
          {/each}
        </div>
      </div>
    </Clickable>
  </Draggable>
{/if}

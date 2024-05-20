<script lang="ts">
  import { onMount } from 'svelte';
  import type { Port } from '@/units/Port';
  import { classNames } from '@/tools/classNames';

  const block = 'fnx-port';
  export let port: Port;
  const schema = port.schema;
  let ref: HTMLDivElement;

  $: connected = port.store.connected;

  onMount(() => {
    const node = ref.closest('.fnx-node')!;
    const nodeRect = node.getBoundingClientRect();
    const portRect = ref.getBoundingClientRect();

    port.store.offset.set({
      x: portRect.left + portRect.width / 2 - nodeRect.left,
      y: portRect.top + portRect.height / 2 - nodeRect.top,
    });
  });
</script>

<div class={block}>
  <div
    class={classNames({
      block,
      element: 'label',
      modifiers: [schema.direction],
    })}
  >
    {schema.label ?? schema.type}
  </div>

  <div
    bind:this={ref}
    class={classNames(
      {
        block,
        element: 'connector',
        modifiers: [schema.direction, { connected: $connected }],
      },
      'fnx-graph__draggable',
    )}
    id={port.id}
    data-type="port"
  />
</div>

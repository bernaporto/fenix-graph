<script lang="ts">
  export let onClick: VoidFunction;
  export let className: string = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div
  class={className}
  on:click={(evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    onClick();
  }}
>
  <slot />
</div>

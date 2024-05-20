<script lang="ts">
  import { classNames } from '@/tools/classNames';
  import type { TPoint } from '@/types';

  export let position: TPoint;
  export let className: string | null = null;
</script>

<div
  class={classNames('fnx-draggable', className)}
  style={`left: ${position.x}px; top: ${position.y}px;`}
>
  <slot />
</div>

<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="centererBox">
  <div class="fillerElement"></div>
  <div class="mainElement">
    {@render children?.()}
  </div>
  <div class="fillerElement"></div>
</div>

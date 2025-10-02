<script lang="ts">
  const { name } = $props();
</script>

{#if name == "Derek Verduijn"}
  Terve! Olen Derek. I like Finnish, mathematics and coding. I mainly
  contribute to this very website, so I hope you like it!
{:else}
  Text here plss!!!!
{/if}

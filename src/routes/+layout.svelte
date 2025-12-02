<script lang="ts">
  import generalData from "$lib/generalData.json" with { type: "json" };

  const { children } = $props();
</script>

{@render children()}

<h2>Hier zijn linkjes naar andere pagina's</h2>
{#each Object.entries(generalData.pages) as [pagename, link]}
  <a href={link}>
    <div class="button1">
      <p class="nob not">{pagename}</p>
    </div>
  </a>
{/each}

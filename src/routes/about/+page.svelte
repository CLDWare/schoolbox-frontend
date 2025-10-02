<script lang="ts">
  import AboutComponent from "$lib/aboutComponent.svelte";
  import { aboutUs } from "./about.ts";
</script>

<h1>About us!</h1>

{#each aboutUs as contributor}
  <a href={contributor.domain}><h2 class="noBottom">{contributor.name}</h2></a>
  <h3 class="noTop">
    AKA {contributor.username}
  </h3>
  <AboutComponent name={contributor.name} />
{/each}

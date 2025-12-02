<script lang="ts">
  import { randomInt } from "$lib/index.ts";

  const titles = [
    "Ik ben een titel",
    "I am a title",
    "Je suis une titre",
    "Ich bin ein Titel",
    "Jag är en tittel",
    "Minä olen titteli",
    "Es esmu tituls",
  ] as const;
</script>

<h1>{titles[randomInt(0, titles.length - 1)]}</h1>

<p>Hier komt tekst op de main page</p>

<h2>Login link hier</h2>

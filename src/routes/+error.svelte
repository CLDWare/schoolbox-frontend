<script lang="ts">
  import { page } from "$app/state";

  const emojis: Record<number, string> = {
    404: "❓",
    420: "🫠",
    500: "💥",
  };
</script>

<h1>Whoops!</h1>
<h2>Something went wrong!</h2>
<p>
  Error code: {page.status}, {page.error?.message}
</p>
<h1>{emojis[page.status ?? 500]}</h1>

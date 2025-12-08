<script lang="ts">
  import { setContext } from "svelte";

  // Dit moet automatisch redirecten naar de google login
  // De cookie of wat dan vorm van auth dan ook moet worden opgeslagen in de context
  setContext("authkey", { auth: "auth key hier" });
</script>

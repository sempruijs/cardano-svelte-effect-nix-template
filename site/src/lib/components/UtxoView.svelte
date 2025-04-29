<script lang="ts">
  import type { Utxo } from '$lib/types';
  import UtxoDisplay from "./UtxoDisplay.svelte";


  export let utxos: Utxo[];
</script>

<ul>
  {#each utxos as utxo}
    <UtxoDisplay utxo={utxo} />
  {/each}
</ul>


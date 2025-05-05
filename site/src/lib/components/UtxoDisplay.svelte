<script lang="ts">
  import type { Utxo } from '$lib/types';

  export let utxo: Utxo;
</script>

<div class="">
  <p><strong>Tx Hash:</strong> {utxo.input.txHash}</p>
  <p><strong>Output Index:</strong> {utxo.input.outputIndex}</p>
  <p><strong>Address:</strong> {utxo.output.address}</p>

  <div class="">
    <strong>Amount:</strong>
    <ul class="">
      {#each utxo.output.amount as asset}
        <li>{asset.unit}: {asset.quantity}</li>
      {/each}
    </ul>
  </div>
</div>

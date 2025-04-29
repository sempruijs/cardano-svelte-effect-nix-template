<script lang="ts">
  import type { Utxo } from '$lib/types';

  export let utxo: Utxo;
</script>

<div class="mesh-bg-gray-800 mesh-rounded-lg mesh-p-4 mesh-my-2 mesh-text-left">
  <p><strong>Tx Hash:</strong> {utxo.input.txHash}</p>
  <p><strong>Output Index:</strong> {utxo.input.outputIndex}</p>
  <p><strong>Address:</strong> {utxo.output.address}</p>

  <div class="mesh-mt-2">
    <strong>Amount:</strong>
    <ul class="mesh-text-sm mesh-text-gray-300">
      {#each utxo.output.amount as asset}
        <li>{asset.unit}: {asset.quantity}</li>
      {/each}
    </ul>
  </div>
</div>

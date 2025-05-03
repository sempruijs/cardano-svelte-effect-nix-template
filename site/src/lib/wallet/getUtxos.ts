import { Effect } from "effect";
import type { BrowserWallet } from "@meshsdk/core";
import type { Utxo } from "../types";

export function getUtxos(wallet: BrowserWallet): Effect.Effect<Utxo[], Error, never> {
  return Effect.tryPromise({
    try: async () => {
      const utxos = await wallet.getUtxos();
      return utxos as Utxo[];
    },
    catch: (e) => new Error("Failed to fetch UTXOs: " + String(e))
  });
}

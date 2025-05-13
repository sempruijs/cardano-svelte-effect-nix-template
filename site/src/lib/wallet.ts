import { Effect, Context } from "effect"
import type { BrowserWallet } from "@meshsdk/core";
import type { Utxo } from "./types"

export class Wallet extends Context.Tag("Wallet")<
  Wallet,
  {
    readonly getUtxos: Effect.Effect<Utxo[], Error>,
    readonly getChangeAddress: Effect.Effect<string, Error>,
    readonly signTx: (tx: string, partialSign?: boolean) => Effect.Effect<string, Error>
  }
>() {}

export function provideWallet(wallet: BrowserWallet) {
  return Effect.provideService(Wallet, {
    getUtxos: Effect.tryPromise({
      try: async () => await wallet.getUtxos(),
      catch: (e) => new Error(`Failed to fetch UTXOs: ${String(e)}`)
    }),
    getChangeAddress: Effect.tryPromise({
      try: async () => await wallet.getChangeAddress(),
      catch: (e) => new Error(`Failed to fetch change address: ${String(e)}`)
    }),
    signTx: (tx: string, partialSign = true) =>
      Effect.tryPromise({
        try: async () => await wallet.signTx(tx, partialSign),
        catch: (e) => new Error(`Failed to sign transaction: ${String(e)}`)
      }),
  });
}

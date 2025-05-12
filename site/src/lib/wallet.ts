import { Effect, Context } from "effect"
import type { BrowserWallet } from "@meshsdk/core";
import type { Utxo } from "./types"

export class Wallet extends Context.Tag("Wallet")<
  Wallet,
  { readonly getUtxos: Effect.Effect<Utxo[], Error> }
>() {}

export function provideWallet(wallet: BrowserWallet) {
  return Effect.provideService(Wallet, {
    getUtxos: Effect.tryPromise({
      try: async () => await wallet.getUtxos(),
      catch: (e) => new Error(`Failed to fetch UTXOs: ${String(e)}`)
    })
  })
}

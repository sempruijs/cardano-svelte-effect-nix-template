# Cardano Svelte Effect Nix Template

Don't waste time setting up your development enviourment.
Start building your dApp for cardano.
You can visit [the website](https://sempruijs.github.io/cardano-svelte-effect-nix-template/) to see a working template.

### Motivation

I saw [Cor's svelte effect nix template](https://github.com/cor/svelte-effect-nix-template) and it helped me getting started with svelte.
I wanted to get started building dApps with meshjs but it was painful getting a working enviourment.
After a long time fixing bugs that I did not want to fix I've thought lets make a template so that other cardano developers can build dApps faster.

## What's in the template?

- svelte as the framework
- meshjs for interacting with cardano wallets
- tailwindcss for easy css
- typescript effect for writing robust typescript.
- nix flakes for reproducable developer enviourment and builds.
- github pages action for deployen the nix derivation as a static site.

## Getting started

Fork and clone the template.

### With Nix

The best way to use this template is with Nix flakes.
Then you can:

1. Enter a devshell

```bash
nix develop
```

2. Run a dev server

```bash
nix run .#dev
```

3. Build the app as a static website.

```bash
nix build
```

4. Build the static website and preview the build on localhost:

```bash
nix run
```

### Without Nix

Do not delete flake.nix and flake.lock. These files are needed to deploy the static site to github pages.
Although highly recommand using Nix if you want to build robust application, you can use this template without nix.
Install npm and you can:

1. run the dev server

```bash
cd site
npm run dev
```

2. Build the static website

```bash
cd site
npm run build
```
### Contributing

Any contributations are welcome.
Feel free to open a pull request or issue.

### License

MIT License

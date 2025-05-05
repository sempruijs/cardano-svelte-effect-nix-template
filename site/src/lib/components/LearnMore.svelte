<script lang="ts">
  const links = [
    {
      title: "TypeScript + Effect",
      url: "https://effect.website/",
      description: "Official Effect guide for functional TypeScript programming."
    },
    {
      title: "Learn Svelte",
      url: "https://learn.svelte.dev",
      description: "Interactive Svelte tutorial by the core team."
    },
    {
      title: "Learn Mesh SDK",
      url: "https://meshjs.dev/",
      description: "Guides for building dApps on Cardano with Mesh."
    },
    {
      title: "Learn Nix Flakes",
      url: "https://zero-to-nix.com/",
      description: "NixOS Wiki: everything you need to know about flakes."
    }
  ];
</script>

<div class="">
  <h1 class="">📚 Learn More</h1>

  <div class="">
    {#each links as { title, url, description }}
      <a
        class=""
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 class="">{title}</h2>
        <p class="">{description}</p>
      </a>
    {/each}
  </div>
</div>

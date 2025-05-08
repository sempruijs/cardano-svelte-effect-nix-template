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

<div class="mesh-text-white mesh-bg-gray-900 mesh-p-10 mesh-min-h-screen">
  <h1 class="mesh-text-4xl mesh-font-bold mesh-mb-8">📚 Learn More</h1>

  <div class="mesh-grid mesh-gap-6 mesh-grid-cols-1 md:mesh-grid-cols-2">
    {#each links as { title, url, description }}
      <a
        class="mesh-block mesh-bg-gray-800 mesh-rounded-lg mesh-p-5 mesh-border mesh-border-gray-600 hover:mesh-border-sky-500 hover:mesh-scale-105 mesh-transition"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 class="mesh-text-xl mesh-font-semibold mesh-mb-2">{title}</h2>
        <p class="mesh-text-gray-400">{description}</p>
      </a>
    {/each}
  </div>
</div>

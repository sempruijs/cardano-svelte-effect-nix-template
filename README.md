Here’s a comprehensive README.md for your repository, cardano-svelte-effect-nix-template, highlighting its features and providing guidance on using it with Nix:

⸻

Cardano Svelte Effect Nix Template

A fully reproducible, Nix-powered template integrating Svelte and Effect, tailored for building Cardano-related applications with a modern frontend stack. ￼

🚀 Features
• Reproducible Builds: Leverages Nix flakes to ensure consistent builds across environments.
• Svelte Integration: Utilizes Svelte for a reactive and efficient frontend experience.
• Effect Integration: Incorporates the Effect library for robust functional programming capabilities.
• Cardano Compatibility: Pre-configured to facilitate development of Cardano-centric applications.
• Development Environment: Provides a comprehensive dev shell with essential tools.
• Testing Suite: Includes Vitest for unit and integration testing.
• Code Formatting: Employs Prettier and nixpkgs-fmt for consistent code styling. ￼ ￼

🧰 Getting Started

Prerequisites

Ensure you have the following installed:
• Nix with experimental features enabled:

mkdir -p ~/.config/nix
echo 'experimental-features = nix-command flakes' >> ~/.config/nix/nix.conf

    •	Direnv (optional but recommended for environment management)

Initialization

To create a new project using this template:

nix flake init -t github:sempruijs/cardano-svelte-effect-nix-template

This command initializes a new Nix flake based on the template. ￼

🛠️ Development

Entering the Development Shell

To enter a development environment with all necessary tools: ￼

nix develop

This shell includes: ￼
• Node.js and npm
• TypeScript
• Svelte Language Server
• Tailwind CSS Language Server
• Prettier
• Vitest ￼

Running the Development Server

To start the development server with hot module replacement: ￼

nix run .#dev

This will launch the Vite development server, typically accessible at http://localhost:5173.

🧪 Testing

To execute the test suite:

nix run .#test

This runs all tests using Vitest, ensuring your application behaves as expected. ￼

🏗️ Building

To build the application for production:

nix build

The output will be located in the ./result directory. ￼

🌐 Previewing

To preview the built application: ￼

nix run

This serves the application using miniserve at http://localhost:8080, supporting single-page application (SPA) routing. ￼

🎨 Formatting

To format the codebase: ￼

nix fmt

This command formats: ￼
• TypeScript, JavaScript, JSON, Markdown, Svelte, HTML, and CSS files using Prettier
• Nix files using nixpkgs-fmt ￼

📄 License

This project is licensed under the Apache-2.0 License.

⸻

For more details and updates, visit the GitHub repository.

⸻

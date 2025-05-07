<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

export const prerender = true;

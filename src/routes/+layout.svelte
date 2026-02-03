<script lang="ts">
	import '../app.css';
    import { onMount } from 'svelte';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    injectSpeedInsights();

    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<div class="min-h-screen text-blueprint-text font-mono selection:bg-blueprint-blue selection:text-black">
	<slot />
</div>

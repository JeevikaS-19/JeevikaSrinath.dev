<script lang="ts">
	import '../app.css';
    import { onMount } from 'svelte';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';

    injectSpeedInsights();
    injectAnalytics();

    let mounted = false;
    onMount(() => {
        setTimeout(() => {
            mounted = true;
        }, 2000);
    });
</script>

<div class="min-h-screen text-blueprint-text font-mono selection:bg-blueprint-blue selection:text-black">
    {#if !mounted}
        <div class="fixed inset-0 z-50 bg-blueprint-dark flex flex-col items-center justify-center">
            <div class="text-blueprint-blue font-bold tracking-widest text-xl mb-4 animate-pulse">
                &gt; SYSTEM_BOOT_SEQUENCE
            </div>
            <div class="w-48 h-1 bg-blueprint-grid relative overflow-hidden">
                <div class="absolute inset-0 bg-blueprint-blue w-full transform -translate-x-full animate-[progress_2s_ease-in-out_forwards]"></div>
            </div>
            <div class="mt-4 text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                Initializing Blueprint Engine...
            </div>
        </div>
    {/if}
	<slot />
</div>

<style>
    @keyframes progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
    }
</style>

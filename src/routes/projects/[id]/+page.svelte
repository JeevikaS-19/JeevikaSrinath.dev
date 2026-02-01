<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import projects from '$lib/data/projects.json';

  // 1. Reactive data: Updates whenever the URL ID changes
  $: project = projects.find(p => p.id === $page.params.id);
  $: nodes = project?.blueprint?.nodes || [];
  $: edges = project?.blueprint?.edges || [];

  let flowInstance: any;

  // 2. The "Double-Tick" Fix: Forces the map to center only AFTER the browser paints
  async function forceCenter() {
    await tick(); // Wait for Svelte state
    setTimeout(() => {
      if (flowInstance) flowInstance.fitView();
    }, 100); // Small delay to let Tailwind finish the layout
  }

  onMount(() => forceCenter());
  $: if ($page.params.id) forceCenter(); // Re-run when switching projects
</script>

<div class="min-h-screen flex flex-col">
  <!-- Top Bar -->
  <div class="border-b border-blueprint-grid bg-blueprint-dark/90 backdrop-blur sticky top-0 z-20">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" data-sveltekit-reload class="text-blueprint-blue hover:text-white transition-colors text-sm font-bold">
        &lt; RETURN_TO_BASE
      </a>
      <div class="text-white font-mono text-sm">
        FILE: {($page.params.id || 'UNKNOWN').toUpperCase()}.JSON
      </div>
    </div>
  </div>

  <main class="flex-grow max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- Left Column: Specs -->
    <div class="lg:col-span-1 space-y-8">
      {#if project}
        <div>
          <h1 class="text-4xl font-bold text-white mb-2">{project.title}</h1>
          <p class="text-blueprint-gold text-lg mb-6">{project.role}</p>
          <div class="h-px bg-blueprint-grid w-full mb-6"></div>
          <p class="text-gray-400 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        <div>
          <h3 class="text-xs uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
          <div class="flex flex-wrap gap-2">
            {#each project.tech_stack as tech}
              <div class="border border-blueprint-blue/30 text-blueprint-blue px-3 py-1 text-xs">
                {tech}
              </div>
            {/each}
          </div>
        </div>

        {#if project.links.repo || project.links.live}
        <div>
          <h3 class="text-xs uppercase tracking-widest text-gray-500 mb-4">External Links</h3>
          <div class="flex gap-4">
              {#if project.links.repo}
                <a href={project.links.repo} target="_blank" class="text-white hover:text-blueprint-gold underline decoration-1 underline-offset-4">
                  View Source
                </a>
              {/if}
              {#if project.links.live}
                <a href={project.links.live} target="_blank" class="text-white hover:text-blueprint-gold underline decoration-1 underline-offset-4">
                  Live Demo
                </a>
              {/if}
          </div>
        </div>
        {/if}
      {:else}
        <div class="text-red-500 font-mono">
            ERROR: Project data not found for ID "{$page.params.id}"
        </div>
      {/if}
    </div>

    <!-- Right Column: The Lab (Svelte Flow) -->
    <!-- Wrapper kept relative for positioning labels, but styles removed to respect user's inner box -->
    <div class="lg:col-span-2 relative">
      <div class="absolute top-0 left-0 bg-blueprint-blue text-black text-xs font-bold px-2 py-1 z-10">
        SYSTEM_FLOW
      </div>

      {#key $page.params.id}
        <div class="blueprint-container" style="width: 100%; height: 600px; background: #0a0a0a; border: 1px solid #222;">
          {#if project}
            <SvelteFlow 
              {nodes} 
              {edges} 
              on:init={(e) => flowInstance = e.detail.instance}
              fitView
              colorMode="dark"
            >
              <Background color="#333" gap={20} />
              <Controls />
            </SvelteFlow>
          {:else}
            <div class="flex items-center justify-center h-full text-white font-mono p-10">
                ERROR: SCHEMATIC_NOT_FOUND
            </div>
          {/if}
        </div>
      {/key}
      
      {#if project}
      <div class="absolute bottom-4 left-4 max-w-md bg-black/80 p-4 border border-blueprint-grid text-xs text-gray-300 pointer-events-none z-20">
        <span class="text-blueprint-gold block mb-1">LOGIC_TRACE:</span>
        {project.blueprint?.flow_description || 'Tracing logic flow...'}
      </div>
      {/if}
    </div>

  </main>

  <!-- Visual Trace Gallery -->
  {#if project?.gallery && project.gallery.length > 0}
    <section class="max-w-7xl mx-auto w-full px-4 mb-20">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-sm font-bold tracking-widest text-blueprint-blue uppercase">
          // Visual_Trace
        </h2>
        <div class="h-px bg-blueprint-grid flex-1 ml-4"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each project.gallery as item}
          <div class="group relative border border-blueprint-grid bg-blueprint-dark">
             <img src={item.url} alt={item.caption} class="w-full h-64 object-cover filter grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100" />
             
             <div class="absolute bottom-0 left-0 right-0 bg-black/80 p-2 border-t border-blueprint-grid translate-y-full group-hover:translate-y-0 transition-transform">
               <p class="text-xs text-blueprint-gold font-mono">> {item.caption}</p>
             </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  /* Force visibility even if Tailwind fails */
  .blueprint-container {
    display: block !important;
    position: relative;
  }
</style>

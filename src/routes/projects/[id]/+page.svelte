<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import projects from '$lib/data/projects.json';

  // 1. Reactive data: Updates whenever the URL ID changes
  $: project = projects.find(p => p.id === $page.params.id) as any;
  $: nodes = project?.blueprint?.nodes || [];
  $: edges = project?.blueprint?.edges || [];

  let expandedNodeId: string | null = null;
  let flowInstance: any;

  $: displayNodes = nodes.map((node: any) => {
    const isExpanded = node.id === expandedNodeId;
    return {
      ...node,
      data: {
        ...node.data,
        label: isExpanded ? `${node.data.label}\n\n${node.data.details || ''}` : node.data.label
      },
      style: node.style + (isExpanded ? 'height: auto; min-height: 140px; z-index: 50; white-space: pre-wrap; font-size: 11px; line-height: 1.5; padding: 15px !important;' : '')
    };
  });

  function handleNodeClick(event: any) {
    const node = event.detail.node;
    if (expandedNodeId === node.id) {
      expandedNodeId = null;
    } else {
      expandedNodeId = node.id;
    }
  }

  // 2. The "Double-Tick" Fix: Forces the map to center only AFTER the browser paints
  async function forceCenter() {
    await tick(); // Wait for Svelte state
    setTimeout(() => {
      if (flowInstance) flowInstance.fitView();
    }, 100); // Small delay to let Tailwind finish the layout
  }

  onMount(() => forceCenter());
  $: if ($page.params.id) {
    expandedNodeId = null; // Reset expansion when switching projects
    forceCenter();
  }
</script>

<div class="min-h-screen flex flex-col bg-blueprint-dark">
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
          <h1 class="text-4xl font-bold text-white mb-2 italic tracking-tight">{project.title}</h1>
          <p class="text-blueprint-gold text-lg mb-6 uppercase tracking-widest font-bold">{project.role}</p>
          <div class="h-px bg-blueprint-grid w-full mb-6"></div>
          <p class="text-gray-400 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        <div>
          <h3 class="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">// Technical_Stack</h3>
          <div class="flex flex-wrap gap-2">
            {#each project.tech_stack as tech}
              <div class="border border-blueprint-blue/30 text-blueprint-blue px-3 py-1 text-xs font-mono bg-blueprint-blue/5">
                {tech}
              </div>
            {/each}
          </div>
        </div>

        {#if project.links.repo || project.links.live}
        <div>
          <h3 class="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">// External_Links</h3>
          <div class="flex flex-col gap-3">
              {#if project.links.repo}
                <a href={project.links.repo} target="_blank" class="group flex items-center gap-2 text-white hover:text-blueprint-gold transition-colors">
                  <span class="text-blueprint-gold group-hover:translate-x-1 transition-transform">→</span>
                  <span class="underline decoration-1 underline-offset-4">View Source</span>
                </a>
              {/if}
              {#if project.links.live}
                <a href={project.links.live} target="_blank" class="group flex items-center gap-2 text-white hover:text-blueprint-gold transition-colors">
                  <span class="text-blueprint-gold group-hover:translate-x-1 transition-transform">→</span>
                  <span class="underline decoration-1 underline-offset-4">Live Demo</span>
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
    <div class="lg:col-span-2 relative">
      <div class="absolute top-0 left-0 bg-blueprint-blue text-black text-xs font-bold px-2 py-1 z-10">
        SYSTEM_FLOW
      </div>

      {#key $page.params.id}
        <div class="blueprint-container" style="width: 100%; height: 600px; background: #0a0a0a; border: 1px solid #222;">
          {#if project}
            <SvelteFlow 
              nodes={displayNodes} 
              {edges} 
              on:init={(e) => flowInstance = e.detail.instance}
              on:nodeclick={handleNodeClick}
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
        <span class="text-blueprint-gold block mb-1 font-bold">LOGIC_TRACE:</span>
        {project.blueprint?.flow_description || 'Tracing logic flow...'}
      </div>
      {/if}
    </div>

  </main>
</div>

<style>
  /* Force visibility even if Tailwind fails */
  .blueprint-container {
    display: block !important;
    position: relative;
  }
  :global(body) {
    background-color: #0d0d0d;
  }
</style>

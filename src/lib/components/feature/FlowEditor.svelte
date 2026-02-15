<script lang="ts">
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  // Props
  export let nodeData: any[] = [];
  export let edgeData: any[] = [];

  // Stores for Svelte Flow
  const nodes = writable([]);
  const edges = writable([]);

  // Reactivity: Update stores
  $: {
    if (browser) {
       // Validate and Process Nodes
       let processedNodes = [];
       if (nodeData && Array.isArray(nodeData) && nodeData.length > 0) {
          processedNodes = nodeData.map((node, index) => ({
             ...node,
             position: node.position || { x: 250, y: index * 100 }, // Fallback position
             data: { ...node.data, label: node.data?.label || 'Unknown Node' }
          }));
       }

       // Set Stores
        if (processedNodes.length > 0) {
            nodes.set(processedNodes);
            edges.set(edgeData || []);
        }
    }
  }
</script>

<div class="w-full h-[600px] bg-black relative border border-blueprint-grid">
  {#if browser}
    <SvelteFlow 
      {nodes} 
      {edges} 
      fitView
      nodesConnectable={false}
      colorMode="dark"
      class="bg-black"
    >
      <Background color="#222" gap={20} />
      <Controls />
    </SvelteFlow>
  {:else}
    <div class="w-full h-full flex items-center justify-center text-blueprint-blue animate-pulse">
        Initializing Blueprint Engine...
    </div>
  {/if}
</div>

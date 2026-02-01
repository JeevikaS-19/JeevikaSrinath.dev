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

  // Dummy fallback data for testing visibility
  const DUMMY_NODES = [
    {
        id: 'debug-1',
        type: 'input',
        data: { label: 'FLOW DEBUGGER' },
        position: { x: 250, y: 0 },
        style: 'background: #0d0d0d; border: 1px solid #2a9d8f; color: white;'
    },
    {
        id: 'debug-2',
        data: { label: 'IF YOU SEE THIS' },
        position: { x: 100, y: 100 },
        style: 'background: #0d0d0d; border: 1px dashed #e9c46a; color: white;'
    },
    {
        id: 'debug-3',
        data: { label: 'DATA LOAD FAILED' },
        position: { x: 400, y: 100 },
        style: 'background: #0d0d0d; border: 1px dashed #ef4444; color: white;'
    }
  ];

  const DUMMY_EDGES = [
    { id: 'e1-2', source: 'debug-1', target: 'debug-2', animated: true },
    { id: 'e1-3', source: 'debug-1', target: 'debug-3', animated: true }
  ];

  // Reactivity: Update stores or load dummy data
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
            console.log('[FlowEditor] Setting Real Data:', processedNodes.length);
            nodes.set(processedNodes);
            edges.set(edgeData || []);
        } else {
            console.log('[FlowEditor] Setting Dummy Data');
            nodes.set(DUMMY_NODES);
            edges.set(DUMMY_EDGES);
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

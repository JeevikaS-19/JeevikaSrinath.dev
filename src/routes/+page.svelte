<script lang="ts">
  import projectsData from '$lib/data/projects.json';
  import type { Project } from '$lib/types';

  const projects: Project[] = projectsData as Project[];
  
  const categories = ["Python projects", "Websites", "Research", "On going"] as const;
  let selectedCategory: typeof categories[number] = "Python projects";

  $: filteredProjects = projects.filter(p => p.categories.includes(selectedCategory));
</script>

<div class="max-w-7xl mx-auto px-4 py-16">
  <!-- Hero Section -->
  <header class="mb-20 border-b border-blueprint-grid pb-10">
    <h1 class="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
      JEEVIKA SRINATH<span class="text-blueprint-blue">.DEV</span>
    </h1>
    <div class="max-w-3xl mt-6 border-l-4 border-blueprint-gold pl-6 py-2">
        <p class="font-hand text-3xl text-blueprint-gold mb-3 -rotate-2 inline-block">
            Hello!
        </p>
        <p class="font-sans text-lg md:text-xl text-gray-300 leading-relaxed font-bold">
            CS student (9.66 CGPA) building at the intersection of <span class="text-white">AI logic</span> and <span class="text-blueprint-blue">Neo-Brutalist design</span>. Whether I’m engineering CV tools in Python or shipping interactive frontends in Svelte, I focus on turning complex ideas into clean, high-impact products.
        </p>
        <p class="font-sans text-sm text-blueprint-blue mt-4 font-bold uppercase tracking-widest">
            Always building, always shipping.
        </p>
    </div>
  </header>

  <!-- Filter Tabs -->
  <nav class="mb-12 flex flex-wrap gap-4 border-b border-blueprint-grid pb-6">
    {#each categories as category}
      <button 
        on:click={() => selectedCategory = category}
        class="px-6 py-2 border {selectedCategory === category ? 'border-blueprint-blue bg-blueprint-blue/10 text-white' : 'border-blueprint-grid text-gray-400 hover:border-gray-500'} transition-all text-xs font-bold tracking-widest uppercase"
      >
        {category}
      </button>
    {/each}
  </nav>

  <!-- Projects Grid -->
  <section>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-sm font-bold tracking-widest text-blueprint-blue uppercase">
        // {selectedCategory.replace(' ', '_').toUpperCase()}
      </h2>
      <div class="h-px bg-blueprint-grid flex-1 ml-4"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each filteredProjects as project (project.id)}
        <a href="/projects/{project.id}" class="group block relative h-full">
          <!-- Card Container -->
          <div class="h-full bg-blueprint-dark border border-blueprint-grid hover:border-blueprint-blue transition-colors duration-300 p-6 flex flex-col">
            <!-- Corner Markers -->
            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-blueprint-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-blueprint-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blueprint-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blueprint-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <!-- Header -->
            <div class="mb-4">
              <span class="text-xs text-blueprint-gold mb-1 block">{project.id.toUpperCase()}</span>
              <h3 class="text-2xl font-bold text-white group-hover:text-blueprint-blue transition-colors">
                {project.title}
              </h3>
            </div>

            <!-- Description -->
            <p class="text-gray-400 text-sm mb-6 flex-grow">
              {project.description}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mt-auto">
              {#each project.tech_stack as tech}
                <span class="text-xs border border-blueprint-grid px-2 py-1 text-gray-400 bg-black/20">
                  {tech}
                </span>
              {/each}
            </div>
            
            <!-- Arrow -->
            <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 text-blueprint-blue">
                →
            </div>
          </div>
        </a>
      {/each}
    </div>
  </section>
</div>

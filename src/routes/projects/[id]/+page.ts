import { error } from '@sveltejs/kit';
import projectsData from '$lib/data/projects.json';
import type { PageLoad } from './$types';
import type { Project } from '$lib/types';

export const load: PageLoad = ({ params }) => {
    const projects = projectsData as Project[]; // Define projects here for use in console.log
    const project = projects.find((p) => p.id === params.id);

    console.log(`[Loader] Requested ID: ${params.id}`);
    console.log(`[Loader] Available IDs: ${projects.map(p => p.id).join(', ')}`);

    if (project) {
        return {
            project
        };
    }

    throw error(404, 'Project not found');
};

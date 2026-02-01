export interface FlowNode {
    id: string;
    type?: string;
    position: { x: number; y: number };
    data: { label: string;[key: string]: any };
    style?: string;
    [key: string]: any;
}

export interface FlowEdge {
    id: string;
    source: string;
    target: string;
    animated?: boolean;
    label?: string;
    style?: string;
    [key: string]: any;
}

export interface ProjectBlueprint {
    flow_description: string;
    nodes: FlowNode[];
    edges: FlowEdge[];
}

export interface ProjectLink {
    repo?: string;
    live?: string;
}

export interface Project {
    id: string;
    title: string;
    role: string;
    description: string;
    tech_stack: string[];
    thumbnail: string;
    links: ProjectLink;
    blueprint: ProjectBlueprint;
    gallery: any[];
}

import data from "./standalone-projects.json";
export type BoardNode = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  x: number;
  y: number;
  kind: string;
};
export type Port = "left" | "right" | "top" | "bottom";
export type BoardEdge = {
  id: string;
  from: string;
  to: string;
  fromPort: Port;
  toPort: Port;
  label: string;
  labelX: number;
  labelY: number;
  via?: number[][];
};
export type FlowStep = {
  edge: string;
  title: string;
  detail: string;
  kind: "data" | "check" | "write" | "denied";
};
export type BoardFlow = {
  id: string;
  title: string;
  summary: string;
  steps: FlowStep[];
};
export type StandaloneProject = {
  id: string;
  number: string;
  name: string;
  title: string;
  headline: string;
  summary: string;
  focus: string;
  color: string;
  live: string;
  repository: string;
  validationPath: string;
  runtime: string;
  mode: string;
  goal: string;
  capabilities: { title: string; description: string }[];
  instructions: { title: string; description: string }[];
  decisions: { title: string; description: string }[];
  limits: string[];
  evidence: string[];
  screenshot: { src: string; alt: string };
  walkthrough?: {
    video: string;
    captions: string;
    poster: string;
    duration: string;
    transcript: { title: string; text: string }[];
  };
  board: {
    note: string;
    zones: {
      x: number;
      y: number;
      width: number;
      height: number;
      title: string;
    }[];
    nodes: BoardNode[];
    edges: BoardEdge[];
    flows: BoardFlow[];
  };
};
export const standaloneProjects = data as StandaloneProject[];
export const projectPath = (id: string) => `/projects/${id}`;
export function edgePath(edge: BoardEdge, nodes: BoardNode[]): string {
  const point = (id: string, port: Port) => {
    const n = nodes.find((node) => node.id === id)!;
    return port === "left"
      ? [n.x, n.y + 44]
      : port === "right"
        ? [n.x + 190, n.y + 44]
        : port === "top"
          ? [n.x + 95, n.y]
          : [n.x + 95, n.y + 88];
  };
  const points = [
    point(edge.from, edge.fromPort),
    ...(edge.via ?? []),
    point(edge.to, edge.toPort),
  ];
  return points.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
}

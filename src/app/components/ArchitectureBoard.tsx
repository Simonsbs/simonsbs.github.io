import { useEffect, useId, useRef, useState } from "react";
import {
  Expand,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  X,
} from "lucide-react";
import { edgePath } from "../data/standalone";
import type { BoardNode, StandaloneProject } from "../data/standalone";

const tones = {
  data: "#277f78",
  check: "#8762a9",
  write: "#3978ad",
  denied: "#be5e45",
};
export default function ArchitectureBoard({
  project,
}: {
  project: StandaloneProject;
}) {
  const id = useId().replaceAll(":", "");
  const [flowIndex, setFlowIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState<BoardNode | null>(null);
  const [fit, setFit] = useState(false);
  const figure = useRef<HTMLElement>(null),
    svg = useRef<SVGSVGElement>(null);
  const flow = project.board.flows[flowIndex],
    current = flow.steps[step];
  const activeEdge = project.board.edges.find((e) => e.id === current.edge)!;
  const path = edgePath(activeEdge, project.board.nodes),
    color = tones[current.kind];
  const running = playing && visible && !reduced;
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(preference.matches);
    setPlaying(!preference.matches);
    const update = () => {
      setReduced(preference.matches);
      if (preference.matches) setPlaying(false);
    };
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (figure.current) observer.observe(figure.current);
    const hidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", hidden);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, []);
  useEffect(() => {
    svg.current?.setCurrentTime(0);
  }, [step, flowIndex]);
  useEffect(() => {
    if (running) svg.current?.unpauseAnimations();
    else svg.current?.pauseAnimations();
  }, [running, step, flowIndex]);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      if (step === flow.steps.length - 1) setPlaying(false);
      else setStep((s) => s + 1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [running, step, flow.steps.length]);
  function chooseStep(index: number) {
    setPlaying(false);
    setSelectedNode(null);
    setStep(index);
  }
  function toggle() {
    setSelectedNode(null);
    if (step === flow.steps.length - 1 && !playing) setStep(0);
    setPlaying((p) => !p);
  }
  return (
    <figure
      ref={figure}
      className={`architecture-board${running ? " is-running" : ""}`}
      aria-label={`${project.name} architecture whiteboard`}
    >
      <div className="board-toolbar">
        <div className="board-brand">
          <span className="board-marker" />
          <strong>THE ARCHITECTURE BOARD</strong>
          <span>
            0{Number(project.number)} / {project.name}
          </span>
        </div>
        <div className="board-toolbar-actions">
          <button onClick={() => setFit((v) => !v)} aria-pressed={fit}>
            {fit ? <Maximize2 size={14} /> : <Expand size={14} />}{" "}
            {fit ? "Detail view" : "Fit board"}
          </button>
          <span className="board-illustration-label">Illustrated flow</span>
        </div>
      </div>
      <div
        className="board-scenarios"
        role="group"
        aria-label="Architecture flow scenario"
      >
        {project.board.flows.map((f, i) => (
          <button
            key={f.id}
            onClick={() => {
              setFlowIndex(i);
              setStep(0);
              setPlaying(false);
              setSelectedNode(null);
            }}
            aria-pressed={i === flowIndex}
          >
            {String(i + 1).padStart(2, "0")}
            <span>{f.title}</span>
          </button>
        ))}
      </div>
      <div
        className={`board-paper${fit ? " board-fit" : ""}`}
        tabIndex={0}
        aria-label="Architecture canvas. Scroll horizontally on a small screen or choose Fit board."
      >
        <svg
          ref={svg}
          viewBox="0 0 1100 510"
          className="board-svg"
          role="group"
          aria-label={`${project.name} component and data flow diagram`}
          data-playing={running}
          data-step={step}
        >
          <title>{`${project.title}: architecture and data flow`}</title>
          <desc>
            {project.board.note} Select a component or use the readable step
            list below.
          </desc>
          <defs>
            {Object.entries(tones).map(([kind, tone]) => (
              <marker
                key={kind}
                id={`${id}-arrow-${kind}`}
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="4.5"
                orient="auto"
              >
                <path
                  d="M 1 1 L 8 4.5 L 1 8"
                  fill="none"
                  stroke={tone}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            ))}
            <marker
              id={`${id}-arrow-base`}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path
                d="M1 1 L7 4 L1 7"
                fill="none"
                stroke="#a5b1a6"
                strokeWidth="1.3"
              />
            </marker>
          </defs>
          {project.board.zones.map((z) => (
            <g key={z.title}>
              <rect
                x={z.x}
                y={z.y}
                width={z.width}
                height={z.height}
                rx="9"
                className="board-zone"
              />
              <text x={z.x + 15} y={z.y + 22} className="board-zone-label">
                {z.title}
              </text>
            </g>
          ))}
          {project.board.edges.map((e) => {
            const from = project.board.nodes.find((n) => n.id === e.from)!,
              to = project.board.nodes.find((n) => n.id === e.to)!;
            const labelX =
              !e.via &&
              e.fromPort === "right" &&
              e.toPort === "left" &&
              from.y === to.y
                ? (from.x + 190 + to.x) / 2
                : e.labelX;
            return (
              <g key={e.id}>
                <path
                  d={edgePath(e, project.board.nodes)}
                  className="board-edge"
                  markerEnd={`url(#${id}-arrow-base)`}
                />
                <text x={labelX} y={e.labelY} className="board-edge-label">
                  {e.label}
                </text>
              </g>
            );
          })}
          <path
            d={path}
            className="board-active-edge"
            stroke={color}
            markerEnd={`url(#${id}-arrow-${current.kind})`}
          />
          {project.board.nodes.map((n, i) => {
            const active = n.id === activeEdge.from || n.id === activeEdge.to;
            return (
              <g
                key={n.id}
                className={`board-node board-node-${n.kind}${active ? " is-active" : ""}${selectedNode?.id === n.id ? " is-selected" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${n.title}`}
                aria-pressed={selectedNode?.id === n.id}
                onClick={() => {
                  setSelectedNode(n);
                  setPlaying(false);
                }}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key)) {
                    e.preventDefault();
                    setSelectedNode(n);
                    setPlaying(false);
                  }
                }}
                transform={`rotate(${[-0.4, 0.4, -0.3, 0.3][i % 4]} ${n.x + 95} ${n.y + 44})`}
              >
                <title>{n.detail}</title>
                {n.kind === "gate" ? (
                  <path
                    d={`M${n.x + 95} ${n.y - 2} L${n.x + 194} ${n.y + 43} L${n.x + 95} ${n.y + 90} L${n.x - 3} ${n.y + 44} Z`}
                    className="board-node-shape"
                  />
                ) : (
                  <>
                    <rect
                      x={n.x + 2}
                      y={n.y + 3}
                      width="190"
                      height="88"
                      rx="8"
                      className="board-node-shadow"
                    />
                    <path
                      d={`M${n.x + 10} ${n.y + 1} Q${n.x + 1} ${n.y - 1} ${n.x} ${n.y + 11} L${n.x + 1} ${n.y + 77} Q${n.x} ${n.y + 89} ${n.x + 12} ${n.y + 88} L${n.x + 180} ${n.y + 87} Q${n.x + 191} ${n.y + 89} ${n.x + 190} ${n.y + 76} L${n.x + 189} ${n.y + 10} Q${n.x + 191} ${n.y} ${n.x + 179} ${n.y} Z`}
                      className="board-node-shape"
                    />
                    {n.kind === "store" && (
                      <path
                        d={`M${n.x + 3} ${n.y + 15} Q${n.x + 95} ${n.y + 29} ${n.x + 187} ${n.y + 15}`}
                        fill="none"
                        stroke="#a1b8a4"
                        strokeWidth="1"
                      />
                    )}
                  </>
                )}
                <text x={n.x + 95} y={n.y + 39} className="board-node-title">
                  {n.title}
                </text>
                <text x={n.x + 95} y={n.y + 59} className="board-node-subtitle">
                  {n.subtitle}
                </text>
              </g>
            );
          })}
          {!reduced && (
            <g
              key={`${flow.id}-${step}`}
              className="board-packet"
              aria-hidden="true"
            >
              <circle r="10" fill={color} opacity="0.13" />
              <circle r="4.5" fill={color} />
              <animateMotion
                dur="2.7s"
                repeatCount="indefinite"
                path={path}
                calcMode="linear"
              />
            </g>
          )}
          <text x="35" y="500" className="board-hand-note">
            {current.kind === "denied"
              ? "stop here: no business write"
              : current.kind === "write"
                ? "a deliberate, inspectable state change"
                : "follow the evidence, then the decision"}
          </text>
        </svg>
      </div>
      <div className="board-playback">
        <div className="board-playback-buttons">
          <button
            className="board-play"
            onClick={toggle}
            disabled={reduced}
            aria-label={
              playing
                ? "Pause architecture animation"
                : "Play architecture animation"
            }
          >
            {playing && !reduced ? <Pause size={15} /> : <Play size={15} />}{" "}
            {playing && !reduced ? "Pause" : "Play flow"}
          </button>
          <button
            onClick={() =>
              chooseStep(Math.min(step + 1, flow.steps.length - 1))
            }
            disabled={step === flow.steps.length - 1}
          >
            <SkipForward size={14} />
            Next step
          </button>
          <button
            aria-label="Restart architecture flow"
            onClick={() => chooseStep(0)}
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <span>
          Step <strong>{step + 1}</strong> / {flow.steps.length}
          {reduced
            ? " · reduced motion: use steps"
            : !visible && playing
              ? " · paused outside view"
              : " · click any component"}
        </span>
      </div>
      <div className="board-explanation" aria-live={playing ? "off" : "polite"}>
        <span className={`board-step-tag step-${current.kind}`}>
          {selectedNode
            ? "COMPONENT NOTES"
            : current.kind === "denied"
              ? "BOUNDARY ENFORCED"
              : current.kind === "write"
                ? "CONTROLLED STATE CHANGE"
                : "FOLLOW THE FLOW"}
        </span>
        <h3>{selectedNode?.title ?? current.title}</h3>
        <p>{selectedNode?.detail ?? current.detail}</p>
        {selectedNode && (
          <button onClick={() => setSelectedNode(null)}>
            <X size={12} />
            Back to this step
          </button>
        )}
      </div>
      <details className="board-step-list">
        <summary>Read all {flow.steps.length} steps without animation</summary>
        <p>{flow.summary}</p>
        <ol>
          {flow.steps.map((s, i) => (
            <li key={i}>
              <button
                onClick={() => chooseStep(i)}
                aria-current={i === step ? "step" : undefined}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.detail}</p>
                </div>
              </button>
            </li>
          ))}
        </ol>
      </details>
      <figcaption>
        {project.board.note} Arrows and moving dots are an explanation of the
        implementation, not live telemetry.
      </figcaption>
    </figure>
  );
}

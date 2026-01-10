import { useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { JobNode } from './JobNode';

const nodeTypes = {
  job: JobNode,
};

const getLayoutedElements = (nodes: any[], edges: any[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', nodesep: 100, ranksep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 220, height: 80 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - 110,
      y: nodeWithPosition.y - 40,
    };
  });

  return { nodes, edges };
};

interface PipelineGraphProps {
  jobs: any[];
}

export const PipelineGraph: React.FC<PipelineGraphProps> = ({ jobs }) => {
  // Map jobs to nodes
  const initialNodes = useMemo(
    () =>
      jobs.map((job) => ({
        id: job.id.toString(),
        type: 'job',
        data: { ...job },
        position: { x: 0, y: 0 },
      })),
    [jobs],
  );

  // Map dependencies to edges (simplified for now: sequential)
  const initialEdges = useMemo(() => {
    const edges: Edge[] = [];
    for (let i = 0; i < jobs.length - 1; i++) {
      edges.push({
        id: `e${jobs[i].id}-${jobs[i + 1].id}`,
        source: jobs[i].id.toString(),
        target: jobs[i + 1].id.toString(),
        type: 'smoothstep',
        animated: jobs[i].status === 'in_progress',
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      });
    }
    return edges;
  }, [jobs]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    [...initialNodes],
    [...initialEdges],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    const { nodes: lNodes, edges: lEdges } = getLayoutedElements(
      [...initialNodes],
      [...initialEdges],
    );
    setNodes(lNodes);
    setEdges(lEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div className="h-[600px] w-full glass rounded-2xl overflow-hidden border border-white/5 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background color="#222" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

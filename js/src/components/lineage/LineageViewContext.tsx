import { LineageDiffViewOptions } from "@/lib/api/lineagecheck";
import { Run } from "@/lib/api/types";
import { createContext, useContext } from "react";
import { Node } from "reactflow";
import { LineageGraphNode } from "./lineage";

type NewType = LineageDiffViewOptions;
type ActionMode = "per_node" | "multi_nodes";

interface NodeAction {
  mode: ActionMode;
  status?: "pending" | "running" | "success" | "failure" | "skipped";
  skipReason?: string;
  run?: Run;
}

export interface ActionState {
  mode: ActionMode;
  status: "pending" | "running" | "canceling" | "canceled" | "completed";
  currentRun?: Partial<Run>;
  completed: number;
  total: number;
  actions: Record<string, NodeAction>;
}

export interface LineageViewContextType {
  interactive: boolean;
  nodes: Node<LineageGraphNode>[];
  focusedNode?: LineageGraphNode;
  selectedNodes: LineageGraphNode[];

  // filter
  viewOptions: LineageDiffViewOptions;
  onViewOptionsChanged: (options: NewType) => void;

  // Multi nodes selection
  selectMode: "selecting" | "action_result" | undefined;
  selectNode: (nodeId: string) => void;
  deselect: () => void;

  // node state
  isNodeHighlighted: (nodeId: string) => boolean;
  isNodeSelected: (nodeId: string) => boolean;
  isEdgeHighlighted: (source: string, target: string) => boolean;
  getNodeAction: (nodeId: string) => NodeAction;
  getNodeColumnSet: (nodeId: string) => Set<string>;

  //actions
  runRowCount: () => Promise<void>;
  runRowCountDiff: () => Promise<void>;
  runValueDiff: () => Promise<void>;
  addLineageDiffCheck: (viewMode?: string) => void;
  addSchemaDiffCheck: () => void;
  cancel: () => void;
  actionState: ActionState;

  // advancedImpactRadius
  breakingChangeEnabled: boolean;
  setBreakingChangeEnabled: (value: boolean) => void;

  // Column Level Lineage
  showColumnLevelLineage: (nodeId: string, column: string) => Promise<void>;
  resetColumnLevelLinage: () => void;
}

export const LineageViewContext = createContext<LineageViewContextType | undefined>(undefined);

export const useLineageViewContextSafe = (): LineageViewContextType => {
  const context = useContext(LineageViewContext);
  if (!context) {
    throw new Error("useLineageViewContext must be used within a LineageViewProvider");
  }
  return context;
};

export const useLineageViewContext = (): LineageViewContextType | undefined => {
  return useContext(LineageViewContext);
};

export type CanvasColorTheme = "light" | "dark";
export type CanvasBackgroundMode = "dots" | "lines" | "blank";

export const canvasThemes = {
    light: {
        canvas: {
            background: "#eef4f8",
            dot: "rgba(14,116,144,.24)",
            line: "rgba(15,23,42,.12)",
            selectionStroke: "#0891b2",
            selectionFill: "rgba(8,145,178,.10)",
        },
        node: {
            label: "#475569",
            fill: "rgba(241,245,249,.88)",
            panel: "rgba(255,255,255,.92)",
            stroke: "rgba(15,23,42,.16)",
            activeStroke: "#0891b2",
            placeholder: "#64748b",
            text: "#0f172a",
            muted: "#64748b",
            faint: "#94a3b8",
        },
        toolbar: {
            panel: "rgba(255,255,255,.88)",
            border: "rgba(14,116,144,.24)",
            item: "#334155",
            itemHover: "rgba(8,145,178,.10)",
            activeBg: "rgba(8,145,178,.16)",
            activeText: "#0e7490",
        },
    },
    dark: {
        canvas: {
            background: "#050812",
            dot: "rgba(125,211,252,.24)",
            line: "rgba(125,211,252,.10)",
            selectionStroke: "#22d3ee",
            selectionFill: "rgba(34,211,238,.12)",
        },
        node: {
            label: "#8aa4bd",
            fill: "rgba(9,16,32,.92)",
            panel: "rgba(5,8,18,.96)",
            stroke: "rgba(125,211,252,.22)",
            activeStroke: "#22d3ee",
            placeholder: "#5f7890",
            text: "#e5f2ff",
            muted: "#8aa4bd",
            faint: "#52687e",
        },
        toolbar: {
            panel: "rgba(5,8,18,.86)",
            border: "rgba(125,211,252,.24)",
            item: "#9fbad0",
            itemHover: "rgba(34,211,238,.10)",
            activeBg: "rgba(34,211,238,.16)",
            activeText: "#67e8f9",
        },
    },
} as const;

export type CanvasTheme = (typeof canvasThemes)[CanvasColorTheme];

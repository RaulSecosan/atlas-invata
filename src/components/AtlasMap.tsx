import shapes from "@/data/world-map.json";
import { continents } from "@/lib/geography";
export default function AtlasMap({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 720 360"
      className="atlas-map"
      role="img"
      aria-label={
        selected
          ? `Hartă: ${continents.find((c) => c.id === selected)?.name}`
          : "Harta lumii"
      }
    >
      <defs>
        <pattern
          id="graticule"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path d="M60 0H0V60" fill="none" stroke="#cad5cb" strokeWidth=".5" />
        </pattern>
      </defs>
      <rect width="720" height="360" fill="#e7eee7" />
      <rect width="720" height="360" fill="url(#graticule)" />
      {shapes.map((s, i) => (
        <path
          key={i}
          d={s.path}
          fill={!selected || selected === s.continent ? "#66846d" : "#cad5c7"}
          stroke="#f8f6f0"
          strokeWidth=".7"
        >
          <title>{s.name}</title>
        </path>
      ))}
      {onSelect &&
        continents.map((c) => {
          const pos: Record<string, number[]> = {
            europe: [380, 72],
            asia: [505, 105],
            africa: [365, 190],
            "north-america": [150, 105],
            "south-america": [225, 260],
            oceania: [595, 275],
            antarctica: [370, 342],
          };
          const [x, y] = pos[c.id];
          return (
            <g
              key={c.id}
              role="button"
              tabIndex={0}
              aria-label={`Explorează ${c.name}`}
              onClick={() => onSelect(c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(c.id);
                }
              }}
              className="map-label"
            >
              <rect
                x={x - 35}
                y={y - 12}
                width="70"
                height="24"
                rx="12"
                fill={selected === c.id ? "#184b38" : "#fffdf5"}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={selected === c.id ? "white" : "#184b38"}
                fontSize="10"
              >
                {c.short}
              </text>
            </g>
          );
        })}
    </svg>
  );
}

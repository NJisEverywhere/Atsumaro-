"use client";

type Member = {
  label: string;
  minutes: number;
  color?: string;
};

type Props = {
  members: Member[];
  stationName: string;
  /** 目的地モード用。指定するとステーションの右に目的地への線を追加 */
  destinationName?: string;
  destinationMinutes?: number;
};

const DEFAULT_COLORS = [
  "#38bdf8", // sky-400
  "#34d399", // emerald-400
  "#f472b6", // pink-400
  "#fb923c", // orange-400
  "#a78bfa", // violet-400
];

export default function RouteGraph({
  members,
  stationName,
  destinationName,
  destinationMinutes,
}: Props) {
  const width = 320;
  const height = Math.max(120, members.length * 48 + 40);
  const stationX = destinationName ? width * 0.5 : width * 0.6;
  const stationY = height / 2;
  const startX = 20;
  const endX = width - 20;

  // 各メンバーの出発Y座標（縦に均等分散）
  const memberYPositions = members.map((_, i) => {
    const step = height / (members.length + 1);
    return step * (i + 1);
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
      >
        {/* 各メンバーの線（出発 → 合流駅） */}
        {members.map((member, i) => {
          const color = member.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          const y = memberYPositions[i];

          // ベジェ曲線のコントロールポイント
          const cp1x = startX + (stationX - startX) * 0.5;
          const cp2x = stationX - 30;

          return (
            <g key={member.label}>
              {/* ルート線 */}
              <path
                d={`M ${startX} ${y} C ${cp1x} ${y}, ${cp2x} ${stationY}, ${stationX} ${stationY}`}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              {/* 出発点の丸 */}
              <circle cx={startX} cy={y} r={5} fill={color} />
              {/* メンバー名 */}
              <text
                x={startX + 10}
                y={y - 6}
                fontSize={10}
                fill={color}
                fontWeight="600"
              >
                {member.label}
              </text>
              {/* 移動時間 */}
              <text
                x={startX + 10}
                y={y + 14}
                fontSize={9}
                fill="#9ca3af"
              >
                {member.minutes}分
              </text>
            </g>
          );
        })}

        {/* 合流駅の丸 */}
        <circle cx={stationX} cy={stationY} r={10} fill="#1e293b" />
        <circle cx={stationX} cy={stationY} r={6} fill="white" />

        {/* 合流駅名 */}
        <text
          x={stationX}
          y={stationY - 16}
          fontSize={11}
          fill="#1e293b"
          fontWeight="700"
          textAnchor="middle"
        >
          {stationName}
        </text>

        {/* 目的地モード：合流後の線 */}
        {destinationName && (
          <>
            <path
              d={`M ${stationX} ${stationY} L ${endX} ${stationY}`}
              fill="none"
              stroke="#94a3b8"
              strokeWidth={2.5}
              strokeDasharray="5,4"
              strokeLinecap="round"
            />
            {/* 目的地の丸 */}
            <circle cx={endX} cy={stationY} r={7} fill="#f43f5e" />
            {/* 目的地名 */}
            <text
              x={endX}
              y={stationY - 14}
              fontSize={10}
              fill="#f43f5e"
              fontWeight="700"
              textAnchor="middle"
            >
              {destinationName}
            </text>
            {/* 合流後の所要時間 */}
            {destinationMinutes && (
              <text
                x={(stationX + endX) / 2}
                y={stationY - 6}
                fontSize={9}
                fill="#94a3b8"
                textAnchor="middle"
              >
                {destinationMinutes}分
              </text>
            )}
          </>
        )}
      </svg>
    </div>
  );
}

export default function WifiIcon({ size = 40, color = "#ff0000" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: "drop-shadow(0 2px 8px rgba(255,0,0,0.35))" }}
            className="wifi-icon"
        >
            {/* SVG filter for inner glow */}
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g filter="url(#glow)">
                <path
                    d="M5 12.55a11 11 0 0 1 14.08 0"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M1.42 9a16 16 0 0 1 21.16 0"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.53 16.11a6 6 0 0 1 6.95 0"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle
                    cx="12"
                    cy="20"
                    r="1.5"
                    fill={color}
                    filter="url(#glow)"
                    opacity="0.9"
                />
            </g>
        </svg>
    );
}

interface PlaceholderAvatarProps {
  name: string;
  size: number;
}

export function PlaceholderAvatar({ name, size }: PlaceholderAvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const backgroundColor = colors[colorIndex];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill={backgroundColor} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".1em"
        fill="white"
        fontSize="20"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        {initial}
      </text>
    </svg>
  );
}

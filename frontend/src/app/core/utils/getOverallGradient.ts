export const getOverallGradientColor = (overall: number) => {
  const hue = Math.min(120, Math.max(0, (overall - 60) * (120 / 40)));
  return `hsl(${hue}, 80%, 50%)`;
}
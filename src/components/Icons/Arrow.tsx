interface Props {
  size?: number;
  color?: string;
}

export const ArrowIcon = ({
  size = 10,
  color = "#000000",
}: Props): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={"rgb(204, 204, 204)"}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

import { ButtonHTMLAttributes, useState } from "react";

interface PropTypes extends ButtonHTMLAttributes<any> {
  color?: string;
  backgroundColor?: string;
}

const Button = (props: PropTypes) => {
  const { color = "#000000", backgroundColor = "#ffffff" } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isAlt = isHovered || isFocused;

  const internalProps = { ...props } as any;
  delete internalProps["color"];
  delete internalProps["backgroundColor"];

  return (
    <button
      {...internalProps}
      className={`border rounded-xl p-3 transition-all ${props.className}`}
      style={{
        color: isAlt ? backgroundColor : color,
        backgroundColor: isAlt ? color : "transparent",
        borderColor: color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default Button;

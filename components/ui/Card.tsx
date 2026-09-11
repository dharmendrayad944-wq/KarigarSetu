import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  padded = true,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl craft-border-subtle overflow-hidden ${
        hoverable ? "craft-card-hover" : ""
      } ${padded ? "p-6" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

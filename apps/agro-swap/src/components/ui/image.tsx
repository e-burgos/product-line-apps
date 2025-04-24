import React from "react";

interface ImageProps {
  src: string;
  height?: number;
  width?: number;
  alt?: string;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
  priority?: boolean;
  className?: string;
  placeholder?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  height,
  width,
  alt,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Image;

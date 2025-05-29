import React from 'react';

export interface ImageProps {
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
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const Image: React.FC<ImageProps> = ({
  src,
  height,
  width,
  alt,
  className,
  objectFit = 'cover',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        objectFit: objectFit,
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
      }}
    />
  );
};

export default Image;

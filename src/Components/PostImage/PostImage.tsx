import React from "react";

interface Props {
  source: string;
}

/**
 * Изображение поста.
 *
 * @param source источник изображения
 */
const PostImage = ({ source }: Props) => {
  return (
    <img className="rounded w-80 h-80 mb-3" src={source} alt="Avatar" />
  );
};

export default PostImage;

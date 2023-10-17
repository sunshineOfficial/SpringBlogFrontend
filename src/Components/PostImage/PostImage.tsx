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
    <img className="rounded mb-3" src={source} alt="Avatar" />
  );
};

export default PostImage;

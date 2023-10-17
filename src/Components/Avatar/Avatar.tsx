import React from "react";

interface Props {
  source: string;
}

/**
 * Аватар пользователя.
 * 
 * @param source источник изображения
 */
const Avatar = ({ source }: Props) => {
  return (
    <img className="rounded w-36 h-36 mb-3" src={source} alt="Avatar" />
  );
};

export default Avatar;

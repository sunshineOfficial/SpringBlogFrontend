import React, {useEffect, useState} from "react";
import {PostResponse} from "../../Api/Interfaces/post";
import {UserResponse} from "../../Api/Interfaces/user";
import {getUserById} from "../../Api/api";

interface Props {
  postResponse: PostResponse;
}

const Post = ({ postResponse }: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  const createdAt = new Date(postResponse.createdAt);
  const updatedAt = new Date(postResponse.updatedAt);

  useEffect(() => {
    const getUserInit = async () => {
      const response = await getUserById(postResponse.userId);

      if (typeof response !== "string" && response.status === 200) {
        setUser(response.data);
      }
    };

    getUserInit();
  }, [postResponse.userId]);
  
  return (
    <>
      <h2 className="text-4xl font-extrabold">{postResponse.title} <small className="ml-2 font-semibold text-gray-500">by {user?.username}</small></h2>
      <p className="text-gray-500">Author: {user?.firstName} {user?.lastName}</p>
      <p className="mb-3 text-gray-500">Created at: {createdAt.toLocaleString()} Updated at: {updatedAt.toLocaleString()}</p>
      <p className="mb-3 text-lg text-gray-500 md:text-xl">{postResponse.content}</p>
    </>
  );
};

export default Post;

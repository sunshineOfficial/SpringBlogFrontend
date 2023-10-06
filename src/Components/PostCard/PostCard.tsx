import React, {useEffect, useState} from "react";
import {PostResponse} from "../../Api/Interfaces/post";
import {Link} from "react-router-dom";
import {getAllPosts, getUserById} from "../../Api/api";
import {UserResponse} from "../../Api/Interfaces/user";

interface Props {
  id: string;
  postResponse: PostResponse;
}

const PostCard = ({ id, postResponse }: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  
  const createdAt = new Date(postResponse.createdAt);

  useEffect(() => {
    const getUserInit = async () => {
      const response = await getUserById(postResponse.userId);

      if (typeof response !== "string" && response.status === 200) {
        setUser(response.data);
      }
    };

    getUserInit();
  }, []);
  
  return (
    <div id={id} key={id} className="max-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{postResponse.title}</h5>
      <p className="mb-3 font-normal text-gray-700">Author: {user?.username}<br/>Created at: {createdAt.toLocaleString()}</p>
      <Link to="/post" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
        Read
      </Link>
    </div>
  );
};

export default PostCard;

import React, {useEffect, useState} from "react";
import {PostResponse} from "../../Api/Interfaces/post";
import {Link} from "react-router-dom";
import {deletePost, getUserById} from "../../Api/api";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {useToken} from "../../App";

interface Props {
  id: string;
  postResponse: PostResponse;
  currentUser: UserResponse | null;
  role: RoleResponse | null;
}

const PostCard = ({ id, postResponse, currentUser, role }: Props) => {
  const { token } = useToken();
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
  }, [postResponse.userId]);

  const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deletePost(postResponse.id, token);
    window.location.reload();
  };
  
  return (
    <div id={id} key={id} className="max-w-sm mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{postResponse.title}</h5>
      <p className="mb-3 font-normal text-gray-700">Author: {user?.username}<br/>Created at: {createdAt.toLocaleString()}</p>
      <Link to={`/post/${postResponse.id}`} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
        Read
      </Link>
      { currentUser !== null && (currentUser?.id === user?.id || role?.name !== "USER") && 
          <>
              <Link to={`/post/update/${postResponse.id}`} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Update
              </Link>
              <button type="submit" onClick={onDeleteClick} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                  Delete
              </button>
          </>
      }
    </div>
  );
};

export default PostCard;

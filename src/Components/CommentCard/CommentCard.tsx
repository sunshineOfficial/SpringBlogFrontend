import React, {useEffect, useState} from "react";
import {UserResponse} from "../../Api/Interfaces/user";
import {RoleResponse} from "../../Api/Interfaces/role";
import {CommentResponse} from "../../Api/Interfaces/comment";
import {useToken} from "../../App";
import {deleteComment, getUserById} from "../../Api/api";

interface Props {
  id: string;
  commentResponse: CommentResponse;
  currentUser: UserResponse | null;
  role: RoleResponse | null;
}

const CommentCard = ({ id, commentResponse, currentUser, role }: Props) => {
  const { token } = useToken();
  const [user, setUser] = useState<UserResponse | null>(null);

  const createdAt = new Date(commentResponse.createdAt);

  useEffect(() => {
    const getUserInit = async () => {
      const response = await getUserById(commentResponse.userId);

      if (typeof response !== "string" && response.status === 200) {
        setUser(response.data);
      }
    };

    getUserInit();
  }, [commentResponse.userId]);

  const onDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteComment(commentResponse.id, token);
    window.location.reload();
  };
  
  return (
    <div id={id} key={id} className="max-w-sm mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{user?.username}</h5>
      <p className="mb-3 font-normal text-gray-700">{commentResponse.content}</p>
      <p className="mb-3 font-normal text-gray-700">{createdAt.toLocaleString()}</p>
      { currentUser !== null && (currentUser?.id === user?.id || role?.name !== "USER") &&
          <>
              <button type="submit" onClick={onDeleteClick} className="mr-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                  Delete
              </button>
          </>
      }
    </div>
  );
};

export default CommentCard;

import React from "react";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Блок для написания комментария.
 * 
 * @param onSubmit событие, вызываемое при отправке комментария
 * @param onChange событие, вызываемое при изменении содержимого комментария
 */
const CommentArea = ({ onSubmit, onChange }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <label htmlFor="comment" className="sr-only">Your comment</label>
          <textarea onChange={onChange} id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0" placeholder="Write a comment..." required></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t">
          <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800">
            Post comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentArea;

import React, {useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import PostForm from "../../Components/PostForm/PostForm";
import {useToken} from "../../App";
import {PostRequest} from "../../Api/Interfaces/post";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {createPost} from "../../Api/api";

interface Props {
}

const CreatePostPage = (props: Props) => {
  const { token } = useToken();
  const [formData, setFormData] = useState<PostRequest>({
    content: "", title: ""
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await createPost(formData, token);

    if (typeof response !== "string") {
      if (response.status === 200) {
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } else {
      setError(response);
    }
  }

  const onCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({...formData, [id]: value});
  }
  
  return (
    <>
      <PageHeader>Create post</PageHeader>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <PostForm onSubmit={onCreateSubmit} onChange={onCreateChange} />
    </>
  );
};

export default CreatePostPage;

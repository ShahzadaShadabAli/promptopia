"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const profilePage = () => {
  const id = useParams().id;
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json();
          setPosts(data);
          console.log("data", data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt/${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are You Sure?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {}
    }
  };

  return (
    <div>
      {posts.length > 0 ? (
        <Profile
          name={posts[0]?.creator.username}
          desc={`Welcome to ${
            posts.length > 0 && posts[0].creator.username
          }'s personalized profile page`}
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <span className="blue_gradient head_text">Loading Profile...</span>
      )}
    </div>
  );
};

export default profilePage;

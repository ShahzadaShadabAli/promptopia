"use client"

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
        {data?.map(d => (
            <PromptCard post={d} handleTagClick={handleTagClick} />
        ))}
        </div>
    )
}

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [originalPost, setOriginalPost] = useState([])

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/prompt", {method: "GET"})
            const data = await response.json()
            setPosts(data)
            setOriginalPost(data)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])

    const handleTagClick = (post) => {
        const input = document.querySelector('.search_input')
        input.value = post
        handleSearchChange(post)
    }

    const handleSearchChange = (searchText) => {
        console.log(searchText);
    
        // Reset to original posts when search text is cleared
        if (!searchText) {
            setPosts(originalPost);
            return;
        }
    
        // Always search from the original list, not the current posts
        const lowerSearchText = searchText.toLowerCase();
    
        const filteredPosts = originalPost.filter(u =>
            u.creator.username.toLowerCase().includes(lowerSearchText) ||
            u.prompt.toLowerCase().includes(lowerSearchText) ||
            u.tag.toLowerCase().includes(lowerSearchText)
        );
    
        // Set filtered posts or set to original if no matches are found
        setPosts(filteredPosts) 
    };
    
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text"  placeholder="Search for a tag or a username" onChange={(e) =>  handleSearchChange(e.target.value)}  required className="search_input peer animate-jump-in"/>
            </form>
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    );
}
 
export default Feed;
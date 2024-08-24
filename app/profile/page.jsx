"use client"

import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const profilePage = () => {

    const router = useRouter()
    const {data: session} = useSession()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user.id) {
                try {
                    const response = await fetch(`/api/users/${session?.user.id}/posts`)
                    const data = await response.json()
                    setPosts(data)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
            }
            
        }
       fetchData()
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt/${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are You Sure?")
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {method: "DELETE"})
                const filteredPosts = posts.filter(p => p._id !== post._id)
                setPosts(filteredPosts)
            } catch (error) {
                
            }
        }
    }

  return (
    <Profile 
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default profilePage

"use client"
import Form from '@/components/Form'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import {useParams, useRouter} from "next/navigation"

const page = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    const {data:session} = useSession()
    const router = useRouter()

    const id = useParams().id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/prompt/${id}`)
                const data = await response.json()
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const response = await fetch(`/api/prompt/${id}`, {method: 'PATCH', body: JSON.stringify(
                {
                    prompt: post.prompt,
                    tag: post.tag
                }
            )})

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <Form
        type={"Edit"}
        post={post}
        setPost={setPost}
        setSubmitting={setSubmitting}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default page

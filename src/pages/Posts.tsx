import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/components/posts/PostForm";
import { usePosts } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import { Plus } from "lucide-react";
import type { Post } from "@/types";
import { PostsTable } from "@/components/posts/PostTable";

export function Posts() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        posts,
        pagination,
        isLoading,
        searchQuery,
        createPost,
        updatePost,
        deletePost,
        handleSearch,
        handlePageChange,
    } = usePosts();

    const { users } = useUsers();

    const handleCreatePost = () => {
        setSelectedPost(null);
        setIsFormOpen(true);
    };

    const handleEditPost = (post: Post) => {
        setSelectedPost(post);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (data: Omit<Post, "id" | "user">) => {
        setIsSubmitting(true);
        try {
            if (selectedPost) {
                await updatePost(selectedPost.id, data);
            } else {
                await createPost(data);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Posts</h1>
                    <p className="text-muted-foreground">
                        Manage your blog posts and articles
                    </p>
                </div>
                <Button onClick={handleCreatePost}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                </Button>
            </div>

            <PostsTable
                posts={posts}
                users={users ?? []}
                pagination={pagination}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onPageChange={handlePageChange}
                onEdit={handleEditPost}
                onDelete={deletePost}
            />

            <PostForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                post={selectedPost}
                users={users ?? []}
                isLoading={isSubmitting}
            />
        </div>
    );
}

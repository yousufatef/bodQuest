import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import type { Post } from '@/types';

interface PostsTableProps {
    posts: Post[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    isLoading: boolean;
    searchQuery: string;
    onSearch: (query: string) => void;
    onPageChange: (page: number) => void;
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
}

export function PostsTable({
    posts,
    pagination,
    isLoading,
    searchQuery,
    onSearch,
    onPageChange,
    onEdit,
    onDelete,
}: PostsTableProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisible = 5;
        const start = Math.max(1, pagination.page - Math.floor(maxVisible / 2));
        const end = Math.min(pagination.totalPages, start + maxVisible - 1);

        for (let i = start; i <= end; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => onPageChange(i)}
                        isActive={pagination.page === i}
                        className="cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Body</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                    <p className="mt-2 text-sm text-muted-foreground">Loading posts...</p>
                                </TableCell>
                            </TableRow>
                        ) : posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <p className="text-muted-foreground">No posts found</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <Badge variant="outline">{post.id}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium max-w-xs truncate">
                                        {post.title}
                                    </TableCell>
                                    <TableCell>{post.user?.name || 'Unknown'}</TableCell>
                                    <TableCell className="max-w-md truncate">
                                        {post.body}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onEdit(post)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setDeleteId(post.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this post? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setDeleteId(null)}>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDelete}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                        {pagination.total} results
                    </p>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => onPageChange(pagination.page - 1)}
                                    className={
                                        pagination.page <= 1
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>
                            {renderPaginationItems()}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => onPageChange(pagination.page + 1)}
                                    className={
                                        pagination.page >= pagination.totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
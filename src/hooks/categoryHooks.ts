
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/category';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { openAlert } from '@/helpers/alert';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
}

export const useCategories = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 2 * 60 * 1000, // 2 min
    retry: 3
  });

  return {
    data: data || [],
    error,
    isFetching
  }
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      openAlert({ type: 'success', message: 'Category created successfully', open: true });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      openAlert({ type: 'error', message: error?.response?.data?.message || 'Failed to create category', open: true });
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: { name: string } }) => updateCategory(id, data),
    onSuccess: () => {
      openAlert({ type: 'success', message: 'Category updated successfully', open: true });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      openAlert({ type: 'error', message: error?.response?.data?.message || 'Failed to update category', open: true });
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      openAlert({ type: 'success', message: data?.message || 'Category deleted successfully', open: true });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      openAlert({ type: 'error', message: error?.response?.data?.message || 'Failed to delete category', open: true });
    }
  });
};

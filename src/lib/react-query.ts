import type { ApiError, ApiResponse } from "@/types/api"
import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useAppQuery = <TData = unknown, TError = ApiError>({
    queryKey,
    queryFn,
    ...options
}: UseQueryOptions<ApiResponse<TData>, TError> & {
    queryKey: string[];
    queryFn: () => Promise<ApiResponse<TData>>;
}) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
        isSuccess,
        status,
    } = useQuery<ApiResponse<TData>, TError>({
        queryKey,
        queryFn,
        ...options,
    });

    return {
        data: data?.data,
        message: data?.message,
        success: data?.success,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
        isSuccess,
        status,
    };
};

export const useAppMutation = <
    TData = unknown,
    TError = ApiError,
    TVariables = void,
    TContext = unknown
>({
    mutationFn,
    redirectTo,
    queryKey,
    onSuccess,
    ...options
}: UseMutationOptions<TData, TError, TVariables, TContext> & {
    mutationFn: (variables: TVariables) => Promise<TData>;
    redirectTo?: string;
    queryKey?: string[];
}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        mutate,
        mutateAsync,
        isPending,
        isError,
        isSuccess,
        error,
        data,
        reset,
        status,
    } = useMutation<TData, TError, TVariables, TContext>({
        mutationFn,
        onSuccess: (data, variables, onMutateResult, context) => {

            if (onSuccess) {
                onSuccess(data, variables, onMutateResult, context)
            }

            if (queryKey) queryClient.invalidateQueries({ queryKey });

            if (redirectTo) navigate(redirectTo);

        },
        ...options,
    });

    return {
        mutate,
        mutateAsync,
        isPending,
        isError,
        isSuccess,
        error,
        data,
        reset,
        status,
    };
};
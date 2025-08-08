import { rqClient } from "@/shared/api/instance";
import type { components } from "@/shared/api/schema/generated";
import { useCallback, type RefCallback } from "react";

type UseBoardsListParams = {
    limit?: number;
    isFavourite?: boolean;
    search?: string;
    sort?: "createdAt" | "updatedAt" | "lastOpenedAt" | "name";
};

export const useBoardsList = ({
    limit = 20,
    isFavourite,
    search,
    sort,
}: UseBoardsListParams) => {
    const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } =
        rqClient.useInfiniteQuery(
            "get",
            "/boards",
            {
                params: {
                    query: {
                        page: 1,
                        limit,
                        isFavourite,
                        search,
                        sort,
                    },
                },
            },
            {
                initialPageParam: 1,
                pageParamName: "page",
                getNextPageParam: (
                    lastPage: {
                        list: components["schemas"]["Board"][];
                        total: number;
                        totalPages: number;
                    },
                    _: any,
                    LastPageParams: string
                ) =>
                    Number(LastPageParams) < lastPage.totalPages
                        ? LastPageParams + 1
                        : null,
            }
        );

    const cursorRef: RefCallback<HTMLDivElement> = useCallback(
        (el) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        fetchNextPage();
                    }
                },
                { threshold: 0.5 }
            );

            if (el) {
                observer.observe(el);
                return () => {
                    observer.disconnect();
                };
            }
        },
        [fetchNextPage]
    );

    const boards = data?.pages.flatMap((page) => page.list) ?? [];

    return {
        cursorRef,
        boards,
        fetchNextPage,
        isFetchingNextPage,
        isPending,
        hasNextPage,
    };
};

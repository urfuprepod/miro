import { useState } from "react";

export type BoardsSortOption =
    | "createdAt"
    | "updatedAt"
    | "lastOpenedAt"
    | "name";

export type BoardsFilters = {
    search: string;
    sort: BoardsSortOption;
    showFavourites: boolean;
};

export const useBoardsFilters = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<BoardsSortOption>("lastOpenedAt");
    const [showFavourites, setShowFavourites] = useState<boolean | null>(null);

    return {
        search,
        sort,
        
    }
};

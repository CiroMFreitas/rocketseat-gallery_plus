import { useQuery } from "@tanstack/react-query";
import { type Album } from "../models/album";
import { fetCher } from "../../../helpers/api";

export default function useAlbums() {
    const { data, isLoading } = useQuery<Album[]>({
        queryKey: ["albums"],
        queryFn: () => fetCher("/albums")
    });

    return {
        albums: data || [],
        isLoadingAlbums: isLoading
    };
}
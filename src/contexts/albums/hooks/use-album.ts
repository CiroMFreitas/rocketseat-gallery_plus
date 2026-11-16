import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../../helpers/api";
import type { Album } from "../models/album";
import type { AlbumNewFormSchema } from "../schemas";
import { toast } from "sonner";
import usePhotos from "../../photos/hook/use-photos";

export default function useAlbum() {
    const queryClient = useQueryClient();
    const { photos } = usePhotos();

    async function createAlbum(payload: AlbumNewFormSchema) {
        try {
            const { data: album } = await api.post<Album>("/albums", {
                title: payload.title
            });

            if (payload.photosIds && payload.photosIds.length > 0) {
                await Promise.all(
                    payload.photosIds.map((photoId) => {
                        const albumsIds = photos.find((photo) => photo.id === photoId)?.albums.map((album) => album.id) || [];
                        api.put(`/photos/${photoId}/albums`, {
                            albumsIds: [...albumsIds, album.id]
                        });
                    })
                );
            }

            queryClient.invalidateQueries({ queryKey: ["albums"] });
            queryClient.invalidateQueries({ queryKey: ["photos"] });

            toast.success("Album criado com sucesso");
        } catch (error) {
            toast.error("Erro ao criar album");
            throw error;
        }
    }

    return {
        createAlbum
    };
}

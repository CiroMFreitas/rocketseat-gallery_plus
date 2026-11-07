import { useQuery } from "@tanstack/react-query";
import { fetCher } from "../../../helpers/api";
import type { Photo } from "../models/photo";

interface PhotoDetailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
    const { data, isLoading } = useQuery<PhotoDetailResponse>({
        queryKey: ["photo", id],
        queryFn: () => fetCher(`/photos/${id}`),
        enabled: !!id
    });

    return {
        photo: data,
        nextPhotoId: data?.nextPhotoId,
        previousPhotoId: data?.previousPhotoId,
        isLoadingPhoto: isLoading
    }
}
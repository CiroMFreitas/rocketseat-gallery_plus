import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import type { Photo } from "../contexts/photos/models/photo";
import Skeleton from "../components/skeleton";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhoto from "../contexts/photos/hook/use-photo";

export default function PagePhotoDetails() {
    const { id } = useParams();
    const { photo, nextPhotoId, previousPhotoId, isLoadingPhoto } = usePhoto(id)
    const { albums, isLoadingAlbums } = useAlbums();

    if (!isLoadingPhoto && !photo) {
        return (
            <div>Foto não encontrada</div>
        );
    }

    return (
        <Container>
            <header className="flex items-center justify-between gap-8 mb-8">
                {!isLoadingPhoto ? (
                    <Text as="h2" variant="heading-large">
                        {photo?.title}
                    </Text>
                ) : (
                    <Skeleton className="w-48 h-8" />
                )}

                <PhotosNavigator
                    previousPhotoId={previousPhotoId}
                    nextPhotoId={nextPhotoId}
                    loading={isLoadingPhoto}
                />
            </header>

            <div className="grid grid-cols-[21rem_1fr] gap-24">
                <div className="space-y-3">
                    {!isLoadingPhoto ? (
                        <>
                            <ImagePreview
                                src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
                                title={photo?.title}
                                imageClassName="h-84"
                            />

                            <Button
                                variant="destructive"
                            >
                                Excluir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Skeleton className="h-84" />

                            <Skeleton className="h-7 w-24" />
                        </>
                    )}
                </div>

                <div className="py-3">
                    <Text as="h3" variant="heading-medium" className="mb-6">
                        Albuns
                    </Text>

                    <AlbumsListSelectable
                        photo={photo as Photo}
                        albums={albums}
                        loading={isLoadingAlbums}
                    />
                </div>
            </div>
        </Container >
    );
}
import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotosList from "../contexts/photos/components/photo-list";
import usePhotos from "../contexts/photos/hook/use-photos";

export default function PageHome() {
    const { albums, isLoadingAlbums } = useAlbums();
    const { photos, isLoadingPhotos } = usePhotos();

    return (
        <Container className="grid gap-6">
            <AlbumsFilter
                className="mb-9"
                albums={albums}
                loading={isLoadingAlbums}
            />

            <PhotosList
                photos={photos}
                loading={isLoadingPhotos}
            />
        </Container>
    );
}
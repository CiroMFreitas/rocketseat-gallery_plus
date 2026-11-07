import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import usePhotos from "../../photos/hook/use-photos";
import type { Album } from "../models/album";
import cx from "classnames";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
    albums: Album[];
    loading?: boolean;
}

export default function AlbumsFilter({
    className,
    albums,
    loading,
    ...props
}: AlbumsFilterProps) {
    const { filters } = usePhotos();

    return (
        <div className={cx("flex items-center gap-3.5 overflow-x-auto", className)} {...props}>
            <Text variant="heading-small">
                Albuns
            </Text>

            <div className="flex gap-3">
                {!loading ? (
                    <>
                        <Button
                            size="sm"
                            variant={filters.albumId === null ? "primary" : "ghost"}
                            className="cursor-pointer"
                            onClick={() => filters.setAlbumId(null)}
                        >
                            Todos
                        </Button>

                        {
                            albums.map((album) => (
                                <Button
                                    key={album.id}
                                    size="sm"
                                    variant={filters.albumId === album.id ? "primary" : "ghost"}
                                    className="cursor-pointer"
                                    onClick={() => filters.setAlbumId(album.id)}
                                >
                                    {album.title}
                                </Button>
                            ))
                        }
                    </>
                ) : (
                    Array.from({ length: 5 }).map((_, index) =>
                        <Skeleton key={`album-button-${index}`} className="w-28 h-7" />
                    )
                )}
            </div>
        </div>
    )
}
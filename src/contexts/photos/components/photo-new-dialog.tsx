import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/diaolog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import ImagePreview from "../../../components/image-preview";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({
    trigger
}: PhotoNewDialogProps) {
    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema)
    });
    const { albums, isLoadingAlbums } = useAlbums();

    const file = form.watch("file");
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

    function handleSubmit(payload: PhotoNewFormSchema) {
        console.log(payload)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>
                        Adicionar foto
                    </DialogHeader>

                    <DialogBody className="flex flex-col gap-5">
                        <InputText
                            placeholder="Adcione um titulo"
                            maxLength={255}
                            error={form.formState.errors.tittle?.message}
                            {...form.register("tittle")}
                        />

                        <Alert>
                            Tamanho máximo: 50MB

                            <br />

                            Você pode selecionar arquivos em PNG, JPG ou JPEG
                        </Alert>

                        <InputSingleFile
                            form={form}
                            allowedExtensions={["png", "jpg", "jpeg"]}
                            maxFileSizeInMB={50}
                            replaceBy={
                                <ImagePreview
                                    className="w-full h-56"
                                    src={fileSource}
                                />
                            }
                            error={form.formState.errors.file?.message}
                            {...form.register("file")}
                        />

                        <div className="space-y-3">
                            <Text variant="label-small">
                                Selecionar albuns
                            </Text>

                            <div className="flex flex-wrap gap-3">
                                {!isLoadingAlbums && albums.length > 0 && albums.map((album) => (
                                    <Button
                                        key={album.id}
                                        variant="ghost"
                                        size="sm"
                                        className="truncate"
                                    >
                                        {album.title}
                                    </Button>
                                ))}

                                {isLoadingAlbums && Array.from({ length: 5 }).map((_, index) => (
                                    <Skeleton
                                        key={`album-loading-${index}`}
                                        className="w-20 h-7"
                                    />
                                ))}
                            </div>
                        </div>
                    </DialogBody>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary">
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button type="submit">
                            Adcionar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
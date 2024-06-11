import { useToast } from "@/components/ui/use-toast";
import { newProductMutation } from "@/data/mutations/new-product-mutation";
import { ProductCreateWithoutId, productSchema } from "@/schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export const useNewProduct = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState(0);

  const productMutation = useMutation({
    mutationFn: (product: ProductCreateWithoutId) =>
      newProductMutation(product, onUploadProgress),
    retry: 3,
    retryDelay: 2000,
    onSuccess: () => {
      toast({
        title: "Produto cadastrado com sucesso",
      });
      onUploadProgress(100);
      router.push("/produtos");
    },
    onError: (error) => {
      toast({
        title: "Erro ao cadastrar produto",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<ProductCreateWithoutId>({
    resolver: zodResolver(productSchema.omit({ id: true })),
    defaultValues: {
      category: "",
      code: "",
      description: "",
      image: undefined,
      name: "",
    },
    shouldFocusError: true,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    form.setValue("image", acceptedFiles[0]);
  }, [form]);

  const dropzone = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
    onDrop,
  });

  const onUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  }

  const onFormSubmit = (values: ProductCreateWithoutId) => {
    productMutation.mutate(values);
  };

  return {
    form,
    dropzone,
    uploadProgress,
    onFormSubmit,
    isLoading: productMutation.isPending,
  }
};
import { useToast } from "@/components/ui/use-toast";
import { newProductMutation } from "@/data/mutations/new-product-mutation";
import { Product, productSchema } from "@/schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export const useNewProduct = () => {
  const { toast } = useToast();
  const router = useRouter();

  const productMutation = useMutation({
    mutationFn: newProductMutation,
    retry: 3,
    retryDelay: 2000,
    onSuccess: () => {
      toast({
        title: "Produto cadastrado com sucesso",
      });
      router.push("/produtos");
    },
    onError: (error) => {
      toast({
        title: "Erro ao cadastrar produto",
        description: error.message,
        variant: "destructive",
      })
    },
  });

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "",
      code: "",
      description: "",
      image: undefined,
      name: "",
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    form.setValue("image", acceptedFiles[0]);
  }, [form]);

  
  const dropzone = useDropzone({
    multiple: false,
    onDrop,
  });

  const onFormSubmit = (values: Product) => {
    console.log({ values });
    productMutation.mutate(values);
  };

  const onSuccessRegisterProduct = () => { };

  return {
    form,
    dropzone,
    onFormSubmit,
    isLoading: productMutation.isPending,
  }
};
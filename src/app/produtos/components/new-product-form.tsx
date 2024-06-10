"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useNewProduct } from "@/hooks/pages/use-new-product";
import { LoaderCircleIcon, UploadIcon } from "lucide-react";

export const NewProductForm = () => {
  const { form, onFormSubmit, dropzone, isLoading, uploadProgress } = useNewProduct();

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(onFormSubmit)}>
        <div className="grid gap-2">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2 ">
          <div className="grid gap-2">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição do produto"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a categoria do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div {...dropzone.getRootProps()} className="focus:shadow-outline w-full min-h-[320px]  appearance-none rounded border py-2 px-3 leading-tight bg-transparent text-gray-400 shadow focus:outline-none border-dashed flex items-center justify-center flex-col gap-3 hover:text-gray-950 transition-all delay-75 cursor-pointer">
            {dropzone.isDragAccept}
            <p
              className={
                `text-center ${dropzone.isDragActive ? "text-gray-950" : ""} ${dropzone.isDragReject ? "text-red-500" : ""} ${dropzone.isDragAccept ? "text-green-500 disabled" : ""}`
              }
            >
              Arraste a imagem do produto aqui
            </p>
            <UploadIcon
              className={
              `${dropzone.isDragActive ? "text-gray-950" : ""} ${dropzone.isDragReject ? "text-red-500" : ""} ${dropzone.isDragAccept ? "text-green-500" : ""}`
              }
            />
            <input id="image" {...dropzone.getInputProps()} />
          </div>
          <div>
            <Progress
              value={uploadProgress}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {
            isLoading ? (
              <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>
                Cadastrar produto
              </span>
            )
          }
        </Button>
      </form>
    </Form>
  );
};
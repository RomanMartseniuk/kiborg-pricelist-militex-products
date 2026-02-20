import CloseIcon from "@/assets/icons/CloseIcon";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/types/Product";

import DOMPurify from "dompurify";
import { useState } from "react";
import { Loader } from "../Loader";

const BASE_URL = "https://kiborg.com.ua";

function fixImages(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Фикс картинок
  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");

    if (src && src.startsWith("/")) {
      img.setAttribute("src", BASE_URL + src);
    }
  });

  // Фикс таблиц
  doc.querySelectorAll("table").forEach((table) => {
    const wrapper = doc.createElement("div");
    wrapper.className = "table-scroll-wrapper";
    table.parentNode?.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  return doc.body.innerHTML;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const sanitized = DOMPurify.sanitize(product.description, {
    FORBID_ATTR: ["style"], // запрещаем inline стили
  });

  const cleanHtml = fixImages(sanitized);

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <DialogContent
      className="max-w-[95%] font-[Unbounded] overflow-hidden border-0 p-0"
      showCloseButton={false}
    >
      <DialogHeader className="flex flex-row items-center justify-between gap-3 bg-[#202020] px-3 py-4 text-white">
        <DialogTitle className="text-left  text-[15px] ">
          {product.name}
        </DialogTitle>
        <DialogClose>
          <CloseIcon className="size-8" />
        </DialogClose>
      </DialogHeader>
      <div className="no-scrollbar max-h-[70vh] px-6 mb-6 overflow-y-auto">
        <div className="relative mb-2 pt-5 flex flex-col">
          {/* Loader поверх */}
          {!isImgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white">
              <Loader className="h-12 w-12" />
            </div>
          )}

          <div
            className={
              isImgLoaded
                ? "opacity-100 transition-opacity duration-300"
                : "opacity-0"
            }
          >
            <Carousel
              className="relative"
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 3000 })]}
            >
              <CarouselContent>
                {product.pictures.map((pic) => (
                  <CarouselItem key={pic}>
                    <img
                      src={pic}
                      alt={product.name}
                      className="md:w-80 aspect-square object-contain m-auto"
                      onLoad={() => setIsImgLoaded(true)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-0 transition-colors duration-500 bg-[#202020] hover:bg-[#fecb15] text-[#fecb15] hover:text-[#202020] border-0" />
              <CarouselNext className="absolute right-0 transition-colors duration-500 bg-[#202020] hover:bg-[#fecb15] text-[#fecb15] hover:text-[#202020] border-0" />
            </Carousel>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center mb-5">
          <Badge className="bg-[#202020]">РРЦ: {product.price} грн</Badge>
          {product.optPrice && (
            <Badge className="bg-[#757575]">ОПТ: {product.optPrice} грн</Badge>
          )}
          <Badge className="bg-[#fecb15] text-[#202020]">
            ДРОП: {product.dropPrice} грн
          </Badge>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[12px]">Артикул - {product.vendorCode}</div>
          <a
            href={product.url}
            className="block text-[12px] px-3 py-2.5 rounded font-semibold text-center transition-colors bg-[#202020] duration-500 hover:bg-[#fecb15] text-[#fecb15] hover:text-[#202020]"
          >
            Переглянути товар
          </a>
        </div>
        <div className="whitespace-pre-line">
          <div
            className="flex flex-col gap-2 product-description"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </div>
      </div>
    </DialogContent>
  );
};

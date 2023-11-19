import { productWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDown01Icon, ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import DiscountBagde from "./discount-badge";

interface ProductItemProps {
    product: productWithTotalPrice;
};

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <div className="flex flex-col gap-4">
                <div className="relative bg-accent h-[170px] w-full rounded-lg flex items-center justify-center">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-auto w-auto max-w-[80%] max-h-[80%]"
                        style={{
                            objectFit: "contain"
                        }}
                    />

                    {product.discountPercentage > 0 && (

                        <DiscountBagde className="absolute left-3 top-3">{product.discountPercentage}</DiscountBagde>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <p className="w-full text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                        {product.name}
                    </p>

                    <div className="flex items-center gap-2">
                        {product.discountPercentage > 0 && (
                            <>
                                <p className="font-semibold">R$ {Number(product.totalPrice).toFixed(2)}</p>

                                <p className="opacity-75 text-xs line-through">{Number(product.basePrice).toFixed(2)}</p>
                            </>
                        )}

                        {product.discountPercentage === 0 && (
                            <p className="font-semibold text-sm">R$ {Number(product.basePrice).toFixed(2)}</p>
                        )}
                    </div>
                </div>


            </div>
        </Link>
    );

}

export default ProductItem;
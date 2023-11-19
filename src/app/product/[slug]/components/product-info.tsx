"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DiscountBagde from "@/components/ui/discount-badge";
import { productWithTotalPrice } from "@/helpers/products";
import { CartContext } from "@/providers/cart";
import { Product } from "@prisma/client";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
    product: productWithTotalPrice
}

const ProductInfo = ({ product }: ProductInfoProps) => {

    const { addProductToCart } = useContext(CartContext);

    const [quantity, setQuatity] = useState(1);

    const handleDecreaseQuantityClick = () => setQuatity(prev => prev === 1 ? prev : prev - 1);

    const handleIncreaseQuantityClick = () => setQuatity(prev => prev + 1);

    const handleAddToCartClick = () => {
        addProductToCart({ ...product, quantity });
    }

    return (
        <div className="flex flex-col px-5">
            <h2 className="text-lg">{product.name}</h2>

            <div className="flex items-center gap-2">
                <h1 className="text-xl">R$ {product.totalPrice.toFixed(2)}</h1>
                {product.discountPercentage > 0 && (
                    <DiscountBagde>{product.discountPercentage}</DiscountBagde>
                )}
            </div>

            {product.discountPercentage > 0 &&
                <p className="opacity-75 text-sm line-through">R$ {Number(product.basePrice).toFixed(2)}</p>
            }

            <div className="flex items-center gap-2 mt-4">
                <Button size="icon" variant={"outline"} onClick={handleDecreaseQuantityClick}>
                    <ArrowLeftIcon size={16} />
                </Button>

                <span>{quantity}</span>

                <Button size="icon" variant={"outline"} onClick={handleIncreaseQuantityClick}>
                    <ArrowRightIcon size={16} />
                </Button>
            </div>

            <div className="flex flex-col gap-3 mt-8">
                <h3 className="font-bold">Descrição</h3>

                <p className="text-sm opacity-69 text-justify">{product.description}</p>
            </div>

            <Button className="mt-8 uppercase font-bold" onClick={handleAddToCartClick}>
                Adicionar ao Carrinho
            </Button>

            <div className="mt-8 bg-accent rounded-lg flex items-center px-5 py-2 justify-between">

                <div className="flex items-center gap-3">
                    <TruckIcon />

                    <div className="flex flex-col">
                        <p className="text-xs">Entrega via
                            <span className="font-bold"> FSPacket</span>
                        </p>
                        <p className="text-[#8162FF] text-xs">Envio para todo o
                            <span className="font-bold"> Brasil</span>
                        </p>
                    </div>
                </div>

                <p className="text-xs font-bold">Frete Grátis</p>
            </div>
        </div>
    )
}

export default ProductInfo;
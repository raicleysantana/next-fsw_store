
import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
    const {
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart
    } = useContext(CartContext);

    const handleDecreaseProductQuantity = () => decreaseProductQuantity(product.id);

    const handleIncreaseProductQuantity = () => increaseProductQuantity(product.id);

    const handleRemoveProductClick = () => removeProductFromCart(product.id);

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-accent flex items-center justify-center rounded-lg h-[77px] w-[77px]">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-[80%] max-h-[70%]"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="text-xs font-bold">
                        {product.name}
                    </p>

                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">
                            R$ {product.totalPrice.toFixed(2)}
                        </p>

                        {
                            product.discountPercentage > 0 &&
                            <p className="opacity-75 line-through text-xs">
                                R$ {Number(product.basePrice).toFixed(2)}
                            </p>
                        }
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="icon" variant={"outline"} className="h-8 w-8" onClick={handleDecreaseProductQuantity}>
                            <ArrowLeftIcon size={12} />
                        </Button>

                        <span className="text-xs">{product.quantity}</span>

                        <Button size="icon" variant={"outline"} className="h-8 w-8" onClick={handleIncreaseProductQuantity}>
                            <ArrowRightIcon size={12} />
                        </Button>
                    </div>
                </div>

                <Button size={"icon"} variant={"outline"} onClick={handleRemoveProductClick}>
                    <TrashIcon size={16} />
                </Button>
            </div>
        </div>


    );
}

export default CartItem;
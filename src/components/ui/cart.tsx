import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "./scroll-area";
import { createCheckout } from "@/actions/checkout";
import { Button } from "./button";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const { products, total, totalDiscount, subTotal } = useContext(CartContext);

    console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    
    const handleFinishPurchaseClick = async () => {
        const checkout = await createCheckout(products);

        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
        );

        stripe?.redirectToCheckout({
            sessionId: checkout.id
        })
    }

    return (
        <div className="flex flex-col gap-5 h-full">
            <Badge className="w-fit gap-1 border-2 border-primary px-3 uppercase" variant={"outline"}>
                <ShoppingCartIcon size={16} /> Carrinho
            </Badge>

            <div className="flex flex-col gap-5 h-full">
                <ScrollArea className="h-full">
                    <div className="flex flex-col h-full gap-4">
                        {products.length > 0 ? products.map((product) => {
                            return <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />
                        }) : (<p className="text-center font-semibold">Carrinho vazio. Vamos fazer compras?</p>)}
                    </div>
                </ScrollArea>
            </div>

            <div className="flex flex-col gap-3">
                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>SubTotal</p>
                    <p>R$ {Number(subTotal).toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                    <p>Entrega</p>
                    <p>Grátis</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs">
                    <p>Descontos</p>
                    <p>- R$ {Number(totalDiscount).toFixed(2)}</p>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-sm font-bold">
                    <p>Total</p>
                    <p>R$ {Number(total).toFixed(2)}</p>
                </div>

                <Button
                    className="mt-7 font-bold uppercase"
                    onClick={handleFinishPurchaseClick}
                >
                    Finalizar compra
                </Button>
            </div>
        </div>
    );
}

export default Cart;
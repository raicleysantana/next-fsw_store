import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/products";

const Cart = () => {
    const { products } = useContext(CartContext);

    return (
        <div className="flex flex-col gap-5">
            <Badge className="w-fit gap-1 border-2 border-primary px-3 uppercase" variant={"outline"}>
                <ShoppingCartIcon size={16} /> Cartálogo
            </Badge>

            <div className="flex flex-col gap-5">
                {products.map((product) => {
                    return <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any} />
                })}
            </div>
        </div>
    );
}

export default Cart;
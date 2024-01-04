"use client";

import { productWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct extends productWithTotalPrice {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number,
    cardSubtotal: number;
    cartTotalDiscount: number;
    addProductToCart: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
    total: number;
    subTotal: number;
    totalDiscount: number;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cardSubtotal: 0,
    cartTotalDiscount: 0,
    addProductToCart: () => { },
    decreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProductFromCart: () => { },
    total: 0,
    subTotal: 0,
    totalDiscount: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);

    const addProductToCart = (product: CartProduct) => {

        const productIsAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id);

        if (productIsAlreadyOnCart) {
            setProducts((prev) => {
                return prev.map((cartProduct) => {
                    return cartProduct.id === product.id ?
                        { ...cartProduct, quantity: cartProduct.quantity + product.quantity } : cartProduct
                })


            });

            return;
        }

        setProducts((prev) => [...prev, product]);
    }

    const decreaseProductQuantity = (productId: string) => {

        setProducts(prev => prev.map((cartProduct) => {
            if (cartProduct.id === productId) {
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity - 1
                }
            }

            return cartProduct;
        })
            .filter((cartProduct) => cartProduct.quantity > 0));
    }

    const increaseProductQuantity = (productId: string) => {

        setProducts(prev => prev.map((cartProduct) => {
            if (cartProduct.id === productId) {
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + 1
                }
            }

            return cartProduct;
        })
            .filter((cartProduct) => cartProduct.quantity > 0));
    }

    const removeProductFromCart = (productId: string) => {
        setProducts(products.filter((cartProduct) => cartProduct.id !== productId))
    }

    const subTotal = useMemo(() => {
        return products.reduce((acc, product) => acc + Number(product.basePrice) * product.quantity, 0);
    }, [products]);

    const total = useMemo(() => {
        return products.reduce((acc, product) => acc + Number(product.totalPrice) * product.quantity, 0)
    }, [products]);

    const totalDiscount = total - subTotal;

    return (
        <CartContext.Provider
            value={{
                products,
                cartTotalPrice: 0,
                cartBasePrice: 0,
                cardSubtotal: 0,
                cartTotalDiscount: 0,
                addProductToCart,
                decreaseProductQuantity,
                increaseProductQuantity,
                removeProductFromCart,
                total,
                subTotal,
                totalDiscount,
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
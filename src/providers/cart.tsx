"use client";

import { productWithTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

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
                removeProductFromCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
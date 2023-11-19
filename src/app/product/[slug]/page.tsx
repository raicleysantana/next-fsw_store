import { prismaClient } from "@/lib/prisma"
import ProductsImages from "./components/products-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/products";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title.";

interface ProductDetailPageProps {
    params: {
        slug: string,
    }
}
const ProductDetailPage = async ({ params: { slug } }: ProductDetailPageProps) => {
    const product = await prismaClient.product.findFirst({
        where: {
            slug
        },
        include: {
            category: {
                include: {
                    products: {
                        where: {
                            slug: {
                                not: slug
                            }
                        }
                    },
                }
            }
        }
    });


    if (!product) return null;

    return (
        <div className="flex flex-col gap-8 pb-8">
            <ProductsImages imagesUrls={product.imageUrls} name={product.name} />

            <ProductInfo product={computeProductTotalPrice(product)} />

            <SectionTitle>Produtos recomendados</SectionTitle>
            
            <ProductList products={product.category.products} />
        </div>
    );
}

export default ProductDetailPage
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { computeProductTotalPrice } from "@/helpers/products";
import { prismaClient } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {
    const category = await prismaClient.category.findFirst({
        where: {
            slug: params.slug,
        },
        include: {
            products: true,
        }
    });

    if (!category) return null;

    const products = category.products;

    return <div className="p-5 flex flex-col gap-8">
        <Badge className="gap-1 text-base uppercase px-3 py-[0.375rem] border-2 " variant={"outline"}>
            {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
            {category.name}
        </Badge>

        <div className="grid grid-cols-2 gap-8">
            {products.map((product) =>
                <ProductItem
                    key={product.id}
                    product={computeProductTotalPrice(product)}
                />)}
        </div>
    </div>
}

export default CategoryProducts;
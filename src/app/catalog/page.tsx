import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/catalog-item";

const Catalog = async () => {

    const categories = await prismaClient.category.findMany();

    return (<div className="p-5 flex-col gap-8">
        <Badge className="gap-1 text-base uppercase px-3 py-[0.375rem] border-2 " variant={"outline"}>
            <ShapesIcon size={16} />
            Catalógo
        </Badge>

        <div className="flex-col flex-wrap grid grid-cols-2 gap-8">
            {categories.map((category) => <CategoryItem key={category.id} category={category} />)}
        </div>
    </div>)
}

export default Catalog;
import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import { HeadphonesIcon, KeyboardIcon, MonitorIcon, MouseIcon, SpeakerIcon } from "lucide-react";

interface CategoryItemProp {
    category: Category
};


const CategoryItem = ({ category }: CategoryItemProp) => {

    const categoryIcon = {
        keyboards: <KeyboardIcon size={16}/>,
        monitors: <MonitorIcon size={16}/>,
        headphones: <HeadphonesIcon size={16}/>,
        speakers: <SpeakerIcon size={16}/>,
        mouses: <MouseIcon size={16}/>
    };

    return (
        <Badge variant={"outline"} className="py-3 flex items-center justify-center gap-2 rounded-lg">
            {categoryIcon[category.slug as keyof typeof categoryIcon]}
            <span className="text-xs font-bold">{category.name}</span>
        </Badge>
    );
}

export default CategoryItem;
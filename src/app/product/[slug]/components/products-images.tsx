"use client"

import Image from "next/image";
import { useState } from "react";

interface ProductsImagesProps {
    name: string,
    imagesUrls: string[],
}

const ProductsImages = ({ imagesUrls, name }: ProductsImagesProps) => {
    const [currentImage, setCurrentImage] = useState(imagesUrls[0]);

    const handleImageClick = (imageUrl: string) => setCurrentImage(imageUrl);


    return (
        <div className="flex flex-col">
            <div className="flex h-[380px] w-full items-center justify-center bg-accent">
                <Image
                    src={currentImage}
                    alt={name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto max-h-[70%] w-auto max-w-[80%]"
                    style={{
                        objectFit: "contain"
                    }}
                />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 px-5">
                {imagesUrls.map((imagesUrl) => {
                    return (
                        <button
                            key={imagesUrl}
                            className={`flex bg-accent rounded-lg justify-center items-center h-[100px] ${imagesUrl === currentImage && "border-2 border-solid border-primary"}`}
                            onClick={() => handleImageClick(imagesUrl)}
                        >
                            <Image
                                src={imagesUrl}
                                alt={name}
                                sizes={"100vw"}
                                height={0}
                                width={0}
                                className="h-auto max-h-[70%] w-auto max-w-[80%]"
                            />
                        </button>
                    )
                })}
            </div>
        </div >
    )
}

export default ProductsImages;
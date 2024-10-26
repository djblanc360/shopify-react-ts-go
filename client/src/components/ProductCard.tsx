import { useState } from "react"
import type { Product } from "../types/Product"

const ProductCard = ({product}: {product: Product}) => {
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [image, setImage] = useState<string>(product.images[0]?.url || "");
  // console.log('product', product)

  const colors: string[] = []
  if (product?.variants?.length > 1) {
    product.variants.forEach(variant => {
      const color = variant?.selectedOptions?.find(option => option.name === "Color")?.value.toLowerCase();
      if (typeof color === 'string' && !colors.includes(color)) {
        colors.push(color)
      }
    })
  }

  if (colors.length > 0 && !selectedColor) {
    setSelectedColor(colors[0]);
  }

  const handleSelectedColor = (color: string) => {
    setSelectedColor(color);
    const matchingImage = product.images.find((image) => image.alt.toLowerCase() === color)
    if (matchingImage) {
      setImage(matchingImage.url)
    }
  }

    return (
        <div className="flex h-full flex-col bg-white">
        <div className="relative flex w-full flex-col">
          <div className="group relative mb-[13px] w-full">
            <a className="mb-3 w-full" 
                aria-label={product.title} tabIndex={-1}
                href={`/products/${product.handle}`}>
              <div className="group/media relative bg-[#e5e5e5] p-[125%_0_0]">
      
      
                <div className="mix-blend-multiply">
                    {product.images.map((media, index) => (
                    <img src={image}
                         alt={media.alt} 
                         className={`absolute inset-0 h-full w-full object-cover ${index === 0 ? 'opacity-100' : 'opacity-0'}`} 
                         width="100%" height="100%" 
                         key={index} />
                    ))}
                </div>
      
                <div className="pointer-events-none absolute left-0 top-0 z-[1] p-2.5 xs:p-3 xl:p-4">
                  <div className="text-label flex flex-wrap gap-2.5 xs:gap-3">
                    <div className="flex items">
                      <svg className="w-4 h-4 xs:w-5 xs:h-5 xl:w-6 xl:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                      <span className="text-xs xs:text-sm xl:text-base">Quick View</span>
                      </div>
                  </div>
                </div>

              </div>

            </a>
            <div className="absolute bottom-[30px] z-[9] flex w-full justify-center text-center max-lg:hidden">
                {product.title}
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <a aria-label={product.title} tabIndex={-1} href={`/products/${product.handle}`}>
                <h3 className="card-title text-bold uppercase">{product.title}</h3>
              </a>
              <small className="text-nowrap flex h-[20px] items-center whitespace-nowrap rounded-full border-[1px] border-[#989898] px-2 py-[1px] text-[7px] font-bold uppercase text-[#989898] max-md:mr-0 max-md:text-[8px] md:py-1">LUX</small>
            </div>
            <div className="mt-1 flex flex-1 flex-wrap gap-x-1">
              <p className="min-h-[1.25rem] text-sm null">{product.variants[0].price}</p>
            </div>
            <p className="mt-1 font-sans text-[12px] font-bold italic !leading-none leading-[14px] text-[#989898]">
                {product?.variants[0]?.selectedOptions?.[0]?.name ?? 'N/A'}: {product?.variants[0]?.selectedOptions?.[0]?.value ?? 'N/A'}
            </p>
          </div>
        </div>
          <div className="mt-2">
               {colors.length > 1 && (
                <div>
                  <ul className="flex flex-wrap gap-1 max-lg:[&>*:nth-child(n+5)]:hidden lg:[&>*:nth-child(n+7)]:hidden">
                  {colors.map((color, index) => {return (
                      <li key={index}>
                        <button 
                          onClick={() => handleSelectedColor(color)}
                          className={`bg-${color} w-5 h-5 xs:w-6 xs:h-6 border-[1px] border-[#989898] rounded-full focus:outline-none `}
                        ></button>
                      </li>
                    )
                    })}
                  </ul>
                </div>
                )}
          </div>
      </div>      
    )
  
}
export default ProductCard;
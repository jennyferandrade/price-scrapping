const availableSkills = {
  nikonD780:
      {
        header:"Nikon D780",
        description: "Nikon D780 - Cámara Reflex DSLR de 24.5 MP",
        link:"product/nikon",
        key:"nikon_D780_es"
      },
  anotherProduct:
      {
        header:"nuevo producto",
        description: "nuevo producto a monitorear",
        link:"product/new",
        key:"otro_producto"
      }
}


export interface Product {
  header?: string;
  description?: string;
  link?: string;
  key?: string;
}

export interface MonitorProducts {
    nikonD780: Product,
    anotherProduct: Product
}

export function getUserAvailableProducts(): MonitorProducts {
  // In the future this should be based on the product list that the user have store on a data base
  return availableSkills
}

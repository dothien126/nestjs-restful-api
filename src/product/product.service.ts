import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductModule } from "./product.module";

@Injectable()
export class ProductService{
    private product: Product[] = []

    addProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.product.push(newProduct);
        return prodId;
    }

    getProductList() {
        return [...this.product];
    }

    getProductById(id: string) {
        const product = this.findProduct(id)[0];
        return {...product};
    }

    updateProduct(id: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(desc) {
            updatedProduct.desc = desc;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.product[index] = updatedProduct
    }

    deleteProduct(id: string) {
        const index = this.findProduct(id)[1];
        this.product.splice(index, 1)
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.product.findIndex(prod => prod.id === id);
        const product = this.product[productIndex];
        if(!product) {
            throw new NotFoundException('Could not find product.')
        }
        return [product, productIndex]
    }
}
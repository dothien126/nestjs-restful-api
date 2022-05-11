import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { stringify } from "querystring";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    constructor( private readonly productService: ProductService) {};

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number, 
    ) {
        const generatedId = this.productService.addProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return {id: generatedId};
    }

    @Get()
    getAllProduct() {
        return this.productService.getProductList()
    }

    @Get(':id') 
    getProduct(@Param('id') prodId: string) {
        return this.productService.getProductById(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    } 

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return null;
    }

}
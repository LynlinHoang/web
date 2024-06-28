import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product } from "../models/product";
import { ProductAddUpdate } from "../models/productAddUpdate";

export default class ProductStore {
    products: Product[] = [];
    productAddUpdate: ProductAddUpdate[] = [];
    productRegistry = new Map<string, Product>();
    selectedProduct: Product | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    isused = false;
    pageCount = 1;

    constructor() {
        makeAutoObservable(this);
    }

    loadProduct = async (ProductName: string, page: number, pageSize: number) => {
        this.setLoadingInitial(true);
        try {
            const products = await agent.Products.list(ProductName, page, pageSize);
            this.products = products as Product[];
            this.setLoadingInitial(false);


        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createProduct = async (productAddUpdate: ProductAddUpdate) => {
        try {
            console.log(productAddUpdate);
            this.loading = true;
            const formData = new FormData();
            formData.append('id', productAddUpdate.id);
            formData.append('productName', productAddUpdate.productName);
            formData.append('productDescription', productAddUpdate.productDescription);
            formData.append('unit', productAddUpdate.unit);
            formData.append('price', productAddUpdate.price.toString());
            formData.append('isSelling', productAddUpdate.isSelling.toString());
            formData.append('supplierID', productAddUpdate.supplierID);
            formData.append('categoryID', productAddUpdate.categoryID);
            formData.append('uploadFile', productAddUpdate.uploadFile);
            console.log('FormData:', formData);
            await agent.Products.create(formData);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateProduct = async (productAddUpdate: ProductAddUpdate) => {
        try {
            this.loading = true;
            const formData = new FormData();
            formData.append('id', productAddUpdate.id);
            formData.append('productName', productAddUpdate.productName);
            formData.append('productDescription', productAddUpdate.productDescription);
            formData.append('unit', productAddUpdate.unit);
            formData.append('price', productAddUpdate.price.toString());
            formData.append('isSelling', productAddUpdate.isSelling.toString());
            formData.append('supplierID', productAddUpdate.supplierID);
            formData.append('categoryID', productAddUpdate.categoryID);
            formData.append('uploadFile', productAddUpdate.uploadFile);
            console.log('FormData:', formData);
            await agent.Products.update(formData);
            let product = await agent.Products.details(productAddUpdate.id);
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });
            runInAction(() => {
                this.productRegistry.set(productAddUpdate.id, product);
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteProduct = async (id: string) => {
        this.loading = true;

        try {
            await agent.Products.delete(id);
            runInAction(() => {
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadProducts = async (id: string) => {
        let product = this.getProduct(id);
        if (product) {
            this.selectedProduct = product;
            return product;
        }
        else {
            this.setLoadingInitial(true)
            try {
                product = await agent.Products.details(id);
                this.productRegistry.set(id, product);
                this.selectedProduct = product;
                this.setLoadingInitial(false);
                return product;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private getProduct = (id: string) => {
        return this.productRegistry.get(id);
    }

    isUsedProduct = async (id: string) => {
        this.loading = true;
        try {
            const checkIsused = await agent.Products.isUsed(id);
            runInAction(() => {
                this.isused = checkIsused as boolean;
                this.setLoadingInitial(true);
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                console.log(error);
                this.setLoadingInitial(false);
            });
        }
    }

    pageProduct = async (pageSize: number, searchTerm: string) => {
        this.loading = true;
        try {
            const page = await agent.Products.pagecount(pageSize, searchTerm);
            runInAction(() => {
                this.pageCount = page as number;
                console.log(this.pageCount);
                this.setLoadingInitial(true);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                console.log(error);
                this.setLoadingInitial(false);
            });
        }
    }
}

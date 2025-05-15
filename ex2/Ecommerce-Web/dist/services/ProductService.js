var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Product } from "../modles/Product.js";
export var ProductService;
(function (ProductService) {
    function fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("../data/products.json");
            const data = yield response.json();
            return data.map((p) => new Product(p.id, p.name, p.price, p.discount, p.image));
        });
    }
    ProductService.fetchProducts = fetchProducts;
})(ProductService || (ProductService = {}));

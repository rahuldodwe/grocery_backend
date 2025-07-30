import "dotenv/config.js";
import mongoose from "mongoose";
import { Category, Product } from "./src/models/index.js";
import { categories, products } from "./seedData.js";

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Category.deleteMany({});

        const categotyDocs = await Category.insertMany(categories);

        const categoryMap = categotyDocs.reduce((map, category)=> {
            map[category.name] = category.id;
            return map
        }, {});

        const productWithCategoryIds = products.map((product)=> ({
            ...product,
            category: categoryMap[product.category],
        }));

        await Product.insertMany(productWithCategoryIds);

        console.log("DATABASE SEEDED SUCCESSFULLY");
    } catch (error) {
        console.log("Error Seeding database", error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
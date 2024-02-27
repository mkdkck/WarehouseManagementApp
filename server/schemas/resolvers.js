const { User, Organization, Warehouse, Category, PkConfig, Product } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        warehouses: async () => {
            return await Warehouse.find();
        },
        pkConfigs: async () => {
            return await PkConfig.find();
        },
        categories: async () => {
            return await Category.find().populate('products');
        },
        products: async () => {
            return await Product.find()
                .populate({
                    path: 'productStacks',
                    populate: {
                        path: 'pkConfig warehouse',
                    },
                })
                .populate('categories')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            let organization = await Organization.findOne({ OrgName: args.organization })
            if (!organization) {
                organization = await Organization.create({ OrgName: args.organization })
            }

            const newUser = {
                username: args.username,
                email: args.email,
                password: args.password,
                role: args.role,
                organization: organization._id
            }
            const user = await User.create(newUser);
            const token = signToken(user);

            await Organization.findOneAndUpdate(
                { _id: organization._id },
                {
                    $addToSet: { members: { _id: user._id } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return { token, user };
        },

        addWarehouse: async (parent, args) => {
            const warehouse = await Warehouse.findOne({ warehouseName: args.warehouseName })

            if (warehouse) {
                throw new Error('Warehouse with the same name already exists.');
            }

            const newWarehouse = await Warehouse.create(args);

            return newWarehouse;
        },

        updateWarehouse: async (parent, args) => {
            const { _id, ...updateData } = args
            const warehouse = await Warehouse.findOneAndUpdate(
                { _id: args._id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!warehouse) {
                throw new Error('No warehouse found');
            }

            return warehouse;
        },

        removeWarehouse: async (parent, args) => {
            const warehouse = await Warehouse.findOneAndRemove(
                { _id: args._id });

            if (!warehouse) {
                throw new Error('No warehouse found');
            }

            return warehouse;
        },

        addPkConfig: async (parent, args) => {
            const pkConfig = await PkConfig.findOne({ configName: args.configName })

            if (pkConfig) {
                throw new Error('Configuration with the same name already exists.');
            }

            const newPkConfig = await PkConfig.create(args);

            return newPkConfig;
        },

        updatePkConfig: async (parent, args) => {
            const { _id, ...updateData } = args
            const pkConfig = await PkConfig.findOneAndUpdate(
                { _id: args._id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!pkConfig) {
                throw new Error('No configuration found');
            }

            return pkConfig;
        },

        removePkConfig: async (parent, args) => {
            const pkConfig = await PkConfig.findOneAndRemove(
                { _id: args._id });

            if (!pkConfig) {
                throw new Error('No package configuration found');
            }

            return pkConfig;
        },

        addCategory: async (parent, args) => {
            const category = await Category.findOne({ name: args.name })

            if (category) {
                throw new Error('Category with the same name already exists.');
            }

            const newCategory = await Category.create(args);

            return newCategory;
        },

        updateCategory: async (parent, args) => {
            const { _id, ...updateData } = args
            const category = await Category.findOneAndUpdate(
                { _id: args._id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!category) {
                throw new Error('No category found');
            }

            return category;
        },

        removeCategory: async (parent, args) => {
            const category = await Category.findOneAndRemove(
                { _id: args._id });

            if (!category) {
                throw new Error('No category found');
            }

            return category;
        },

        addProduct: async (parent, args) => {
            const product = await Product.findOne({ name: args.name })

            if (product) {
                throw new Error('Item with the same name already exists.');
            }

            const newProduct = await Product.create(args);

            return newProduct;
        },

        updateProduct: async (parent, args) => {
            const { _id, ...updateData } = args
            const product = await Product.findOneAndUpdate(
                { _id: args._id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!product) {
                throw new Error('No item found');
            }

            return product;
        },

        removeProduct: async (parent, args) => {
            const product = await Product.findOneAndRemove(
                { _id: args._id });

            if (!product) {
                throw new Error('No item found');
            }

            return product;
        },

        addProductStack: async (parent, { productId, input }) => {
            const productStack = await Product.findByIdAndUpdate(
                productId, { $addToSet: { productStacks: input } },
                {
                    new: true,
                    runValidators: true,
                }
            )
            if (!productStack) {
                throw new Error('Product not found.');
            }

            return productStack;
        },

        updateProductStack: async (parent, { productId, productStackId, input }) => {
            const productStack = await Product.findOneAndUpdate(
                { _id: productId, 'productStacks._id': productStackId },
                {
                    $set: {
                        'productStacks.$': input
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!productStack) {
                throw new Error('No item found');
            }

            return productStack.productStacks;
        },

        removeProductStack: async (parent, { productId, productStackId }) => {
            const productStack = await Product.findByIdAndUpdate(
                { _id: productId, 'productStacks._id': productStackId },
                { $pull: { productStacks: { _id: productStackId } } });

            if (!productStack) {
                throw new Error('No item found');
            }

            return productStack;
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
    }
};

module.exports = resolvers;
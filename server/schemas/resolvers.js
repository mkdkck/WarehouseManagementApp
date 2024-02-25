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
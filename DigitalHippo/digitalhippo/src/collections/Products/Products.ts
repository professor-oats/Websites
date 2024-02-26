import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},

  /* Define the admin panel fields here */
  /* The labels will be shown on the dashboard */
  /* The definitions are based on the Payload CMS */

  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,  /* Hide admin properties from user */
      },
    },

    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },

    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },

    {
      name: "price",
      label: "Price in USD",
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },

    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({label, value}) => ({label, value})),  /* Destructor the labels and values from our Product Categories */
      required: true,
    },


    {
      name: "product_files",
      label: "Product files(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,  /* Will only allow one product download - change to true if we want to download multiple files */
    },
/*
      /* Admins will have to approve sellers products for upload */
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {     /* Request will show if the user is admin or not */
        create: ({req}) => req.user.role === "admin",
        read: ({req}) => req.user.role === "admin",
        update: ({req}) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },

        {
          label: "Approved",
          value: "approved",
        },

        {
          label: "Denied",
          value: "denied",
        },
      ],
    },

    {
      name: "priceId",
      access: {
        create: () => false,  /* Noone will have access on this, can only be changed in code */
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },

    {
      name: "stripeId",
      access: {
        create: () => false,  /* Noone will have access on this, can only be changed in code */
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },

    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },

  ],
}
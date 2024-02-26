import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

/* Whenever we upload data to the field this addUser return
the user idea to the upload data, used with hooks */

const addUser: BeforeChangeHook = ({  req, data }) => {
  const user = req.user as User | null
  return {...data, user: user?.id}
}

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null  /* Get what user is making the request */

  if(user?.role === "admin") {
    return true;
  }

  if(!user) {
    return false;
  }

  /* Find the products in the payload collection that equals to user.id */

  const { docs: products} = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  })

  /* Store all the product IDs into a flattened array (to only store ID and no more data) */

  const ownProductFileIds = products.map((prod) => prod.product_files).flat();

  /* Find the orders in the payload collection that equals to user.id */

  const { docs: orders} = await req.payload.find({
    collection: "orders",
    depth: 2,  /* Fetch 2 levels of data when finding user.id */
    where: {
      user: {
        equals: user.id,
      },
    },
  })

  /* To get all the product Ids we have to map over all orders and then map over all products as such */

  const purchasedProductFileIds = orders.map((order) => {
    return order.products.map((product) => {

      /* Must be of type Product */

      if(typeof product === "string") {
        return req.payload.logger.error(
          "Search depth not sufficient to find purchased file IDs"
        )
      }

      return typeof product.product_files === "string" ? product.product_files : product.product_files.id
    })

  })
  .filter(Boolean)    /* Filter out all undefined values of the array */
  .flat()

    return {
      id: {
        in: [...ownProductFileIds, ...purchasedProductFileIds]  /* Return purchas and ownership IDs of the products */
      }
    }

}

export const ProductFiles: CollectionConfig = {
  slug: "product_files",  /* Slug this to relationTo product_files */
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },

  hooks: {
    /* Do something before */
    beforeChange: [addUser],
  },

  access: {
    read: yourOwnAndPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin"
  },

  /* Let's define what products we will be able to upload */
  upload: {
    staticURL: "/product_files",  /* URL of upload */
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
    
  },

  fields: [
    {
      name: "user",   /* Give upload the name of the user */
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false
      },

      hasMany: false,
      required: true,   /* Require relation to users */
    },
  ]
}
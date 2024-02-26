/* This file will allow users to upload their own media images */

/* Payload passes the request from the app to the server */

import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessToImages = (): Access => async ({
  req
}) => {
  const user = req.user as User | undefined   /* Type User if logged in, otherwise undefined */

  /* If no user no access */
  if(!user) {
    return false
  }

  /* Admins can see everything */
  if(user.role === "admin") {
    return true
  }

  return {
    user: {
      equals: req.user.id,  /* Check so that the user id matches the id for the image */
    },                      /* Access to only your images */
  }
}

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {  /* Before we change the product these functions will be run */
    beforeChange: [({req, data}) => {  /* Associate the image data with the user id in our backend */
      return {...data, user: req.user.id}
    }],
  },

  access: {
    read: async ({ req }) => {

        /* Where does the user come from? Is he a seller or not logged in? */

      const referer = req.headers.referer

        /* If no login (req.user) and if no sell panel login, then return true for read property */
        /* Every user can now read all images in the store */

      if(!req.user || !referer?.includes("sell")) {
        return true;
      }

      return await isAdminOrHasAccessToImages()({ req });
    },

    /* Thanks to our function definition we can opt out writing like this:
    delete: ({ req }) => isAdminOrHasAccessToImages()({ req }) 
    and that we await the request on read */

    /* Can only delete and update your own images */

    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },

  admin: {
    hidden: ({ user }) => user.role !== "admin",  /* Allow only admin to see this, hidden to all other users */
  },

  upload: {
    staticURL: "/media",  /* Can also link to other sites here like bucket and S3 */
    staticDir: "media",
    imageSizes: [
        /* Providing different image sizes on upload brings runtime optimisation */
        /* We can then use the correct image type for our media query when user uploads */

      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",

      },

      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",

      },

      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",

      },
    ],

    mimeTypes: ["image/*"],
  },
  fields: [
      /* Link image to users in our databas */
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    }
  ]
}
import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({token}) => {
        return `<p>hello pls verify</P>`
      }
    }
  },
  access: {
    read: () => true,
    create: () => true,

  },
  fields: [
    {
      name: "role",
      required: true,
      defaultValue: "user",
      /* admin: {
        condition: ({}) => false,  /* Now only admins can see/add other admins to collection */
      //},
      type: "select",
      options: [
        {label: "Admin", value: "admin"},
        {label: "User", value: "user"},
      ]
    },

  ],
}
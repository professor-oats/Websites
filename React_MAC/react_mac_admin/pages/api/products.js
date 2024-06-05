import {Product} from "@/models/product";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;

  // Take the current connection/promise
  // from out mongodb and link it with our
  // mongoose defined handler

  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Product.find());
  }

  if(method === 'POST') {
    // Create product in line with our mongoose defined schema

    const {title, description, price} = req.body;
    const productDoc = await Product.create({
      title, description, price,
    })
    res.json(productDoc);
  }
}
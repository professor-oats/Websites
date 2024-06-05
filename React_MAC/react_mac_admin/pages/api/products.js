import {Product} from "@/models/product";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;

  // Take the current connection/promise
  // from out mongodb and link it with our
  // mongoose defined handler

  await mongooseConnect();

  if (method === 'GET') {

    /* If we have id in query we simply respond json
       for that product, else we respond json for all
     */

    if(req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}))
    }
    else {
      res.json(await Product.find());
    }
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
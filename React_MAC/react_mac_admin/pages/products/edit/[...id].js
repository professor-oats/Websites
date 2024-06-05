import Layout from "@/components/layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/components/productform";

export default function EditProductPage() {

  const [productInfo, setProductInfo] = useState(null)
  const router = useRouter();

  /* The id of the product will be added to the
  route through the url /edit/$productid and
  to grab the corresponded id from route we
  disassemble/destructure the id from the router query
   */

  const {id} = router.query;

  useEffect(() => {

    if (!id) {
      return;
    }

    axios.get('/api/products?id='+id).then(response => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && (
        <ProductForm {...productInfo}/>
      )}
    </Layout>
  );
}
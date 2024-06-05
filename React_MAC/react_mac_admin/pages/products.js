import Layout from "@/components/layout";
import Link from "next/link";
import {useEffect} from "react";
import axios from "axios";

export default function Products() {
  useEffect(() => {
    axios.get('/api/products').then(response => {
      console.log(response.data);
    })
  }, []);

  return (
    <Layout>
      <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={'/products/new'}>
        Add new product
      </Link>
    </Layout>
  );
}
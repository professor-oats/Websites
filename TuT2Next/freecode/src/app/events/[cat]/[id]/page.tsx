import { promises as fs } from 'fs';
import Image from "next/image";
import Link from 'next/link';
import getData from '@/app/_components/getData/getdata';

interface pageProps{}

export default async function Infopage(context: any) {

  const data = await getData();
  const id = context?.params.id;
  const eventdata = data.allEvents.find((ev: any) => id === ev.id);

  console.log(eventdata);

  return(
    <div className="center-content">
      <Image className="center-content" alt={eventdata.title} src={eventdata.image} width={1000} height={500}/>
      <h1>{eventdata.title}</h1>
      <p className="padding-left-20">{eventdata.description}</p>
    </div>
  )
}

export async function getStaticPaths() {

  const data = await getData();

  /* Map over the allEvents from data.JSON, extract cityname from
  property city and assign it to dynamic [cat], then do the same but with
  tge id to [id] */

  const allPaths = data.allEvents.map((ev: any) => {
    return {
      params: {
        cat: ev.city.toString(),
        id: ev.id.toString(),
      },
    };

  });

  return {
    paths: allPaths,
    fallback: false,  /* Set fallback when pathing doesn't match cathegories */
  };

}
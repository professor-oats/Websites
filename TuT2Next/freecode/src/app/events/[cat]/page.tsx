import { promises as fs } from 'fs';
import Image from "next/image";
import Link from 'next/link';
import getData from '@/app/_components/getData/getdata';

export default async function Catspage(context: any) {

  const data = await getData();
  const id = context?.params.cat;
  const citydata = data.allEvents.filter((ev: any) => ev.city === id);

  return(
    <div>


    <h1 className="center-content big-fonts-50">Events in {id}</h1>

    <div className="padding-left-20 center-content">

    {citydata.map((ev:any) => (
      <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`}>
        <Image className="center-content" src={ev.image} alt={ev.title} width="300" height="300"/>
        <h2>{ev.title}</h2>
        <p className="padding-bottom-20">{ev.description}</p>
      </Link>
    ))};

    </div>

    </div>
  )
}


export async function getStaticPaths() {

  const data = await getData();

  const allPaths = data.events_categories.map((ev: any) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };

  });

  return {
    paths: allPaths,
    fallback: false,  /* Set fallback when pathing doesn't match cathegories */
  };

}
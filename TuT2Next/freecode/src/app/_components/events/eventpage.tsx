import Image from "next/image";
import getData from "../getData/getdata";
import Link from 'next/link';

export default async function EventsPage() {

  const data = await getData();

  return (
    <main>

    <div className="padding-left-20 center-content">

    {data.events_categories.map((ev: any) => (
      <Link key={ev.id} href={`/events/${ev.id}`}><Image className="center-content" src={ev.image} alt={ev.title} width="600" height="600"/>
        <h2>{ev.title}</h2>
        <p className="padding-bottom-20">{ev.description}</p>
      </Link>
    ))}

    </div>

    </main>
  );

}
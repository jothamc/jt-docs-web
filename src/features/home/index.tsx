import Link from "next/link";
import React from "react";
import type { UrlObject } from "url";

const Button = ({ text }: { text: string }) => (
  <button className="cursor-pointer p-4 text-primary transition hover:text-white hover:shadow-secondary bg-white hover:bg-primary hover rounded-lg shadow-md">
    {text}
  </button>
);
const LinkButton = ({
  text,
  href,
}: {
  text: string;
  href: string | UrlObject;
}) => (
  <Link href={href} >
    <Button text={text} />
  </Link>
);
const Home = () => {
  return (
    <main className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <LinkButton href="/docs/create" text="Create New Document" />
        <Button text="Create New Document" />
      </div>
    </main>
  );
};

export default Home;

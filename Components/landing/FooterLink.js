import Link from "next/link";

function FooterLink({ url, text }) {
  return (
    <li className="text-sm font-medium text-gray-400 hover:text-gray-800 mb-2">
      <Link href={url}>
        <p>{text}</p>
      </Link>
    </li>
  );
}

export default FooterLink;

import Link from "next/link";
import { useRouter } from "next/router";

function UserNavOption({ link, title }) {
  const router = useRouter();
  return (
    <Link href={link}>
      <p className={`menu__option ${router.pathname === link ? "active" : ""}`}>
        {title}
      </p>
    </Link>
  );
}

export default UserNavOption;

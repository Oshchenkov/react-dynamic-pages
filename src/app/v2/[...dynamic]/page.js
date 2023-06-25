'use client';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Dynamic() {
  const router = useRouter();
  console.log("🚀 ~ file: [dynamic].js:5 ~ Dynamic ~ router:", router);
  const params = useParams()
  console.log("🚀 ~ file: page.js:9 ~ Dynamic ~ params:", params)
  const pathname = usePathname()
  console.log("🚀 ~ file: page.js:12 ~ Dynamic ~ pathname:", pathname)

  return <main>Dynamic v2</main>;
}

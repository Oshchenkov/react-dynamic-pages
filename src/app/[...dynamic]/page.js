"use client";

import dynamic from "next/dynamic";
import { useState, Suspense, createElement, lazy } from "react";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

const dynamicCompoList = [
  { name: "comp2", key: "2" },
  { name: "comp3", key: "3" },
  { name: "comp1", key: "1" },
];
console.log("🚀 ~ dynamicCompoList:", dynamicCompoList);

export default function Dynamic(ctx) {
  console.log(ctx);
  const [showPreview, setShowPreview] = useState(false);
  const [markdown, setMarkdown] = useState("Hello, **world**!");
  const params = useParams();
  console.log("🚀 params:", params, params.dynamic);
  const pathname = usePathname();
  console.log("🚀 pathname:", pathname);
  const searchParams = useSearchParams();
  if (typeof window !== "undefined") {
    console.log(window.location);
  }

  for (const [key, value] of searchParams.entries()) {
    console.log(`${key}, ${value}`);
  }

  console.log("dyn", params.dynamic);
  let url = "comp1";

  const DynamicComp1 = lazy(() =>
    delayForDemo(import(`../../components/${url}`), {
      ssr: false,
      loading: () => <p>Loading...my</p>,
    })
  );

  return (
    <>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={showPreview}
          onChange={(e) => setShowPreview(e.target.checked)}
        />
        Show preview
      </label>
      <hr />
      {showPreview && (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<Loading />}>
            <h2>Preview:</h2>
            <DynamicComp1 />
            {dynamicCompoList.map((comp) => {
              return createElement(
                dynamic(() => import(`../../components/${comp.name}`), {
                  ssr: true,
                  loading: () => <p>Loading...my</p>,
                }),
                { key: comp.key }
              );
            })}
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 4000);
  }).then(() => promise);
}

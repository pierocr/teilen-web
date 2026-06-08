import { redirect } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const params = new URLSearchParams();

  Object.entries(resolvedSearchParams || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const first = value[0];
      if (first) params.set(key, first);
    } else if (value) {
      params.set(key, value);
    }
  });

  const qs = params.toString();
  const suffix = qs ? `?${qs}` : "";

  redirect(`/referral${suffix}`);
}

export const runtime = "edge";

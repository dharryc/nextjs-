// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id : string }>
// }) {
//   const { id : slug } = await params
//   return <div>My Post: {slug}</div>
// }

import { FC } from "react";

const Page: FC<{params: Promise<{ id: string, test: string }>}> = async ({params}) => {
  const { id, test } = await params;
  return <div>My Post: {id}, My Test: {test}   </div>;  
}

export default Page;
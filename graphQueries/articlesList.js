import { getDateOffset } from "@/assets/js/helpers";

export default async function (p) {
  let date = getDateOffset(-365);
  let res = await p.api.query([
    p.predicates.at("document.type", "article"),
    p.predicates.date.after("document.last_publication_date", date)
  ], {
    graphQuery: `{
    article
    {
    title
    image
    uid
    }
    }`,
    orderings: "[document.last_publication_date]",
  });

  return res;
}

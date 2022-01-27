import { getDateOffset } from "@/assets/js/helpers";

export default async function (p) {
  let date = getDateOffset(-1);
  let res = await p.api.query([
    p.predicates.at("document.type", "event"),
    p.predicates.date.after("my.event.end_date", date)
  ], {
    graphQuery: `{
    event
    {
    title
    state
    city
    logo
    uid
    start_date
    image
    }
    }`,
    orderings: "[my.event.start_date]",
  });

  return res;
}

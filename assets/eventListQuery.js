import { getDateOffset } from "./helpers";

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
    image
    ball_image
    uid
    start_date
    end_date
    }
    }`,
    orderings: "[my.event.start_date]",
  });

  return res;
}

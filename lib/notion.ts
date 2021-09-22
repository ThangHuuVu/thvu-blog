import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPublishedNotes() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
    filter: {
      property: "Published?",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Modified at",
        direction: "ascending",
      },
    ],
  });
  return response.results;
}

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const dedent = require("dedent");

const root = process.cwd();

const getLayouts = () => {
  const layoutPath = path.join(root, "layouts");
  const layoutList = fs
    .readdirSync(layoutPath)
    .map((filename) => path.parse(filename).name)
    .filter((file) => file.toLowerCase().includes("post"));
  return layoutList;
};

const genFrontMatter = (answers) => {
  let d = new Date();
  const date = [
    d.getFullYear(),
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
  ].join("-");
  const tagArray = answers.tags.split(",");
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()));
  const tags = "'" + tagArray.join("','") + "'";

  let frontMatter = dedent`---
  title: ${answers.title ? answers.title : "Untitled"}
  date: '${date}'
  tags: [${answers.tags ? tags : ""}]
  draft: ${answers.draft === "yes" ? true : false}
  summary: ${answers.summary ? answers.summary : " "}
  images: []
  layout: ${answers.layout}
  `;

  frontMatter = frontMatter + "\n---";

  return frontMatter;
};

inquirer
  .prompt([
    {
      name: "title",
      message: "Enter post title:",
      type: "input",
    },
    {
      name: "extension",
      message: "Choose post extension:",
      type: "list",
      choices: ["mdx", "md"],
    },
    {
      name: "summary",
      message: "Enter post summary:",
      type: "input",
    },
    {
      name: "draft",
      message: "Set post as draft?",
      type: "list",
      choices: ["yes", "no"],
    },
    {
      name: "tags",
      message: "Any Tags? Separate them with , or leave empty if no tags.",
      type: "input",
    },
    {
      name: "layout",
      message: "Select layout",
      type: "list",
      choices: getLayouts,
    },
  ])
  .then((answers) => {
    console.log(answers);
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/ /g, "-")
      .replace(/-+/g, "-");
    console.log(fileName);

    const frontMatter = genFrontMatter(answers);
    const filePath = `data/blog/${fileName ? fileName : "untitled"}.${
      answers.extension ? answers.extension : "md"
    }`;
    fs.writeFile(filePath, frontMatter, { flag: "wx" }, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Blog post generated successfully at ${filePath}`);
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something went wrong, sorry!");
    }
  });

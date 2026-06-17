#!/usr/bin/env node

const inquirer = require("inquirer").default;
const { spawn } = require("child_process");

async function main() {
    const { apps } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "apps",
      message: "Select applications to start",
      choices: [
        { name: "web", value: "web" },
        { name: "dashboard", value: "dashboard" },
         { name: "api", value: "api" },
      ],
    },
  ]);

   if (apps.length === 0) {
    console.log("No applications selected");
    process.exit(0);
  }

  const filters = apps.flatMap(((app) => [`--filter=${app}`]));

  const child = spawn(
    "turbo",
    ["dev", ...filters],
    {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env
      }
    }
  );

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

main();
#!/usr/bin/env node
import npmName from "npm-name";
import { appendFileSync } from "fs";
import "colors";
// @ts-ignore
import check from "check-if-word";
// type checkIfWord = { check: (word: string) => boolean };

const words = check("en");
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const count = process.argv[3] || 4; // 4 letters
const startFrom = process.argv[2] || Array(count).fill("a").join(""); // start from aaaa
const checkIf =
  process.argv[4] === "true" && process.argv[4] ? true : !process.argv[4] || process.argv[4] === "false" ? false : true; // start from aaaa
const getFile = (post) => `npm-names-${post}.txt`;

const checkAndWrite = async (name) => {
  const log = console.log;
  log("Checking", name.yellow);
  if (startFrom > name) return;
  if (checkIf) {
    try {
      if (name.length < 3) return;
      if (name.length > 15) return;
      if (!words.check(name)) return;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  let available = false;
  let attempt = 0;
  do {
    try {
      available = await npmName(name);
      break;
    } catch (err) {
      console.error(err?.toString());
      if (err instanceof Error) console.error(err.stack);
      if (err instanceof String) console.error(err);
      // @ts-ignore
      if (/Invalid package name/.test(err)) {
        break;
      }
      console.error("Waiting for 60 seconds before retrying...".red);
      await sleep(60 * 1000);
    }
  } while ((attempt += 1) < 2);

  if (available) {
    appendFileSync(getFile(`${name[0]}-${count}`), name + "\n");
    console.log(name.green + " available");
  } else {
    console.log(name.grey);
  }
  return;
};

const loop = async (letters, remaining) => {
  // letters are the letters so far in the name
  // remaining is the number of letters remaining in the name, including the current letter, so if we have count = 4, and letters = "ab", then remaining = 2
  if ((remaining === 0 || remaining < 0) && letters.length === Number.parseInt(count)) {
    // we have a full name
    await checkAndWrite(letters.join(""));
    return;
  }

  for (const letter of alphabet) {
    // we now loop inside the loop, so we can get all combinations
    await loop([...letters, letter], remaining - 1);
  }
};

const main = async () => {
  console.log("running main");

  console.table({ startFrom, count, checkIf });
  await sleep(2000); // sleep for 2 seconds

  console.log("Starting from", startFrom);
  for (const letter of alphabet) {
    await sleep(1000); // sleep for 1 second
    if (letter < startFrom[0]) continue;
    // we always start looping like this.
    const remaining = Number.parseInt(typeof count === "string" ? count : "4") - 1;
    await loop([letter], remaining);
  }

  // for count times, loop through alphabet
};

main();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

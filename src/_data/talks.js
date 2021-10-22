const talks = require("./adb_21.json");
const site = require("./site.json");
const calendar = require("../lib/calendar_template.js");
const {
  twitter,
  linkedin,
  facebook,
} = require("../lib/social_link_generator.js");
const slugify = require("slugify");
const { google, outlook, office365, ics } = require("calendar-link");

// slugify
talks.map((talk) => {
  talk["meta"] = {};
  talk["meta"]["title"] = talk.title
    ? `${talk.name}: ${talk.title}`
    : talk.name;
  talk["meta"]["slug_link"] = `/talk/${slugify(talk.name.toLowerCase())}/`;
  talk["meta"]["link"] = `${site.url}/talk/${slugify(
    talk.name.toLowerCase()
  )}/`;
  if (talk.zoom) {
    talk["meta"]["calendar"] = {};
    talk["meta"]["calendar"]["google"] = google(calendar(talk.zoom, talk));
    talk["meta"]["calendar"]["outlook"] = outlook(calendar(talk.zoom, talk));
    talk["meta"]["calendar"]["office365"] = office365(
      calendar(talk.zoom, talk)
    );
    talk["meta"]["calendar"]["ics"] = ics(calendar(talk.zoom, talk));
  }
  // talk["meta"]["social"] = {};
  // talk["meta"]["social"]["twitter"] = twitter(talk["meta"]);
  // talk["meta"]["social"]["facebook"] = facebook(talk["meta"]);
  // talk["meta"]["social"]["linkedin"] = linkedin(talk["meta"]);
});

let data = talks;
module.exports = data;

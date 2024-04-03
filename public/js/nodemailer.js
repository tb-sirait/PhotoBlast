/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/nodemailer@6.9.13/lib/nodemailer.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
const Mailer = require("./mailer"),
    shared = require("./shared"),
    SMTPPool = require("./smtp-pool"),
    SMTPTransport = require("./smtp-transport"),
    SendmailTransport = require("./sendmail-transport"),
    StreamTransport = require("./stream-transport"),
    JSONTransport = require("./json-transport"),
    SESTransport = require("./ses-transport"),
    nmfetch = require("./fetch"),
    packageData = require("../package.json"),
    ETHEREAL_API = (
        process.env.ETHEREAL_API || "https://api.nodemailer.com"
    ).replace(/\/+$/, ""),
    ETHEREAL_WEB = (
        process.env.ETHEREAL_WEB || "https://ethereal.email"
    ).replace(/\/+$/, ""),
    ETHEREAL_CACHE = ["true", "yes", "y", "1"].includes(
        (process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase()
    );
let testAccount = !1;
(module.exports.createTransport = function (e, r) {
    let t, s, n;
    return (
        (("object" == typeof e && "function" != typeof e.send) ||
            ("string" == typeof e && /^(smtps?|direct):/i.test(e))) &&
            ((s = (t = "string" == typeof e ? e : e.url)
                ? shared.parseConnectionUrl(t)
                : e),
            (e = s.pool
                ? new SMTPPool(s)
                : s.sendmail
                ? new SendmailTransport(s)
                : s.streamTransport
                ? new StreamTransport(s)
                : s.jsonTransport
                ? new JSONTransport(s)
                : s.SES
                ? new SESTransport(s)
                : new SMTPTransport(s))),
        (n = new Mailer(e, s, r)),
        n
    );
}),
    (module.exports.createTestAccount = function (e, r) {
        let t;
        if (
            (r || "function" != typeof e || ((r = e), (e = !1)),
            r ||
                (t = new Promise((e, t) => {
                    r = shared.callbackPromise(e, t);
                })),
            ETHEREAL_CACHE && testAccount)
        )
            return setImmediate(() => r(null, testAccount)), t;
        let s = [],
            n = 0,
            o = nmfetch((e = e || ETHEREAL_API) + "/user", {
                contentType: "application/json",
                method: "POST",
                body: Buffer.from(
                    JSON.stringify({
                        requestor: packageData.name,
                        version: packageData.version,
                    })
                ),
            });
        return (
            o.on("readable", () => {
                let e;
                for (; null !== (e = o.read()); ) s.push(e), (n += e.length);
            }),
            o.once("error", (e) => r(e)),
            o.once("end", () => {
                let e,
                    t,
                    o = Buffer.concat(s, n);
                try {
                    e = JSON.parse(o.toString());
                } catch (e) {
                    t = e;
                }
                return t
                    ? r(t)
                    : "success" !== e.status || e.error
                    ? r(new Error(e.error || "Request failed"))
                    : (delete e.status,
                      (testAccount = e),
                      void r(null, testAccount));
            }),
            t
        );
    }),
    (module.exports.getTestMessageUrl = function (e) {
        if (!e || !e.response) return !1;
        let r = new Map();
        return (
            e.response.replace(/\[([^\]]+)\]$/, (e, t) => {
                t.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (e, t, s) => {
                    r.set(t, s);
                });
            }),
            !(!r.has("STATUS") || !r.has("MSGID")) &&
                (testAccount.web || ETHEREAL_WEB) + "/message/" + r.get("MSGID")
        );
    });
//# sourceMappingURL=/sm/bc0be4eb7d5dcc49df784e8978586f9b5b8826a45feb186c90accbe879431d48.map

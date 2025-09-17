import db from '../app.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const newAdvert = async (req, res, next) => {
    const { ilmoitus_laji, ilmoitus_nimi, ilmoitus_kuvaus } = req.body;
    const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
    );
    db.query(
        "INSERT INTO ilmoitukset SET ?",
        {
            ilmoitus_laji,
            ilmoitus_nimi,
            ilmoitus_kuvaus,
            ilmoitus_paivays: new Date(Date.now()),
            ilmoittaja_id: decoded.id,
        },
        (error, results) => {
            if (error) {
                console.log("Error in query: " + error);
            } else {
                res.redirect("/");
            }
        }
    );
};

const listAdverts = async (req, res, next) => {
    try {
        db.query("SELECT * FROM ilmoitukset", async (error, results) => {
            req.list = results;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

const listUserAdverts = async (req, res, next) => {
    try {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        );
        db.query(
            "SELECT * FROM ilmoitukset WHERE ilmoittaja_id = ?",
            [decoded.id],
            async (error, results) => {
                req.list = results;
                next();
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export default newAdvert;
export { listAdverts, listUserAdverts };
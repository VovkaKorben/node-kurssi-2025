let hbsHelpers = {
    getUser: (users, kayttaja) => {
        let user = "";
        console.log(`users ${users}`);
        console.log(`kayttaja ${kayttaja}`);
        users.forEach((u) => {
            if (u.kayttaja_id === kayttaja) {
                user = u.kayttaja_tunnus;
            }
        });
        return user;
    },
    advertType: (ilmoitus_laji) => {
        let ilmoitusLaji = "";
        if (ilmoitus_laji === 2) {
            ilmoitusLaji = "Buy";
        } else {
            ilmoitusLaji = "Sell";
        }
        return ilmoitusLaji;
    },
    selectAdvertType: (ilmoitus_laji) => {
        let ilmoitusLajiBoolean = false;
        if (ilmoitus_laji === 2) {
            ilmoitusLajiBoolean = true;
        }
        return ilmoitusLajiBoolean;
    }, reverseList: (list) => {
        let reversedList = list.reverse();
        return reversedList;
    },
    formatDate: (ilmoitus_paivays) => {
        let dateFromDb = ilmoitus_paivays;
        let year = dateFromDb.getFullYear();
        let month = ('0' + (dateFromDb.getMonth() + 1)).slice(-2);
        let date = ('0' + dateFromDb.getDate()).slice(-2);
        return date + '.' + month + '.' + year;
    }
}





export default hbsHelpers;

let hbsHelpers = {
    advertType: (ilmoitus_laji) => {
        let ilmoitusLaji = "";
        if (ilmoitus_laji === 2) {
            ilmoitusLaji = "Ostetaan";
        } else {
            ilmoitusLaji = "Myydään";
        }
        return ilmoitusLaji;
    },
    selectAdvertType: (ilmoitus_laji) => {
        let ilmoitusLajiBoolean = false;
        if (ilmoitus_laji === 2) {
            ilmoitusLajiBoolean = true;
        }
        return ilmoitusLajiBoolean;
    }
}
formatDate: (ilmoitus_paivays) => {
    let dateFromDb = ilmoitus_paivays;
    let year = dateFromDb.getFullYear();
    let month = ('0' + (dateFromDb.getMonth() + 1)).slice(-2);
    let date = ('0' + dateFromDb.getDate()).slice(-2);
    return date + '.' + month + '.' + year;
}


export default hbsHelpers;

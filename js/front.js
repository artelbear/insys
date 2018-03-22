let RASPISANIE = {
    "1": `1. Платформы
2. Английский
3. Информационные системы
4. Информационные Системы`,
    "2": `2. Физ-ра
3. Экониомика
4. Метрология
5. Моделирование`,
    "3": `2. Платформы
3. Информационные системы
4. Информационные системы
5. Моделирование`,
    "4": `3. Информационные системы
4. Информационные системы
5. Технические средства`,
    "5": `2. Платформы
3. БЖД
4. БЖД`,
    "6": `Выходной. Спи спокойно`,
    "7": `Выходной. Спи спокойно`,
    "0": `Выходной. Спи спокойно`,
};
let DAYS = {
    "0": "Воскресенье",
    "1": "Понидельник к 9:00",
    "2": "Вторник к 10:30",
    "3": "Среда к 10:30",
    "4": "Четверг к 12:20",
    "5": "Пятница к 10:30",
    "6": "Суббота",
    "7": "Воскресенье",
}

var visitsinformation = new Vue({
    el: '#visitsinformation',
    data: {
        message: "",
        seen: false
    }
})
getVisitors(function(v) {
    visitsinformation.message = v;
});

let alertmessage = "mute";
db.collection("important").doc("alert").get().then(function(doc) {
    if (doc.exists) {
        alertmessage = doc.data().text;
        today.alert = alertmessage;
        today.alerted = true;
    } else {
        alertmessage = "mute";
        today.alerted = false;
    }
})

let timenow = new Date();
let daynow = timenow.getDay();

var today = new Vue({
    el: '#today',
    data: {
        pair: DAYS[daynow],
        rasp: RASPISANIE[daynow],
        alert: alertmessage,
        alerted: alertmessage != "mute"
    }
})
var alarm = new Vue({
    el: '#alarm',
    data: {
        seen: false
    },
    methods: {
        greet: function (event) {
            let u = prompt('U... Wathca saayyy:') || "Есть изменения в расписании. Уточните у старосты.";
            if (u == "mute") {
                today.alerted = false;
                db.collection("important").doc("alert").delete();
            } else {
                today.alert = u;
                today.alerted = true;
                db.collection("important").doc("alert").set({
                    text: u
                });
            }
        }
    }
})
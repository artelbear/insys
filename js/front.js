let RASPISANIE = {
    "1": `1. Информационные Системы
2. Информационные Системы
3. Английский
4. Платформы`,
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
    "6": `Пар нет`,
    "7": `Пар нет`,
    "0": `Пар нет`,
};
let DAYS = {
    "0": "Воскресенье",
    "1": "Понедельник к 9:00",
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

var zav = new Vue({
    el: '#zav',
    data: {
        pair: DAYS[daynow+1],
        rasp: RASPISANIE[daynow+1],
    }
})

var alarm = new Vue({
    el: '#alarm',
    data: {
        seen: false
    },
    methods: {
        greet: function (event) {
            let u = prompt('Что!?') || "Есть изменения в расписании. Уточните у старосты.";
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

var raspis = new Vue({
    el: '#raspis',
    data: {
        items: [
            {day: DAYS[1] + "\n" + RASPISANIE[1]},
            {day: DAYS[2] + "\n" + RASPISANIE[2]},
            {day: DAYS[3] + "\n" + RASPISANIE[3]},
            {day: DAYS[4] + "\n" + RASPISANIE[4]},
            {day: DAYS[5] + "\n" + RASPISANIE[5]},
        ]
    }
})

let xut = 0;

function reblock() {
    xut += 1
    if (xut > 6) {
        visitsinformation.seen = !visitsinformation.seen;
        alarm.seen = !alarm.seen;
    }
}

var loadster = new Vue({
  el: '#loadster',
  data: {
    active: false,
    name: "zagr"
  },
  methods: {
    toggle: function() {
        this.active = !this.active;
    }
  }
});
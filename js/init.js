// libsy
function sizeDict(d){c=0; for (i in d) ++c; return c}

// func
function checkBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
        return 'Opera';
    } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
        return 'Chrome';
    } else if(navigator.userAgent.indexOf("Safari") != -1 ) {
        return 'Safari';
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
        return 'Firefox';
    } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';
    } else {
        return 'unknown';
    }
}

// check user
let isNewUser = sessionStorage.getItem('amInew') || false;
if (!isNewUser) {
    sessionStorage.setItem('amInew', true);
    let UserID = localStorage.getItem("userId") || `${checkBrowser()}.${navigator.platform}.${Math.floor(Math.random()*1000000000)}`;
    localStorage.setItem("userId", UserID);
    db.collection("guests").add({
        id: UserID,
        time: new Date()
    });
}

// check guest
function getVisitors(callback = new Function()) {
    let visitors = {_visits: 0};
    db.collection("guests").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            if (visitors[data.id] == null) {
                visitors[data.id] = [];
            }
            visitors[data.id].push(`${data.time.toDateString()} -- ${data.time.toLocaleTimeString()}`);
            visitors["_visits"]++;
        });
        callback(visitors);
    });
}
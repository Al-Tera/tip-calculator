const root = document.querySelector(":root"); 
const peopleinput = document.getElementsByClassName("people_input")[0]
const billinput = document.getElementsByClassName("bill_input")[0]
const rednote = document.getElementsByClassName("rednote")[0]
const resetbutton = document.getElementsByClassName("reset_button")[0]
const tip = document.getElementsByClassName("tip")
const custom = document.getElementsByClassName("tipcustom")[0]
const active = document.getElementsByClassName("active")[0]

let li = []
for (i = 0; i < 6; i++){
    li.push(tip[i])
    if (i == 5) li.push(custom)
}


custom.addEventListener("mousedown", function () {
        custom.value = "0"

})
custom.addEventListener("input", function () {
    if (this.value == "") custom.value = "0"
    if ((billinput.value != "" && peopleinput.value != "") || (billinput.value != 0 && peopleinput.value != 0)) {
        let selectedtip = parseFloat(this.value) / 100
        tipamount = billinput.value / peopleinput.value * selectedtip
        root.style.setProperty("--tipamount-text", `"$${tipamount.toFixed(2)}"`);
        root.style.setProperty("--total-text", `"$${(tipamount + (billinput.value / peopleinput.value)).toFixed(2)}"`);
    }
})

li.forEach((element,x) => {
    element.addEventListener("mousedown", function () {
        for (i = 0; i < li.length; i++){
            if (x == i) {
                element.classList.toggle("active")
                if ((billinput.value != "" && peopleinput.value != "") || (billinput.value != 0 && peopleinput.value != 0)) {
                    let selectedtip =  parseFloat(element.value) / 100
                    tipamount = billinput.value / peopleinput.value * selectedtip
                    root.style.setProperty("--tipamount-text", `"$${tipamount.toFixed(2)}"`);
                    root.style.setProperty("--total-text", `"$${(tipamount + (billinput.value / peopleinput.value)).toFixed(2)}"`);
                }
            }
            else li[i].classList.remove("active")
        }
    })
});


billinput.addEventListener("input", function () {
    if (billinput.value == "" || billinput.value == 0) {
        resetbutton.style.opacity = "50%";
        resetbutton.style.pointerEvents = "none";
        root.style.setProperty("--tipamount-text", `"$0.00"`);
        root.style.setProperty("--total-text", `"$0.00"`);
        if (peopleinput.value == "" || peopleinput.value == 0) rednote.style.visibility = "hidden";
    }
    else {
        resetbutton.style.opacity = "100%";
        resetbutton.style.pointerEvents = "visible";
        if (peopleinput.value == "" || peopleinput.value == 0) rednote.style.visibility = "visible";
        else {  
            rednote.style.visibility = "hidden";
            let selectedtip =  parseFloat(document.getElementsByClassName("active")[0].value) / 100
            tipamount = this.value / peopleinput.value * selectedtip
            root.style.setProperty("--tipamount-text", `"$${tipamount.toFixed(2)}"`);
            root.style.setProperty("--total-text", `"$${(tipamount + (this.value / peopleinput.value)).toFixed(2)}"`);
     }
    }
})



peopleinput.addEventListener("input", function () {
    if (peopleinput.value == "" || peopleinput.value == 0) rednote.style.visibility = "visible";
    else {
        rednote.style.visibility = "hidden";
        let selectedtip =  parseFloat(document.getElementsByClassName("active")[0].value) / 100
        tipamount = billinput.value / this.value * selectedtip
        root.style.setProperty("--tipamount-text", `"$${tipamount.toFixed(2)}"`);
        root.style.setProperty("--total-text", `"$${(tipamount + (billinput.value / this.value)).toFixed(2)}"`);

    }
})

resetbutton.addEventListener("mouseup", function () {
    billinput.value = ""
    peopleinput.value = ""
    document.getElementsByClassName("active")[0].classList.remove("active")
    root.style.setProperty("--tipamount-text", `"$0.00"`);
    root.style.setProperty("--total-text", `"$0.00"`);
})

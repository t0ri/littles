document.addEventListener("DOMContentLoaded", function(event) {
    // NOTE: let's put these in local storage for a workaround!
    let nerves = 0
    let wins = 0

    const winsStatistics = document.getElementById('wins-statistics-container')
    const nervesStatistics = document.getElementById('nerves-statistics-container')
    const totalStatistics = document.getElementById('total-statistics-container')

    // insert variable totals into dom
    winsStatistics.insertAdjacentHTML('afterbegin', `<span class="statistics-num">${wins}</span>`);
    nervesStatistics.insertAdjacentHTML('afterbegin', `<span class="statistics-num">${nerves}</span>`);
    totalStatistics.insertAdjacentHTML('afterbegin', `<span class="statistics-num">${nerves + wins}</span>`);

    // saveLittleBtnCreated controls the create savebtnevent interval
    saveLittleBtnCreated = false

    // when the save button is clicked
    let saveBtnAssignment = window.setInterval(function() {
        // variable set to interval to savebtn function
        let saveLittleBtn = document.getElementById('save-little')

        // check if save little button has been created
        // check if we've already completed this task (interval)
        if (saveLittleBtn && saveLittleBtnCreated === false) {
            // create event listener for save button (pass in button var)
            saveBtnEvent(saveLittleBtn)
            // set saveLittleBtnCreated to true
            saveLittleBtnCreated = true
        }
    }, 1000)

    function saveBtnEvent(saveLittleBtn) {
        // when save little button is clicked
        saveLittleBtn.addEventListener('click',
            function() {
                // call savelittle()
                saveLittle()
            })
    }

    function saveLittle() {
        // create little type for saved little
        let saveLittleType = document.getElementById('type')
        console.log('button clicked, value is ' + saveLittleType.value)

        // if little type is true
        if (saveLittleType === true) {
            // increase wins by 1
            win++
        // if little type is false
        } else {
            // increase nerves by 1
            nerve++
        }
    };
});

// TODO: fix this, and recreate it for the delete button

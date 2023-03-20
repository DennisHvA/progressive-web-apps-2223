export function calcForm() {
    const form    = document.getElementById('calc-form');
    const results = document.getElementById('results');
    const errors  = document.getElementById('form-error');
    const table = document.querySelector('#cal')
    
    function errorMessage(msg) {
        errors.innerHTML = msg;
        errors.classList.add('show');
        errors.classList.remove('hide');
        return false;
    }
    
    function showResults(calories) {
        table.innerHTML = calories.toFixed(0)
        results.innerHTML = `Je caloriebehoefte is: <strong class="cal">${(calories).toFixed(2)} </strong> calorien per dag. <br></br> <a href="#" id="rs">reset</a>`;
        results.classList.add('show')
        results.classList.remove('hide')
        errors.classList.add('hide')
        errors.classList.remove('show')
    }
    
    function resetForm(e) {
        if(e.target.id = 'rs') {
            e.preventDefault();
            results.classList.add('hide')
            results.classList.remove('show')
            form.reset()
        }
    }
    
    function submitHandler(e) {
        e.preventDefault();
    
        // Age
        let age = parseFloat(form.age.value);
        if(isNaN(age) || age < 0) {
            return errorMessage('Voer een geldige leeftijd in');
        }
       
        // Height
        let height = parseFloat(form.height_cm.value);
        if(isNaN(height) || height < 0) {
            return errorMessage('Voer een geldige lengte in centimeters in');
        }        
        // Weight
        let weight = parseFloat(form.weight.value);
        if(isNaN(weight) || weight < 0) {
            return errorMessage('Voer een geldig gewicht in kilogram in');
        }   
        
        // Gender
        let bmr = 0;
        if(form.gender.value == 'Female') {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }  else {
            bmr = 88.362 + (13.397  * weight) + (4.799 * height) - (5.677 * age);
        }
        
        // Activity
        let calories = 0;
        if(form.active.value == '1') {
            calories = (bmr * 1.2)
        }
        if(form.active.value == '2') {
            calories = (bmr * 1.375)
        }
        if(form.active.value == '3') {
            calories = (bmr * 1.55)
        }
        if(form.active.value == '4') {
            calories = (bmr * 1.725)
        }
        if(form.active.value == '5') {
            calories = (bmr * 1.9)
        }

        showResults(calories);

        console.log(form.age.value)
    }
    
    form.addEventListener('submit', submitHandler);
    results.addEventListener('click', resetForm, true);
}

calcForm()

// https://codepen.io/team/HMPD/pen/eLgQRX?editors=0010
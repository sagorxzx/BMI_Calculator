// script.js
(function() {
    const feetInput = document.getElementById('height-feet');
    const inchesInput = document.getElementById('height-inches');
    const weightInput = document.getElementById('weight');
    const calcBtn = document.getElementById('calculate-btn');

    const bmiValueEl = document.getElementById('bmi-value');
    const bmiCategoryEl = document.getElementById('bmi-category');
    const bmiMessageEl = document.getElementById('bmi-message');
    const resultCard = document.getElementById('result-card');
    const placeholderView = document.getElementById('placeholder-view');
    const resultView = document.getElementById('result-view');

    function clearBgClasses() {
        resultCard.classList.remove('bg-underweight', 'bg-normal', 'bg-overweight', 'bg-obese');
    }

    function resetToPlaceholder() {
        placeholderView.classList.remove('hidden');
        resultView.classList.add('hidden');
        clearBgClasses();
        [feetInput, inchesInput, weightInput].forEach(inp => inp.style.borderColor = '#dce2ec');
    }

    function computeBMI() {
        const feet = parseFloat(feetInput.value);
        const inches = parseFloat(inchesInput.value);
        const weight = parseFloat(weightInput.value);

        let valid = true;
        let msg = '';

        if (isNaN(feet) || feet < 1 || feet > 8) {
            valid = false;
            msg = 'Feet must be between 1 and 8.';
            feetInput.style.borderColor = '#d62828';
        } else {
            feetInput.style.borderColor = '#dce2ec';
        }

        if (isNaN(inches) || inches < 0 || inches > 11) {
            valid = false;
            msg = msg || 'Inches must be 0–11.';
            inchesInput.style.borderColor = '#d62828';
        } else {
            inchesInput.style.borderColor = '#dce2ec';
        }

        if (isNaN(weight) || weight < 20 || weight > 350) {
            valid = false;
            msg = msg || 'Weight must be 20–350 kg.';
            weightInput.style.borderColor = '#d62828';
        } else {
            weightInput.style.borderColor = '#dce2ec';
        }

        if (!valid) {
            alert(msg);
            return;
        }

        const totalInches = (feet * 12) + inches;
        const heightMeters = totalInches * 0.0254;
        const bmi = weight / (heightMeters * heightMeters);
        const bmiRounded = bmi.toFixed(1);
        const bmiNum = parseFloat(bmiRounded);

        let category, message, categoryClass, bgClass;

        if (bmiNum < 18.5) {
            category = 'Underweight';
            message = 'You may need to gain weight. Consider a nutrient-rich diet.';
            categoryClass = 'category-underweight';
            bgClass = 'bg-underweight';
        } else if (bmiNum >= 18.5 && bmiNum <= 24.9) {
            category = 'Normal weight';
            message = 'Great! Your weight is in the healthy range.';
            categoryClass = 'category-normal';
            bgClass = 'bg-normal';
        } else if (bmiNum >= 25 && bmiNum <= 29.9) {
            category = 'Overweight';
            message = 'Consider regular exercise and a balanced diet.';
            categoryClass = 'category-overweight';
            bgClass = 'bg-overweight';
        } else {
            category = 'Obese';
            message = 'Consult a health professional for personalized advice.';
            categoryClass = 'category-obese';
            bgClass = 'bg-obese';
        }

        placeholderView.classList.add('hidden');
        resultView.classList.remove('hidden');

        bmiValueEl.textContent = bmiRounded;
        bmiCategoryEl.textContent = category;
        bmiCategoryEl.className = `bmi-tag ${categoryClass}`;
        bmiMessageEl.textContent = message;

        clearBgClasses();
        resultCard.classList.add(bgClass);
    }

    calcBtn.addEventListener('click', computeBMI);

    [feetInput, inchesInput, weightInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                computeBMI();
            }
        });
    });

    [feetInput, inchesInput, weightInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#2c3e70';
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = '#dce2ec';
        });
    });

    window.addEventListener('DOMContentLoaded', () => {
        resetToPlaceholder();
        feetInput.value = '';
        inchesInput.value = '';
        weightInput.value = '';
        feetInput.placeholder = '5';
        inchesInput.placeholder = '6';
        weightInput.placeholder = '70';
    });
})();

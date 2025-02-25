document.addEventListener('DOMContentLoaded', function () {
    const redBorderInputs = document.querySelectorAll('.item2 input, .item6 input, .item8 input, .item18 input, .item20 input, .item26 input, .item28 input, .item44 input, .item46 input, .item48 input, .item50 input, .item52 input');

    function isValidInput(input) {
        const value = input.value.trim();
        const name = input.getAttribute('name'); 

        if (!value) return false;

        switch (name) {
            case 'datacode':
                return value.length > 0; 

            case 'uName':
                const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
                return value.length >= 3 && value.length <= 15 && nameRegex.test(value);

            case 'lastName':
                return value.length >= 3 && value.length <= 5 && /^[a-zA-ZÀ-ỹ\s]+$/.test(value);

            case 'uphonenumber':
            case 'gphonenumber':
            case 'yourphonenumber':
                const phoneRegex = /^[0-9]{1,10}$/;
                return phoneRegex.test(value);

            case 'address':
            case 'guest':
            case 'pIssue':
                return value.length > 0;

            case 'eMail':
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);

            case 'soCMT':
                const soCMTRegex = /^[0-9]+$/;
                return soCMTRegex.test(value);

            case 'dIssue':
                if (!value) return false;
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                selectedDate.setHours(0, 0, 0, 0);
                return !isNaN(selectedDate.getTime()) && selectedDate <= today;

            default:
                return true;
        }
    }

    redBorderInputs.forEach(input => {
        if (!input.classList.contains('red-border')) {
            input.classList.add('red-border');
        }

        function updateBorder() {
            if (isValidInput(input)) {
                input.classList.remove('red-border');
                input.classList.add('black-border');
            } else {
                input.classList.remove('black-border');
                input.classList.add('red-border');
            }
        }

        input.addEventListener('focus', updateBorder);
        input.addEventListener('blur', updateBorder);
        input.addEventListener('input', updateBorder);

        updateBorder();
    });

    console.log('Red border inputs:', redBorderInputs);
});
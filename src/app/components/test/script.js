function handleInputBorder(input) {
    input.classList.add('red-border');
  
    input.addEventListener('focus', () => {
      input.classList.remove('red-border');
      input.classList.add('black-border');
    });
  
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        input.classList.remove('black-border');
        input.classList.add('red-border');
      } else {
        input.classList.remove('red-border');
        input.classList.add('black-border');
      }
    });
  
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.classList.remove('red-border');
        input.classList.add('black-border');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const redBorderInputs = document.querySelectorAll('.item2 input, .item6 input, .item8 input, .item18 input, .item20 input, .item26 input, .item28 input, .item44 input, .item46 input, .item48 input, .item50 input, .item52 input');
  
    redBorderInputs.forEach(input => {
      handleInputBorder(input);
    });
  });
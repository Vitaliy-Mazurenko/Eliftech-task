const $list = $('.list');
const $input = $('#addName');
const $rate = $('#addRate');
const $maxLoan = $('#maxLoan');
const $minPayment = $('#minPayment');
const $loanTerm = $('#loanTerm');
const $add = $('#addSubmit');


const list = [
  {
    text: 'KredoBank',
    rate: 10,
    loan: 300000,
    pay: 60000,
    term: 12
  },
  {
    text: 'OtpBank',
    rate: 7,
    loan: 400000,
    pay: 80000,
    term: 6
  }
];

(function ($) {

  $('#addSubmit').click(function (e) {
    e.preventDefault();
    if ($input.val() !== '' && $rate.val() !== '' && $maxLoan.val() !== ''
    && $minPayment.val() !== '' && $loanTerm.val() !== '') {
      let b = $('#addName').val();
      let r = $('#addRate').val();
      let l = $('#maxLoan').val();
      let p = $('#minPayment').val();
      let t = $('#loanTerm').val();
      let temp = {};
      temp.text = b;
      temp.rate = r;
      temp.loan = l;
      temp.pay = p;
      temp.term = t;
      let i = list.length;
      list[i] = temp;
      setBank(list);
      $('.list').append(`<li class="item"><span class="item-text">${b}</span>
      <span class="item-text">${r}%</span>
      <span class="item-text">${l}</span>
      <span class="item-text">${p}</span>
      <span class="item-text">${t}</span>
      <button class="item-edit" id="${i}">Edit</button>
    <button class="item-remove" id="${i}">Remove</button></li>`);
    $('#addName').val('');
    $('#addRate').val('');
    $('#maxLoan').val('');
    $('#minPayment').val('');
    $('#loanTerm').val('');
    } else if ($input.val() === ''){
      $('#addName').focus();
    } else if ($rate.val() === ''){
      $('#addRate').focus();
    } else if ($maxLoan.val() === ''){
      $('#maxLoan').focus();
    } else if ($minPayment.val() === ''){
      $('#minPayment').focus();
    } else if ($loanTerm.val() === ''){
      $('#loanTerm').focus();
    }
  })

  $('body').on('click', '.item-remove', function () {
    $(this).parent().remove();
    let banks = JSON.parse(localStorage.getItem('list')) || list;
    if(banks.length < 2){
      localStorage.setItem('list', JSON.stringify(null));
    } else {
      let delBanks = [
        ...banks.slice(0, this.id), ...banks.slice(this.id + 1)
        ];
        localStorage.setItem('list', JSON.stringify(delBanks));
    }
  })

  $('body').on('click', '.item-edit', function () {
    $(this).parent().remove();
    let banks = JSON.parse(localStorage.getItem('list')) || list;
    let banksEdit = [
      ...banks.slice(this.id, this.id + 1)
     ];
    $('#addName').val(banksEdit[0].text);
    $('#addRate').val(banksEdit[0].rate);
    $('#maxLoan').val(banksEdit[0].loan);
    $('#minPayment').val(banksEdit[0].pay);
    $('#loanTerm').val(banksEdit[0].term);

      let delBanks = [
        ...banks.slice(0, this.id), ...banks.slice(this.id + 1)
        ];
        localStorage.setItem('list', JSON.stringify(delBanks));

  })


  function setBank(a) {
    localStorage.setItem('list', JSON.stringify(a));
    return false;
  }

  let keys = JSON.parse(localStorage.getItem('list')) || list;
  for (let i = 0; i < keys.length; i++) {
    $('.list').append(`<li class="item"><span class="item-text">${keys[i].text}</span>
    <span class="item-text">${keys[i].rate}%</span>
    <span class="item-text">${keys[i].loan}</span>
    <span class="item-text">${keys[i].pay}</span>
    <span class="item-text">${keys[i].term}</span>
    <button class="item-edit" id="${i}">Edit</button>
    <button class="item-remove" id="${i}">Remove</button></li>`);
  }


})(jQuery);



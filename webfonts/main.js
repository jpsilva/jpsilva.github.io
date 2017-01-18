const columns = ['name', 'subtype', 'styles', 'mac', 'win', 'ios'],
      platformCheckboxes = document.getElementsByClassName('platformCheckbox'),
      previewText = document.getElementById('previewText'),
      previewText2 = document.getElementById('previewText2'),
      tableBody = document.getElementById('tableBody'),
      stickyHeader = document.getElementById('stickyHeader'),
      parser = new DOMParser();

platformCheckboxes.mac.addEventListener('change', renderTable);
platformCheckboxes.win.addEventListener('change', renderTable);
platformCheckboxes.ios.addEventListener('change', renderTable);
previewText.addEventListener('keyup', setPreviewText);
previewText2.addEventListener('keyup', setPreviewText);
window.addEventListener('scroll', stickifyHeader, { passive: true });

renderTable();

function renderTable () {
  tableBody.innerHTML = '';

  fonts.forEach((font) => {
    if ((!platformCheckboxes.mac.checked || font.mac.length) &&
        (!platformCheckboxes.win.checked || font.win.length) &&
        (!platformCheckboxes.ios.checked || font.ios.length)
      ) {
      let row = document.createElement('tr');

      columns.forEach((prop) => {
        let cell = document.createElement('td');
        cell.innerText = font[prop];
        row.append(cell);
      });

      let previewCell = document.createElement('td');
      previewCell.style.fontFamily = `${font.name}, AdobeBlankRegular`;
      previewCell.innerText = previewText.value;
      row.append(previewCell);

      tableBody.append(row);
    }
  });
}

function setPreviewText() {
  if (this.id === 'previewText') {
    previewText2.value = this.value;
  } else {
    previewText.value = this.value;
  }

  renderTable();
}

function yOffset() {
  return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

function stickifyHeader() {
  stickyHeader.style.top = yOffset() > 600 ? '0' : '-100px';
}

// platforms = {
//   mac: ['10.7', '10.10', '10.11', '10.12'],
//   win: ['3.1', '95', '1997', '98', '2000', 'XP', 'Vista', '7', '8', '8.1', '10'],
//   ios: ['2.0', '3.0', '3.2', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0']
// }

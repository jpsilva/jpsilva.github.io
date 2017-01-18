const platforms = {
    mac: ['10.7', '10.10', '10.11', '10.12'],
    win: ['3.1', '95', '1997', '98', '2000', 'XP', 'Vista', '7', '8', '8.1', '10'],
    ios: ['2.0', '3.0', '3.2', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0']
  },
  columns = ['name', 'subtype', 'styles', 'notes', 'mac', 'win', 'ios' ],
  platformCheckboxes = document.getElementsByClassName('platformCheckbox'),
  tableBody = document.getElementById('tableBody'),
  parser = new DOMParser();

var data = { fonts: fonts };

platformCheckboxes.mac.addEventListener('change', renderTable);
platformCheckboxes.win.addEventListener('change', renderTable);
platformCheckboxes.ios.addEventListener('change', renderTable);

function renderTable () {
  tableBody.innerHTML = '';

  fonts.forEach((font) => {
    if (platformCheckboxes.mac.checked && !font.mac.length) {
      return false;
    }

    if (platformCheckboxes.win.checked && !font.win.length) {
      return false;
    }

    if (platformCheckboxes.ios.checked && !font.ios.length) {
      return false;
    }

    let row = document.createElement('tr');

    columns.forEach((prop) => {
      let cell = document.createElement('td');
      cell.innerHTML = font[prop];
      row.append(cell);
    });

    tableBody.append(row);
  });
}

renderTable();
